import GalleryGrid from "@/components/gallery/GalleryGrid";
import GalleryPageHero from "@/components/gallery/GalleryPageHero";
import CTA from "@/components/shared/CTA";
import Footer from "@/components/shared/Footer";
import Navbar from "@/components/shared/Navbar";
import Preloader from "@/components/shared/Preloader";
import ScrollToTop from "@/components/shared/ScrollToTop";
import { buildMetadata } from "@/lib/seo";
import fs from "fs";
import type { Metadata } from "next";
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

function getAvifDimensions(filePath: string): { width: number; height: number } {
  const buffer = fs.readFileSync(filePath);
  const ispe = Buffer.from("ispe");
  const index = buffer.indexOf(ispe);
  if (index === -1) {
    throw new Error("ispe box not found");
  }
  const width = buffer.readUInt32BE(index + 8);
  const height = buffer.readUInt32BE(index + 12);
  return { width, height };
}

// ─── Gallery Page ────────────────────────────────────────────────────────────
export default function GalleryPage() {
  const dirPath = path.join(process.cwd(), "public/gallery-images");
  let imageList: { src: string; alt: string; span?: "tall"; width: number; height: number }[] = [];

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
      const filePath = path.join(dirPath, file);
      let width = 800;
      let height = 600;
      try {
        const dims = getAvifDimensions(filePath);
        width = dims.width;
        height = dims.height;
      } catch (err) {
        console.error(`Failed to get dimensions for ${file}, using default:`, err);
      }

      return {
        src: `/gallery-images/${file}`,
        alt: `Kayak Adventure - Moment ${num}`,
        // Pattern for desktop masonry tall spans (every 6th item, and offset offset)
        span: idx % 6 === 0 || idx % 7 === 3 ? "tall" : undefined,
        width,
        height,
      };
    });
  } catch (e) {
    console.error("Error reading gallery-images dir:", e);
  }

  if (imageList.length === 0) {
    throw new Error(
      `Gallery build produced 0 images. cwd=${process.cwd()}, dir=${dirPath}`
    );
  }

  return (
    <main className="flex-1 flex flex-col">
      <Preloader />
      <ScrollToTop />
      <Navbar />
      <GalleryPageHero />
      <GalleryGrid images={imageList} />
      <CTA />
      <Footer />
    </main>
  );
}
