import Image from "next/image";
import { gallery, site } from "@/lib/site";

export function Gallery() {
  return (
    <section className="bg-surface" id="gallery">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center max-w-2xl mx-auto">
          <p className="text-sm font-semibold uppercase tracking-widest text-brand">
            Our Work
          </p>
          <h2 className="mt-2 text-3xl sm:text-4xl font-bold tracking-tight text-white">
            Mobile Tire Service in Action
          </h2>
          <p className="mt-4 text-lg text-slate-300">
            A look at {site.shortName} on the job across Murfreesboro and
            Rutherford County.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-3">
          {gallery.map((img) => (
            <div
              key={img.src}
              className="group relative aspect-[4/3] overflow-hidden rounded-2xl ring-1 ring-white/10"
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/50 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
