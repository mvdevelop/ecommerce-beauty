
import React, { useState } from 'react';

import head from '../../assets/about-head-shape.webp';
import about01 from '../../assets/banner-female-2.webp';
import about02 from '../../assets/discover-1.webp';
import client01 from '../../assets/brand-logo-1.png';
import client02 from '../../assets/brand-logo-2.png';
import client03 from '../../assets/brand-logo-3.png';
import client04 from '../../assets/brand-logo-4.png';
import client05 from '../../assets/brand-logo-5.png';
import client06 from '../../assets/brand-logo-6.png';
import team01 from '../../assets/team-1.webp';
import team02 from '../../assets/team-2.webp';
import team03 from '../../assets/team-3.webp';

const About = () => {
  const [ quote, setQuote ] = useState(
    '" Quality products at great prices, delivering the perfect mix of affordability and excellence. Each item ensures great value for money."'
  );

  return (
    <>
      {/* About Header */}
      <section className='about-glowing-section d-flex align-items-center'>
        <div className='container'>
          <div className='row'>
            <div className='col-md-6 text-md-start text-center'>
              <p className='text-uppercase text-muted small mb-2'>Introducing</p>
              <h1 className='fw-bold display-5'>About Glowing</h1>
            </div>
          </div>
        </div>
      </section>

      {/* Main About Content */}
      <section className='py-5'>
        <div className='container text-center mb-5'>
          <img src={head} alt="decorative leaf" />
          <h2 className='fw-bold'>
            We strive to live with compassion, <br /> kindness and empathy.
          </h2>
          <p className='text-muted mx-auto' style={{ maxWidth: '600px' }}>
            Our mission is to provide high-quality, natural skincare products that enhance your beauty and well-being. We believe in the power of nature and are committed to using sustainable practices to create products that are good for you and the environment.
          </p>
        </div>

        {/* Face Image and Description */}
        <div className='container mb-5'>
          <div className='row align-items-center'>
            <div className='col-md-6 mb-4 mb-md-0 about-img1'>
              <img src={about01} alt="Face" className='img-fluid rounded' />
            </div>
            <div className='col-md-6'>
              <h4 className='fw-bold'>Give your skin a healthy glow everyone</h4>
              <p className='text-muted'>
                At Glowing, we are passionate about creating skincare products that are not only effective but also safe and gentle on your skin. Our team of experts carefully selects each ingredient to ensure that our products deliver the best results without any harmful side effects.
              </p>
            </div>
          </div>
        </div>

        {/* Mission and Product Image */}
        <div className='container'>
          <div className='row align-items-center flex-md-row-reverse'>
            <div className='col-md-6 mb-4 mb-md-0 about-img1'>
              <img src={about02} alt="Products" className='img-fluid rounded' />
            </div>
            <div className='col-md-6'>
              <h4 className='fw-bold'>Our Mission</h4>
              <p className='text-muted'>We believe in healthy, radiant skin for everyone. Our products are thoughtfully crafted with high-quality ingredients to nourish, protect, and enhance your natural glow-because confidence starts with great skin. Experience the perfect fusion of science and nature for skincare tha truly transforms.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Client Logos Section */}
      <section className='container-fluid bg-light'>
        <div className='container py-5 text-center'>
          <div className='mx-auto' style={{ maxWidth: '800px' }}>
            <p className='fs-4 mb-4 fw-bold'>{quote}</p>
          </div>

          <div className='row justify-content-center align-items-center mt-5 gy-4'>
            <div className='col-6 col-sm-4 col-md-2 d-flex justify-content-center brands-img' onClick={() => setQuote('"Quality products at great prices, delivering the perfect mix of affordability and excellence. Each item ensures great value for money."')} style={{ cursor: 'pointer' }}>
              <img src={client01} alt="Grand Golden Gallery" className='img-fluid' style={{ maxHeight: '60px', objectFit: 'contain' }}/>
            </div>

            <div className='col-6 col-sm-4 col-md-2 d-flex justify-content-center brands-img' onClick={() => setQuote('"Great beauty service! The experience was truly amazing. and I feel more confident and radiant with my beauty after every visit."')} style={{ cursor: 'pointer' }}>
              <img src={client02} alt="Parker & Co." className='img-fluid' style={{ maxHeight: '60px', objectFit: 'contain' }}/>
            </div>

            <div className='col-6 col-sm-4 col-md-2 d-flex justify-content-center brands-img' onClick={() => setQuote('"Amazing product. The results are so transformative in texture and my face feels plump and healthy. Highly recommend!"')} style={{ cursor: 'pointer' }}>
              <img src={client03} alt="The Beast" className='img-fluid' style={{ maxHeight: '60px', objectFit: 'contain' }}/>
            </div>

            <div className='col-6 col-sm-4 col-md-2 d-flex justify-content-center brands-img' onClick={() => setQuote('"Quality products at great prices, delivering the perfect mix of affordability and excellence. Each item ensures great value for money."')} style={{ cursor: 'pointer' }}>
              <img src={client04} alt="The Hayden" className='img-fluid' style={{ maxHeight: '60px', objectFit: 'contain' }}/>
            </div>

            <div className='col-6 col-sm-4 col-md-2 d-flex justify-content-center brands-img' onClick={() => setQuote('"Great beauty service! The experience was truly amazing. and I feel more confident and radiant with my beauty after every visit."')} style={{ cursor: 'pointer' }}>
              <img src={client05} alt="Good Mood" className='img-fluid' style={{ maxHeight: '60px', objectFit: 'contain' }}/>
            </div>

            <div className='col-6 col-sm-4 col-md-2 d-flex justify-content-center brands-img' onClick={() => setQuote('"Amazing product. The results are so transformative in texture and my face feels plump and healthy. Highly recommend!"')} style={{ cursor: 'pointer' }}>
              <img src={client06} alt="Goodness" className='img-fluid' style={{ maxHeight: '60px', objectFit: 'contain' }}/>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className='team-section'>
        <h2 className='team-title'>
          We pride ourselves on having a team of highly skilled
        </h2>

        <div className='team-row'>
          <div className='team-member'>
            <div className='team-image-wrapper'>
              <img src={team01} alt="Slava Fedutik" className='team-image' />
              <div className='team-social'>
                <a href="#"><i className="ri-instagram-line"></i></a>
                <a href="#"><i className="ri-twitter-line"></i></a>
                <a href="#"><i className="ri-facebook-line"></i></a>
                <a href="#"><i className="ri-youtube-line"></i></a>
              </div>
            </div>
            <h3 className='team-name'>Slava Fedutik</h3>
            <p className='team-role'>- Founder, Chief Creative</p>
          </div>

          <div className='team-member'>
            <div className='team-image-wrapper'>
              <img src={team02} alt="Jennifer C." className='team-image' />
              <div className='team-social'>
                <a href="#"><i className="ri-instagram-line"></i></a>
                <a href="#"><i className="ri-twitter-line"></i></a>
                <a href="#"><i className="ri-facebook-line"></i></a>
                <a href="#"><i className="ri-youtube-line"></i></a>
              </div>
            </div>
            <h3 className='team-name'>Jennifer C.</h3>
            <p className='team-role'>- Founder, CEO</p>
          </div>

          <div className='team-member'>
            <div className='team-image-wrapper'>
              <img src={team03} alt="" className='team-image' />
              <div className='team-social'>
                <a href="#"><i className="ri-instagram-line"></i></a>
                <a href="#"><i className="ri-twitter-line"></i></a>
                <a href="#"><i className="ri-facebook-line"></i></a>
                <a href="#"><i className="ri-youtube-line"></i></a>
              </div>
            </div>
            <h3 className='team-name'>Valeria Nadopta</h3>
            <p className='team-role'>- Founder, COO</p>
          </div>
        </div>
      </section>
    </>
  )
}

export default About;
