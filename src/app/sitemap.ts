import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://taybeen.com";

  const staticPages = [
    "",
    "/products",
    "/our-story",
    "/contact",
    "/partnerships",
    "/privacy-policy",
    "/terms-and-conditions",
    "/shipping-and-delivery",
  ];

  return staticPages.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: (route === "" || route === "/products" ? "daily" : "weekly") as "daily" | "weekly",
    priority: route === "" ? 1.0 : route === "/products" ? 0.9 : 0.7,
  }));
}
