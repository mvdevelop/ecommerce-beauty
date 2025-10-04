
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

              
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
