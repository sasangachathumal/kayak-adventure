export type GalleryItem = {
  id: string;
  type: 'image' | 'video';
  key: string;          // R2 object key
  contentType: string;
  alt: string;
  span: 'normal' | 'tall';
  createdAt: number;
};

export type Testimonial = {
  id: string;
  name: string;
  location: string;
  quote: string;
  avatarKey?: string;   // R2 object key (optional)
  createdAt: number;
};