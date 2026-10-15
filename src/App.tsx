import './App.css';
import './components/motion/motion.css';
import './components/ui/ui.css';
import AnnouncementBar from './components/layout/AnnouncementBar';
import './components/layout/layout.css';
import './components/cart/cart.css';
import { Routes, Route } from 'react-router-dom';
import Nav from './components/Nav/Nav';
import Index from './components/Pages/Index';
import ProductDetails from './components/Pages/ProductDetails';
import Wishlist from './components/Pages/Wishlist';
import Cart from './components/Pages/Cart';
import Checkout from './components/Pages/Checkout';
import About from './components/Pages/About';
import Shop from './components/Pages/Shop';
import Stores from './components/Pages/Stores';
import Blog from './components/Pages/Blog';
import Contact from './components/Pages/Contact';
import Search from './components/Pages/Search';
import Login from './components/Pages/Login';
import Account from './components/Pages/Account';
import Orders from './components/Pages/Orders';
import Favorites from './components/Pages/Favorites';
import ProtectedRoute from './components/auth/ProtectedRoute';
import Footer from './components/Footer/Footer';

export default function App() {
  return <><AnnouncementBar /><Nav /><Routes><Route path="/" element={<Index />} /><Route path="/product/:id" element={<ProductDetails />} /><Route path="/wishlist" element={<Wishlist />} /><Route path="/cart" element={<Cart />} /><Route path="/checkout" element={<Checkout />} /><Route path="/about" element={<About />} /><Route path="/shop" element={<Shop />} /><Route path="/search" element={<Search />} /><Route path="/login" element={<Login />} /><Route path="/account" element={<ProtectedRoute><Account /></ProtectedRoute>} /><Route path="/account/orders" element={<ProtectedRoute><Orders /></ProtectedRoute>} /><Route path="/account/favorites" element={<ProtectedRoute><Favorites /></ProtectedRoute>} /><Route path="/store" element={<Stores />} /><Route path="/blog" element={<Blog />} /><Route path="/contact" element={<Contact />} /></Routes><Footer /></>;
}
