import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage } from "@/components/sections/LegalPage";
import { mailtoUrl, site } from "@/data/site";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description: "Terms governing the use of the Nexpedite Freight website.",
  alternates: { canonical: "/terms-and-conditions" },
};

export default function TermsPage() {
  return (
    <LegalPage
      label="Resources"
      title="Terms & Conditions"
      sections={[
        {
          id: "about",
          title: "About these terms",
          body: (
            <p>
              These terms govern your use of this website, operated by {site.name}. By using the site you agree to them. Last updated: [DATE].
            </p>
          ),
        },
        {
          id: "website-information",
          title: "Website information",
          body: (
            <p>
              Content on this website is provided for general information about our services. It is not a binding offer and does not replace
              advice for a specific shipment. We aim to keep information accurate but cannot guarantee it is complete or current.
            </p>
          ),
        },
        {
          id: "quotations",
          title: "Quotations",
          body: (
            <p>
              Submitting a quotation request does not create a contract. Any quotation we provide will state its own scope, validity and
              conditions. Freight services are governed by the terms agreed for each shipment. [STANDARD TRADING CONDITIONS — TO BE CONFIRMED.]
            </p>
          ),
        },
        {
          id: "acceptable-use",
          title: "Acceptable use",
          body: (
            <ul>
              <li>Do not submit false, misleading or unlawful information through our forms.</li>
              <li>Do not attempt to disrupt, overload or gain unauthorised access to the website.</li>
              <li>Do not use automated tools to send messages through our forms.</li>
            </ul>
          ),
        },
        {
          id: "intellectual-property",
          title: "Intellectual property",
          body: <p>The Nexpedite Freight name, logo and website content belong to {site.name} unless stated otherwise and may not be reused without permission.</p>,
        },
        {
          id: "liability",
          title: "Limitation of liability",
          body: <p>[LIMITATION OF LIABILITY WORDING — TO BE PROVIDED BY LEGAL ADVISER.]</p>,
        },
        {
          id: "third-party-links",
          title: "Third-party links",
          body: <p>Links to third-party services, such as WhatsApp, are provided for convenience. We are not responsible for their content or policies.</p>,
        },
        {
          id: "governing-law",
          title: "Governing law",
          body: <p>[GOVERNING LAW AND JURISDICTION — TO BE CONFIRMED BY LEGAL ADVISER.]</p>,
        },
        {
          id: "contact",
          title: "Contact",
          body: (
            <p>
              Questions about these terms can be sent to <a href={mailtoUrl}>{site.contact.email}</a>. See also our{" "}
              <Link href="/privacy-policy">Privacy Policy</Link>.
            </p>
          ),
        },
      ]}
    />
  );
}
