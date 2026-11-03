import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage } from "@/components/sections/LegalPage";
import { mailtoUrl, site } from "@/data/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How Nexpedite Freight collects, uses and protects information submitted through this website.",
  alternates: { canonical: "/privacy-policy" },
};

export default function PrivacyPolicyPage() {
  return (
    <LegalPage
      label="Resources"
      title="Privacy Policy"
      sections={[
        {
          id: "introduction",
          title: "Introduction",
          body: (
            <>
              <p>
                This Privacy Policy explains how {site.name} (&quot;we&quot;, &quot;us&quot;) handles personal information submitted through this
                website. Last updated: [DATE].
              </p>
              <p>Registered business details: [LEGAL ENTITY NAME AND REGISTRATION DETAILS — TO BE CONFIRMED].</p>
            </>
          ),
        },
        {
          id: "information-we-collect",
          title: "Information we collect",
          body: (
            <>
              <p>When you use our quotation or contact forms, we collect the information you choose to provide, which may include:</p>
              <ul>
                <li>Your name, company name, email address and phone or WhatsApp number</li>
                <li>Shipment details such as origin, destination, cargo description, weight, volume and readiness date</li>
                <li>Your message, how you heard about us and your preferred contact method</li>
              </ul>
              <p>Our hosting provider may also process technical information such as IP address and browser type for security and operation of the site.</p>
            </>
          ),
        },
        {
          id: "how-we-use",
          title: "How we use your information",
          body: (
            <ul>
              <li>To respond to your enquiry and prepare quotations</li>
              <li>To arrange and manage shipments you ask us to handle</li>
              <li>To protect the website against spam and abuse</li>
              <li>To meet legal or regulatory obligations that apply to us</li>
            </ul>
          ),
        },
        {
          id: "sharing",
          title: "Sharing information",
          body: (
            <p>
              We do not sell personal information. Where needed to deliver a service you request, relevant shipment information may be shared
              with carriers, agents, customs authorities and other logistics partners. [LIST OF SERVICE PROVIDERS, E.G. EMAIL PROVIDER — TO BE CONFIRMED.]
            </p>
          ),
        },
        {
          id: "retention",
          title: "Data retention",
          body: <p>We keep information only for as long as needed for the purposes above. [RETENTION PERIOD — TO BE CONFIRMED BY CLIENT.]</p>,
        },
        {
          id: "your-rights",
          title: "Your choices and rights",
          body: (
            <p>
              You can ask us to access, correct or delete the personal information you have provided by contacting us at{" "}
              <a href={mailtoUrl}>{site.contact.email}</a>. [APPLICABLE LEGAL RIGHTS — TO BE CONFIRMED.]
            </p>
          ),
        },
        {
          id: "cookies",
          title: "Cookies",
          body: <p>This website does not currently use advertising or analytics cookies. [UPDATE IF ANALYTICS ARE ADDED.]</p>,
        },
        {
          id: "changes",
          title: "Changes to this policy",
          body: <p>We may update this policy from time to time. The latest version will always be available on this page.</p>,
        },
        {
          id: "contact",
          title: "Contact",
          body: (
            <p>
              Questions about this policy can be sent to <a href={mailtoUrl}>{site.contact.email}</a> or through our{" "}
              <Link href="/contact">contact page</Link>.
            </p>
          ),
        },
      ]}
    />
  );
}
