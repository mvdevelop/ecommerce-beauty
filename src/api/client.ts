import type { ApiCart, ApiListParams, ApiOrder, ApiProduct, Brand, Category, DemoUser, Review } from '../types/api';

const API_URL = (import.meta.env.VITE_API_URL as string | undefined)?.replace(/\/$/, '') || (import.meta.env.DEV ? '/api' : '');

export class ApiError extends Error {
  constructor(public readonly status: number, message: string) {
    super(message);
    this.name = 'ApiError';
  }
}

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`${API_URL}${path}`, {
    ...init,
    headers: { Accept: 'application/json', 'Content-Type': 'application/json', ...init?.headers },
  });
  if (!response.ok) throw new ApiError(response.status, `API request failed with status ${response.status}`);
  return response.json() as Promise<T>;
}

export function listProducts(params: ApiListParams = {}) {
  const search = new URLSearchParams();
  if (params.q) search.set('name_like', params.q);
  if (params.category) search.set('category', params.category);
  if (params.brand) search.set('brand', params.brand);
  if (params.page) search.set('_page', String(params.page));
  if (params.limit) search.set('_limit', String(params.limit));
  const query = search.toString();
  return request<ApiProduct[]>(`/products${query ? `?${query}` : ''}`);
}

export const getProduct = (id: string) => request<ApiProduct>(`/products/${encodeURIComponent(id)}`);
export const listCategories = () => request<Category[]>('/categories');
export const listBrands = () => request<Brand[]>('/brands');
export const listReviews = (productId: string) => request<Review[]>(`/reviews?productId=${encodeURIComponent(productId)}`);
export const getDemoUser = (id: string) => request<DemoUser>(`/users/${encodeURIComponent(id)}`);
export const getCart = (userId: string) => request<ApiCart[]>(`/carts?userId=${encodeURIComponent(userId)}`);
export const saveCart = (cart: ApiCart) => request<ApiCart>(`/carts/${encodeURIComponent(cart.id)}`, { method: 'PATCH', body: JSON.stringify(cart) });
export const listOrders = (userId: string) => request<ApiOrder[]>(`/orders?userId=${encodeURIComponent(userId)}`);
export const createOrder = (order: Omit<ApiOrder, 'id'>) => request<ApiOrder>('/orders', { method: 'POST', body: JSON.stringify(order) });
export const listFavorites = (userId: string) => request<ApiProduct[]>(`/favorites?userId=${encodeURIComponent(userId)}`);
export const addFavorite = (userId: string, productId: string) => request<{ id: string }>('/favorites', { method: 'POST', body: JSON.stringify({ userId, productId }) });
export const removeFavorite = (id: string) => request<void>(`/favorites/${encodeURIComponent(id)}`, { method: 'DELETE' });
