
import React, { useState }  from 'react';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Data
import productsData from '../../Product.json';
import { Link } from 'react-router-dom';

export default function Shop() {
  return (
    <>
      <ol className='sectopm-banner py-3 position-relative'>
        <li className='position-relative'><Link to='/'>Home</Link></li>
        <li className='position-relative active'><span className='ps-5'>Products</span></li>
      </ol>
    </>
  )
}
