export type FaqGroup = { id: string; title: string; items: { q: string; a: string }[] };

// General answers based on the services in the company profile.
// No transit times, prices or guarantees are stated.
export const faqGroups: FaqGroup[] = [
  {
    id: "general",
    title: "General Freight",
    items: [
      {
        q: "What does a freight forwarder do?",
        a: "A freight forwarder organises the movement of your cargo from origin to destination. We arrange carriers, plan routing, prepare documentation, coordinate customs and keep you informed — so you have one point of contact instead of many.",
      },
      {
        q: "Nexpedite Freight was founded in 2025. How experienced is the team?",
        a: "The company is new, but it is led by a founder with more than 30 years of hands-on freight forwarding experience. Every quotation, routing decision and clearance is guided by that experience.",
      },
      {
        q: "Which services do you offer?",
        a: "Ocean freight, air freight, road transportation, customs clearance, warehousing and distribution, and project cargo for oversized or heavy-lift shipments.",
      },
      {
        q: "Will I deal with the same people throughout my shipment?",
        a: "Yes. As a focused team we work directly with our clients, so you speak to people who know your shipment rather than a call centre.",
      },
    ],
  },
  {
    id: "ocean",
    title: "Ocean Freight",
    items: [
      {
        q: "What is the difference between FCL and LCL?",
        a: "FCL (Full Container Load) means your cargo uses a whole container. LCL (Less than Container Load) means your cargo shares container space with other shipments, so you pay for the space you use. We help you decide which makes more sense for your volume and timeline.",
      },
      {
        q: "Do you offer door-to-door ocean freight?",
        a: "Yes. We offer both port-to-port and door-to-door options, combining ocean freight with road transport and customs clearance as needed.",
      },
    ],
  },
  {
    id: "air",
    title: "Air Freight",
    items: [
      {
        q: "When should I choose air freight over ocean?",
        a: "Air freight is usually best for time-sensitive, high-value or smaller shipments. Ocean freight is generally more economical for larger volumes. We will advise on the trade-off between speed and cost for your shipment.",
      },
      {
        q: "Do you offer express air freight?",
        a: "We offer both express and standard air freight options, coordinated with airline and ground handling partners.",
      },
    ],
  },
  {
    id: "road",
    title: "Road Transportation",
    items: [
      {
        q: "Do you handle cross-border trucking?",
        a: "Yes. We coordinate cross-border road movements as well as local pickup, delivery and distribution.",
      },
      {
        q: "What is the difference between FTL and LTL?",
        a: "FTL (Full Truck Load) dedicates a truck to your cargo. LTL (Less than Truck Load) shares truck space with other consignments, which can reduce cost for smaller loads.",
      },
    ],
  },
  {
    id: "customs",
    title: "Customs Clearance",
    items: [
      {
        q: "Can you handle both import and export clearance?",
        a: "Yes. We manage import and export documentation, advise on duties, taxes and tariffs, and coordinate with customs authorities.",
      },
      {
        q: "Can you tell me what duty I will pay?",
        a: "We can advise on the duties, taxes and tariffs that are likely to apply once we know the exact goods and their classification. Final amounts are determined by the relevant customs authority.",
      },
    ],
  },
  {
    id: "quotations",
    title: "Quotations",
    items: [
      {
        q: "How do I request a quotation?",
        a: "Use our Get a Quote form, email us or message us on WhatsApp. Share the cargo description, origin, destination, approximate weight and volume, and when the cargo will be ready.",
      },
      {
        q: "What affects the cost of a shipment?",
        a: "Mode of transport, route, cargo weight and volume, commodity type, service scope (port-to-port or door-to-door), timing and any special handling all influence cost. We aim to balance cost with reliability for each shipment.",
      },
      {
        q: "Is there any obligation when I request a quote?",
        a: "No. A quotation request simply lets us understand your requirements and propose a solution.",
      },
    ],
  },
  {
    id: "documentation",
    title: "Shipment Documentation",
    items: [
      {
        q: "Which documents are usually required?",
        a: "Most shipments need a commercial invoice and packing list, with transport documents such as a bill of lading or air waybill issued during shipping. Some goods need additional permits or certificates. We will tell you exactly what your shipment requires.",
      },
      {
        q: "Can you prepare the shipping documents for me?",
        a: "Yes. Documentation is one of the core stages of our process. We prepare and manage the paperwork needed for your shipment and check it before it becomes a delay.",
      },
    ],
  },
];
