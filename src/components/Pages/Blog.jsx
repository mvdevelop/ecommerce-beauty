
import React from 'react';

import blogs from '../../Blogs.json';

import { Link } from 'react-router-dom';

export default function Blog() {
  return (
    <>
      <ol className="section-banner py-3 position-relative">
        <li className="position-relative">
          <Link to="/">Home</Link>
        </li>
        <li className="position-relative active">
          <span className="ps-5">News</span>
        </li>
      </ol>

      <div className='row'>
        {blogs.map(blog => (
          <div className='col-lg-4 col-md-6 mb-0'>
            <div className='blog-items text-center position-relative'>
              <div className="blog-image w-100 position-relative overflow-hidden">
                <img src={blog.image} alt="blog-image" className='img-fluid' />
              </div>
              <div className='blog-content pt-3 w-100 position-relative'>
                <div className='blog-title'>
                  <span className='title'>{blog.title}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}
