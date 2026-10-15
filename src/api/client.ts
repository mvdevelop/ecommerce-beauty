import type { ApiListParams, ApiProduct, Brand, Category, DemoUser } from '../types/api';

const API_URL = (import.meta.env.VITE_API_URL as string | undefined) ?? 'http://localhost:3001';

export class ApiError extends Error {
  constructor(public readonly status: number, message: string) {
    super(message);
    this.name = 'ApiError';
  }
}

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`${API_URL}${path}`, {
    ...init,
    headers: { Accept: 'application/json', ...init?.headers },
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
export const getDemoUser = (id: string) => request<DemoUser>(`/users/${encodeURIComponent(id)}`);
