import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";

/**
 * Auto-generated sitemap served at /sitemap.xml
 *
 * Add new routes here as pages are created.
 * For programmatic pages (e.g. /tours/[slug]), map over your data source.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  // ── Static routes ─────────────────────────────────────────────────────────
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: SITE_URL,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${SITE_URL}/tours`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/about`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/gallery`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${SITE_URL}/contact`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.6,
    },
  ];

  // ── Programmatic routes (tours) ───────────────────────────────────────────
  // When you have a data source (CMS / DB), replace this stub:
  //
  // const tours = await fetchAllTours();
  // const tourRoutes: MetadataRoute.Sitemap = tours.map((tour) => ({
  //   url: `${SITE_URL}/tours/${tour.slug}`,
  //   lastModified: new Date(tour.updatedAt),
  //   changeFrequency: "weekly",
  //   priority: 0.8,
  // }));
  //
  // return [...staticRoutes, ...tourRoutes];

  return staticRoutes;
}
