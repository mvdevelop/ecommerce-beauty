
import React, { useState }  from 'react';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Data
import productsData from '../../Product.json';
import { Link, useNavigate } from 'react-router-dom';

export default function Shop() {

  const [ filterSortOption, setFilterSortOption ] = useState('all');
  const navigate = useNavigate();

  const handleFilterSort = () => {
    let filtered = [...productsData];

    if (filterSortOption = 'new' || filterSortOption === 'sale') {} 
  }

  return (
    <>
      <ol className='section-banner py-3 position-relative'>
        <li className='position-relative'><Link to='/'>Home</Link></li>
        <li className='position-relative active'><span className='ps-5'>Products</span></li>
      </ol>

      <div className="shop-container">
        <div className="container">
          <h1 className="text-center py-4 fw-semibold">Products</h1>


        </div>
      </div>
    </>
  )
}
