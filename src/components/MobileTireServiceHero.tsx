import { site, telHref, smsHref } from "@/lib/site";
import { FreewayIllustratedMap } from "./FreewayIllustratedMap";

export function MobileTireServiceHero() {
  return (
    <section className="relative flex items-center overflow-hidden bg-ink min-h-[calc(100svh-9rem)]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_25%,rgba(37,99,235,0.20),transparent_60%)]" />
      <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <div className="animate-fade-up">
            <span className="inline-flex items-center gap-2 rounded-full bg-brand/20 px-4 py-1.5 text-sm font-medium text-blue-200 ring-1 ring-inset ring-brand/40">
              <span className="h-2 w-2 rounded-full bg-green-400 animate-pulse" />
              {site.primaryCity} &middot; {site.hours}
            </span>
            <h1 className="mt-6 text-4xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
              Mobile Tire Service in Murfreesboro, TN
            </h1>
            <p className="mt-5 text-lg font-medium text-white leading-relaxed max-w-xl">
              Fast roadside tire help when and where you need it.
            </p>
            <p className="mt-4 text-lg text-slate-300 leading-relaxed max-w-xl">
              Flat tire? Need roadside tire service fast? TreadForcePros brings
              mobile tire help directly to you in Murfreesboro and nearby freeway
              routes, with quick response times to I-24, I-840, and I-65.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <a
                href={telHref}
                aria-label={`Call TreadForcePros now at ${site.phoneDisplay}`}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-brand px-7 py-3.5 text-base font-semibold text-white shadow-lg shadow-brand/30 hover:bg-brand-light transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-light focus-visible:ring-offset-2 focus-visible:ring-offset-ink"
              >
                Call Now
              </a>
              <a
                href={smsHref}
                aria-label="Request mobile tire service by text message"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/30 px-7 py-3.5 text-base font-semibold text-white hover:bg-white/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:ring-offset-2 focus-visible:ring-offset-ink"
              >
                Request Service
              </a>
            </div>
          </div>

          <FreewayIllustratedMap />
        </div>
      </div>
    </section>
  );
}
