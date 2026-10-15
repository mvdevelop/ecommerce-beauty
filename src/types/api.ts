export interface ApiProduct {
  id: string;
  name: string;
  slug: string;
  price: number;
  compareAtPrice?: number;
  currency: string;
  image: string;
  secondImage?: string;
  category: string;
  brand: string;
  rating: number;
  reviewCount: number;
  stock: number;
  tags: string[];
  description: string;
  featured: boolean;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
}

export interface Brand extends Category {}

export interface DemoUser {
  id: string;
  email: string;
  displayName: string;
  role: 'customer' | 'admin';
}

export interface ApiListParams {
  q?: string;
  category?: string;
  brand?: string;
  page?: number;
  limit?: number;
}
