import { redirect } from 'next/navigation';
import { isAuthed } from '@/lib/auth';
import { getGallery, getFeaturedGallery, getTestimonials, getFAQs, getSiteSettings } from '@/lib/content';
import AdminDashboard from './AdminDashboard';

export const dynamic = 'force-dynamic';

export default async function AdminPage() {
  const authed = await isAuthed();
  if (!authed) {
    redirect('/admin/login');
  }

  const [gallery, featuredGallery, testimonials, faqs, settings] = await Promise.all([
    getGallery(),
    getFeaturedGallery(),
    getTestimonials(),
    getFAQs(),
    getSiteSettings(),
  ]);

  return (
    <AdminDashboard
      gallery={gallery}
      featuredGallery={featuredGallery}
      testimonials={testimonials}
      faqs={faqs}
      settings={settings}
    />
  );
}
