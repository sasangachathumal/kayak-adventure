import Navbar from "@/components/shared/Navbar";
import Hero from "@/components/landing/Hero";
import About from "@/components/landing/About";
import GalleryPreview from "@/components/landing/GalleryPreview";
import Testimonials, { type TestimonialItem } from "@/components/landing/Testimonials";
import FAQ from "@/components/landing/FAQ";
import CTA from "@/components/shared/CTA";
import Footer from "@/components/shared/Footer";
import ScrollToTop from "@/components/shared/ScrollToTop";
import Preloader from "@/components/shared/Preloader";
import { getTestimonials } from "@/lib/content";

export const dynamic = "force-dynamic";

export default async function Home() {
  const cmsTestimonials = await getTestimonials();
  const formattedTestimonials: TestimonialItem[] | undefined =
    cmsTestimonials.length > 0
      ? cmsTestimonials.map((t) => ({
          quote: t.quote,
          author: t.name,
          location: t.location,
          image: t.avatarKey ? `/api/media/${t.avatarKey}` : undefined,
        }))
      : undefined;

  return (
    <main className="flex-1 flex flex-col">
      <Preloader />
      <ScrollToTop />
      <Navbar />
      <Hero />
      <About />
      <GalleryPreview />
      <Testimonials items={formattedTestimonials} />
      <FAQ />
      <CTA />
      <Footer />
    </main>
  );
}
