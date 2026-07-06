"use client";

import { useCallback, useEffect, useRef } from "react";
import {
  GoogleMap,
  OverlayView,
  Polyline,
  useJsApiLoader,
} from "@react-google-maps/api";
import { serviceCoverageMap } from "@/lib/site";
import {
  clampCoverageZoom,
  COVERAGE_MAP_STYLES,
  getCoverageBoundsPoints,
  ROUTE_OVERLAY_OPTIONS,
  ROUTE_UNDERLAY_OPTIONS,
} from "@/lib/coverage-map";
import { CoverageMapFallback } from "./CoverageMapFallback";

const MAP_CONTAINER_ID = "treadforce-coverage-map";

export function FreewayIllustratedMap() {
  const mapRef = useRef<google.maps.Map | null>(null);
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ?? "";

  const { isLoaded, loadError } = useJsApiLoader({
    id: "treadforce-google-maps",
    googleMapsApiKey: apiKey,
  });

  const fitMapToCoverage = useCallback((map: google.maps.Map) => {
    const bounds = new google.maps.LatLngBounds();
    for (const point of getCoverageBoundsPoints()) {
      bounds.extend(point);
    }

    map.fitBounds(bounds, serviceCoverageMap.fitPadding);

    google.maps.event.addListenerOnce(map, "idle", () => {
      const currentZoom = map.getZoom();
      if (currentZoom === undefined) return;

      map.setZoom(clampCoverageZoom(currentZoom));
      map.panTo(serviceCoverageMap.center);
    });
  }, []);

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
        className="relative aspect-[4/3] w-full bg-[#e8eaed]"
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
              minZoom: 10,
              maxZoom: 15,
            }}
          >
            {serviceCoverageMap.highways.map((route) => (
              <Polyline
                key={`${route.id}-underlay`}
                path={route.points.map((point) => ({ ...point }))}
                options={ROUTE_UNDERLAY_OPTIONS}
              />
            ))}
            {serviceCoverageMap.highways.map((route) => (
              <Polyline
                key={`${route.id}-overlay`}
                path={route.points.map((point) => ({ ...point }))}
                options={ROUTE_OVERLAY_OPTIONS}
              />
            ))}

            {serviceCoverageMap.locations.map((location) => {
              if (location.kind === "primary") {
                return (
                  <OverlayView
                    key={location.id}
                    position={{ lat: location.lat, lng: location.lng }}
                    mapPaneName={OverlayView.OVERLAY_LAYER}
                    getPixelPositionOffset={(width, height) => ({
                      x: -(width / 2),
                      y: -(height + 6),
                    })}
                  >
                    <div className="pointer-events-none flex flex-col items-center">
                      <span className="rounded bg-white/90 px-1 py-0.5 text-[8px] font-semibold text-slate-800 shadow-sm ring-1 ring-slate-200/60 sm:text-[9px]">
                        {location.label}
                      </span>
                      <div
                        aria-hidden="true"
                        className="h-0 w-0 border-x-[2px] border-t-[3px] border-x-transparent border-t-white/90"
                      />
                      <span className="h-2 w-2 rounded-full bg-[#ea4335] ring-1 ring-white shadow-sm" />
                    </div>
                  </OverlayView>
                );
              }

              const offset =
                "calloutOffset" in location
                  ? location.calloutOffset
                  : { x: 0, y: 0 };

              return (
                <OverlayView
                  key={location.id}
                  position={{ lat: location.lat, lng: location.lng }}
                  mapPaneName={OverlayView.OVERLAY_LAYER}
                  getPixelPositionOffset={(width, height) => ({
                    x: -(width / 2) + offset.x,
                    y: -(height + 10) + offset.y,
                  })}
                >
                  <div className="pointer-events-none flex flex-col items-center opacity-75">
                    <span className="max-w-[6.5rem] rounded bg-white/85 px-1 py-px text-center text-[7px] font-medium leading-tight text-slate-500 sm:max-w-none sm:whitespace-nowrap sm:text-[8px]">
                      {location.label}
                    </span>
                    <span className="mt-px h-1 w-1 rounded-full bg-brand/50 ring-1 ring-white/80" />
                  </div>
                </OverlayView>
              );
            })}
          </GoogleMap>
        )}
      </div>
    </div>
  );
}
