"use client";

import { useId, useState } from "react";
import type { FaqItem } from "@/lib/site";

export function FAQ({
  items,
  description,
  sectionId = "faq",
  eyebrowClassName = "text-brand",
}: {
  items: FaqItem[];
  description: string;
  sectionId?: string;
  eyebrowClassName?: string;
}) {
  const baseId = useId().replace(/:/g, "");
  const [open, setOpen] = useState<number>(0);

  return (
    <section className="bg-ink-soft border-y border-white/10" id={sectionId}>
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center max-w-2xl mx-auto">
          <p
            className={`text-sm font-semibold uppercase tracking-widest ${eyebrowClassName}`}
          >
            FAQ
          </p>
          <h2 className="mt-2 text-3xl sm:text-4xl font-bold tracking-tight text-white">
            Frequently Asked Questions
          </h2>
          <p className="mt-4 text-lg text-slate-300">{description}</p>
        </div>

        <div className="mt-10 space-y-3">
          {items.map((faq, i) => {
            const isOpen = open === i;
            const buttonId = `${baseId}-faq-button-${i}`;
            const panelId = `${baseId}-faq-panel-${i}`;

            return (
              <div
                key={faq.question}
                className={`overflow-hidden rounded-2xl border bg-card transition-colors ${
                  isOpen ? "border-brand/50" : "border-white/10"
                }`}
              >
                <h3 className="m-0">
                  <button
                    type="button"
                    id={buttonId}
                    onClick={() => setOpen(isOpen ? -1 : i)}
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-brand-light"
                  >
                    <span className="text-base sm:text-lg font-semibold text-white">
                      {faq.question}
                    </span>
                    <span
                      aria-hidden="true"
                      className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-all duration-300 ease-out ${
                        isOpen
                          ? "bg-brand text-white rotate-45"
                          : "bg-white/5 text-brand-light"
                      }`}
                    >
                      <PlusIcon className="h-4 w-4" />
                    </span>
                  </button>
                </h3>
                <div
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  aria-hidden={!isOpen}
                  className={`grid transition-all duration-300 ease-out ${
                    isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="px-5 pb-5 text-slate-300 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function PlusIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
      <path d="M10 3a1 1 0 0 1 1 1v5h5a1 1 0 1 1 0 2h-5v5a1 1 0 1 1-2 0v-5H4a1 1 0 1 1 0-2h5V4a1 1 0 0 1 1-1Z" />
    </svg>
  );
}
