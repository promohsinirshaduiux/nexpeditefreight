import { Calculator, FileText, Globe2, Plane, ShieldCheck, Ship, Truck, type LucideIcon } from "lucide-react";

/** Icon for each FAQ category, shared by the sticky nav and the section headings. */
export const faqIcons: Record<string, LucideIcon> = {
  general: Globe2,
  ocean: Ship,
  air: Plane,
  road: Truck,
  customs: ShieldCheck,
  quotations: Calculator,
  documentation: FileText,
};

export const faqIcon = (id: string) => faqIcons[id] ?? FileText;
