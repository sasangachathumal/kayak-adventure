export interface CloudflareEnv {
  kayak_CMS_KV: KVNamespace;
  kayak_adventure_gallery: R2Bucket;
  ADMIN_SECRET: string;
  AUTH_SECRET: string;
}

export type GalleryItem = {
  id: string;
  type: 'image' | 'video';
  key: string;          // R2 object key
  contentType: string;
  alt: string;
  span: 'normal' | 'tall';
  hidden?: boolean;     // If true, hidden from public gallery
  width?: number;
  height?: number;
  createdAt: number;
};

export type TestimonialPlatform = 'google' | 'facebook' | 'instagram' | 'whatsapp' | 'tripadvisor';

export type Testimonial = {
  id: string;
  name: string;
  location: string;
  quote: string;
  rating?: number;      // 1 to 5 stars (default: 5)
  platform?: TestimonialPlatform; // Origin platform of the review
  hidden?: boolean;     // If true, hidden from public website
  avatarKey?: string;   // R2 object key (optional)
  createdAt: number;
};

export type FAQItem = {
  id: string;
  question: string;
  answer: string;
  hidden?: boolean;
  order?: number;
};

export type AnnouncementBar = {
  enabled: boolean;
  text: string;
  linkText?: string;
  linkUrl?: string;
};

export type SiteSettings = {
  announcement?: AnnouncementBar;
  whatsappNumber?: string;
  phoneNumber?: string;
  email?: string;
  operatingHours?: string;
  tourPricingNotice?: string;
};