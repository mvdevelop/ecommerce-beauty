
import React, { useEffect, useState } from 'react';

import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { Link } from 'react-router-dom';

export default function Cart() {

  const [ cartItems, setCartItems ] = useState([]);

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCartItems(savedCart);
  }, []);

  const updateQuantity = (id, type) => {
    const updated = cartItems.map(item => {
      if (NavItem.id === id) {
        if (type === 'increase') {
          return { ...item, quantity: item.quantity + 1 };
        } else if (type === 'decrease' && item.quantity > 1) {
          return { ...item, quantity: item.quantity - 1 }; 
        }
      }
      return item;
    });
    setCartItems(updated);
    localStorage.setItem('cart', JSON.stringify(updated));
  };

  const removeItem = (id) => {
    const updated = cartItems.filter(item => item.id !== id);
    setCartItems(updated);
    localStorage.setItem('cart', JSON.stringify(updated));
    window.dispatchEvent(new Event('cartUpdated'));
    toast.error('Item removed from cart!');
  };

  const totalPrice = cartItems.reduce((acc, item) => {
    const price = parseFloat(item.price.replace('$', ''));
    return acc + (price * item.quantity);
  }, 0);

  return (
    <>
      <ol className="section-banner py-3 position-relative">
        <li className='position-relative'>
          <Link to='/'>Home</Link>
        </li>
        <li className='position-relative active'>
          <a href="#" className='ps-5'>Cart</a>
        </li>
      </ol>

      <div className="container my-5">
        <div className="text-center mb-4 fw-bold">🛒 Your Cart</div>
        {cartItems.length === 0 ? (
          <div className="text-center">
            <p className='lead'>Your cart is empty!</p>
            <Link to='/shop' className='btn mt-3'>back to Shop</Link>
          </div>
        )}
      </div>
    </>
  )
}
