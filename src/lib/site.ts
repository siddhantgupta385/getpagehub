export const site = {
  name: "TreadForcePros LLC",
  shortName: "TreadForcePros",
  tagline: "Mobile Tire Service You Can Trust",
  phoneDisplay: "(615) 691-3823",
  phoneRaw: "6156913823",
  email: "treadforcepros@gmail.com",
  hours: "24/7",
  state: "Tennessee",
  primaryCity: "Murfreesboro, TN",
  url: "https://thetreadforcepros.com",
  social: {
    facebook: "https://www.facebook.com/TreadForcePros/",
    instagram: "https://www.instagram.com/treadforcepros/",
  },
  google: {
    profile: "https://maps.app.goo.gl/mXnRLSHkDddEi8H4A",
    placeId: "ChIJmxoyQ60TLEURb5_zHBmE8lc",
    writeReview:
      "https://search.google.com/local/writereview?placeid=ChIJmxoyQ60TLEURb5_zHBmE8lc",
  },
} as const;

export const serviceAreas = [
  "Murfreesboro, TN",
  "Franklin, TN",
  "Lebanon, TN",
  "Mt Juliet, TN",
  "Smyrna, TN",
  "Lavergne, TN",
  "Brentwood, TN",
  "Rutherford County, TN",
] as const;

export type ServiceSlug =
  | "mobile-tire-service"
  | "emergency-roadside-assistance"
  | "jumpstarts";

export const services: {
  slug: ServiceSlug;
  title: string;
  short: string;
  blurb: string;
  image: string;
  imagePosition?: string;
}[] = [
  {
    slug: "mobile-tire-service",
    title: "Mobile Tire Service",
    short: "On-site tire help",
    blurb:
      "Flat tire assistance, tire changes, and tire replacement support brought directly to your location.",
    image: "/photos/IMG_3043.jpg",
    imagePosition: "object-[60%_68%]",
  },
  {
    slug: "emergency-roadside-assistance",
    title: "Emergency Roadside Assistance",
    short: "Responsive roadside help",
    blurb:
      "Stuck on the road? We deliver fast, dependable roadside assistance to get you moving forward.",
    image: "/photos/emergency-roadside-assistance-img-murfreesboro-tn.jpg",
  },
  {
    slug: "jumpstarts",
    title: "Jumpstarts",
    short: "Dead battery? We come to you",
    blurb:
      "Fast jumpstart assistance for dead batteries and no-start situations, wherever you are.",
    image: "/photos/jumpstart.png",
  },
];

export const gallery = [
  "/photos/IMG_2348.jpg",
  "/photos/IMG_2737.jpg",
  "/photos/IMG_2767.jpg",
  "/photos/IMG_2779.jpg",
  "/photos/IMG_2802.jpg",
  "/photos/IMG_3045.jpg",
  "/photos/IMG_3047.jpg",
  "/photos/IMG_3069.jpg",
];

export const telHref = `tel:+1${site.phoneRaw}`;
export const smsHref = `sms:+1${site.phoneRaw}`;
export const mailHref = `mailto:${site.email}`;
