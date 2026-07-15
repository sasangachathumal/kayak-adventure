import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import Navbar from "@/components/Navbar";
import GalleryPageHero from "@/components/GalleryPageHero";
import GalleryGrid from "@/components/GalleryGrid";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";

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
export default function GalleryPage() {
  return (
    <main className="flex-1 flex flex-col">
      <ScrollToTop />
      <Navbar />
      <GalleryPageHero />
      <GalleryGrid />
      <CTA />
      <Footer />
    </main>
  );
}
