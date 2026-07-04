import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { SplitFeature, BenefitGrid } from "@/components/Sections";
import { ServiceAreaSection } from "@/components/ServiceAreaSection";
import { FAQ } from "@/components/FAQ";
import { CTASection } from "@/components/CTASection";
import { servicePageFaqs } from "@/lib/site";

export const metadata: Metadata = {
  title: "Emergency Roadside Assistance in Murfreesboro, TN",
  description:
    "Stranded in Murfreesboro, TN? TreadForcePros LLC provides responsive emergency roadside assistance — flat tire help, tire changes, jumpstarts, and basic roadside support.",
  alternates: { canonical: "/emergency-roadside-assistance" },
};

export default function RoadsidePage() {
  return (
    <>
      <PageHero
        title="Emergency Roadside Assistance in Murfreesboro, TN"
        subtitle="When you are stuck on the road, TreadForcePros LLC provides responsive roadside assistance to help you move forward."
        image="/photos/mobile-tire-service-mobile-tire-changer-trailer-img-murfreesboro-tn.jpg"
        imageAlt="Emergency roadside assistance in Murfreesboro, TN"
      />

      <SplitFeature
        reverse
        eyebrow="Roadside Services"
        heading="Dependable Help When You're Stuck"
        intro="From flats to dead batteries, we deliver fast roadside support to get you safely back on your way."
        image="/photos/mobile-tire-service-replacement-img-murfreesboro-tn.jpg"
        imageAlt="Roadside tire assistance"
        items={[
          "Flat tire assistance",
          "Tire changes",
          "Jumpstarts",
          "Basic roadside support",
          "Help when stranded at home, work, parking lots, or roadside locations",
        ]}
      />

      <BenefitGrid
        eyebrow="When To Call"
        heading="Situations We Help With"
        items={[
          { title: "Flat Tire", text: "A flat that needs changing or repair support on the spot." },
          { title: "Dead Battery", text: "A battery with no charge that needs a jumpstart to get going." },
          { title: "Vehicle Won't Start", text: "No-start situations where you need a hand to get moving." },
          { title: "Stranded Roadside", text: "Stuck on the roadside or in a lot and need responsive help." },
        ]}
      />

      <ServiceAreaSection />

      <FAQ
        items={servicePageFaqs}
        description="Answers to common questions about emergency roadside assistance in Murfreesboro, TN."
        eyebrowClassName="text-brand-light"
      />

      <CTASection
        title="Stranded in Murfreesboro?"
        text="Call TreadForcePros LLC for fast, dependable emergency roadside assistance across Rutherford County."
      />
    </>
  );
}
