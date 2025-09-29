
import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';

export default function Wishlist() {
  const [ wishlist, setWishlist ] = useState([]);
  const [ cart, setCart ] = useState([]);

  useEffect(() => {
    const storedWishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setWishlist(storedWishlist);
    setCart(storedCart);  
  }, []);

  const removeFromWishlist = (productId) => {
    const updatedWishlist = wishlist.filter(item => item.id !== productId);
    setWishlist(updatedWishlist);
    localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
    window.dispatchEvent(new Event('cartUpdated'));
    toast.error('Item removed from wishlist');
  };

  const addToCart = (product) => {
    const existingProduct = cart.find(item => item.id === product.id);
    let updatedCart;

    if (existingProduct) {
      updatedCart = cart.map(item => 
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      )
    }
  }

  return (
    <div>Wishlist</div>
  )
}
