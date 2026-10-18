export type ProductTag = 'New' | 'Sale';

export interface Product {
  id: number;
  image: string;
  secondImage: string;
  ProductName: string;
  price: string;
  oldPrice?: string;
  tag?: ProductTag;
  // Optional so that products persisted in localStorage by earlier versions keep
  // validating through isProduct/isCartItem. The local Product.json mirrors the
  // API for these fields so the offline fallback can render a full page.
  category?: string;
  brand?: string;
  rating?: number;
  reviewCount?: number;
  stock?: number;
  description?: string;
  nameI18n?: Partial<Record<'pt-BR' | 'en' | 'es', string>>;
  descriptionI18n?: Partial<Record<'pt-BR' | 'en' | 'es', string>>;
}

export interface CartItem extends Product {
  quantity: number;
}
