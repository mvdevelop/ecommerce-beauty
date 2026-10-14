export function parsePrice(value: string): number {
  const normalized = value.replace(/[^\d.-]/g, '');
  const parsed = Number.parseFloat(normalized);
  return Number.isFinite(parsed) ? parsed : 0;
}

export function calculateCartTotal(items: ReadonlyArray<{ price: string; quantity: number }>): number {
  return items.reduce((total, item) => total + parsePrice(item.price) * item.quantity, 0);
}

export function formatPrice(value: number): string {
  return `$${value.toFixed(2)}`;
}
