import { ServiceDetail, serviceMetadata } from "@/components/services/ServiceDetail";

export const metadata = serviceMetadata("customs-clearance");

export default function Page() {
  return <ServiceDetail slug="customs-clearance" variant="split" />;
}
