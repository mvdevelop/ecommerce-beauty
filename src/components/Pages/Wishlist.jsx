
import React, { useEffect, useState } from 'react';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { Link } from 'react-router-dom';

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
      );
    } else {
      updatedCart = [...cart, { ...product, quantity: 1 }];
    }

    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    window.dispatchEvent(new Event('cartUpdated'));

    toast.success(`${product.ProductName} Added to your Cart!`, {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  }

  return (
    <>
      <ol className="section-banner py-3 position-relative">
        <li className='position-relative'>
          <Link to='/'>Home</Link>
        </li>
        <li className='position-relative active'>
          <a href="#" className='ps-5'>Wishlist</a>
        </li>
      </ol>

      <div className="container my-5">
        <h2 className='text-center fw-bold mb-4'>❤️ Your Wishlist</h2>

        {wishlist.length === 0 ? (
          <div className="text-center">
            <p className="lead text-muted">Your wishlist is empty!</p>
            <Link to='/shop' className='btn'>
              <i className="ri-shopping-bag-line me-2"></i> Browse Products
            </Link>
          </div>
        ): (
          <div className="row row-cols-1 row-cols-sm-2 row-cols-md-4 g-4">
            {wishlist.map(product => (
              <div className="col" key={product.id}>
                <div className="card h-100 shadow-sm border-0">
                  <div className="position-relative overflow-hidden" style={{ height: '200px', backgroundColor: '#f8f9fa' }}>
                    <img src={product.image} className='card-img-top h-100 object-fit-cover' alt="" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  )
}
