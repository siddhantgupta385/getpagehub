"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { gallery, site } from "@/lib/site";

export function Gallery() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);
  const [paused, setPaused] = useState(false);

  const updateArrows = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    const { scrollLeft, scrollWidth, clientWidth } = track;
    setCanPrev(scrollLeft > 4);
    setCanNext(scrollLeft < scrollWidth - clientWidth - 4);
  }, []);

  useEffect(() => {
    updateArrows();
    const track = trackRef.current;
    if (!track) return;
    track.addEventListener("scroll", updateArrows, { passive: true });
    window.addEventListener("resize", updateArrows);
    return () => {
      track.removeEventListener("scroll", updateArrows);
      window.removeEventListener("resize", updateArrows);
    };
  }, [updateArrows]);

  const step = useCallback(() => {
    const track = trackRef.current;
    if (!track) return 0;
    const card = track.children[0] as HTMLElement | undefined;
    return card ? card.offsetWidth + 20 : track.clientWidth * 0.8;
  }, []);

  const scrollByPage = useCallback(
    (dir: 1 | -1) => {
      const track = trackRef.current;
      if (!track) return;
      track.scrollBy({ left: dir * step(), behavior: "smooth" });
    },
    [step],
  );

  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => {
      const track = trackRef.current;
      if (!track) return;
      const atEnd =
        track.scrollLeft >= track.scrollWidth - track.clientWidth - 4;
      if (atEnd) {
        track.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        track.scrollBy({ left: step(), behavior: "smooth" });
      }
    }, 3500);
    return () => clearInterval(id);
  }, [paused, step]);

  return (
    <section className="bg-surface" id="gallery">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
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

          <div className="flex shrink-0 items-center gap-3">
            <button
              type="button"
              onClick={() => scrollByPage(-1)}
              disabled={!canPrev}
              aria-label="Previous photos"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-card text-white ring-1 ring-white/10 transition-all hover:bg-brand disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-card"
            >
              <ArrowIcon className="h-5 w-5 rotate-180" />
            </button>
            <button
              type="button"
              onClick={() => scrollByPage(1)}
              disabled={!canNext}
              aria-label="Next photos"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-card text-white ring-1 ring-white/10 transition-all hover:bg-brand disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-card"
            >
              <ArrowIcon className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div
          ref={trackRef}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocusCapture={() => setPaused(true)}
          onBlurCapture={() => setPaused(false)}
          onTouchStart={() => setPaused(true)}
          className="mt-10 flex snap-x snap-mandatory gap-5 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {gallery.map((img) => (
            <div
              key={img.src}
              className="group relative aspect-[4/3] shrink-0 basis-[82%] snap-start overflow-hidden rounded-2xl ring-1 ring-white/10 sm:basis-[calc(50%-10px)] lg:basis-[calc(33.333%-14px)]"
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                sizes="(max-width: 640px) 82vw, (max-width: 1024px) 50vw, 33vw"
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

function ArrowIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
      <path
        fillRule="evenodd"
        d="M7.293 14.707a1 1 0 0 1 0-1.414L10.586 10 7.293 6.707a1 1 0 0 1 1.414-1.414l4 4a1 1 0 0 1 0 1.414l-4 4a1 1 0 0 1-1.414 0Z"
        clipRule="evenodd"
      />
    </svg>
  );
}
