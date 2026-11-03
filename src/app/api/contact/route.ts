import { handleForm } from "@/lib/handle-form";
import { contactSchema } from "@/lib/schemas";

export async function POST(req: Request) {
  return handleForm(req, contactSchema, (d) => ({
    subject: `Website enquiry — ${d.subject}`,
    title: "New contact enquiry",
    replyTo: d.email,
    rows: [
      ["Full name", d.fullName],
      ["Email", d.email],
      ["Phone", d.phone],
      ["Company", d.companyName],
      ["Subject", d.subject],
      ["Message", d.message],
      ["Heard about us via", d.referral === "Other" && d.referralOther ? `Other — ${d.referralOther}` : d.referral],
      ["Preferred contact", d.contactMethod],
    ],
  }));
}
