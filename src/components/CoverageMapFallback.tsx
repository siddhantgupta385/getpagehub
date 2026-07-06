"use client";

import { useLayoutEffect, useRef, useState } from "react";
import Image from "next/image";
import { serviceCoverageMap } from "@/lib/site";
import {
  fitViewportAroundCenter,
  latLngToPercent,
  type LatLng,
} from "@/lib/map-projection";
import {
  getCoverageBoundsPoints,
  HIGHWAY_MIDPOINTS,
  SMOOTHED_HIGHWAYS,
} from "@/lib/coverage-map";
import { getServiceMapSource } from "@/lib/static-map";
import {
  layoutCallouts,
  nearestPointOnBox,
} from "@/lib/callout-position";
import { TravelTimeCalloutBadge } from "./TravelTimeCalloutBadge";

type CalloutLocation = Extract<
  (typeof serviceCoverageMap.locations)[number],
  { kind: "callout" }
>;
type PrimaryLocation = Extract<
  (typeof serviceCoverageMap.locations)[number],
  { kind: "primary" }
>;

// Clears the pin glyph rendered alongside its anchor.
const PRIMARY_LABEL_OFFSET = { x: 0, y: -20 };

function getFallbackViewport() {
  const { center, width, height, minZoom, maxZoom, paddingFactor, zoomBump } =
    serviceCoverageMap;

  const { zoom } = fitViewportAroundCenter(
    center,
    getCoverageBoundsPoints(),
    width,
    height,
    { paddingFactor, minZoom, maxZoom },
  );

  return { center, zoom: Math.min(maxZoom, zoom + zoomBump) };
}

function HighwayRoutesOverlay({
  center,
  zoom,
  width,
  height,
}: {
  center: LatLng;
  zoom: number;
  width: number;
  height: number;
}) {
  return (
    <svg
      viewBox="0 0 100 100"
      className="pointer-events-none absolute inset-0 z-[6] h-full w-full"
      preserveAspectRatio="xMidYMid meet"
      aria-hidden="true"
    >
      {SMOOTHED_HIGHWAYS.map((route) => {
        const points = route.path
          .map((point) => {
            const position = latLngToPercent(
              point.lat,
              point.lng,
              center,
              zoom,
              width,
              height,
            );
            return `${position.left},${position.top}`;
          })
          .join(" ");

        return (
          <g key={route.id}>
            <polyline
              points={points}
              fill="none"
              stroke="#ffffff"
              strokeWidth={2.6}
              strokeLinecap="round"
              strokeLinejoin="round"
              opacity={0.95}
            />
            <polyline
              points={points}
              fill="none"
              stroke="#1d4ed8"
              strokeWidth={1.6}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </g>
        );
      })}
    </svg>
  );
}

function ClampedFallbackCallouts({
  locations,
  primaryLocation,
  center,
  zoom,
  mapWidth,
  mapHeight,
}: {
  locations: CalloutLocation[];
  primaryLocation?: PrimaryLocation;
  center: LatLng;
  zoom: number;
  mapWidth: number;
  mapHeight: number;
}) {
  const measureRef = useRef<HTMLDivElement>(null);
  const [labelSizes, setLabelSizes] = useState<Record<string, DOMRect>>({});

  useLayoutEffect(() => {
    if (!measureRef.current) return;

    const sizes: Record<string, DOMRect> = {};
    for (const child of Array.from(measureRef.current.children)) {
      const id = child.getAttribute("data-callout-id");
      if (!id) continue;
      sizes[id] = child.getBoundingClientRect();
    }
    setLabelSizes(sizes);
  }, [locations, primaryLocation, mapWidth, mapHeight]);

  const allLocations = [
    // Every tooltip's anchor is a real LatLng on its highway's polyline (the
    // midpoint of the smoothed route) — never a hand-picked or
    // screen-relative coordinate.
    ...locations.map((location) => {
      const anchor = HIGHWAY_MIDPOINTS[location.routeId];
      return {
        id: location.id,
        label: location.label,
        lat: anchor.lat,
        lng: anchor.lng,
        offset: location.calloutOffset,
        fixed: false,
      };
    }),
    ...(primaryLocation
      ? [
          {
            id: primaryLocation.id,
            label: primaryLocation.label,
            lat: primaryLocation.lat,
            lng: primaryLocation.lng,
            offset: PRIMARY_LABEL_OFFSET,
            fixed: true,
          },
        ]
      : []),
  ];

  const items = allLocations
    .map((location) => {
      const size = labelSizes[location.id];
      if (!size) return null;

      const position = latLngToPercent(
        location.lat,
        location.lng,
        center,
        zoom,
        mapWidth,
        mapHeight,
      );

      return {
        id: location.id,
        label: location.label,
        anchorX: (position.left / 100) * mapWidth,
        anchorY: (position.top / 100) * mapHeight,
        width: size.width,
        height: size.height,
        offset: location.offset,
        fixed: location.fixed,
      };
    })
    .filter((item): item is NonNullable<typeof item> => item !== null);

  const positioned =
    items.length === allLocations.length
      ? layoutCallouts(items, mapWidth, mapHeight)
      : [];
  const calloutIds = new Set<string>(locations.map((location) => location.id));

  return (
    <>
      <div
        ref={measureRef}
        aria-hidden="true"
        className="pointer-events-none absolute -left-[9999px] top-0 opacity-0"
      >
        {allLocations.map((location) => (
          <div key={location.id} data-callout-id={location.id}>
            <TravelTimeCalloutBadge label={location.label} />
          </div>
        ))}
      </div>

      <svg
        className="pointer-events-none absolute inset-0 z-[7] h-full w-full overflow-visible"
        aria-hidden="true"
      >
        {positioned
          .filter((box) => calloutIds.has(box.id))
          .map((box) => {
            const leaderEnd = nearestPointOnBox(box.anchorX, box.anchorY, box);
            return (
              <g key={box.id}>
                <line
                  x1={box.anchorX}
                  y1={box.anchorY}
                  x2={leaderEnd.x}
                  y2={leaderEnd.y}
                  stroke="#3c4043"
                  strokeWidth={1.5}
                  strokeLinecap="round"
                  opacity={0.85}
                />
                <circle
                  cx={box.anchorX}
                  cy={box.anchorY}
                  r={3.5}
                  fill="#3c4043"
                  stroke="#ffffff"
                  strokeWidth={1.5}
                />
              </g>
            );
          })}
      </svg>

      {positioned.map((box) => (
        <div
          key={box.id}
          className="pointer-events-none absolute z-[8]"
          style={{
            left: `${box.left}px`,
            top: `${box.top}px`,
          }}
        >
          <TravelTimeCalloutBadge label={box.label} />
        </div>
      ))}
    </>
  );
}

