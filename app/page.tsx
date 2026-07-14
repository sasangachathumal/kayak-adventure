import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Gallery from "@/components/Gallery";
import Testimonials from "@/components/Testimonials";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import Preloader from "@/components/Preloader";

export default function Home() {
  return (
    <main className="flex-1 flex flex-col">
      <Preloader />
      <ScrollToTop />
      <Navbar />
      <Hero />
      <About />
      <Gallery />
      <Testimonials />
      <CTA />
      <Footer />
    </main>
  );
}
