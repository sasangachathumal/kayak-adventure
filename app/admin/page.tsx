import { redirect } from 'next/navigation';
import { isAuthed } from '@/lib/auth';
import { getGallery, getTestimonials } from '@/lib/content';
import AdminDashboard from './AdminDashboard';

export const dynamic = 'force-dynamic';

export default async function AdminPage() {
  const authed = await isAuthed();
  if (!authed) {
    redirect('/admin/login');
  }

  const [gallery, testimonials] = await Promise.all([
    getGallery(),
    getTestimonials(),
  ]);

  return <AdminDashboard gallery={gallery} testimonials={testimonials} />;
}
