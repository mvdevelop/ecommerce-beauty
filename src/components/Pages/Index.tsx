import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../home/home.css';
import productsData from '../../Product.json';
import blogsData from '../../Blogs.json';
import { getCart, getWishlist, saveCart, saveWishlist } from '../../lib/storage';
import { isBlogPost, isProduct, parseCollection } from '../../lib/runtime';
import type { Product } from '../../types/product';
import { BrandShowcase, DiscoverSection, EditorialSection, FeaturedProductsSection, HeroSection, NewsletterSection, PromoBannerSection, ServiceHighlights } from '../home/HomeSections';

const products = parseCollection(productsData, isProduct);
const posts = parseCollection(blogsData, isBlogPost);

export default function Index() {
  const addToWishlist = (product: Product) => {
    const wishlist = getWishlist();
    if (wishlist.some((item) => item.id === product.id)) { toast.info('Product is already in your wishlist.'); return; }
    saveWishlist([...wishlist, product]); toast.success('Product added to your wishlist.');
  };
  const addToCart = (product: Product) => {
    const cart = getCart();
    if (cart.some((item) => item.id === product.id)) { toast.info('Product is already in your cart.'); return; }
    saveCart([...cart, { ...product, quantity: 1 }]); toast.success('Product added to your cart.');
  };

  return <><main><HeroSection /><ServiceHighlights /><FeaturedProductsSection products={products} onWishlist={addToWishlist} onCart={addToCart} /><PromoBannerSection /><DiscoverSection /><BrandShowcase /><EditorialSection posts={posts} /><NewsletterSection /></main><ToastContainer /></>;
}
