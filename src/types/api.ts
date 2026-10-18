export interface ApiProduct { id: string; name: string; slug: string; price: number; compareAtPrice?: number; currency: string; image: string; secondImage?: string; category: string; brand: string; rating: number; reviewCount: number; stock: number; tags: string[]; description: string; nameI18n?: Partial<Record<'pt-BR' | 'en' | 'es', string>>; descriptionI18n?: Partial<Record<'pt-BR' | 'en' | 'es', string>>; featured: boolean; }
export interface Category { id: string; name: string; slug: string; }
export type Brand = Category
export interface DemoUser { id: string; email: string; displayName: string; role: 'customer' | 'admin'; }
export interface Review { id: string; productId: string; userId: string; rating: number; title: string; body: string; status: 'published' | 'pending'; demo?: boolean; }
export interface CartLine { productId: string; quantity: number; }
export interface ApiCart { id: string; userId: string; items: CartLine[]; updatedAt: string; }
export type OrderStatus = 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled';
export interface ApiOrder { id: string; userId: string; items: CartLine[]; status: OrderStatus; total: number; currency: string; createdAt: string; }
export interface Favorite { id: string; userId: string; productId: string; }
export interface ApiListParams { q?: string; category?: string; brand?: string; page?: number; limit?: number; }
