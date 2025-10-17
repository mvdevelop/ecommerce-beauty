
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

    if (filterSortOption === 'new' || filterSortOption === 'sale') {
      filtered = filtered.filter(product => product.tag === filterSortOption);
    }

    if (filterSortOption === 'low') {
      filtered.sort((a, b) =>
        parseFloat(a.price.replace('$','')) - parseFloat(b.price.replace('$',''))
      ) 
    }

    if (filterSortOption === 'high') {
      filtered.sort((a, b) =>
        parseFloat(b.price.replace('$','')) - parseFloat(a.price.replace('$',''))
      ) 
    }

    return filtered;
  }

  const displayedProducts = handleFilterSort();

  return (
    <>
      <ol className='section-banner py-3 position-relative'>
        <li className='position-relative'><Link to='/'>Home</Link></li>
        <li className='position-relative active'><span className='ps-5'>Products</span></li>
      </ol>

      <div className="shop-container">
        <div className="container">
          <h1 className="text-center py-4 fw-semibold">Products</h1>

          <div className='container my-4'>
            <div className='d-flex justify-content-between align-items-center flex-wrap gap-3'>
              Showing <strong>{displayedProducts.length}</strong> product{displayedProducts.length != 1 && 's'} for "{filterSortOption === "all" ? 'All' : filter.charAt(0).toUpperCase() + filterSortOption.slice(1)}"
            </div>
            <div>
              <select className='form-select py-2 fs-6' style={{ minWidth: "260px", backgroundColor: "#f5f5f5", border: "0px" }} value={filterSortOption} onChange={(e) => setFilterSortOption(e.target.value)}>
                <option value=""></option>
              </select>
            </div>
          </div>

        </div>
      </div>
    </>
  )
}
