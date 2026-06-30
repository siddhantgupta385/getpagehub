import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { site } from "@/lib/site";

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
    title: "Mobile Tire Service & Roadside Help in Murfreesboro, TN",
    description:
      "Reliable mobile tire service, emergency roadside assistance, and jumpstarts across Murfreesboro and Rutherford County.",
    url: site.url,
    siteName: site.name,
    images: [{ url: "/photos/og.png", width: 1200, height: 630 }],
    locale: "en_US",
    type: "website",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "AutoRepair",
    name: site.name,
    image: `${site.url}/photos/og.png`,
    telephone: site.phoneDisplay,
    email: site.email,
    url: site.url,
    areaServed: [
      "Murfreesboro, TN",
      "Franklin, TN",
      "Lebanon, TN",
      "Mt Juliet, TN",
      "Smyrna, TN",
      "Lavergne, TN",
      "Brentwood, TN",
      "Rutherford County, TN",
    ],
    address: {
      "@type": "PostalAddress",
      addressRegion: "TN",
      addressCountry: "US",
    },
    openingHours: "Mo-Su 00:00-23:59",
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
