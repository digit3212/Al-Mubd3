import { LucideIcon } from 'lucide-react';

export interface NavItem {
  label: string;
  path: string;
  icon: LucideIcon;
  isHeader?: boolean;
}

export enum GenerationType {
  ARTICLE = 'ARTICLE',
  IMAGE = 'IMAGE',
  SEO = 'SEO'
}

export interface GeneratedContent {
  id: string;
  type: GenerationType;
  content: string; // Text or Image URL
  createdAt: Date;
}

export interface FaqItem {
  question: string;
  answer: string;
}
