import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { SplitFeature, BenefitGrid, ServiceAreaStrip } from "@/components/Sections";
import { CTASection } from "@/components/CTASection";

export const metadata: Metadata = {
  title: "Mobile Tire Service in Murfreesboro, TN",
  description:
    "TreadForcePros LLC brings mobile tire service directly to your location in Murfreesboro, TN — flat tire assistance, tire changes, and on-site tire help for cars and trucks.",
  alternates: { canonical: "/mobile-tire-service" },
};

export default function MobileTireServicePage() {
  return (
    <>
      <PageHero
        title="Mobile Tire Service in Murfreesboro, TN"
        subtitle="Tire trouble can happen anywhere. TreadForcePros LLC brings convenient tire service directly to your location."
        image="/photos/mobile-tire-service-truck-tire-service-blowout-repair-img-murfreesboro-tn.jpg"
        imageAlt="Mobile tire service in Murfreesboro, TN"
      />

      <SplitFeature
        eyebrow="Service Details"
        heading="On-Site Tire Help, Wherever You Are"
        intro="We come to you with the tools and expertise to get your tire issue handled without a trip to the shop."
        image="/photos/mobile-tire-service-car-truck-replacement-img-murfreesboro-tn.jpg"
        imageAlt="Technician performing a tire change in Murfreesboro, TN"
        items={[
          "Flat tire assistance",
          "Tire changes",
          "Tire replacement support",
          "On-site tire help",
          "Help for cars, trucks, and daily drivers",
        ]}
      />

      <BenefitGrid
        eyebrow="Benefits"
        heading="Why Choose Mobile Tire Service"
        items={[
          {
            title: "No Towing Needed",
            text: "In many situations we handle the job on-site, so there's no need to tow your vehicle.",
          },
          {
            title: "Saves You Time",
            text: "Skip the wait at a shop — we come to your home, work, or roadside location.",
          },
          {
            title: "Back On The Road Faster",
            text: "Quick, professional service helps get you moving again sooner.",
          },
          {
            title: "Convenient Anywhere",
            text: "Service that fits your day, whether you're at home, work, or stranded on the road.",
          },
        ]}
      />

      <ServiceAreaStrip />

      <CTASection
        title="Need mobile tire service in Murfreesboro, TN?"
        text="Call TreadForcePros LLC and we'll bring professional tire service directly to your location."
      />
    </>
  );
}
