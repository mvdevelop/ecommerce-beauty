import { describe, expect, it, vi } from 'vitest';
import { ApiError, listProducts } from './client';

describe('API client', () => {
  it('builds encoded product filters', async () => {
    const fetchMock = vi.spyOn(globalThis, 'fetch').mockResolvedValue(new Response('[]', { status: 200 }));
    await listProducts({ q: 'glow serum', category: 'skincare', page: 2, limit: 12 });
    expect(fetchMock).toHaveBeenCalledWith(
      'http://localhost:3001/products?name_like=glow+serum&category=skincare&_page=2&_limit=12',
      expect.objectContaining({ headers: { Accept: 'application/json' } }),
    );
    fetchMock.mockRestore();
  });

  it('raises ApiError for failed requests', async () => {
    const fetchMock = vi.spyOn(globalThis, 'fetch').mockResolvedValue(new Response('', { status: 500 }));
    await expect(listProducts()).rejects.toBeInstanceOf(ApiError);
    fetchMock.mockRestore();
  });
});
