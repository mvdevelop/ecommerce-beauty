
import React from 'react';

import store01 from '../../assets/store-01.webp';
import store02 from '../../assets/store-02.webp';

import { Link } from 'react-router-dom';

export default function Stores() {
  return (
    <>
      <ol className="section-banner py-3 position-relative">
        <li className="position-relative">
          <Link to="/">Home</Link>
        </li>
        <li className="position-relative active">
          <span className="ps-5">Stores</span>
        </li>
      </ol>

      {/* Store */}
      <div className='container store-wrap my-5 py-5'>
        <div className='row'>
          <div className="section-title mb-5 stores-title text-center">
            <h2 className='fw-semibold fs-1'>Find a Store</h2>
            <p>We're talking about clean beauty gift sets, of course <br /> and we're got a bouquet of beauties for yourself or someone you love.</p>
          </div>
        </div>

        <div className='row align-items-center g-5'>
          <div className='col-lg-6 mb-4 mb-lg-0'>
            <img src={store01} alt="store" className='img-fluid' />
          </div>

          <div className='col-lg-6'>
            <h2 className='mb-4'>New York Store</h2>
            <div className='row'>
              <div className='col-md-6 mb-4'>
                <h5 className='subtitle fw-semibold mb-4'>Address</h5>
                <p className='text-muted mb-0'>3242 Abbot Kinney BLVD -</p>
                <p className='text-muted'>PH Venice, CA 124</p>
                <a href="#" className='underline-link text-black'>Get Direction</a>
              </div>

              <div className=''></div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
