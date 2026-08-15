export interface ServiceItem {
  id: string;
  tag: string;
  title: string;
  description: string;
  image: string;
}

export interface ProjectItem {
  id: number;
  title: string;
  category: string;
  categoryKey: 'all' | 'ecommerce' | 'web' | 'corporate' | 'ads';
  image: string;
  results: string;
  url: string;
}

export interface TestimonialItem {
  id: number;
  name: string;
  company: string;
  role: string;
  text: string;
  rating: number;
  avatar: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface MethodologyStep {
  step: string;
  title: string;
  description: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  website?: string;
  goal: string;
  budget: string;
  contact_confirmation?: string;
}

export interface ContactApiResponse {
  success: boolean;
  message: string;
  lead_id?: number;
}
