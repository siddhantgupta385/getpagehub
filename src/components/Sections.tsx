import Image from "next/image";
import { serviceAreas, site } from "@/lib/site";

function Check({ className = "mt-0.5 h-5 w-5 shrink-0 text-brand" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
      <path fillRule="evenodd" d="M16.7 5.3a1 1 0 0 1 0 1.4l-7.5 7.5a1 1 0 0 1-1.4 0L3.3 9.7a1 1 0 1 1 1.4-1.4l3.8 3.79 6.8-6.8a1 1 0 0 1 1.4 0Z" clipRule="evenodd" />
    </svg>
  );
}

export function SplitFeature({
  eyebrow,
  heading,
  intro,
  items,
  image,
  imageAlt,
  reverse = false,
}: {
  eyebrow: string;
  heading: string;
  intro: string;
  items: string[];
  image: string;
  imageAlt: string;
  reverse?: boolean;
}) {
  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
      <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
        <div className={reverse ? "lg:order-2" : ""}>
          <p className="text-sm font-semibold uppercase tracking-widest text-brand-light">
            {eyebrow}
          </p>
          <h2 className="mt-2 text-3xl sm:text-4xl font-bold tracking-tight text-white">
            {heading}
          </h2>
          <p className="mt-4 text-lg text-slate-300 leading-relaxed">{intro}</p>
          <ul className="mt-7 space-y-3">
            {items.map((item) => (
              <li key={item} className="flex gap-3 text-slate-200">
                <Check />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
        <div
          className={`relative h-80 sm:h-96 overflow-hidden rounded-3xl shadow-lg ring-1 ring-white/10 ${
            reverse ? "lg:order-1" : ""
          }`}
        >
          <Image
            src={image}
            alt={imageAlt}
            fill
            className="object-cover"
          />
        </div>
      </div>
    </section>
  );
}

export function BenefitGrid({
  eyebrow,
  heading,
  items,
}: {
  eyebrow: string;
  heading: string;
  items: { title: string; text: string }[];
}) {
  return (
    <section className="bg-surface py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto">
          <p className="text-sm font-semibold uppercase tracking-widest text-brand-light">
            {eyebrow}
          </p>
          <h2 className="mt-2 text-3xl sm:text-4xl font-bold tracking-tight text-white">
            {heading}
          </h2>
        </div>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item) => (
            <div
              key={item.title}
              className="rounded-2xl bg-card p-6 shadow-sm ring-1 ring-white/10"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand text-white">
                <Check className="h-6 w-6 text-white" />
              </div>
              <h3 className="mt-4 font-semibold text-white">{item.title}</h3>
              <p className="mt-2 text-sm text-slate-300 leading-relaxed">
                {item.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ServiceAreaStrip() {
  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
      <div className="rounded-3xl bg-ink px-6 py-12 sm:px-12 text-center">
        <h2 className="text-2xl sm:text-3xl font-bold text-white">
          Serving {site.primaryCity} &amp; Rutherford County
        </h2>
        <div className="mt-7 flex flex-wrap justify-center gap-2.5">
          {serviceAreas.map((area) => (
            <span
              key={area}
              className="rounded-full bg-white/10 px-4 py-2 text-sm font-medium text-white ring-1 ring-inset ring-white/15"
            >
              {area}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
