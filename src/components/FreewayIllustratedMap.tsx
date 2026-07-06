"use client";

import { useCallback, useEffect, useMemo, useRef } from "react";
import {
  GoogleMap,
  Marker,
  Polyline,
  useJsApiLoader,
} from "@react-google-maps/api";
import { serviceCoverageMap } from "@/lib/site";
import {
  COVERAGE_MAP_STYLES,
  COVERAGE_FIT_PADDING,
  getCoverageBoundsPoints,
  ROUTE_OVERLAY_OPTIONS,
  ROUTE_UNDERLAY_OPTIONS,
  SMOOTHED_HIGHWAYS,
} from "@/lib/coverage-map";
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

  // Frames the highway network exactly once when the map first mounts. This
  // is the map's *only* viewport decision — nothing after this point ever
  // calls fitBounds, setZoom, or panTo again, so the map can't visibly shift
  // or "settle" after the user sees it.
  const onMapLoad = useCallback((map: google.maps.Map) => {
    mapRef.current = map;

    const bounds = new google.maps.LatLngBounds();
    for (const point of getCoverageBoundsPoints()) {
      bounds.extend(point);
    }

    // Fractional zoom lets fitBounds land on the exact zoom that fits the
    // highway network tightly (no integer rounding), so the routes read as
    // a consistent ~70-80% of the frame at whatever size the map mounts at.
    map.fitBounds(bounds, COVERAGE_FIT_PADDING);
  }, []);

  // The map card's width is fluid (grid/flex layout), so its pixel size can
  // change after mount (window resize, orientation change). Google Maps
  // doesn't detect that on its own, so we still have to nudge it — but only
  // to keep the *existing* center rendered correctly at the new size, never
  // to pick a new center or zoom.
  useEffect(() => {
    if (!isLoaded || !mapRef.current) return;

    const container = document.getElementById(MAP_CONTAINER_ID);
    if (!container) return;

    const observer = new ResizeObserver(() => {
      const map = mapRef.current;
      if (!map) return;
      const center = map.getCenter();
      google.maps.event.trigger(map, "resize");
      if (center) map.setCenter(center);
    });

    observer.observe(container);
    return () => observer.disconnect();
  }, [isLoaded]);

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
              // Static service-coverage graphic: only manual zoom is
              // allowed. No dragging, no scroll/pinch zoom, no keyboard pan
              // — the viewport set on load is the only one that ever shows.
              zoomControl: true,
              draggable: false,
              scrollwheel: false,
              disableDoubleClickZoom: true,
              keyboardShortcuts: false,
              gestureHandling: "none",
              mapTypeControl: false,
              streetViewControl: false,
              fullscreenControl: false,
              rotateControl: false,
              clickableIcons: false,
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
              <Marker
                position={{ lat: primaryLocation.lat, lng: primaryLocation.lng }}
                title={primaryLocation.label}
              />
            )}

            <ClampedTravelTimeCallouts
              locations={calloutLocations}
              primaryLocation={primaryLocation}
            />
          </GoogleMap>
        )}
      </div>
    </div>
  );
}
