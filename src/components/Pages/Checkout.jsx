
import React, { useEffect, useState } from 'react';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { Link } from 'react-router-dom';

export default function Checkout() {

  const [ deliveryOption, setDeliveryOption ] = useState('ship');

  const [ cartItems, setCartItems ] = useState([]);

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCartItems(savedCart);
  }, []);

  const handlePlaceOrder = () => {
    toast.success('Order Placed Successfully!');
  };

  const totalPrice = cartItems.reduce((acc, item) => {
    const price = parseFloat(item.price.replace('$', ''));
  }, 0);

  const estimatedTax = (totalPrice * 0.1).toFixed(2); 

  return (
    <>
      <div className='container my-5'>
        <div className='row g-4'>
          <div className="col-lg-7">
            <h5>Contact</h5>
            <div className="mb-3">
              <input type="text" className='form-control' placeholder='Email or mobile phone number' />
            </div>
            <div className="form-check mb-4">
              <input type="checkbox" className='form-check-input' id='newsCheck' />
              <label className='form-check-label' htmlFor="newsCheck">
                Email me with news and offers
              </label>
            </div>
            <h5>Delivery</h5>
            <div>
              <div className='mb-3'>
                <div className='btn-group btn-from w-100' role='group'>
                  <input 
                    type="radio"
                    className='btn-check'
                    name='deliveryOption'
                    id='ship'
                    checked={deliveryOption === 'ship'}
                    onChange={() => setDeliveryOption('ship')}
                  />
                  <label className='btn ship-btn' htmlFor="ship">Ship</label>

                  <input 
                    type="radio"
                    className='btn-check'
                    name='deliveryOption'
                    id='pickup'
                    checked={deliveryOption === 'pickup'}
                    onChange={() => setDeliveryOption('pickup')}
                  />
                  <label className='btn pickup-btn' htmlFor="pickup">Pickup in store</label>
                </div>
              </div>

              {deliveryOption === 'ship' && (
                <div className="row mb-3">
                  <div className="mb-3">
                    <select className='form-select'>
                      <option>Brazil</option>
                      <option>Argentina</option>
                      <option>Uruguay</option>
                    </select>
                  </div>
                  <div className='col'>
                    <input type="text" className='form-control' placeholder='First Name (optional)' />
                  </div>
                  <div className='col'>
                    <input type="text" className='form-control' placeholder='Last Name (optional)' />
                  </div>
                </div>
              )}

              {deliveryOption === 'pickup' && (
                <div className='container my-4'>
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <h6 className='fw-semibold mb-0'>Store Location</h6>
                    <a href="#" className='text-decoration-none small'>
                      Change Location
                    </a>
                  </div>

                  <div className='alert alert-danger d-flex flex-column rounded-3' role='alert' 
                    style={{ backgroundColor: '#fef6f6', color: '#7b1c1c', border: '1px solid rgba(145, 137, 137, 0.59)' }}>
                    <div className='d-flex align-items-center mb-1'>
                      <i className='bi bi-exclamation-circle-fill me-2'></i>
                      <strong>No Stores available with your items!</strong>
                    </div>
                    <div>
                      <a href="#" className='text-decoration-underline' 
                      style={{ color: '#7b1c1c' }}>Ship to address</a> {' '}
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className='mb-3'>
              <input type="text" className='form-control' placeholder='Address' />
            </div>
            <div className='mb-3'>
              <input type="text" className='form-control' placeholder='Apartment, suite, etc, (optional)' />
            </div>
            <div className='row mb-3'>
              <div className='col'>
                <input type="text" className='form-control' placeholder='City' />
              </div>
              <div className='col'>
                <input type="text" className='form-control' placeholder='Postal Code (optional)' />
              </div>
            </div>
            <div className="form-check mb-4">
              <input type="checkbox" className='form-control-input' id='saveInfo' />
              <label htmlFor="saveInfo" className='form-check-label'>Save this information for next time</label>
            </div>

            <h6>Shipping method</h6>

            <div className='rounded p-3 d-flex justify-content-between align-items-center' style={{ border: '1px solid darkblue', backgroundColor: '#f0f5ff' }}>
              <span>Standard</span>
              <span className='text-success'>FREE</span>
            </div>

            <div className='container my-5'>
              <h4 className='fw-semibold'>Payment</h4>
              <p className='text-muted mb-3'>All transactions are secure and encrypted.</p>

              <div className='border rounded'>
                <div className='bg-light border-bottom d-flex justify-content-between align-items-center p-3'>
                  <span className='fw-semibold'>Credit Card</span>
                  <div className='bg-warning text-white rounded px-2 py-1 fw-bold' style={{ fontSize: '0.9rem' }}>B</div>
                </div>
                
                <div className='p-3 bg-light'>
                  <div className='mb-3'>
                    <input type="text" className='form-control' placeholder='Card Number' />
                  </div>

                  <div className='row'>
                    <div className='col-md-6 mb-3'>
                      <input type="text" className='form-control' placeholder='Expiration date (MM/YY)' />
                    </div>
                    <div className='col-md-6 mb-3'>
                      <input type="text" className='form-control' placeholder='Security Code' />
                    </div>
                  </div>

                  <div className='mb-3'>
                    <input type="text" className='form-control' placeholder='Name on Card' />
                  </div>

                  <div className='form-check mb-3'>
                    <input className='form-check-input' type="checkbox" id='billingCheck' checked />
                    <label className='form-check-label' for='billingCheck'>
                      Use shipping address as billing address.
                    </label>
                  </div>
                </div> 
              </div>

              <button className='btn w-100 mt-4 py-2 fw-semibold'>Pay now</button>

              <div className='mt-5 border-top pt-3'>
                <a href="#" className='text-decoration-none small text-decoration-underline'>Privacy Policy</a>
              </div>
            </div>
          </div>
          <div className='col-lg-5'>
              <div className='card border-0 shadow-sm rounded-4 p-4'>
                <h5 className='fw-bold mb-3'>
                  <i className='ri-shopping-cart-2-line me-2 text-info'></i> Order Summary
                </h5>
                {cartItems.length === 0 ? (
                  <p className="text-muted">Your cart is Empty!</p>
                ) : (
                  cartItems.map(item => (
                    <div key={item.id} className='d-flex align-items-center mb-3 border-bottom pb-2'>
                      <img src={item.image} className='rounded' width='60' height='60' alt="" />
                    </div>
                  ))
                )}
              </div>
          </div>
        </div>
      </div>
    </>
  )
}
