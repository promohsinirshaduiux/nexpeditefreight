/**
 * Central company configuration.
 *
 * Everything here comes from the Nexpedite Freight company profile.
 * Values marked UNVERIFIED must be confirmed by the client before launch.
 */

export const site = {
  name: "Nexpedite Freight",
  legalName: "Nexpedite Freight",
  tagline: "Your Cargo. Our Commitment. Delivered.",
  logoTagline: "Your Freight Partner",
  founded: 2025,
  founderExperience: "30+",
  description:
    "Nexpedite Freight is a Pakistan-based freight forwarding company offering ocean, air and road freight, customs clearance, warehousing and project cargo — backed by more than 30 years of founder experience.",
  // Production domain used for canonical URLs, sitemap and Open Graph.
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.nexpeditefreight.com",

  contact: {
    email: "info@nexpeditefreight.com",
    phoneDisplay: "0300-8496494",
    phoneIntl: "+923008496494",
    // UNVERIFIED: the client must confirm this number is WhatsApp-enabled.
    whatsapp: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "923008496494",
    whatsappMessage:
      "Hello Nexpedite Freight, I would like to discuss my freight forwarding requirements.",
    // UNVERIFIED: the profile references both Karachi and Lahore.
    // Set NEXT_PUBLIC_OFFICE_CITY once confirmed. No street address is published.
    officeCity: process.env.NEXT_PUBLIC_OFFICE_CITY ?? "Pakistan",
  },

  // Only add URLs once the client supplies verified profiles.
  // A null value hides the link everywhere on the site.
  social: {
    facebook: process.env.NEXT_PUBLIC_FACEBOOK_URL || null,
    instagram: process.env.NEXT_PUBLIC_INSTAGRAM_URL || null,
    linkedin: process.env.NEXT_PUBLIC_LINKEDIN_URL || null,
  } as Record<"facebook" | "instagram" | "linkedin", string | null>,
};

export function whatsappUrl(message: string = site.contact.whatsappMessage) {
  return `https://wa.me/${site.contact.whatsapp}?text=${encodeURIComponent(message)}`;
}

export const mailtoUrl = `mailto:${site.contact.email}`;
export const telUrl = `tel:${site.contact.phoneIntl}`;

export type NavLink = { label: string; href: string; external?: boolean; description?: string };

export const serviceLinks: NavLink[] = [
  { label: "Services Overview", href: "/services", description: "All six freight solutions" },
  { label: "Ocean Freight", href: "/services/ocean-freight", description: "FCL & LCL shipping" },
  { label: "Air Freight", href: "/services/air-freight", description: "Time-critical air cargo" },
  { label: "Road Transportation", href: "/services/road-transportation", description: "FTL, LTL & cross-border" },
  { label: "Customs Clearance", href: "/services/customs-clearance", description: "Import & export formalities" },
  { label: "Warehousing & Distribution", href: "/services/warehousing-distribution", description: "Storage & onward delivery" },
  { label: "Project Cargo", href: "/services/project-cargo", description: "Oversized & heavy-lift" },
];

export const resourceLinks: NavLink[] = [
  { label: "FAQs", href: "/faqs", description: "Answers to common questions" },
  { label: "Privacy Policy", href: "/privacy-policy", description: "How we handle your data" },
  { label: "Terms & Conditions", href: "/terms-and-conditions", description: "Terms of using this site" },
];

export function contactLinks(): (NavLink & { icon: "page" | "mail" | "phone" | "whatsapp" | "facebook" | "instagram" | "linkedin" })[] {
  const links: (NavLink & { icon: "page" | "mail" | "phone" | "whatsapp" | "facebook" | "instagram" | "linkedin" })[] = [
    { label: "Contact Page", href: "/contact", description: "Send us a message", icon: "page" },
    { label: "Email Us", href: mailtoUrl, description: site.contact.email, icon: "mail", external: true },
    { label: "Call Us", href: telUrl, description: site.contact.phoneDisplay, icon: "phone", external: true },
    { label: "WhatsApp Us", href: whatsappUrl(), description: "Chat with our freight team", icon: "whatsapp", external: true },
  ];
  if (site.social.facebook) links.push({ label: "Facebook", href: site.social.facebook, icon: "facebook", external: true });
  if (site.social.instagram) links.push({ label: "Instagram", href: site.social.instagram, icon: "instagram", external: true });
  if (site.social.linkedin) links.push({ label: "LinkedIn", href: site.social.linkedin, icon: "linkedin", external: true });
  return links;
}

export const processSteps = [
  { n: "01", title: "Inquiry", text: "Share your cargo and shipment details with our team — what it is, where it is and where it needs to go." },
  { n: "02", title: "Quotation", text: "We prepare a clear, cost-effective quotation with the routing and carrier options that fit your shipment." },
  { n: "03", title: "Booking", text: "Once you confirm, we book carriers, secure space and set the schedule." },
  { n: "04", title: "Documentation", text: "We prepare and manage the required paperwork so your cargo is ready for every checkpoint." },
  { n: "05", title: "Shipment", text: "Your cargo moves, with direct updates from the people managing it throughout." },
  { n: "06", title: "Delivery", text: "Safe delivery to the final destination, closed out with the same attention it started with." },
];

export const coreValues = [
  { title: "Integrity", text: "Honest, transparent dealings with every client and partner." },
  { title: "Reliability", text: "Commitments kept and cargo delivered as promised." },
  { title: "Customer Focus", text: "Every solution shaped around the client's actual needs." },
  { title: "Transparency", text: "Clear communication and pricing, no hidden surprises." },
  { title: "Efficiency", text: "Time-conscious handling from quotation to delivery." },
  { title: "Accountability", text: "Ownership of outcomes, backed by real experience." },
];

export const differentiators = [
  { title: "Decades of real experience", text: "30+ years of hands-on freight forwarding knowledge guiding every decision we make." },
  { title: "Genuine personal attention", text: "As a new, focused company, clients deal directly with people who know their shipment — not a call centre." },
  { title: "Cost-effective solutions", text: "Routes, carriers and services chosen to balance cost with reliability for each shipment." },
  { title: "Responsive, hands-on support", text: "Direct access to our team for updates, questions and quick decisions when they matter." },
];