export function CoverageMapFallback() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mapSize, setMapSize] = useState({ width: 0, height: 0 });
  const { width, height, locations } = serviceCoverageMap;
  const { center, zoom } = getFallbackViewport();
  const map = getServiceMapSource({ center, zoom, width, height });

  const calloutLocations = locations.filter(
    (location): location is CalloutLocation => location.kind === "callout",
  );
  const primaryLocation = locations.find(
    (location): location is PrimaryLocation => location.kind === "primary",
  );

  useLayoutEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const updateSize = () => {
      setMapSize({
        width: container.clientWidth,
        height: container.clientHeight,
      });
    };

    updateSize();
    const observer = new ResizeObserver(updateSize);
    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="animate-fade-up w-full overflow-hidden rounded-3xl shadow-xl shadow-black/30 ring-1 ring-white/10">
      <div
        ref={containerRef}
        className="relative aspect-[4/3] w-full overflow-hidden bg-[#e8eaed]"
        style={{ padding: 0 }}
      >
        {map.mode === "google-embed" ? (
          <iframe
            src={map.url}
            title="Google Maps — Murfreesboro, TN interstate service coverage"
            className="pointer-events-none absolute inset-0 h-full w-full border-0"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            tabIndex={-1}
          />
        ) : (
          <Image
            src={map.url}
            alt="Service coverage map centered on Murfreesboro, TN along I-24, I-840, and I-65"
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 600px"
            className="object-cover"
          />
        )}

        <HighwayRoutesOverlay
          center={center}
          zoom={zoom}
          width={width}
          height={height}
        />

        {primaryLocation &&
          (() => {
            const position = latLngToPercent(
              primaryLocation.lat,
              primaryLocation.lng,
              center,
              zoom,
              width,
              height,
            );

            return (
              <div
                className="pointer-events-none absolute z-[8] -translate-x-1/2 -translate-y-full"
                style={{
                  left: `${position.left}%`,
                  top: `${position.top}%`,
                }}
              >
                <svg
                  width="22"
                  height="30"
                  viewBox="0 0 22 30"
                  aria-hidden="true"
                  className="drop-shadow-sm"
                >
                  <path
                    d="M11 0C4.925 0 0 4.925 0 11c0 8.25 11 19 11 19s11-10.75 11-19c0-6.075-4.925-11-11-11z"
                    fill="#ea4335"
                  />
                  <circle cx="11" cy="11" r="4.2" fill="#ffffff" />
                </svg>
              </div>
            );
          })()}

        {mapSize.width > 0 && mapSize.height > 0 && (
          <ClampedFallbackCallouts
            locations={calloutLocations}
            primaryLocation={primaryLocation}
            center={center}
            zoom={zoom}
            mapWidth={mapSize.width}
            mapHeight={mapSize.height}
          />
        )}
      </div>
    </div>
  );
}
