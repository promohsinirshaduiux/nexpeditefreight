import type { Metadata, Viewport } from "next";
import { Manrope, DM_Sans } from "next/font/google";
import "./globals.css";
import { site } from "@/data/site";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppButton } from "@/components/layout/WhatsAppButton";
import { Effects } from "@/components/effects/Effects";
import { Preloader } from "@/components/effects/Preloader";
import { Cursor } from "@/components/effects/Cursor";

const manrope = Manrope({ subsets: ["latin"], variable: "--font-manrope", display: "swap" });
const dmSans = DM_Sans({ subsets: ["latin"], variable: "--font-dm-sans", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Nexpedite Freight — Freight Forwarding in Pakistan",
    template: "%s | Nexpedite Freight",
  },
  description: site.description,
  applicationName: site.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: site.name,
    locale: "en_PK",
    url: "/",
    title: "Nexpedite Freight — Freight Forwarding in Pakistan",
    description: site.description,
    images: [{ url: "/images/og.jpg", width: 1200, height: 630, alt: "Nexpedite Freight — Your Freight Partner" }],
  },
  twitter: { card: "summary_large_image", images: ["/images/og.jpg"] },
};

export const viewport: Viewport = {
  themeColor: "#0c2041",
  colorScheme: "light",
};

const motionBoot = `(function(){var d=document.documentElement;try{if(matchMedia('(prefers-reduced-motion: reduce)').matches)return;d.classList.add('motion-ready');if(sessionStorage.getItem('nx-seen')||matchMedia('(max-width: 767px)').matches)d.classList.add('nx-seen');}catch(e){}setTimeout(function(){if(!window.__nxEffects){d.classList.remove('motion-ready');}},4000);})();`;

const orgJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: site.name,
  url: site.url,
  logo: `${site.url}/brand/logo.png`,
  email: site.contact.email,
  telephone: site.contact.phoneIntl,
  foundingDate: String(site.founded),
  slogan: site.tagline,
  areaServed: "PK",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${manrope.variable} ${dmSans.variable}`} suppressHydrationWarning>
      <head>
        {/* Opt into reveal animations only when motion is allowed; undo if the app never boots. */}
        <script dangerouslySetInnerHTML={{ __html: motionBoot }} />
      </head>
      <body className="min-h-dvh flex flex-col">
        <Preloader />
        <Effects />
        <Cursor />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-white focus:px-4 focus:py-3 focus:text-ink focus:shadow"
        >
          Skip to content
        </a>
        <Header />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer />
        <WhatsAppButton />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }} />
      </body>
    </html>
  );
}
