import { handleForm } from "@/lib/handle-form";
import { quoteSchema, serviceOptions } from "@/lib/schemas";

export async function POST(req: Request) {
  return handleForm(req, quoteSchema, (d) => {
    const service = serviceOptions.find((s) => s.value === d.service)?.label ?? d.service;
    return {
      subject: `Quotation request — ${service} — ${d.fullName}`,
      title: "New quotation request",
      replyTo: d.email,
      rows: [
        ["Full name", d.fullName],
        ["Company", d.companyName],
        ["Email", d.email],
        ["Phone / WhatsApp", d.phone],
        ["Service", service],
        ["Origin", d.origin],
        ["Destination", d.destination],
        ["Cargo type", d.cargoType],
        ["Cargo description", d.cargoDescription],
        ["Estimated weight", d.weight],
        ["Estimated volume", d.volume],
        ["Ready date", d.readyDate],
        ["Additional requirements", d.additional],
      ],
    };
  });
}
