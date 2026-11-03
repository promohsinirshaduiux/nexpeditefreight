import { ServiceDetail, serviceMetadata } from "@/components/services/ServiceDetail";

export const metadata = serviceMetadata("air-freight");

export default function Page() {
  return <ServiceDetail slug="air-freight" variant="fullbleed" />;
}
