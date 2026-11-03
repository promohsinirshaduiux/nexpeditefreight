import { ServiceDetail, serviceMetadata } from "@/components/services/ServiceDetail";

export const metadata = serviceMetadata("warehousing-distribution");

export default function Page() {
  return <ServiceDetail slug="warehousing-distribution" variant="stacked" />;
}
