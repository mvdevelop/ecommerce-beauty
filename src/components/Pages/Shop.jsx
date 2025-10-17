import React, { useState } from "react";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Data
import productsData from "../../Product.json";
import { Link, useNavigate } from "react-router-dom";

export default function Shop() {
  const [filterSortOption, setFilterSortOption] = useState("all");
  const navigate = useNavigate();

  const handleFilterSort = () => {
    let filtered = [...productsData];

    if (filterSortOption === "new" || filterSortOption === "Sale") {
      filtered = filtered.filter((product) => product.tag === filterSortOption);
    }

    if (filterSortOption === "low") {
      filtered.sort(
        (a, b) =>
          parseFloat(a.price.replace("$", "")) -
          parseFloat(b.price.replace("$", ""))
      );
    }

    if (filterSortOption === "high") {
      filtered.sort(
        (a, b) =>
          parseFloat(b.price.replace("$", "")) -
          parseFloat(a.price.replace("$", ""))
      );
    }

    return filtered;
  };

  const displayedProducts = handleFilterSort();

  return (
    <>
      <ol className="section-banner py-3 position-relative">
        <li className="position-relative">
          <Link to="/">Home</Link>
        </li>
        <li className="position-relative active">
          <span className="ps-5">Products</span>
        </li>
      </ol>

      <div className="shop-container">
        <div className="container">
          <h1 className="text-center py-4 fw-semibold">Products</h1>

          <div className="container my-4">
            <div className="d-flex justify-content-between align-items-center flex-wrap gap-3">
              <div className="text-muted" style={{ fontSize: "1.1rem" }}>
                Showing <strong>{displayedProducts.length}</strong> product
                {displayedProducts.length != 1 && "s"} for "
                {filterSortOption === "all"
                  ? "All"
                  : filterSortOption.charAt(0).toUpperCase() +
                    filterSortOption.slice(1)}
                "
              </div>
              <div>
                <select
                  className="form-select py-2 fs-6"
                  style={{
                    minWidth: "260px",
                    backgroundColor: "#f5f5f5",
                    border: "0px",
                  }}
                  value={filterSortOption}
                  onChange={(e) => setFilterSortOption(e.target.value)}
                >
                  <option value="all">All Products</option>
                  <option value="New">New Products</option>
                  <option value="Sale">Sale Products</option>
                  <option value="low">Price: Low to High</option>
                  <option value="high">Price: High to Low</option>
                </select>
              </div>
            </div>
          </div>

          <div className="row">
            {productsData.filter(
              (product) => product.id >= 10 && product.id <= 15
            ).map((product) => (
              <div className="col-md-4 mb-0">
                <div key={product.id}>
                  <div className="product-item mb-5 text-center position-relative">
                    <div className="product-image w-100 position-relative overflow-hidden">
                      <img
                        src={product.image}
                        className="img-fluid"
                        alt="product"
                      />
                      <img
                        src={product.secondImage}
                        className="img-fluid"
                        alt="product"
                      />
                      <div className="product-icons gap-3">
                        <div
                          className="product-icon"
                          title="Add to Wishlist"
                          onClick={() => addToWishlist(product)}
                        >
                          <i className="bi bi-heart fs-5"></i>
                        </div>
                        <div
                          className="product-icon"
                          title="Add to Cart"
                          onClick={() => addToCart(product)}
                        >
                          <i className="bi bi-cart3 fs-5"></i>
                        </div>
                      </div>
                      <span
                        className={`tag badge text-white ${
                          product.tag === "New" ? "bg-black" : "bg-success"
                        }`}
                      >
                        {product.tag}
                      </span>
                    </div>
                    <Link
                      to={`/product/${product.id}`}
                      className="text-decoration-none text-black"
                    >
                      <div className="product-content pt-3">
                        <span className="price">{product.price}</span>
                        <h3 className="title pt-1">{product.ProductName}</h3>
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
