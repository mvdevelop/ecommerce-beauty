
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
                <p>19Code IT Solutions, 2nd floor, 19 Enterprise</p>
                <p className='mb-4'>Rio de Janeiro, RJ - 123456</p>
                <a href="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d743578.297316653!2d-44.105434308878834!3d-22.912769753886522!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9bde559108a05b%3A0x50dc426c672fd24e!2sRio%20de%20Janeiro%2C%20RJ!5e1!3m2!1spt-BR!2sbr!4v1760968159849!5m2!1spt-BR!2sbr" target="_blank" rel="noopener noreferrer" className='link'>Get Direction</a>
              </div>
            </div>

            {/* Contact */}
            <div className='contact-col'>
              <div className='contact-box bg-transparent border-0'>
                <i className="ri-phone-line icon"></i>
                <h5>Contact</h5>
                <p><strong>Mobile:</strong> +91 98765 43210</p>
                <p><strong>Hotline:</strong> 1800 123 4567</p>
                <p><strong>E-mail:</strong> support@blushify.in</p>
              </div>
            </div>

            {/* Hours */}
            <div className='contact-col'>
              <div className='contact-box bg-transparent border-0'>
                <i className="ri-time-line icon"></i>
                <h5>Hour of operation</h5>
                <p><strong>Mon - Fri:</strong> 08:30 - 20:00</p>
                <p><strong>Sat - Sun:</strong> 09:30 - 21:30</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className='contact-page'>

        {/* Map Section */}
        <section className="map-section container">
          <iframe title='Our Location' className='map rounded'
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d743578.297316653!2d-44.105434308878834!3d-22.912769753886522!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9bde559108a05b%3A0x50dc426c672fd24e!2sRio%20de%20Janeiro%2C%20RJ!5e1!3m2!1spt-BR!2sbr!4v1760968159849!5m2!1spt-BR!2sbr" allowfullscreen></iframe>
        </section>

        {/* Contact Form Section */}
        <section className='message-section'>
          <h2 className='form-title'>Send A Message</h2>
          <form className='contact-form'>
            <div className='row'>
              <input type="text" placeholder='Name' className='input' />
              <input type="email" placeholder='Email' className='input' />
            </div>
            <div className='row'>
              <textarea name="" id="" className='textarea'></textarea>
            </div>
          </form>
        </section>
      </div>
    </>
  )
}
