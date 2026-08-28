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
import { getTestimonials, getGallery, getFAQs, getSiteSettings } from "@/lib/content";

export const dynamic = "force-dynamic";

export default async function Home() {
  const [cmsTestimonials, cmsGallery, cmsFaqs, siteSettings] = await Promise.all([
    getTestimonials(),
    getGallery(),
    getFAQs(),
    getSiteSettings(),
  ]);

  const visibleTestimonials = cmsTestimonials.filter((t) => !t.hidden);
  const formattedTestimonials: TestimonialItem[] | undefined =
    visibleTestimonials.length > 0
      ? visibleTestimonials.map((t) => ({
          quote: t.quote,
          author: t.name,
          location: t.location,
          rating: t.rating ?? 5,
          image: t.avatarKey ? `/api/media/${t.avatarKey}` : undefined,
        }))
      : undefined;

  const cmsGalleryImages: string[] = cmsGallery
    .filter((item) => !item.hidden && item.type === "image")
    .map((item) => `/api/media/${item.key}`);

  return (
    <main className="flex-1 flex flex-col">
      <Preloader />
      <ScrollToTop />
      <Navbar settings={siteSettings} />
      <Hero settings={siteSettings} />
      <About />
      <GalleryPreview images={cmsGalleryImages.length > 0 ? cmsGalleryImages : undefined} />
      <Testimonials items={formattedTestimonials} />
      <FAQ items={cmsFaqs} />
      <CTA settings={siteSettings} />
      <Footer settings={siteSettings} />
    </main>
  );
}
