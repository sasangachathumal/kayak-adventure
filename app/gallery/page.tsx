import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import Navbar from "@/components/Navbar";
import GalleryPageHero from "@/components/GalleryPageHero";
import GalleryGrid from "@/components/GalleryGrid";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import fs from "fs";
import path from "path";

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
  const dirPath = path.join(process.cwd(), "public/gallery-images");
  let imageList: { src: string; alt: string; span?: "tall" }[] = [];

  try {
    const files = fs.readdirSync(dirPath);
    const avifFiles = files.filter((file) => file.endsWith(".avif"));

    // Sort numerically by the number in 'img{num}.avif'
    avifFiles.sort((a, b) => {
      const numA = parseInt(a.match(/\d+/)?.[0] || "0", 10);
      const numB = parseInt(b.match(/\d+/)?.[0] || "0", 10);
      return numA - numB;
    });

    imageList = avifFiles.map((file, idx) => {
      const num = file.match(/\d+/)?.[0] || "";
      return {
        src: `/gallery-images/${file}`,
        alt: `Kayak Adventure - Moment ${num}`,
        // Pattern for desktop masonry tall spans (every 6th item, and offset offset)
        span: idx % 6 === 0 || idx % 7 === 3 ? "tall" : undefined,
      };
    });
  } catch (e) {
    console.error("Error reading gallery-images dir:", e);
  }

  return (
    <main className="flex-1 flex flex-col">
      <ScrollToTop />
      <Navbar />
      <GalleryPageHero />
      <GalleryGrid images={imageList} />
      <CTA />
      <Footer />
    </main>
  );
}
