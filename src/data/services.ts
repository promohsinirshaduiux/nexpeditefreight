export type Service = {
  slug: string;
  n: string;
  title: string;
  short: string;
  eyebrow: string;
  headline: string;
  intro: string;
  image: string;
  imageAlt: string;
  metaTitle: string;
  metaDescription: string;
  capabilities: { title: string; text: string }[];
  steps: { title: string; text: string }[];
  why: string[];
  suitedFor: string[];
  related: string[];
  quoteLabel: string;
};

export const services: Service[] = [
  {
    slug: "ocean-freight",
    n: "01",
    title: "Ocean Freight",
    short: "FCL & LCL shipping across major trade lanes.",
    eyebrow: "Sea freight",
    headline: "Ocean freight, planned around your cargo.",
    intro:
      "Reliable, cost-effective ocean freight for shipments of any size — from a single container to larger volumes — moving cargo safely across the world's major trade lanes.",
    image: "/images/ocean-freight.jpg",
    imageAlt: "Fully loaded container vessel at sea under an overcast sky",
    metaTitle: "Ocean Freight Forwarding — FCL & LCL from Pakistan",
    metaDescription:
      "FCL and LCL ocean freight from Pakistan with port-to-port and door-to-door options, careful carrier selection and hands-on shipment coordination.",
    capabilities: [
      { title: "FCL and LCL", text: "Full Container Load for dedicated volumes, Less than Container Load when you only need part of a box." },
      { title: "Port-to-port and door-to-door", text: "Choose the scope that suits you — from quay to quay, or from your premises to your consignee's." },
      { title: "Carrier and routing selection", text: "Carriers and routings chosen carefully to balance cost against transit time for each shipment." },
      { title: "Shipment tracking and coordination", text: "One team keeps track of your container and coordinates every handover along the way." },
    ],
    steps: [
      { title: "Cargo review", text: "We confirm volume, weight, commodity and readiness date to decide between FCL and LCL." },
      { title: "Routing and booking", text: "We compare carrier and routing options, then secure space once you approve the quotation." },
      { title: "Documentation", text: "Shipping instructions, bill of lading and export paperwork are prepared and checked." },
      { title: "Sailing and arrival", text: "We follow the vessel, keep you updated and coordinate arrival, clearance and delivery." },
    ],
    why: [
      "Routing judgment shaped by 30+ years of founder experience",
      "Direct contact with the person managing your container",
      "Quotations that balance freight cost with reliability",
    ],
    suitedFor: ["Textile & apparel exports", "Machinery and heavy goods", "FMCG and general cargo"],
    related: ["customs-clearance", "road-transportation", "warehousing-distribution"],
    quoteLabel: "Request an ocean freight quote",
  },
  {
    slug: "air-freight",
    n: "02",
    title: "Air Freight",
    short: "Fast, secure air cargo for time-sensitive shipments.",
    eyebrow: "Air cargo",
    headline: "When time matters, air freight handled with care.",
    intro:
      "Fast, secure air freight for time-sensitive and high-value shipments, with routing chosen to balance speed, cost and reliability.",
    image: "/images/air-freight.jpg",
    imageAlt: "Cargo aircraft being loaded with palletised freight at dusk",
    metaTitle: "Air Freight Forwarding — Express & Standard from Pakistan",
    metaDescription:
      "Express and standard air freight for time-critical and high-value cargo, coordinated with airline and ground handling partners by an experienced team.",
    capabilities: [
      { title: "Express and standard options", text: "Pick the service level that fits your deadline and budget." },
      { title: "Time-critical cargo", text: "Priority handling for shipments that cannot wait for a vessel." },
      { title: "High-value cargo", text: "Careful handling and coordination for goods that need extra attention." },
      { title: "Airline and ground handling coordination", text: "We coordinate with airline and ground handling partners and keep you updated as your cargo moves." },
    ],
    steps: [
      { title: "Shipment details", text: "Dimensions, weight, commodity and deadline determine the right service level." },
      { title: "Routing and space", text: "We weigh direct and connecting options and book space once you approve." },
      { title: "Airport handling", text: "Documentation, acceptance and handover at origin are coordinated for you." },
      { title: "Arrival and delivery", text: "Clearance and onward delivery are arranged at destination as required." },
    ],
    why: [
      "Clear advice on when air is worth the cost",
      "Direct updates while your cargo is in transit",
      "Experience with time-sensitive and high-value shipments",
    ],
    suitedFor: ["Surgical instruments", "Samples and urgent replacements", "High-value goods"],
    related: ["customs-clearance", "ocean-freight", "warehousing-distribution"],
    quoteLabel: "Request an air freight quote",
  },
  {
    slug: "road-transportation",
    n: "03",
    title: "Road Transportation",
    short: "FTL, LTL and cross-border trucking.",
    eyebrow: "Road freight",
    headline: "Road freight that connects the whole journey.",
    intro:
      "Dependable road freight for cross-border and domestic moves, connecting ports, warehouses and final destinations across Pakistan and the region.",
    image: "/images/road-transportation.jpg",
    imageAlt: "Container truck on an open highway at golden hour",
    metaTitle: "Road Transportation — FTL, LTL & Cross-Border Trucking in Pakistan",
    metaDescription:
      "Full and part truckload road freight, cross-border trucking coordination and local pickup and delivery across Pakistan and the region.",
    capabilities: [
      { title: "FTL and LTL", text: "Full Truck Load for dedicated moves, Less than Truck Load to share capacity and cost." },
      { title: "Cross-border trucking", text: "Coordination of cross-border road movements and the paperwork they require." },
      { title: "Local pickup and delivery", text: "First and last mile between factories, ports, warehouses and consignees." },
      { title: "Scheduling and distribution", text: "Careful scheduling to protect transit times and keep deliveries on plan." },
    ],
    steps: [
      { title: "Load planning", text: "We confirm cargo, pickup point, destination and timing." },
      { title: "Vehicle arrangement", text: "The right truck type and capacity are arranged for your load." },
      { title: "Pickup and transit", text: "We coordinate collection and follow the movement en route." },
      { title: "Delivery confirmation", text: "Delivery is confirmed and closed out with you." },
    ],
    why: [
      "Road legs planned together with ocean and air moves",
      "Scheduling that protects downstream deadlines",
      "One point of contact from pickup to delivery",
    ],
    suitedFor: ["Port-to-factory moves", "Domestic distribution", "Regional cross-border cargo"],
    related: ["warehousing-distribution", "ocean-freight", "project-cargo"],
    quoteLabel: "Request a road freight quote",
  },
  {
    slug: "customs-clearance",
    n: "04",
    title: "Customs Clearance",
    short: "Import and export documentation, handled properly.",
    eyebrow: "Customs",
    headline: "Customs formalities, kept compliant and moving.",
    intro:
      "Experienced handling of import and export customs formalities, keeping shipments compliant and moving without unnecessary delay.",
    image: "/images/customs-clearance.jpg",
    imageAlt: "Shipping and customs documents on a desk beside a laptop",
    metaTitle: "Customs Clearance in Pakistan — Import & Export Documentation",
    metaDescription:
      "Import and export customs documentation, duty, tax and tariff advisory, regulatory compliance and coordination with customs authorities.",
    capabilities: [
      { title: "Import and export documentation", text: "Preparation and management of the documents your shipment needs to clear." },
      { title: "Duty, tax and tariff advisory", text: "Guidance on the duties, taxes and tariffs that apply to your goods." },
      { title: "Regulatory compliance", text: "Attention to the regulatory requirements of different shipment types." },
      { title: "Customs coordination", text: "Coordination with customs authorities to support a quick release." },
    ],
    steps: [
      { title: "Document review", text: "We check invoices, packing lists and permits before cargo arrives or departs." },
      { title: "Classification and advice", text: "We advise on applicable duties, taxes and requirements." },
      { title: "Filing", text: "Declarations are prepared and submitted for processing." },
      { title: "Release", text: "We coordinate examination, if required, and release of your cargo." },
    ],
    why: [
      "Paperwork checked before it becomes a delay",
      "Practical advice grounded in decades of experience",
      "Clearance coordinated with your freight booking",
    ],
    suitedFor: ["Importers and exporters", "Chemicals and regulated goods", "Machinery and project imports"],
    related: ["ocean-freight", "air-freight", "warehousing-distribution"],
    quoteLabel: "Ask about customs clearance",
  },
  {
    slug: "warehousing-distribution",
    n: "05",
    title: "Warehousing & Distribution",
    short: "Secure storage with onward distribution.",
    eyebrow: "Storage",
    headline: "Space between arrival and final delivery.",
    intro:
      "Secure short- and long-term storage paired with distribution support, giving clients flexibility between arrival and final delivery.",
    image: "/images/warehousing.jpg",
    imageAlt: "Organised logistics warehouse with tall pallet racking",
    metaTitle: "Warehousing & Distribution — Storage and Onward Delivery",
    metaDescription:
      "Short-term and long-term storage, inventory handling and distribution planning to final destinations in secure, monitored facilities.",
    capabilities: [
      { title: "Short and long-term storage", text: "Flexible storage for a few days or longer periods, depending on your plan." },
      { title: "Inventory handling", text: "Receiving, handling and coordination of stock while it is stored." },
      { title: "Distribution planning", text: "Planning of onward delivery to final destinations." },
      { title: "Secure facilities", text: "Storage in secure, monitored facilities." },
    ],
    steps: [
      { title: "Requirement review", text: "Volume, duration and handling needs are agreed up front." },
      { title: "Receiving", text: "Cargo is received and checked into storage." },
      { title: "Storage and handling", text: "Your goods are stored and handled as agreed." },
      { title: "Dispatch", text: "Orders are released and delivered on your instruction." },
    ],
    why: [
      "Storage connected to your freight and clearance",
      "Flexibility when arrival and delivery dates differ",
      "Direct communication about your stock",
    ],
    suitedFor: ["Staged deliveries", "Import consolidation", "FMCG distribution"],
    related: ["road-transportation", "customs-clearance", "ocean-freight"],
    quoteLabel: "Ask about storage",
  },
  {
    slug: "project-cargo",
    n: "06",
    title: "Project Cargo",
    short: "Oversized, heavy-lift and complex cargo.",
    eyebrow: "Specialised",
    headline: "Complex cargo, planned in detail.",
    intro:
      "Specialised planning and handling for oversized, heavy-lift and complex cargo that standard freight methods can't accommodate.",
    image: "/images/project-cargo.jpg",
    imageAlt: "Mobile crane lifting heavy industrial equipment onto a low-bed trailer",
    metaTitle: "Project Cargo — Oversized & Heavy-Lift Freight Forwarding",
    metaDescription:
      "Oversized and heavy-lift cargo handling, route survey and feasibility planning, specialised equipment coordination and hands-on project management.",
    capabilities: [
      { title: "Oversized and heavy-lift cargo", text: "Handling for cargo that exceeds standard dimensions or weights." },
      { title: "Route survey and feasibility", text: "Route assessment and feasibility planning before anything moves." },
      { title: "Specialised equipment", text: "Coordination of cranes, trailers and other equipment the move requires." },
      { title: "Hands-on project management", text: "Personal oversight from origin to site." },
    ],
    steps: [
      { title: "Technical review", text: "Dimensions, weights, lifting points and site conditions are assessed." },
      { title: "Feasibility and route", text: "We survey the route and plan the method of transport." },
      { title: "Equipment and permits", text: "Specialised equipment and required approvals are coordinated." },
      { title: "Execution", text: "The move is managed hands-on through to delivery at site." },
    ],
    why: [
      "Senior experience applied directly to your project",
      "Planning before promises",
      "One accountable contact from origin to site",
    ],
    suitedFor: ["Industrial machinery", "Plant and equipment", "Infrastructure components"],
    related: ["road-transportation", "ocean-freight", "customs-clearance"],
    quoteLabel: "Discuss your project",
  },
];

export function getService(slug: string) {
  const s = services.find((x) => x.slug === slug);
  if (!s) throw new Error(`Unknown service ${slug}`);
  return s;
}
