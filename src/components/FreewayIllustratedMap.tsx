import Image from "next/image";
import { serviceCoverageMap } from "@/lib/site";
import { latLngToPercent } from "@/lib/map-projection";
import { getServiceMapSource } from "@/lib/static-map";

function MapCallout({
  left,
  top,
  label,
  primary = false,
}: {
  left: number;
  top: number;
  label: string;
  primary?: boolean;
}) {
  return (
    <div
      className="pointer-events-none absolute z-10 -translate-x-1/2"
      style={{ left: `${left}%`, top: `${top}%` }}
    >
      <div className="flex -translate-y-full flex-col items-center">
        <div
          className={`max-w-[9.5rem] rounded-lg bg-white px-2.5 py-1.5 text-center leading-tight text-slate-800 shadow-lg ring-1 ring-slate-200/90 sm:max-w-none sm:whitespace-nowrap sm:px-3 ${
            primary
              ? "text-[11px] font-bold sm:text-xs"
              : "text-[10px] font-semibold sm:text-[11px]"
          }`}
        >
          {label}
        </div>
        <div
          aria-hidden="true"
          className="h-0 w-0 border-x-[5px] border-t-[6px] border-x-transparent border-t-white drop-shadow-sm"
        />
        <div
          className={`rounded-full shadow ring-2 ring-white ${
            primary ? "h-3 w-3 bg-[#ea4335]" : "h-2.5 w-2.5 bg-brand"
          }`}
        />
      </div>
    </div>
  );
}

export function FreewayIllustratedMap() {
  const { center, zoom, width, height, locations } = serviceCoverageMap;
  const map = getServiceMapSource({ center, zoom, width, height });

  return (
    <div
      className="animate-fade-up w-full overflow-hidden rounded-3xl shadow-xl shadow-black/30 ring-1 ring-white/10"
      role="img"
      aria-label="Google Maps view of Murfreesboro, Tennessee service coverage near interstates I-24, I-840, and I-65 with response time callouts"
    >
      <div className="relative aspect-[4/3] w-full bg-[#e8eaed]">
        {map.mode === "google-embed" ? (
          <iframe
            src={map.url}
            title="Google Maps — Murfreesboro, TN and nearby interstates"
            className="pointer-events-none absolute inset-0 h-full w-full origin-center scale-[1.03] border-0"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            tabIndex={-1}
          />
        ) : (
          <Image
            src={map.url}
            alt="Map centered on Murfreesboro, TN showing nearby interstates I-24, I-840, and I-65"
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 600px"
            className="object-cover"
          />
        )}

        {locations.map((location) => {
          const position = latLngToPercent(
            location.lat,
            location.lng,
            center,
            zoom,
            width,
            height,
          );

          return (
            <MapCallout
              key={location.id}
              left={position.left}
              top={position.top}
              label={location.label}
              primary={location.kind === "primary"}
            />
          );
        })}
      </div>
    </div>
  );
}
