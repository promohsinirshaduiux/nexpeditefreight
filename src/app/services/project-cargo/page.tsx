import { ServiceDetail, serviceMetadata } from "@/components/services/ServiceDetail";

export const metadata = serviceMetadata("project-cargo");

export default function Page() {
  return <ServiceDetail slug="project-cargo" variant="fullbleed" />;
}
