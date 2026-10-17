import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../home/home.css';
import blogsData from '../../Blogs.json';
import { getWishlist, saveWishlist, getCart, saveCart } from '../../lib/storage';
import { isBlogPost, parseCollection } from '../../lib/runtime';
import { localProducts } from '../../lib/catalog';
import { MESSAGES } from '../../lib/messages';
import type { Product } from '../../types/product';
import { BrandShowcase, DiscoverSection, EditorialSection, FeaturedProductsSection, HeroSection, NewsletterSection, PromoBannerSection, ServiceHighlights } from '../home/HomeSections';

const posts = parseCollection(blogsData, isBlogPost);

export default function Index() {
  // Home sections consume useLanguage internally; this page only orchestrates data.
  const addToWishlist = (product: Product) => {
    const wishlist = getWishlist();
    if (wishlist.some((item) => item.id === product.id)) { toast.info(MESSAGES.wishlistExists); return; }
    saveWishlist([...wishlist, product]); toast.success(MESSAGES.wishlistAdded);
  };
  const addToCart = (product: Product) => {
    const cart = getCart();
    if (cart.some((item) => item.id === product.id)) { toast.info(MESSAGES.cartExists); return; }
    saveCart([...cart, { ...product, quantity: 1 }]); toast.success(MESSAGES.cartAdded);
  };

  return <><main><HeroSection /><ServiceHighlights /><FeaturedProductsSection products={localProducts} wishlistedIds={getWishlist().map((item) => item.id)} onWishlist={addToWishlist} onCart={addToCart} /><PromoBannerSection /><DiscoverSection /><BrandShowcase /><EditorialSection posts={posts} /><NewsletterSection /></main><ToastContainer /></>;
}