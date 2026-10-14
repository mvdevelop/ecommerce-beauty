import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Products from '../../Product.json';
import { getCart, saveCart } from '../../lib/storage';
import type { Product } from '../../types/product';

export default function ProductDetails() {
  const { id } = useParams<{ id: string }>();
  const product = (Products as Product[]).find((item) => item.id === Number(id));
  const [mainImage, setMainImage] = useState(product?.image ?? '');
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    setMainImage(product?.image ?? '');
    setQuantity(1);
  }, [product]);

  if (!product) {
    return <main className="container py-5"><h1>Product not found</h1><Link to="/shop">Back to products</Link></main>;
  }

  const images = [product.image, product.secondImage];
  const addToCart = () => {
    const cart = getCart();
    if (cart.some((item) => item.id === product.id)) {
      toast.info(`${product.ProductName} is already in your cart.`);
      return;
    }
    saveCart([...cart, { ...product, quantity }]);
    toast.success(`${product.ProductName} added to your cart.`);
  };

  return (
    <>
      <main className="container py-5">
        <Link to="/shop">← Products</Link>
        <div className="row mt-4">
          <div className="col-xl-6">
            <div className="d-flex gap-3">
              <div className="d-flex flex-column gap-2">{images.map((image) => <button type="button" key={image} className="border-0 bg-transparent p-0" onClick={() => setMainImage(image)}><img src={image} width="60" height="80" alt="" /></button>)}</div>
              <img src={mainImage} className="img-fluid w-75" alt={product.ProductName} />
            </div>
          </div>
          <div className="col-xl-6">
            <p className="fw-bold">{product.price}</p>
            <h1 className="h2">{product.ProductName}</h1>
            <label className="fw-semibold" htmlFor="quantity">Quantity</label>
            <input id="quantity" type="number" min="1" className="form-control my-2" value={quantity} onChange={(event) => setQuantity(Math.max(1, Number(event.target.value) || 1))} />
            <button type="button" className="btn btn-primary w-100" onClick={addToCart}>Add to cart</button>
          </div>
        </div>
      </main>
      <ToastContainer />
    </>
  );
}
