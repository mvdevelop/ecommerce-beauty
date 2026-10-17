// Shared PT-BR microcopy for the feedback toasts. Kept in one place because the
// same callbacks are wired on several pages (home, shop, wishlist, PDP).
export const MESSAGES = {
  wishlistAdded: 'Produto adicionado aos favoritos.',
  wishlistExists: 'Este produto já está nos favoritos.',
  wishlistRemoved: 'Produto removido dos favoritos.',
  cartAdded: 'Produto adicionado ao carrinho.',
  cartExists: 'Este produto já está no carrinho.',
  cartRemoved: 'Produto removido do carrinho.',
  savedAdded: 'Produto salvo para depois.',
  savedMovedToCart: 'Produto movido para o carrinho.',
} as const;
