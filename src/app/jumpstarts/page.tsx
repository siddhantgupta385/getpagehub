import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { SplitFeature, BenefitGrid, ServiceAreaStrip } from "@/components/Sections";
import { CTASection } from "@/components/CTASection";

export const metadata: Metadata = {
  title: "Jumpstart Service in Murfreesboro, TN",
  description:
    "Dead battery in Murfreesboro, TN? TreadForcePros LLC offers fast jumpstart assistance for no-start vehicles at parking lots, driveways, workplaces, and roadside locations.",
  alternates: { canonical: "/jumpstarts" },
};

export default function JumpstartsPage() {
  return (
    <>
      <PageHero
        title="Jumpstart Service in Murfreesboro, TN"
        subtitle="Dead battery? TreadForcePros LLC offers fast jumpstart assistance to help get your vehicle started again."
        image="/photos/jumpstart.png"
        imageAlt="Jumpstart service in Murfreesboro, TN"
      />

      <SplitFeature
        eyebrow="Service Details"
        heading="Fast Jumpstart Assistance"
        intro="When your battery dies, we come to you and get your vehicle powered up so you can get on with your day."
        image="/photos/mobile-tire-service-family-car-roadside-battery-jumpstart-murfreesboro-tn.jpg"
        imageAlt="Roadside battery jumpstart for a family car in Murfreesboro, TN"
        items={[
          "Dead battery jumpstarts",
          "No-start vehicle situations",
          "Parking lot, driveway, workplace, and roadside battery assistance",
        ]}
      />

      <BenefitGrid
        eyebrow="Why It Matters"
        heading="Why Professional Jumpstart Help Matters"
        items={[
          { title: "Safe Connection", text: "Proper, safe battery connection to protect you and your vehicle." },
          { title: "Fast Response", text: "Quick arrival so you're not stuck waiting around." },
          { title: "No Favors Needed", text: "Avoid waiting on friends or strangers for a jump." },
          { title: "Convenient Support", text: "Roadside, driveway, or parking lot — we come to you." },
        ]}
      />

      <ServiceAreaStrip />

      <CTASection
        title="Need a jumpstart in Murfreesboro, TN?"
        text="Contact TreadForcePros LLC today for fast jumpstart assistance wherever you are."
      />
    </>
  );
}
