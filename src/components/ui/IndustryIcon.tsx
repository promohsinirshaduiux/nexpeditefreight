import { Briefcase, Cog, FlaskConical, Shirt, ShoppingBasket, Spool, Stethoscope, Volleyball, type LucideIcon } from "lucide-react";

const icons: Record<string, LucideIcon> = {
  textile: Spool,
  apparel: Shirt,
  leather: Briefcase,
  "sports-goods": Volleyball,
  surgical: Stethoscope,
  chemicals: FlaskConical,
  machinery: Cog,
  fmcg: ShoppingBasket,
};

/** Simple outline icon for an industry, matched by its slug. */
export function IndustryIcon({ slug, className = "size-6" }: { slug: string; className?: string }) {
  const Icon = icons[slug] ?? Cog;
  return <Icon aria-hidden className={className} strokeWidth={1.5} />;
}
