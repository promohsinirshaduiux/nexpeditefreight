import { ServiceDetail, serviceMetadata } from "@/components/services/ServiceDetail";

export const metadata = serviceMetadata("road-transportation");

export default function Page() {
  return <ServiceDetail slug="road-transportation" variant="stacked" />;
}
