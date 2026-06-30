import Link from "next/link";
import Image from "next/image";
import { CTASection } from "@/components/CTASection";
import { Reviews } from "@/components/Reviews";
import {
  site,
  services,
  serviceAreas,
  telHref,
  smsHref,
} from "@/lib/site";

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative isolate overflow-hidden bg-ink">
        {/* Seamless background: faded photo + gradients that blend into the dark base */}
        <Image
          src="/photos/hero.jpg"
          alt=""
          aria-hidden
          fill
          priority
          className="object-cover object-center opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/80 to-ink/25" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-ink/50" />
        {/* Brand glow behind the technician for a seamless blend */}
        <div className="pointer-events-none absolute right-0 top-1/2 hidden h-[680px] w-[680px] -translate-y-1/2 translate-x-1/4 rounded-full bg-brand/25 blur-3xl lg:block" />

        {/* Technician cutout, anchored to the bottom edge */}
        <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-[44%] xl:w-[42%] lg:block">
          <Image
            src="/photos/technician.webp"
            alt="TreadForcePros tire technician"
            fill
            priority
            sizes="(min-width: 1024px) 42vw, 0px"
            className="object-contain object-bottom drop-shadow-[0_10px_40px_rgba(0,0,0,0.5)]"
          />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24 sm:py-36">
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
            <div className="mt-9 flex flex-col sm:flex-row gap-3">
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
                Text Our Team
              </a>
            </div>
          </div>
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
        <div className="text-center max-w-2xl mx-auto">
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
        </div>
        <div className="mt-10 flex flex-wrap justify-center gap-3">
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
      </section>

      <Reviews />

      <CTASection />
    </>
  );
}

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
