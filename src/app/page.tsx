import type { ReactNode } from "react";
import Link from "next/link";
import Image from "next/image";
import { CTASection } from "@/components/CTASection";
import { Reviews } from "@/components/Reviews";
import { FAQ } from "@/components/FAQ";
import { Gallery } from "@/components/Gallery";
import { Stars } from "@/components/Stars";
import {
  site,
  services,
  serviceAreas,
  googleRating,
  telHref,
  smsHref,
} from "@/lib/site";

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-ink">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
          <div className="relative isolate overflow-hidden rounded-3xl border border-white/10 bg-brand-dark shadow-2xl shadow-black/50">
            {/* Seamless background: faded photo + gradients that blend into the dark base */}
            <Image
              src="/photos/mobile-tire-service-lamborghini-tire-replacement-img-murfreesboro-tn.jpg"
              alt=""
              aria-hidden
              fill
              priority
              className="object-cover object-center opacity-40"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/90 to-ink/40" />
            <div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-ink/50" />
            <div className="pointer-events-none absolute right-0 top-1/2 hidden h-[680px] w-[680px] -translate-y-1/2 translate-x-1/4 rounded-full bg-brand/25 blur-3xl lg:block" />

            <div className="relative px-6 py-16 sm:px-10 sm:py-20 lg:px-14">
              <div className="grid items-center gap-12 lg:grid-cols-2">
                {/* Left: headline + CTAs */}
                <div className="max-w-2xl animate-fade-up">
                  <span className="inline-flex items-center gap-2 rounded-full bg-brand/20 px-4 py-1.5 text-sm font-medium text-blue-200 ring-1 ring-inset ring-brand/40">
                    <span className="h-2 w-2 rounded-full bg-green-400 animate-pulse" />
                    Available {site.hours}
                  </span>
                  <h1 className="mt-6 text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.05]">
                    Mobile Tire Service &amp; Roadside Help in{" "}
                    <span className="bg-gradient-to-r from-brand-light to-blue-300 bg-clip-text text-transparent">
                      Murfreesboro, TN
                    </span>
                  </h1>
                  <p className="mt-6 text-lg text-slate-300 leading-relaxed max-w-xl">
                    <span className="font-semibold text-white">{site.name}</span>{" "}
                    provides reliable mobile tire service, emergency roadside
                    assistance, and jumpstart services when you need help fast.
                  </p>
                  <div className="mt-9 flex flex-col sm:flex-row sm:items-center gap-4">
                    <a
                      href={telHref}
                      className="inline-flex items-center justify-center gap-2 rounded-full bg-brand px-7 py-3.5 text-base font-semibold text-white shadow-lg shadow-brand/30 hover:bg-brand-light transition-colors"
                    >
                      <PhoneIcon className="h-5 w-5" />
                      Call {site.phoneDisplay}
                    </a>
                    <a
                      href={smsHref}
                      className="inline-flex items-center justify-center gap-2 rounded-full border border-white/30 px-7 py-3.5 text-base font-semibold text-white hover:bg-white/10 transition-colors"
                    >
                      Text Our Team
                    </a>
                    <a
                      href={site.google.profile}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2.5 rounded-full bg-white/5 px-4 py-2.5 ring-1 ring-inset ring-white/10 transition-colors hover:bg-white/10"
                    >
                      <Stars rating={googleRating.rating} />
                      <span className="text-sm font-semibold text-white">
                        Google Rating
                      </span>
                    </a>
                  </div>
                </div>

                {/* Right: interactive vehicle quick-select card */}
                <div className="animate-fade-up rounded-2xl border border-white/10 bg-card/80 p-6 shadow-2xl shadow-black/40 backdrop-blur-sm sm:p-8">
              <h2 className="text-xl font-bold text-white">
                What&apos;s happening with your vehicle?
              </h2>
              <p className="mt-1.5 text-sm text-slate-400">
                Pick what you need and we&apos;ll get you the right help fast.
              </p>
              <div className="mt-6 space-y-3">
                {services.map((s) => (
                  <Link
                    key={s.slug}
                    href={`/${s.slug}`}
                    className="group flex items-center gap-4 rounded-xl border border-white/10 bg-white/[0.03] p-4 transition-all hover:border-brand/50 hover:bg-white/[0.06]"
                  >
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-brand/15 text-brand-light ring-1 ring-inset ring-brand/30">
                      {heroIcons[s.slug]}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block font-semibold text-white">
                        {s.title}
                      </span>
                      <span className="block truncate text-sm text-slate-400">
                        {s.short}
                      </span>
                    </span>
                    <ChevronIcon className="h-5 w-5 shrink-0 text-slate-500 transition-transform group-hover:translate-x-1 group-hover:text-brand-light" />
                  </Link>
                ))}
                <a
                  href={telHref}
                  className="group flex items-center gap-4 rounded-xl border border-white/10 bg-white/[0.03] p-4 transition-all hover:border-brand/50 hover:bg-white/[0.06]"
                >
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-brand/15 text-brand-light ring-1 ring-inset ring-brand/30">
                    <PhoneIcon className="h-5 w-5" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block font-semibold text-white">
                      Something else
                    </span>
                    <span className="block truncate text-sm text-slate-400">
                      Call us and we&apos;ll help
                    </span>
                  </span>
                  <ChevronIcon className="h-5 w-5 shrink-0 text-slate-500 transition-transform group-hover:translate-x-1 group-hover:text-brand-light" />
                </a>
              </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Process steps */}
      <section className="border-b border-white/10 bg-ink-soft">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14 sm:py-16">
          <h2 className="text-center text-2xl sm:text-3xl font-bold tracking-tight text-white">
            From the first call to{" "}
            <span className="bg-gradient-to-r from-brand-light to-blue-300 bg-clip-text text-transparent">
              getting you back on the road.
            </span>
          </h2>
          <ol className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((step, i) => (
              <li
                key={step.title}
                className="relative rounded-2xl border border-white/10 bg-card p-6"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-brand text-white font-bold">
                  {i + 1}
                </span>
                <h3 className="mt-4 font-semibold text-white">{step.title}</h3>
                <p className="mt-1.5 text-sm text-slate-400 leading-relaxed">
                  {step.text}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Services Overview */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center max-w-2xl mx-auto">
          <p className="text-sm font-semibold uppercase tracking-widest text-brand">
            Our Services
          </p>
          <h2 className="mt-2 text-3xl sm:text-4xl font-bold tracking-tight text-white">
            Fast, Professional Help Where You Need It
          </h2>
          <p className="mt-4 text-lg text-slate-300">
            We bring the shop to you. Choose the service you need and we&apos;ll
            come to your location.
          </p>
        </div>

        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {services.map((s) => (
            <Link
              key={s.slug}
              href={`/${s.slug}`}
              className="group flex flex-col overflow-hidden rounded-2xl bg-card shadow-sm ring-1 ring-white/10 transition-all hover:ring-brand/50 hover:-translate-y-1"
            >
              <div className="relative h-52 overflow-hidden">
                <Image
                  src={s.image}
                  alt={s.title}
                  fill
                  className={`object-cover ${s.imagePosition ?? "object-center"} transition-transform duration-500 group-hover:scale-105`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/60 to-transparent" />
              </div>
              <div className="flex flex-1 flex-col p-6">
                <h3 className="text-xl font-bold text-white">{s.title}</h3>
                <p className="mt-2 flex-1 text-slate-300 leading-relaxed">
                  {s.blurb}
                </p>
                <span className="mt-4 inline-flex items-center gap-1 font-semibold text-brand-light">
                  Learn more
                  <svg className="h-4 w-4 transition-transform group-hover:translate-x-1" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 0 1 0-1.414L10.586 10 7.293 6.707a1 1 0 0 1 1.414-1.414l4 4a1 1 0 0 1 0 1.414l-4 4a1 1 0 0 1-1.414 0Z" clipRule="evenodd" />
                  </svg>
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="bg-surface py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div className="relative h-80 sm:h-96 overflow-hidden rounded-3xl shadow-lg">
              <Image
                src="/photos/mobile-tire-service-mobile-tire-changer-trailer-img-murfreesboro-tn.jpg"
                alt="TreadForcePros technician changing a tire"
                fill
                className="object-cover"
              />
            </div>
            <div>
              <p className="text-sm font-semibold uppercase tracking-widest text-brand">
                Why Choose {site.shortName}
              </p>
              <p className="mt-4 text-lg text-slate-300">
                We focus on dependable, fast, and convenient mobile tire and
                roadside services tailored to your needs.
              </p>
              <ul className="mt-8 grid gap-5 sm:grid-cols-2">
                {whyChoose.map((w) => (
                  <li key={w.title} className="flex gap-3">
                    <span className="mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-brand text-white">
                      {w.icon}
                    </span>
                    <div>
                      <h3 className="font-semibold text-white">{w.title}</h3>
                      <p className="mt-1 text-sm text-slate-300">{w.text}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Service Area */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-brand">
              Service Area
            </p>
            <h2 className="mt-2 text-3xl sm:text-4xl font-bold tracking-tight text-white">
              Proudly Serving Murfreesboro &amp; Surrounding Communities
            </h2>
            <p className="mt-4 text-lg text-slate-300">
              Based in {site.primaryCity}, we travel across Rutherford County and
              nearby areas to bring tire and roadside help to you.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              {serviceAreas.map((area) => (
                <span
                  key={area}
                  className="inline-flex items-center gap-2 rounded-full bg-white/5 px-5 py-2.5 text-sm font-medium text-white ring-1 ring-white/10"
                >
                  <svg className="h-4 w-4 text-brand-light" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M10 2a6 6 0 0 0-6 6c0 4.5 6 10 6 10s6-5.5 6-10a6 6 0 0 0-6-6Zm0 8a2 2 0 1 1 0-4 2 2 0 0 1 0 4Z" clipRule="evenodd" />
                  </svg>
                  {area}
                </span>
              ))}
            </div>
          </div>

          <div className="overflow-hidden rounded-3xl border border-white/10 shadow-2xl shadow-black/40">
            <iframe
              title="TreadForcePros LLC service area map — Murfreesboro, TN and surrounding counties"
              src="https://www.google.com/maps?q=Murfreesboro,+Tennessee&z=9&output=embed"
              width="100%"
              height="420"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="block h-[340px] w-full sm:h-[420px] grayscale-[0.2]"
              style={{ border: 0 }}
              allowFullScreen
            />
          </div>
        </div>
      </section>

      <Gallery />

      <Reviews />

      <FAQ />

      <CTASection />
    </>
  );
}

const steps = [
  {
    title: "You call",
    text: "Tell us your location and what's going on with your vehicle.",
  },
  {
    title: "We assess",
    text: "We confirm the issue and dispatch the right help to you.",
  },
  {
    title: "We come to you",
    text: "Our technician arrives on-site with the tools and parts needed.",
  },
  {
    title: "Back on the road",
    text: "We complete the service so you can get moving again fast.",
  },
];

function PhoneIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.18 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92Z" />
    </svg>
  );
}

function ChevronIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 20 20"
      fill="currentColor"
      aria-hidden="true"
    >
      <path
        fillRule="evenodd"
        d="M7.293 14.707a1 1 0 0 1 0-1.414L10.586 10 7.293 6.707a1 1 0 0 1 1.414-1.414l4 4a1 1 0 0 1 0 1.414l-4 4a1 1 0 0 1-1.414 0Z"
        clipRule="evenodd"
      />
    </svg>
  );
}

const heroIcons: Record<string, ReactNode> = {
  "mobile-tire-service": (
    <svg
      className="h-5 w-5"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="3" />
      <path strokeLinecap="round" d="M12 3v3M12 18v3M3 12h3M18 12h3" />
    </svg>
  ),
  "emergency-roadside-assistance": (
    <svg
      className="h-5 w-5"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0Z" />
      <path d="M12 9v4M12 17h.01" />
    </svg>
  ),
  jumpstarts: (
    <svg
      className="h-5 w-5"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M13 2 4.5 13.5H11l-1 8.5 8.5-11.5H12l1-8.5Z" />
    </svg>
  ),
};

const whyChoose = [
  {
    title: "Fast Response Times",
    text: "We respond quickly so you're not left waiting on the side of the road.",
    icon: (
      <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
        <path d="M11 2a1 1 0 0 0-2 0v1.06A7 7 0 1 0 17 11a1 1 0 1 0-2 0 5 5 0 1 1-5-5h.5l-1.2 1.2a1 1 0 0 0 1.4 1.42l3-3a1 1 0 0 0 0-1.42l-3-3A1 1 0 1 0 9.3 3.6L10.5 4.8H11V2Z" />
      </svg>
    ),
  },
  {
    title: "Mobile Convenience",
    text: "We bring tire service directly to your location, no towing or waiting at a shop.",
    icon: (
      <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
        <path d="M3 5a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v1h1.6a2 2 0 0 1 1.7.94l1.4 2.3a2 2 0 0 1 .3 1.06V14a1 1 0 0 1-1 1h-1a2.5 2.5 0 0 1-5 0H8a2.5 2.5 0 0 1-5 0H3a1 1 0 0 1-1-1V5Zm2.5 11a1 1 0 1 0 0-2 1 1 0 0 0 0 2Zm10 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z" />
      </svg>
    ),
  },
  {
    title: "Skilled Technicians",
    text: "Experienced techs handle a wide range of tire and roadside services with care.",
    icon: (
      <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
        <path fillRule="evenodd" d="M16.7 5.3a1 1 0 0 1 0 1.4l-7.5 7.5a1 1 0 0 1-1.4 0L3.3 9.7a1 1 0 1 1 1.4-1.4l3.8 3.79 6.8-6.8a1 1 0 0 1 1.4 0Z" clipRule="evenodd" />
      </svg>
    ),
  },
  {
    title: "Local Service",
    text: "Locally based in Murfreesboro and serving nearby Rutherford County areas.",
    icon: (
      <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
        <path fillRule="evenodd" d="M10 2a6 6 0 0 0-6 6c0 4.5 6 10 6 10s6-5.5 6-10a6 6 0 0 0-6-6Zm0 8a2 2 0 1 1 0-4 2 2 0 0 1 0 4Z" clipRule="evenodd" />
      </svg>
    ),
  },
];
