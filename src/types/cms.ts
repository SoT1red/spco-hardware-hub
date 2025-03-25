
export interface BaseContent {
  id: string;
  created_at: string;
  updated_at: string;
}

export interface HeroContent extends BaseContent {
  title: string;
  subtitle: string;
  button_text: string;
  button_link: string;
  background_image: string;
}

export interface PartnerContent extends BaseContent {
  name: string;
  logo: string;
  order: number;
}

export interface TestimonialContent extends BaseContent {
  content: string;
  author: string;
  title: string;
  company: string;
  rating: number;
  order: number;
}

export interface ProductCategoryContent extends BaseContent {
  name: string;
  description: string;
  image: string;
  order: number;
}

export interface IndustryContent extends BaseContent {
  id: string;
  name: string;
  description: string;
  image: string;
  products_count: number;
}

export interface ProductContent extends BaseContent {
  name: string;
  category: string;
  subcategory?: string;
  image: string;
  specifications: Record<string, string | number>;
  description: string;
}

export interface ContactInfoContent extends BaseContent {
  section: string; // 'address', 'phone', 'email', 'hours'
  title: string;
  details: string[];
}

export interface FAQContent extends BaseContent {
  question: string;
  answer: string;
  order: number;
}

export interface GeneralContent extends BaseContent {
  key: string;  // 'about_intro', 'contact_intro', etc.
  content: string;
}
