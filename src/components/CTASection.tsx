import { site, telHref, smsHref } from "@/lib/site";

export function CTASection({
  title,
  text,
}: {
  title: string;
  text: string;
}) {
  return (
    <section className="relative overflow-hidden bg-ink border-t border-white/10">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(37,99,235,0.12),transparent_60%)]" />
      <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-16 text-center">
        <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
          {title}
        </h2>
        <p className="mt-4 text-lg text-blue-100/90 max-w-2xl mx-auto">{text}</p>
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
          <a
            href={telHref}
            className="inline-flex items-center gap-2 rounded-full bg-brand px-7 py-3.5 text-base font-semibold text-white shadow-lg shadow-brand/30 hover:bg-brand-light transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-light focus-visible:ring-offset-2 focus-visible:ring-offset-ink"
          >
            Call {site.phoneDisplay}
          </a>
          <a
            href={smsHref}
            className="inline-flex items-center gap-2 rounded-full border border-white/30 px-7 py-3.5 text-base font-semibold text-white hover:bg-white/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:ring-offset-2 focus-visible:ring-offset-ink"
          >
            Text Us Now
          </a>
        </div>
      </div>
    </section>
  );
}
