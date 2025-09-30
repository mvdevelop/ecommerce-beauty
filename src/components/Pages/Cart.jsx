
import React, { useEffect, useState } from 'react';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { Link } from 'react-router-dom';

export default function Cart() {

  const [ cartItems, setCartItems ] = useState([]);

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCartItems(savedCart);
  }, []);

  const updateQuantity = (id, type) => {
    if (NavItem.id === id) {
      if (type === 'increase') {
        return { ...item, quantity: item.quantity + 1 };
      }
    }
  }

  return (
    <div>Cart</div>
  )
}
