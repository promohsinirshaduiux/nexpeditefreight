import { FileText, Mail, Phone } from "lucide-react";
import { WhatsAppIcon } from "./primitives";

type Name = "page" | "mail" | "phone" | "whatsapp" | "facebook" | "instagram" | "linkedin";

/** Outline icons for contact channels (brand marks drawn as simple strokes). */
export function ChannelIcon({ name, className = "size-[18px]" }: { name: Name; className?: string }) {
  const stroke = { fill: "none", stroke: "currentColor", strokeWidth: 1.6, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  switch (name) {
    case "page":
      return <FileText aria-hidden className={className} strokeWidth={1.6} />;
    case "mail":
      return <Mail aria-hidden className={className} strokeWidth={1.6} />;
    case "phone":
      return <Phone aria-hidden className={className} strokeWidth={1.6} />;
    case "whatsapp":
      return <WhatsAppIcon className={className} />;
    case "facebook":
      return (
        <svg viewBox="0 0 24 24" aria-hidden className={className} {...stroke}>
          <path d="M14 8h3V4h-3a4 4 0 0 0-4 4v3H7v4h3v6h4v-6h3l1-4h-4V8z" />
        </svg>
      );
    case "instagram":
      return (
        <svg viewBox="0 0 24 24" aria-hidden className={className} {...stroke}>
          <rect x="3" y="3" width="18" height="18" rx="5" />
          <circle cx="12" cy="12" r="4" />
          <circle cx="17.5" cy="6.5" r="0.6" fill="currentColor" />
        </svg>
      );
    case "linkedin":
      return (
        <svg viewBox="0 0 24 24" aria-hidden className={className} {...stroke}>
          <rect x="3" y="3" width="18" height="18" rx="3" />
          <path d="M8 10v7M8 7v.01M12 17v-4a2 2 0 0 1 4 0v4M12 10v7" />
        </svg>
      );
  }
}
