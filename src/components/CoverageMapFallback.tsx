import Image from "next/image";
import { serviceCoverageMap } from "@/lib/site";
import {
  fitViewportAroundCenter,
  latLngToPercent,
  type LatLng,
} from "@/lib/map-projection";
import { getCoverageBoundsPoints } from "@/lib/coverage-map";
import { getServiceMapSource } from "@/lib/static-map";

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
      {serviceCoverageMap.highways.map((route) => {
        const points = route.points
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
              strokeWidth={1.8}
              strokeLinecap="round"
              strokeLinejoin="round"
              opacity={0.95}
            />
            <polyline
              points={points}
              fill="none"
              stroke="#2563eb"
              strokeWidth={1.2}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </g>
        );
      })}
    </svg>
  );
}

export function CoverageMapFallback() {
  const { width, height, locations } = serviceCoverageMap;
  const { center, zoom } = getFallbackViewport();
  const map = getServiceMapSource({ center, zoom, width, height });

  return (
    <div className="animate-fade-up w-full overflow-hidden rounded-3xl shadow-xl shadow-black/30 ring-1 ring-white/10">
      <div className="relative aspect-[4/3] w-full bg-[#e8eaed]">
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
          const position = latLngToPercent(
            location.lat,
            location.lng,
            center,
            zoom,
            width,
            height,
          );
          const offset =
            "calloutOffset" in location
              ? location.calloutOffset
              : { x: 0, y: 0 };

          if (location.kind === "primary") {
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
                  <span className="rounded bg-white/90 px-1 py-0.5 text-[8px] font-semibold text-slate-800 shadow-sm ring-1 ring-slate-200/60 sm:text-[9px]">
                    {location.label}
                  </span>
                  <span className="mt-0.5 h-2 w-2 rounded-full bg-[#ea4335] ring-1 ring-white shadow-sm" />
                </div>
              </div>
            );
          }

          return (
            <div
              key={location.id}
              className="pointer-events-none absolute z-[5] opacity-75"
              style={{
                left: `calc(${position.left}% + ${offset.x}px)`,
                top: `calc(${position.top}% + ${offset.y}px)`,
                transform: "translate(-50%, -100%)",
              }}
            >
              <span className="rounded bg-white/85 px-1 py-px text-[7px] font-medium text-slate-500 sm:text-[8px]">
                {location.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
