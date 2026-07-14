import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";

/**
 * Auto-generated robots.txt served at /robots.txt
 *
 * Allows all crawlers on the whole site and points them to the sitemap.
 * Add disallow rules for private/admin routes as needed.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        // Add private paths to disallow once they exist, e.g.:
        // disallow: ["/admin/", "/api/"],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
