import { serviceAreaHeading } from "@/lib/site";
import { GoogleMapEmbed } from "./GoogleMapEmbed";
import { ServiceAreaPills } from "./ServiceAreaPills";

export function ServiceAreaSection() {
  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
      <div className="text-center max-w-3xl mx-auto">
        <p className="text-sm font-semibold uppercase tracking-widest text-brand-light">
          Service Area
        </p>
        <h2 className="mt-2 text-3xl sm:text-4xl font-bold tracking-tight text-white">
          {serviceAreaHeading}
        </h2>
      </div>

      <div className="mt-8 rounded-3xl bg-ink px-6 py-10 sm:px-12">
        <ServiceAreaPills centered />
      </div>

      <div className="mt-8">
        <GoogleMapEmbed />
      </div>
    </section>
  );
}
