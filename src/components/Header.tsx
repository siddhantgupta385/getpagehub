"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { site, telHref, smsHref } from "@/lib/site";

const nav = [
  { href: "/", label: "Home" },
  { href: "/mobile-tire-service", label: "Mobile Tire Service" },
  { href: "/emergency-roadside-assistance", label: "Roadside Assistance" },
  { href: "/jumpstarts", label: "Jumpstarts" },
];

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-ink/95 backdrop-blur border-b border-white/10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-36 items-center justify-between gap-4">
          <Link
            href="/"
            className="flex items-center shrink-0"
            onClick={() => setOpen(false)}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/photos/logo.svg"
              alt="TreadForcePros LLC logo"
              className="h-32 w-auto object-contain"
            />
          </Link>

          <nav className="hidden lg:flex items-center gap-1">
            {nav.map((item) => {
              const active =
                item.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    active
                      ? "text-white bg-white/10"
                      : "text-slate-300 hover:text-white hover:bg-white/5"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-2.5">
            <a
              href={telHref}
              aria-label={`Call ${site.shortName} at ${site.phoneDisplay}`}
              title={`Call ${site.phoneDisplay}`}
              className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-brand text-white shadow-sm shadow-brand/30 ring-1 ring-white/10 transition-colors hover:bg-brand-light"
            >
              <PhoneIcon className="h-5 w-5" />
            </a>
            <a
              href={smsHref}
              aria-label={`Text the ${site.shortName} team`}
              title="Text our team"
              className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-brand text-white shadow-sm shadow-brand/30 ring-1 ring-white/10 transition-colors hover:bg-brand-light"
            >
              <MessageIcon className="h-5 w-5" />
            </a>
            <button
              type="button"
              aria-label="Toggle menu"
              onClick={() => setOpen((v) => !v)}
              className="lg:hidden inline-flex items-center justify-center rounded-md p-2 text-slate-200 hover:bg-white/10"
            >
              {open ? <CloseIcon className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {open && (
        <nav className="lg:hidden border-t border-white/10 bg-ink px-4 pb-4 pt-2">
          {nav.map((item) => {
            const active =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={`block rounded-md px-3 py-3 text-base font-medium ${
                  active ? "text-white bg-white/10" : "text-slate-300 hover:bg-white/5"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
          <div className="mt-2 grid grid-cols-2 gap-2">
            <a
              href={telHref}
              className="flex items-center justify-center gap-2 rounded-xl bg-brand px-4 py-3 text-base font-semibold text-white hover:bg-brand-light transition-colors"
            >
              <PhoneIcon className="h-5 w-5" />
              Call
            </a>
            <a
              href={smsHref}
              className="flex items-center justify-center gap-2 rounded-xl bg-white/10 px-4 py-3 text-base font-semibold text-white hover:bg-white/15 transition-colors"
            >
              <MessageIcon className="h-5 w-5" />
              Text Team
            </a>
          </div>
        </nav>
      )}
    </header>
  );
}

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

function MessageIcon({ className }: { className?: string }) {
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
      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5Z" />
      <path d="M8.5 11.5h.01M12 11.5h.01M15.5 11.5h.01" />
    </svg>
  );
}

function MenuIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path strokeLinecap="round" d="M4 6h16M4 12h16M4 18h16" />
    </svg>
  );
}

function CloseIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path strokeLinecap="round" d="M6 6l12 12M18 6L6 18" />
    </svg>
  );
}
