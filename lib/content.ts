import { getEnv } from './cf';
import type { GalleryItem, Testimonial } from './types';

const GALLERY_KEY = 'gallery';
const TESTIMONIALS_KEY = 'testimonials';

// ---- reads (used by public Server Components & admin) ----
export async function getGallery(): Promise<GalleryItem[]> {
  try {
    const env = await getEnv();
    if (!env?.kayak_CMS_KV) return [];
    return ((await env.kayak_CMS_KV.get(GALLERY_KEY, 'json')) as GalleryItem[]) ?? [];
  } catch {
    return [];
  }
}

export async function getTestimonials(): Promise<Testimonial[]> {
  try {
    const env = await getEnv();
    if (!env?.kayak_CMS_KV) return [];
    return ((await env.kayak_CMS_KV.get(TESTIMONIALS_KEY, 'json')) as Testimonial[]) ?? [];
  } catch {
    return [];
  }
}

// ---- writes (used by protected admin routes) ----
export async function saveGallery(list: GalleryItem[]): Promise<void> {
  const env = await getEnv();
  await env.kayak_CMS_KV.put(GALLERY_KEY, JSON.stringify(list));
}

export async function saveTestimonials(list: Testimonial[]): Promise<void> {
  const env = await getEnv();
  await env.kayak_CMS_KV.put(TESTIMONIALS_KEY, JSON.stringify(list));
}
