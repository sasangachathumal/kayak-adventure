import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import Navbar from "@/components/shared/Navbar";
import AboutPageHero from "@/components/about/AboutPageHero";
import AboutStory from "@/components/about/AboutStory";
import AboutValues from "@/components/about/AboutValues";
import AboutAmenities from "@/components/about/AboutAmenities";

import CTA from "@/components/shared/CTA";
import Footer from "@/components/shared/Footer";
import ScrollToTop from "@/components/shared/ScrollToTop";
import Preloader from "@/components/shared/Preloader";

// ─── Page-specific SEO metadata ──────────────────────────────────────────────
export const metadata: Metadata = buildMetadata({
  title: "About Us | Kayak Adventure",
  description:
    "Learn about Kayak Adventure — Sri Lanka's premier guided kayaking experience. " +
    "Discover our story, values, safety standards, and everything that's included in every tour.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About Us | Kayak Adventure",
    description:
      "Discover the story, values, and team behind Kayak Adventure — Sri Lanka's most trusted guided kayaking experience on Rathgama Lagoon.",
    url: "/about",
  },
  twitter: {
    title: "About Us | Kayak Adventure",
    description:
      "Discover the story, values, and team behind Kayak Adventure — Sri Lanka's most trusted guided kayaking experience.",
  },
});

import { getSiteSettings } from "@/lib/content";

export const dynamic = "force-dynamic";

// ─── About Page ───────────────────────────────────────────────────────────────
export default async function AboutPage() {
  const settings = await getSiteSettings();

  return (
    <main className="flex-1 flex flex-col">
      <Preloader />
      <ScrollToTop />
      <Navbar settings={settings} />
      <AboutPageHero />
      <AboutStory />
      <AboutValues />
      <AboutAmenities />

      <CTA settings={settings} />
      <Footer settings={settings} />
    </main>
  );
}
