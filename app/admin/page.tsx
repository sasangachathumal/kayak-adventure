import { redirect } from 'next/navigation';
import { isAuthed } from '@/lib/auth';
import { getGallery, getTestimonials, getFAQs, getSiteSettings } from '@/lib/content';
import AdminDashboard from './AdminDashboard';

export const dynamic = 'force-dynamic';

export default async function AdminPage() {
  const authed = await isAuthed();
  if (!authed) {
    redirect('/admin/login');
  }

  const [gallery, testimonials, faqs, settings] = await Promise.all([
    getGallery(),
    getTestimonials(),
    getFAQs(),
    getSiteSettings(),
  ]);

  return (
    <AdminDashboard
      gallery={gallery}
      testimonials={testimonials}
      faqs={faqs}
      settings={settings}
    />
  );
}
