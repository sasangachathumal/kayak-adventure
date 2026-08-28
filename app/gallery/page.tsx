import type { GalleryImage } from "@/components/gallery/GalleryGrid";
import GalleryGrid from "@/components/gallery/GalleryGrid";
import GalleryPageHero from "@/components/gallery/GalleryPageHero";
import CTA from "@/components/shared/CTA";
import Footer from "@/components/shared/Footer";
import Navbar from "@/components/shared/Navbar";
import Preloader from "@/components/shared/Preloader";
import ScrollToTop from "@/components/shared/ScrollToTop";
import manifestGalleryImages from "@/data/gallery-manifest.json";
import { getGallery, getSiteSettings } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

// ─── Page-specific SEO metadata ──────────────────────────────────────────────
export const metadata: Metadata = buildMetadata({
  title: "Gallery | Kayak Adventure",
  description:
    "Browse our gallery of guided kayaking adventures through Rathgama's " +
    "mangroves and lagoons in Sri Lanka. Real moments, real stories.",
  alternates: { canonical: "/gallery" },
  openGraph: {
    title: "Gallery | Kayak Adventure",
    description:
      "Browse stunning photos from our kayaking tours through Sri Lanka's mangroves and lagoons.",
    url: "/gallery",
  },
  twitter: {
    title: "Gallery | Kayak Adventure",
    description:
      "Browse stunning photos from our kayaking tours through Sri Lanka's mangroves and lagoons.",
  },
});

// ─── Gallery Page ────────────────────────────────────────────────────────────
export default async function GalleryPage() {
  const [cmsItems, siteSettings] = await Promise.all([
    getGallery(),
    getSiteSettings(),
  ]);
  const visibleCmsItems = cmsItems.filter((item) => !item.hidden);
  const cmsImages: GalleryImage[] = visibleCmsItems.map((item) => ({
    src: `/api/media/${item.key}`,
    alt: item.alt || "Kayak Adventure moment",
    span: item.span === "tall" ? "tall" : undefined,
    width: item.width || 800,
    height: item.height || (item.span === "tall" ? 1200 : 600),
    type: item.type,
  }));

  const allImages = [...cmsImages, ...(manifestGalleryImages as GalleryImage[])];

  return (
    <main className="flex-1 flex flex-col">
      <Preloader />
      <ScrollToTop />
      <Navbar settings={siteSettings} />
      <GalleryPageHero />
      <GalleryGrid images={allImages} />
      <CTA settings={siteSettings} />
      <Footer settings={siteSettings} />
    </main>
  );
}
