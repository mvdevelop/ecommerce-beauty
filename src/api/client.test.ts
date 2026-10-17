import { describe, expect, it, vi } from 'vitest';
import { ApiError, listProducts } from './client';

describe('API client', () => {
  it('builds encoded product filters', async () => {
    const fetchMock = vi.spyOn(globalThis, 'fetch').mockResolvedValue(new Response('[]', { status: 200 }));
    await listProducts({ q: 'glow serum', category: 'skincare', page: 2, limit: 12 });
    expect(fetchMock).toHaveBeenCalledWith(
      '/api/products?name%3Acontains=glow+serum&category=skincare&_page=2&_per_page=12',
      expect.objectContaining({ headers: { Accept: 'application/json', 'Content-Type': 'application/json' } }),
    );
    fetchMock.mockRestore();
  });

  it('unwraps the paginated response envelope', async () => {
    const fetchMock = vi.spyOn(globalThis, 'fetch').mockResolvedValue(new Response(JSON.stringify({ first: 1, last: 1, items: 1, data: [{ id: '1' }] }), { status: 200 }));
    await expect(listProducts({ page: 1, limit: 1 })).resolves.toEqual([{ id: '1' }]);
    fetchMock.mockRestore();
  });

  it('raises ApiError for failed requests', async () => {
    const fetchMock = vi.spyOn(globalThis, 'fetch').mockResolvedValue(new Response('', { status: 500 }));
    await expect(listProducts()).rejects.toBeInstanceOf(ApiError);
    fetchMock.mockRestore();
  });
});
