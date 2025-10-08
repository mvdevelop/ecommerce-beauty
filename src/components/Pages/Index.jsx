
import React, { useState } from 'react';

import '../../index.css';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';

// Data
import Products from '../../Product.json';
import { Link, useNavigate } from 'react-router-dom';

import subBanner01 from '../../assets/banner-1.webp';
import subBanner02 from '../../assets/banner-2.webp';

import serviceImg01 from '../../assets/service-icon-1.svg';
import serviceImg02 from '../../assets/service-icon-2.svg';
import serviceImg03 from '../../assets/service-icon-3.svg';
import serviceImg04 from '../../assets/service-icon-4.svg';

import brand01 from '../../assets/brand-1.png';
import brand02 from '../../assets/brand-2.png';
import brand03 from '../../assets/brand-3.png';

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

      {/* Banner */}
      <div className='banners py-5'>
        <div className='container'>
          <div className='row'>
            <div className='col-lg-6 banner-card overflow-hidden position-relative'>
              <img src={subBanner01} alt="" className='img-fluid rounded banner-img' />
              <div className='banner-content position-absolute'>
                <h3>NEW COLLECTION</h3>
                <h1>Intensive Glow C+ <br /> Serum
                <br /></h1>
                <button className='btn banner-btn mt-2'>EXPLORE MORE</button>
              </div>
            </div>

            <div className='col-lg-6 banner-card overflow-hidden position-relative banner-mt'>
              <img src={subBanner02} alt="" className='img-fluid rounded banner-img' />
              <div className='banner-content banner-content2 position-absolute'>
                <h1>25% off Everything</h1>
                <p>Makeup with extended range in <br /> colors for every human.</p>
                <button className='btn banner-btn mt-2'>SHOP NOW</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Services */}
      <div className='container py-5 my-5'>
        <div className='row text-center'>
          <div className='col-lg-3 col-sm-6 mb-4'>
            <img src={serviceImg01} alt="" className='img-fluid' />
            <h4 className='mt-3 mb-1'>Free Shipping</h4>
            <p className='text-muted fs-6 fw-semibold'>Free Shipping for orders over $130.</p>
          </div>
          <div className='col-lg-3 col-sm-6 mb-4'>
            <img src={serviceImg02} alt="" className='img-fluid' />
            <h4 className='mt-3 mb-1'>Returns</h4>
            <p className='text-muted fs-6 fw-semibold'>Within 30 days for an exchange.</p>
          </div>
          <div className='col-lg-3 col-sm-6 mb-4'>
            <img src={serviceImg03} alt="" className='img-fluid' />
            <h4 className='mt-3 mb-1'>Online Support</h4>
            <p className='text-muted fs-6 fw-semibold'>24 hours a day, 7 days a week.</p>
          </div>
          <div className='col-lg-3 col-sm-6 mb-4'>
            <img src={serviceImg04} alt="" className='img-fluid' />
            <h4 className='mt-3 mb-1'>Flexible Payment</h4>
            <p className='text-muted fs-6 fw-semibold'>Pay with Multiple Credit Cards.</p>
          </div>
        </div>
      </div>

      {/* Seen in */}


      <ToastContainer 
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        pauseOnHover
        draggable
      />
    </>
  )
}
