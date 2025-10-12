
import { React } from 'react';

import './App.css';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Nav from './components/Nav/Nav';
import Index from './components/Pages/Index';
import ProductDetails from './components/Pages/ProductDetails';
import Wishlist from './components/Pages/Wishlist';
import Cart from './components/Pages/Cart';
import Checkout from './components/Pages/Checkout';
import Footer from './components/Footer/Footer';

function App() {

  return (
    <>
      <Nav />
      <Routes>
        <Route path='/' element={<Index />} />
        <Route path='/product/:id' element={<ProductDetails />} />
        <Route path='/wishlist' element={<Wishlist />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/checkout' element={<Checkout />} />
      </Routes>
      <Footer />
    </>
  )
}

export default App;
