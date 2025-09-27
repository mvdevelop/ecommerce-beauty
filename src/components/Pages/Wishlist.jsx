
import React, { useEffect, useState } from 'react';

export default function Wishlist() {
  const [ wishlist, setWishlist ] = useState([]);
  const [ cart, setCart ] = useState([]);

  useEffect(() => {
    const storedWishlist = JSON.parse(localStorage.getItem('wishlist')) 
  })

  return (
    <div>Wishlist</div>
  )
}
