import './App.css';
import './components/motion/motion.css';
import './components/ui/ui.css';
import { Routes, Route } from 'react-router-dom';
import Nav from './components/Nav/Nav.tsx';
import Index from './components/Pages/Index.tsx';
import ProductDetails from './components/Pages/ProductDetails.tsx';
import Wishlist from './components/Pages/Wishlist.tsx';
import Cart from './components/Pages/Cart.tsx';
import Checkout from './components/Pages/Checkout.tsx';
import About from './components/Pages/About.tsx';
import Shop from './components/Pages/Shop.tsx';
import Stores from './components/Pages/Stores.tsx';
import Blog from './components/Pages/Blog.tsx';
import Contact from './components/Pages/Contact.tsx';
import Search from './components/Pages/Search.tsx';
import Footer from './components/Footer/Footer.tsx';

export default function App() {
  return <><Nav /><Routes><Route path="/" element={<Index />} /><Route path="/product/:id" element={<ProductDetails />} /><Route path="/wishlist" element={<Wishlist />} /><Route path="/cart" element={<Cart />} /><Route path="/checkout" element={<Checkout />} /><Route path="/about" element={<About />} /><Route path="/shop" element={<Shop />} /><Route path="/search" element={<Search />} /><Route path="/store" element={<Stores />} /><Route path="/blog" element={<Blog />} /><Route path="/contact" element={<Contact />} /></Routes><Footer /></>;
}
