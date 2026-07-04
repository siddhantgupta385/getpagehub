import { site } from "@/lib/site";

export function GoogleMapEmbed({ className = "" }: { className?: string }) {
  return (
    <div className={className}>
      <div className="overflow-hidden rounded-3xl border border-white/10 shadow-2xl shadow-black/40">
        <iframe
          title="TreadForcePros LLC service area map — Murfreesboro, TN and surrounding counties"
          src={site.google.mapEmbedUrl}
          width="100%"
          height="420"
          loading="lazy"
          referrerPolicy="origin-when-cross-origin"
          className="block h-[340px] w-full sm:h-[420px] border-0 grayscale-[0.2]"
          allowFullScreen
        />
      </div>
      <p className="mt-3 text-center text-sm text-slate-400">
        <a
          href={site.google.profile}
          target="_blank"
          rel="noopener noreferrer"
          className="text-brand-light hover:text-white transition-colors"
        >
          Open in Google Maps
        </a>
      </p>
    </div>
  );
}
