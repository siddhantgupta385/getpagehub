"use client";

import { useLayoutEffect, useRef, useState } from "react";
import Image from "next/image";
import { serviceCoverageMap } from "@/lib/site";
import {
  fitViewportAroundCenter,
  latLngToPercent,
  type LatLng,
} from "@/lib/map-projection";
import { getCoverageBoundsPoints, SMOOTHED_HIGHWAYS } from "@/lib/coverage-map";
import { getServiceMapSource } from "@/lib/static-map";
import { layoutCallouts } from "@/lib/callout-position";
import { TravelTimeCalloutBadge } from "./TravelTimeCalloutBadge";

type CalloutLocation = Extract<
  (typeof serviceCoverageMap.locations)[number],
  { kind: "callout" }
>;

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
  center,
  zoom,
  mapWidth,
  mapHeight,
}: {
  locations: CalloutLocation[];
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
  }, [locations, mapWidth, mapHeight]);

  const items = locations
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
        offset: location.calloutOffset,
      };
    })
    .filter((item): item is NonNullable<typeof item> => item !== null);

  const positioned =
    items.length === locations.length
      ? layoutCallouts(items, mapWidth, mapHeight)
      : [];

  return (
    <>
      <div
        ref={measureRef}
        aria-hidden="true"
        className="pointer-events-none absolute -left-[9999px] top-0 opacity-0"
      >
        {locations.map((location) => (
          <div key={location.id} data-callout-id={location.id}>
            <TravelTimeCalloutBadge label={location.label} />
          </div>
        ))}
      </div>

      {positioned.map((box) => (
        <div
          key={box.id}
          className="pointer-events-none absolute z-[7]"
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

        {locations.map((location) => {
          if (location.kind !== "primary") return null;

          const position = latLngToPercent(
            location.lat,
            location.lng,
            center,
            zoom,
            width,
            height,
          );

          return (
            <div
              key={location.id}
              className="pointer-events-none absolute z-[8] -translate-x-1/2"
              style={{
                left: `${position.left}%`,
                top: `${position.top}%`,
              }}
            >
              <div className="flex -translate-y-full flex-col items-center">
                <span className="mb-1 whitespace-nowrap rounded-[10px] bg-white px-2.5 py-1 text-[11px] font-semibold text-slate-800 shadow-[0_2px_10px_rgba(0,0,0,0.14)] sm:text-[12px]">
                  {location.label}
                </span>
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
            </div>
          );
        })}

        {mapSize.width > 0 && mapSize.height > 0 && (
          <ClampedFallbackCallouts
            locations={calloutLocations}
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
