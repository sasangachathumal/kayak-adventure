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
  width?: number;
  height?: number;
  createdAt: number;
};

export type Testimonial = {
  id: string;
  name: string;
  location: string;
  quote: string;
  rating?: number;      // 1 to 5 stars (default: 5)
  avatarKey?: string;   // R2 object key (optional)
  createdAt: number;
};