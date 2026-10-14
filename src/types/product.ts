export type ProductTag = 'New' | 'Sale';

export interface Product {
  id: number;
  image: string;
  secondImage: string;
  ProductName: string;
  price: string;
  oldPrice?: string;
  tag?: ProductTag;
}

export interface CartItem extends Product {
  quantity: number;
}
