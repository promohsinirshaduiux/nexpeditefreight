import { ServiceDetail, serviceMetadata } from "@/components/services/ServiceDetail";

export const metadata = serviceMetadata("ocean-freight");

export default function Page() {
  return <ServiceDetail slug="ocean-freight" variant="split" />;
}
