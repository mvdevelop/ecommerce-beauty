
import React, { useState } from 'react';

import '../../index.css';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';

// Data
import Products from '../../Product.json';
import { Link, useNavigate } from 'react-router-dom';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Index() {

  const [ filterSortOption, setFilterSortOption ] = useState('all');

  const navigate = useNavigate();

  const addToWishlist = (product) => {
    const existing = JSON.parse(localStorage.getItem('wishlist')) || [];
    if(!existing.some(p => p.id === product.id)) {
      const updated = [...existing, product];
      localStorage.setItem('wishlist', JSON.stringify(updated));
      window.dispatchEvent(new Event('wishlistUpdated'));
      toast.success(`${product.ProductName} added to your wishlist.`);
    } else {
     toast.info(`${product.ProductName} is already in your wishlist.`); 
    }
  }

  const addToCart = (product) => {
    const existing = JSON.parse(localStorage.getItem('cart')) || [];
    const alreadyInCart = existing.find(p => p.id === product.id);

    if(!alreadyInCart) {
      const updatedProduct = {...product, quantity: 1};
      const updatedCart = [...existing, updatedProduct];
      localStorage.setItem('cart', JSON.stringify(updatedCart));
      window.dispatchEvent(new Event('cartUpdated'));
      toast.success(`${product.ProductName} added to your Cart!`);
    } else {
     toast.info(`${product.ProductName} is already in your Cart!`); 
    }
  }

  return (
    <>
      {/* Hero */}
      <div className='hero'>
        <Swiper 
          slidesPerView={1} 
          spaceBetween={0} 
          modules={[Autoplay]} 
          loop={true} 
          autoplay={{ delay: 3000 }}
        >
          <SwiperSlide>
            <div className='hero-wrap hero-wrap1'>
              <div className='hero-content'>
                <h5>- ESSENTIAL ITEMS -</h5>
                <h1>Beauty Inspired <br /> by Real Life</h1>
                <p className='my-3'>Made using clean, non-toxic ingredients, our products are designed for everyone.</p>
                <a href="#" className='btn hero-btn mt-3'>Shop Now</a>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className='hero-wrap hero-wrap2'>
              <div className='hero-content'>
                <h5>- NEW COLLECTION -</h5>
                <h1>Get The Perfectly Hydrated Skin</h1>
                <p className='my-3'>Made using clean, non-toxic ingredients, our products are designed for everyone.</p>
                <a href="#" className='btn hero-btn mt-3'>Shop Now</a>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className='hero-wrap hero-wrap3'>
              <div className='hero-content'>
                <h5>- GET THE GLOW -</h5>
                <h1>Be Your Kind <br /> of Beauty</h1>
                <p className='my-3'>Made using clean, non-toxic ingredients, our products are designed for everyone.</p>
                <a href="#" className='btn hero-btn mt-3'>Shop Now</a>
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>

      {/* Products */}
      <div className='product-container py-5 my-5'>
        <div className="container position-relative">
          <div className="row">
            <div className="section-title mb-5 product-title text-center">
              <h2 className="fw-semibold fs-1">Our Featured Products</h2>
              <p className='text-muted'>Get the skin you want to feel</p>
            </div>
          </div>
          <Swiper 
            slidesPerView={4} 
            spaceBetween={20} 
            modules={[Navigation]} 
            navigation
            breakpoints={{
              1399:{slidesPerView:4}, 
              1199:{slidesPerView:3}, 
              991:{slidesPerView:2}, 
              767:{slidesPerView:1.5}, 
              0:{slidesPerView:1}
            }} 
            className='mt-4 swiper position-relative'
          >
              {Products.filter(product => product.id >= 5 && product.id <= 10).map(product => (
                <SwiperSlide key={product.id}>
                  <div className="product-item text-center position-relative">
                    <div className="product-image w-100 position-relative overflow-hidden">
                      <img src={product.image} className='img-fluid' alt="" />
                      <img src={product.secondImage} className='img-fluid' alt="" />
                      <div className='product-icons gap-3'>
                        <div className='product-icon' title='Add to Wishlist' onClick={() => addToWishlist(product)}>
                          <i className="bi bi-heart fs-5"></i>
                        </div>
                        <div className='product-icon' title='Add to Cart' onClick={() => addToCart(product)}>
                          <i className="bi bi-cart3 fs-5"></i>
                        </div>
                      </div>
                      <span className={`tag badge text-white ${product.tag === 'New' ? 'bg-black' : 'bg-success'}`}>
                        {product.tag}
                      </span>
                    </div>
                    <Link to={`/product/${product.id}`} className='text-decoration-none text-black'>
                      <div className="product-content pt-3">
                        <span className='price text-decoration-none'>{product.price}</span>
                        <h3 className="title pt-1">{product.ProductName}</h3>
                      </div>
                    </Link>
                  </div>
                </SwiperSlide>
              ))}
          </Swiper>
        </div>
      </div>
    </>
  )
}
