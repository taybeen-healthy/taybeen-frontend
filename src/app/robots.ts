import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/my-account/", "/checkout/", "/order-confirmed/", "/signin/", "/signup/"],
    },
    sitemap: "https://taybeen.com/sitemap.xml",
  };
}
