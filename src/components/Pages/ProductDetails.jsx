
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

// Data
import products from '../../Product.json';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/effect-fade';

export default function ProductDetails() {
  const { id } = useParams();
  const product = products.find((p) => p.id == id);

  const [ mainImage, setMainImage ] = useState('');
  const [ images, setImages ] = useState([]);
  const [ quantity, setQuantity ] = useState(1);
  
  useEffect(() => {
    if (product) {
      setMainImage(product.image);
      setImages([product.image, product.secondImage].filter(Boolean));
      setQuantity(1);
    }
  }, [product]);

  const colors = ['#000000', '#7b3f00', '#9bbec8'];

  return (
    <>
      <ol className="section-banner py-3 position-relative">
        <li className='position-relative'>
          <Link to='/'>Home</Link>
        </li>
        <li className='position-relative active'>
          <a href="#" className='ps-5'>Beauty & Cosmetics</a>
        </li>
        <li className='position-relative active'>
          <a href="#" className='ps-5'>{product.ProductName}</a>
        </li>
      </ol>
    </>
  )
}
