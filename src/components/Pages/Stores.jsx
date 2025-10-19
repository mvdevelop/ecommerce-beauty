
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
            <p>We're talking about clean beuty gift sets, of course <br /> and we're got a bouquet of beauties for yourself or someone you love.</p>
          </div>
        </div>

        <div className='row'></div>
      </div>
    </>
  )
}
