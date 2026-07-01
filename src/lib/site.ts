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
    image: "/photos/mobile-tire-service-replacement-img-murfreesboro-tn.jpg",
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

export const googleRating = {
  rating: 5.0,
  count: 71,
} as const;

export const reviews: {
  name: string;
  rating: number;
  date: string;
  text: string;
}[] = [
  {
    name: "Adriana Estrada",
    rating: 5,
    date: "2 months ago",
    text: "Just whenever I thought this flat was going to cause me to change my Sunday plans… I called TreadForcePros LLC and was up and running in no time. They came to my rescue quickly and amazed me with how fast they changed my tire.",
  },
  {
    name: "Mary Lavely",
    rating: 5,
    date: "2 months ago",
    text: "Fabian and Jayden were great. They were able to change all 4 of my very bad tires for my brand new tires in all of an hour tops. On top of that my car battery was dead when they got to me and they jumped my car for me.",
  },
  {
    name: "Kevin Reyes-Rios",
    rating: 5,
    date: "a month ago",
    text: "Fast, reliable, and professional service. He responded quickly, showed up fast, and got the tire on our CAT skid steer patched up with no issues. Great pricing for the convenience of on-site service.",
  },
  {
    name: "Woke Sin",
    rating: 5,
    date: "4 weeks ago",
    text: "Bro is a life saver absolute 5 stars! Came very handy, was fast service and good pricing. Best Roadside in Murfreesboro, TN! I would highly recommend you go to them in Murfreesboro!",
  },
  {
    name: "Backseatem",
    rating: 5,
    date: "a month ago",
    text: "Great guy this is my 3rd time using him everytime I come to Nashville and catch a blow out he comes to rescue with fast and great service 10/10.",
  },
  {
    name: "Tiarra Hall",
    rating: 5,
    date: "a month ago",
    text: "Hands down fastest service I've received, got me on the road in no time. Also very informative, overall I had a fantastic experience. Definitely recommend.",
  },
  {
    name: "Seth Mann",
    rating: 5,
    date: "a month ago",
    text: "TreadForcePros did an excellent job changing my tire. Jabo quickly arrived and was done with the work in no time. Very professional!",
  },
  {
    name: "Atticus Holman",
    rating: 5,
    date: "a month ago",
    text: "Great experience with this company! Service was professional and very reasonably priced, and they arrived quickly after I called. Highly recommend!",
  },
  {
    name: "Sara Clark",
    rating: 5,
    date: "a month ago",
    text: "Great service, fair prices, and friendly staff. They got me taken care of quickly and made the whole process easy. The team was professional and honest, and I'm really happy with the quality of the work. Definitely recommend!",
  },
  {
    name: "Caleb Waldie",
    rating: 5,
    date: "2 weeks ago",
    text: "These guys do awesome work. They helped me out in a pinch and I couldn't recommend them higher!!!!",
  },
];

export const faqs: { question: string; answer: string }[] = [
  {
    question: "How long would it take you to get to me?",
    answer:
      "TreadForcePros works to respond as quickly as possible for tire service and roadside assistance in the Murfreesboro, TN area. Estimated response times are typically around 20 minutes to I-840, 15 minutes to I-24, and 30 minutes to I-65, depending on traffic, your exact location, and current service calls. Call (615) 691-3823 for the most accurate arrival estimate.",
  },
  {
    question: "Do you offer mobile tire service in Murfreesboro, TN?",
    answer:
      "Yes. TreadForcePros provides mobile tire service for drivers in Murfreesboro and surrounding areas. Whether you are at home, work, or stuck roadside, our team can come to you for convenient tire assistance.",
  },
  {
    question: "Can you help with a flat tire on the side of the road?",
    answer:
      "Yes. If you have a flat tire, low tire pressure, or tire trouble while driving, TreadForcePros offers roadside tire assistance to help get you safely moving again.",
  },
  {
    question: "Do I need to have a spare tire available?",
    answer:
      "Having a spare tire available can help speed up the service, but you can call TreadForcePros to discuss your situation. We will let you know what options are available based on your vehicle and tire issue.",
  },
  {
    question: "What areas do you service?",
    answer:
      "TreadForcePros proudly serves Murfreesboro, TN and nearby communities with mobile tire service, emergency roadside assistance, and jumpstart services.",
  },
];

export const gallery: { src: string; alt: string }[] = [
  {
    src: "/photos/mobile-tire-service-mobile-tire-changer-trailer-img-murfreesboro-tn.jpg",
    alt: "TreadForcePros mobile tire changer trailer on a service call in Murfreesboro, TN",
  },
  {
    src: "/photos/mobile-tire-service-truck-tire-service-blowout-repair-img-murfreesboro-tn.jpg",
    alt: "Truck tire blowout repair by TreadForcePros in Murfreesboro, TN",
  },
  {
    src: "/photos/mobile-tire-service-chevy-silverado-tire-replacement-img-murfreesboro-tn.jpg",
    alt: "Chevy Silverado tire replacement service in Murfreesboro, TN",
  },
  {
    src: "/photos/mobile-tire-service-lamborghini-tire-replacement-img-murfreesboro-tn.jpg",
    alt: "Lamborghini tire replacement handled on-site in Murfreesboro, TN",
  },
  {
    src: "/photos/mobile-tire-service-commercial-truck-tire-replacement-img-murfreesboro-tn.jpg",
    alt: "Commercial truck tire replacement by TreadForcePros in Murfreesboro, TN",
  },
  {
    src: "/photos/mobile-tire-service-family-car-roadside-battery-jumpstart-murfreesboro-tn.jpg",
    alt: "Roadside battery jumpstart for a family car in Murfreesboro, TN",
  },
  {
    src: "/photos/mobile-tire-24-7-service-porche-full-tire-replacement-img-murfreesboro-tn.jpg",
    alt: "Porsche full tire replacement handled on-site in Murfreesboro, TN",
  },
  {
    src: "/photos/mobile-tire-service-bmw-car-truck-replacement-img-murfreesboro-tn.jpg",
    alt: "BMW tire replacement by TreadForcePros in Murfreesboro, TN",
  },
  {
    src: "/photos/mobile-tire-service-rv-tire-replacement-img-murfreesboro-tn.jpg",
    alt: "RV tire replacement service in Murfreesboro, TN",
  },
  {
    src: "/photos/mobile-tire-service-diesel-truck-tire-replacement-img-murfreesboro-tn.jpg",
    alt: "Diesel truck tire replacement by TreadForcePros in Murfreesboro, TN",
  },
  {
    src: "/photos/mobile-tire-service-uhaul-truck-tire-replacement-img-murfreesboro-tn.jpg",
    alt: "U-Haul moving truck tire replacement in Murfreesboro, TN",
  },
  {
    src: "/photos/mobile-tire-service-large-truck-fleet-tire-repair-img-murfreesboro-tn.jpg",
    alt: "Large fleet truck tire repair by TreadForcePros in Murfreesboro, TN",
  },
];

export const telHref = `tel:+1${site.phoneRaw}`;
export const smsHref = `sms:+1${site.phoneRaw}`;
export const mailHref = `mailto:${site.email}`;
