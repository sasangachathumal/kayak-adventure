import { getEnv } from './cf';
import type { GalleryItem, Testimonial, FAQItem, SiteSettings } from './types';

const GALLERY_KEY = 'gallery';
const TESTIMONIALS_KEY = 'testimonials';
const FAQS_KEY = 'faqs';
const SETTINGS_KEY = 'settings';

export const DEFAULT_FAQS: FAQItem[] = [
  {
    id: 'faq-1',
    question: 'Do I need any previous kayaking experience?',
    answer:
      'No experience is necessary! Our tours are designed to be beginner-friendly. Our professional guides provide a full safety briefing and basic paddling instructions on the shore before we launch into the water.',
  },
  {
    id: 'faq-2',
    question: 'What should I wear and bring with me?',
    answer:
      "We recommend light, quick-dry clothing, swimwear or shorts, and water sandals. Don't forget sunscreen, a hat, sunglasses, and a waterproof camera or phone pouch. We provide safety life jackets and dry bags for your belongings.",
  },
  {
    id: 'faq-3',
    question: 'Is there an age limit for the mangrove kayak tours?',
    answer:
      'Our tours are suitable for participants aged 6 and up. Children must be accompanied by an adult. For safety reasons, every participant must wear a properly fitted life jacket (provided by us) while on the water.',
  },
  {
    id: 'faq-4',
    question: 'How long does the tour typically last?',
    answer:
      'Our Rathgama mangrove kayaking tours typically last 1 to 3 hours (customizable based on your preference). This runs at a relaxed, leisurely pace, allowing plenty of time to explore narrow mangrove canals, spot wildlife, and take pictures.',
  },
  {
    id: 'faq-5',
    question: 'What happens in case of bad weather?',
    answer:
      'A light tropical drizzle won\'t stop the tour—in fact, paddling under the rain can be a magical experience in the mangroves! However, in the event of heavy downpours, high winds, or lightning, we will postpone or reschedule the tour for your safety.',
  },
  {
    id: 'faq-6',
    question: 'What is the group size for a tour?',
    answer:
      'Our standard group size is 1 to 12 people. For groups larger than 12 participants, please confirm and book early so we can arrange additional guides and equipment for your group.',
  },
  {
    id: 'faq-7',
    question: 'What languages do the guides speak?',
    answer:
      'Our guides speak English and Sinhala, ensuring clear instructions, safety briefings, and local storytelling throughout your tour.',
  },
];

export const DEFAULT_SETTINGS: SiteSettings = {
  announcement: {
    enabled: false,
    text: 'Early Bird Special: 15% off sunrise tours this week!',
    linkText: 'Contact Us',
    linkUrl: '/contact',
  },
  whatsappNumber: '+94771234567',
  phoneNumber: '+94 77 123 4567',
  email: 'info@kayakadventuresrilanka.com',
  operatingHours: '6:00 AM – 6:30 PM (Daily)',
  tourPricingNotice: 'Starting from $25 / person',
};

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

export async function getFAQs(): Promise<FAQItem[]> {
  try {
    const env = await getEnv();
    if (!env?.kayak_CMS_KV) return DEFAULT_FAQS;
    const faqs = (await env.kayak_CMS_KV.get(FAQS_KEY, 'json')) as FAQItem[] | null;
    return faqs && faqs.length > 0 ? faqs : DEFAULT_FAQS;
  } catch {
    return DEFAULT_FAQS;
  }
}

export async function getSiteSettings(): Promise<SiteSettings> {
  try {
    const env = await getEnv();
    if (!env?.kayak_CMS_KV) return DEFAULT_SETTINGS;
    const settings = (await env.kayak_CMS_KV.get(SETTINGS_KEY, 'json')) as SiteSettings | null;
    return settings ? { ...DEFAULT_SETTINGS, ...settings } : DEFAULT_SETTINGS;
  } catch {
    return DEFAULT_SETTINGS;
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

export async function saveFAQs(list: FAQItem[]): Promise<void> {
  const env = await getEnv();
  await env.kayak_CMS_KV.put(FAQS_KEY, JSON.stringify(list));
}

export async function saveSiteSettings(settings: SiteSettings): Promise<void> {
  const env = await getEnv();
  await env.kayak_CMS_KV.put(SETTINGS_KEY, JSON.stringify(settings));
}

export function getContactLinks(settings?: Partial<SiteSettings>) {
  const whatsappNumber = settings?.whatsappNumber || DEFAULT_SETTINGS.whatsappNumber!;
  const phoneNumber = settings?.phoneNumber || DEFAULT_SETTINGS.phoneNumber!;
  const email = settings?.email || DEFAULT_SETTINGS.email!;
  const operatingHours = settings?.operatingHours || DEFAULT_SETTINGS.operatingHours!;
  const tourPricingNotice = settings?.tourPricingNotice || DEFAULT_SETTINGS.tourPricingNotice!;

  const waDigits = (whatsappNumber || '').replace(/\D/g, '');
  const waUrl = waDigits ? `https://wa.me/${waDigits}?text=Hello!` : 'https://wa.me/94761122261?text=Hello!';

  const telDigits = (phoneNumber || '').replace(/[^\d+]/g, '');
  const telUrl = telDigits ? `tel:${telDigits}` : 'tel:+94761122261';

  const mailtoUrl = email ? `mailto:${email}` : 'mailto:hello@kayakadventure.lk';

  return {
    whatsappNumber,
    phoneNumber,
    email,
    operatingHours,
    tourPricingNotice,
    waUrl,
    telUrl,
    mailtoUrl,
  };
}
