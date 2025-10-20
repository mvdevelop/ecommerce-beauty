
import React from 'react';

export default function Contact() {
  return (
    <>
      <section className='contact-section mt-5'>
        <div className='container'>
          <h2 className='section-title'>Keep In Touch With US</h2>
          <p className='section-subtitle'>
            Be the first to know about new skincare launches, exclusive offers, and <br /> expert beauty tips for radiant skin.
          </p>

          <div className='row contact-boxes'>
            {/* Address */}
            <div className='contact-col'>
              <div className='contact-box bg-transparent border-0'>
                <i className="ri-map-pin-line icon"></i>
                <h5>Address</h5>
                <p>Rendom IT Solutions, 2nd floor, Siddharth Complex</p>
                <p className='mb-4'>Alkapuri, Vadodara, Gujarat - 39007</p>
                <a href="https://maps.app.goo.gl/2XwiSp3JK3V6FCg4A" target="_blank" rel="noopener noreferrer" className='link'>Get Direction</a>
              </div>
            </div>

            {/* Contact */}
            <div className='contact-col'>
              <div className='contact-box bg-transparent border-0'>
                <i className="ri-phone-line icon"></i>
                <h5></h5>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
