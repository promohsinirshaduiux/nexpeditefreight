import Image from "next/image";
import type { Metadata } from "next";
import { Button } from "@/components/ui/primitives";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false },
};

export default function NotFound() {
  return (
    <section className="relative bg-white px-3 pt-[72px] md:px-5 md:pt-20">
      <div className="relative isolate flex min-h-[calc(100svh-100px)] items-end overflow-hidden rounded-2xl bg-navy text-white">
        <Image src="/images/ocean-aerial.jpg" alt="" fill priority sizes="100vw" className="-z-10 object-cover opacity-70" />
        <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-t from-navy-deep via-navy/60 to-navy/20" />
        <span aria-hidden className="pointer-events-none absolute -top-[0.12em] right-4 select-none font-display text-[clamp(10rem,32vw,28rem)] font-semibold leading-none tracking-[-0.06em] text-white/[0.07] md:right-10">
          404
        </span>
        <div className="container-x pb-12 md:pb-20">
          <p className="eyebrow flex items-center gap-3 text-cyan">
            <span aria-hidden className="h-px w-8 bg-current" />
            Error 404
          </p>
          <h1 className="mt-6 max-w-4xl font-display text-[clamp(2.5rem,6vw,5rem)] font-semibold leading-[1] tracking-[-0.035em]">
            Looks like this shipment took a wrong turn.
          </h1>
          <p className="text-lead mt-6 max-w-xl text-white/75">The page you&apos;re looking for isn&apos;t available.</p>
          <div className="mt-10 flex flex-wrap gap-3">
            <Button href="/" variant="light">
              Back to Home
            </Button>
            <Button href="/services" variant="ghost-light">
              Explore Services
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
