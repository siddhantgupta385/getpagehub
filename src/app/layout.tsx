import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { site, services, serviceAreas } from "@/lib/site";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default:
      "Tire Service Murfreesboro, TN | Mobile Tire & Roadside | TreadForcePros LLC",
    template: "%s | TreadForcePros LLC",
  },
  description:
    "TreadForcePros LLC provides reliable mobile tire service, emergency roadside assistance, and jumpstart services in Murfreesboro, TN and surrounding Rutherford County areas. Fast 24/7 help.",
  keywords: [
    "tire service Murfreesboro TN",
    "mobile tire service",
    "emergency roadside assistance",
    "jumpstart service",
    "flat tire help Murfreesboro",
    "Rutherford County tire service",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    title: "Tire Service Murfreesboro, TN | Mobile Tire & Roadside",
    description:
      "Reliable mobile tire service, emergency roadside assistance, and jumpstarts across Murfreesboro and Rutherford County, TN.",
    url: site.url,
    siteName: site.name,
    images: [{ url: "/photos/og.png", width: 1200, height: 630 }],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Tire Service Murfreesboro, TN | TreadForcePros LLC",
    description:
      "Mobile tire service, emergency roadside assistance, and jumpstarts in Murfreesboro, TN. Fast 24/7 help.",
    images: ["/photos/og.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": ["AutoRepair", "LocalBusiness"],
    "@id": `${site.url}/#business`,
    name: site.name,
    description:
      "Mobile tire service, emergency roadside assistance, and jumpstart services in Murfreesboro, TN and surrounding Rutherford County areas.",
    image: `${site.url}/photos/og.png`,
    logo: `${site.url}/photos/treadforcepros-logo-alpha-img.png`,
    telephone: `+1${site.phoneRaw}`,
    email: site.email,
    url: site.url,
    areaServed: [...serviceAreas],
    address: {
      "@type": "PostalAddress",
      addressLocality: "Murfreesboro",
      addressRegion: "TN",
      addressCountry: "US",
    },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
      opens: "00:00",
      closes: "23:59",
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Tire & Roadside Services",
      itemListElement: services.map((s) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: s.title,
          description: s.blurb,
          url: `${site.url}/${s.slug}`,
        },
      })),
    },
    sameAs: [site.social.facebook, site.social.instagram, site.google.profile],
  };

  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
