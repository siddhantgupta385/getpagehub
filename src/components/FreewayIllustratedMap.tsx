"use client";

import { useCallback, useEffect, useMemo, useRef } from "react";
import {
  GoogleMap,
  Marker,
  OverlayView,
  Polyline,
  useJsApiLoader,
} from "@react-google-maps/api";
import { serviceCoverageMap } from "@/lib/site";
import {
  CALLOUT_ZOOM_STEP,
  COVERAGE_MAP_STYLES,
  COVERAGE_FIT_PADDING,
  getCoverageBoundsPoints,
  MAX_CALLOUT_ZOOM_OUT,
  ROUTE_OVERLAY_OPTIONS,
  ROUTE_UNDERLAY_OPTIONS,
  SMOOTHED_HIGHWAYS,
} from "@/lib/coverage-map";
import {
  calloutFitsInMap,
  ESTIMATED_CALLOUT_SIZE,
} from "@/lib/callout-position";
import { latLngToPercent } from "@/lib/map-projection";
import { CoverageMapFallback } from "./CoverageMapFallback";
import { ClampedTravelTimeCallouts } from "./ClampedTravelTimeCallouts";

const MAP_CONTAINER_ID = "treadforce-coverage-map";

type CalloutLocation = Extract<
  (typeof serviceCoverageMap.locations)[number],
  { kind: "callout" }
>;

export function FreewayIllustratedMap() {
  const mapRef = useRef<google.maps.Map | null>(null);
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ?? "";

  const { isLoaded, loadError } = useJsApiLoader({
    id: "treadforce-google-maps",
    googleMapsApiKey: apiKey,
  });

  const calloutLocations = useMemo(
    () =>
      serviceCoverageMap.locations.filter(
        (location): location is CalloutLocation => location.kind === "callout",
      ),
    [],
  );

  const primaryLocation = useMemo(
    () => serviceCoverageMap.locations.find((location) => location.kind === "primary"),
    [],
  );

  const fitMapToCoverage = useCallback(
    (map: google.maps.Map) => {
      const bounds = new google.maps.LatLngBounds();
      for (const point of getCoverageBoundsPoints()) {
        bounds.extend(point);
      }

      // Fractional zoom lets fitBounds land on the exact zoom that fits the
      // highway network tightly (no integer rounding), so the routes read
      // as a consistent ~70-80% of the frame at every breakpoint.
      map.fitBounds(bounds, COVERAGE_FIT_PADDING);

      google.maps.event.addListenerOnce(map, "idle", () => {
        const mapDiv = map.getDiv();
        const mapWidth = mapDiv.offsetWidth;
        const mapHeight = mapDiv.offsetHeight;
        if (mapWidth === 0 || mapHeight === 0) return;

        const center = serviceCoverageMap.center;
        // This zoom already guarantees the full highway network is on
        // screen — only ever zoom OUT from here for callout room, never in,
        // so the routes can never clip.
        const baseZoom = map.getZoom() ?? serviceCoverageMap.minZoom;
        const minZoom = baseZoom - MAX_CALLOUT_ZOOM_OUT;

        const calloutsFitAtZoom = (targetZoom: number) =>
          calloutLocations.every((location) => {
            const position = latLngToPercent(
              location.lat,
              location.lng,
              center,
              targetZoom,
              mapWidth,
              mapHeight,
            );
            const anchorX = (position.left / 100) * mapWidth;
            const anchorY = (position.top / 100) * mapHeight;

            return calloutFitsInMap(
              anchorX,
              anchorY,
              ESTIMATED_CALLOUT_SIZE.width,
              ESTIMATED_CALLOUT_SIZE.height,
              mapWidth,
              mapHeight,
              location.calloutOffset,
            );
          });

        let zoom = baseZoom;
        while (zoom > minZoom && !calloutsFitAtZoom(zoom)) {
          zoom -= CALLOUT_ZOOM_STEP;
        }

        map.setZoom(zoom);
        map.panTo(center);
      });
    },
    [calloutLocations],
  );

  const onMapLoad = useCallback(
    (map: google.maps.Map) => {
      mapRef.current = map;
      fitMapToCoverage(map);
    },
    [fitMapToCoverage],
  );

  useEffect(() => {
    if (!isLoaded || !mapRef.current) return;

    const container = document.getElementById(MAP_CONTAINER_ID);
    if (!container) return;

    const observer = new ResizeObserver(() => {
      if (!mapRef.current) return;
      google.maps.event.trigger(mapRef.current, "resize");
      fitMapToCoverage(mapRef.current);
    });

    observer.observe(container);
    return () => observer.disconnect();
  }, [isLoaded, fitMapToCoverage]);

  if (!apiKey) {
    return <CoverageMapFallback />;
  }

  return (
    <div className="animate-fade-up w-full overflow-hidden rounded-3xl shadow-xl shadow-black/30 ring-1 ring-white/10">
      <div
        id={MAP_CONTAINER_ID}
        className="relative aspect-[4/3] w-full overflow-hidden bg-[#e8eaed]"
      >
        {loadError ? (
          <CoverageMapFallback />
        ) : !isLoaded ? (
          <div className="absolute inset-0 animate-pulse bg-[#e8eaed]" />
        ) : (
          <GoogleMap
            mapContainerClassName="h-full w-full"
            center={serviceCoverageMap.center}
            zoom={serviceCoverageMap.minZoom}
            onLoad={onMapLoad}
            options={{
              zoomControl: true,
              mapTypeControl: false,
              streetViewControl: false,
              fullscreenControl: false,
              rotateControl: false,
              clickableIcons: false,
              gestureHandling: "cooperative",
              styles: COVERAGE_MAP_STYLES,
              isFractionalZoomEnabled: true,
              minZoom: 9,
              maxZoom: 15,
            }}
          >
            {SMOOTHED_HIGHWAYS.map((route) => (
              <Polyline
                key={`${route.id}-underlay`}
                path={route.path}
                options={ROUTE_UNDERLAY_OPTIONS}
              />
            ))}
            {SMOOTHED_HIGHWAYS.map((route) => (
              <Polyline
                key={`${route.id}-overlay`}
                path={route.path}
                options={ROUTE_OVERLAY_OPTIONS}
              />
            ))}

            {primaryLocation && (
              <>
                <Marker
                  position={{ lat: primaryLocation.lat, lng: primaryLocation.lng }}
                  title={primaryLocation.label}
                />
                <OverlayView
                  position={{ lat: primaryLocation.lat, lng: primaryLocation.lng }}
                  mapPaneName={OverlayView.OVERLAY_LAYER}
                  getPixelPositionOffset={(width, height) => ({
                    x: -(width / 2),
                    y: -(height + 36),
                  })}
                >
                  <div className="pointer-events-none whitespace-nowrap rounded-[10px] bg-white px-2.5 py-1 text-[11px] font-semibold text-slate-800 shadow-[0_2px_10px_rgba(0,0,0,0.14)] sm:text-[12px]">
                    {primaryLocation.label}
                  </div>
                </OverlayView>
              </>
            )}

            <ClampedTravelTimeCallouts locations={calloutLocations} />
          </GoogleMap>
        )}
      </div>
    </div>
  );
}
