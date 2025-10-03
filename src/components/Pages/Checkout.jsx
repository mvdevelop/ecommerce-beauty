
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
              <input type="text" className='form-control' />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
