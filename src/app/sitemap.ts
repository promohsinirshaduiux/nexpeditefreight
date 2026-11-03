import type { MetadataRoute } from "next";
import { site } from "@/data/site";
import { services } from "@/data/services";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "",
    "/about",
    "/industries",
    "/services",
    ...services.map((s) => `/services/${s.slug}`),
    "/get-a-quote",
    "/contact",
    "/faqs",
    "/privacy-policy",
    "/terms-and-conditions",
  ];
  return routes.map((r) => ({
    url: `${site.url}${r}`,
    changeFrequency: "monthly",
    priority: r === "" ? 1 : r.startsWith("/services") || r === "/get-a-quote" ? 0.8 : 0.6,
  }));
}
