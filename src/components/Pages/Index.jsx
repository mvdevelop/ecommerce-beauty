import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import productsData from '../../Product.json';
import { getCart, getWishlist, saveCart, saveWishlist } from '../../lib/storage';
import { isProduct, parseCollection } from '../../lib/runtime';

const products = parseCollection(productsData, isProduct);

export default function Index() {
  const addToWishlist = (product) => {
    const wishlist = getWishlist();
    if (wishlist.some((item) => item.id === product.id)) {
      toast.info('Product is already in your wishlist.');
      return;
    }
    saveWishlist([...wishlist, product]);
    toast.success('Product added to your wishlist.');
  };

  const addToCart = (product) => {
    const cart = getCart();
    if (cart.some((item) => item.id === product.id)) {
      toast.info('Product is already in your cart.');
      return;
    }
    saveCart([...cart, { ...product, quantity: 1 }]);
    toast.success('Product added to your cart.');
  };

  return (
    <>
      <main>
        <section className="hero">
          <div className="hero-wrap hero-wrap1">
            <div className="hero-content">
              <h1>Beauty inspired by real life</h1>
              <p>Clean, non-toxic products designed for everyone.</p>
              <Link to="/shop" className="btn hero-btn">Shop now</Link>
            </div>
          </div>
        </section>
        <section className="container py-5" aria-labelledby="featured-products">
          <h2 id="featured-products" className="text-center mb-4">Featured products</h2>
          <div className="row">
            {products.slice(4, 10).map((product) => (
              <article className="col-md-4 col-lg-2 mb-4 text-center" key={product.id}>
                <Link to={`/product/${product.id}`}>
                  <img src={product.image} className="img-fluid" alt={product.ProductName} />
                </Link>
                <h3 className="h6 mt-2">{product.ProductName}</h3>
                <p>{product.price}</p>
                <button type="button" className="btn btn-sm btn-outline-secondary me-1" onClick={() => addToWishlist(product)}>♡</button>
                <button type="button" className="btn btn-sm btn-primary" onClick={() => addToCart(product)}>+</button>
              </article>
            ))}
          </div>
        </section>
      </main>
      <ToastContainer />
    </>
  );
}
