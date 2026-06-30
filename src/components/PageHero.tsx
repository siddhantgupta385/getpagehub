import Image from "next/image";
import { site, telHref, smsHref } from "@/lib/site";

export function PageHero({
  title,
  subtitle,
  image,
  imageAlt,
}: {
  title: string;
  subtitle: string;
  image: string;
  imageAlt: string;
}) {
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
              {title}
            </h1>
            <p className="mt-5 text-lg text-slate-300 leading-relaxed max-w-xl">
              {subtitle}
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <a
                href={telHref}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-brand px-7 py-3.5 text-base font-semibold text-white shadow-lg shadow-brand/30 hover:bg-brand-light transition-colors"
              >
                Call {site.phoneDisplay}
              </a>
              <a
                href={smsHref}
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/30 px-7 py-3.5 text-base font-semibold text-white hover:bg-white/10 transition-colors"
              >
                Text Us Now
              </a>
            </div>
          </div>

          <div className="relative h-72 w-full overflow-hidden rounded-3xl ring-1 ring-white/10 shadow-2xl shadow-black/50 sm:h-96 lg:h-[clamp(20rem,60vh,32rem)]">
            <Image
              src={image}
              alt={imageAlt}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 600px"
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
