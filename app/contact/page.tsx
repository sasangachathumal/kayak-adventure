import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import Navbar from "@/components/shared/Navbar";
import ContactPageHero from "@/components/contact/ContactPageHero";
import ContactDetails from "@/components/contact/ContactDetails";
import Footer from "@/components/shared/Footer";
import ScrollToTop from "@/components/shared/ScrollToTop";
import Preloader from "@/components/shared/Preloader";

// ─── Page-specific SEO metadata ──────────────────────────────────────────────
export const metadata: Metadata = buildMetadata({
  title: "Contact Us | Kayak Adventure",
  description:
    "Get in touch with Kayak Adventure. Book a guided kayaking tour on Rathgama Lagoon, " +
    "Hikkaduwa, Sri Lanka via WhatsApp, phone, or email.",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Contact Us | Kayak Adventure",
    description:
      "Reach out to Kayak Adventure to book your guided kayaking tour on Rathgama Lagoon, Sri Lanka.",
    url: "/contact",
  },
  twitter: {
    title: "Contact Us | Kayak Adventure",
    description:
      "Reach out to Kayak Adventure to book your guided kayaking tour on Rathgama Lagoon, Sri Lanka.",
  },
});

// ─── Contact Page ─────────────────────────────────────────────────────────────
export default function ContactPage() {
  return (
    <main className="flex-1 flex flex-col">
      <Preloader />
      <ScrollToTop />
      <Navbar />
      <ContactPageHero />
      <ContactDetails />
      <Footer />
    </main>
  );
}
