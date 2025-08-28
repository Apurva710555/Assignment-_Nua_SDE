// src/pages/ProductDetailPage.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../../slices/cartSlice";
import "./ProductDetailPage.css";

function ProductDetailPage() {
  const { id } = useParams();
  const dispatch = useDispatch();

  const [product, setProduct] = useState(null);
  const [qty, setQty] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    const cached = localStorage.getItem(`product_${id}`);
    if (cached) {
      try {
        setProduct(JSON.parse(cached));
      } catch {
        localStorage.removeItem(`product_${id}`);
      } finally {
        setLoading(false);
      }
      return;
    }

    fetch(`https://fakestoreapi.com/products/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Network response was not ok");
        return res.json();
      })
      .then((data) => {
        setProduct(data);
        try {
          localStorage.setItem(`product_${id}`, JSON.stringify(data));
        } catch {
          // ignore localStorage write errors
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to load product");
        setLoading(false);
      });
  }, [id]);

  if (loading)
    return (
      <div className="pd-loading" aria-live="polite">
        Loading product...
      </div>
    );
  if (error)
    return (
      <div className="pd-error" role="alert">
        {error}
      </div>
    );
  if (!product) return null;

  return (
    <div className="pd-page-wrapper">
      <div className="pd-card">
        <img
          src={product.image}
          alt={product.title}
          className="pd-image"
          width={320}
          height={320}
        />

        <div className="pd-details">
          <h1 className="pd-title">{product.title}</h1>

          <p className="pd-rating">
            ⭐ Rating: {product.rating?.rate ?? "N/A"} (
            {product.rating?.count ?? 0} reviews)
          </p>

          <p className="pd-description">{product.description}</p>

          <p className="pd-price">${product.price}</p>

          <div className="pd-qty-row">
            <label className="pd-qty-label" htmlFor="qty-select">
              Quantity:
            </label>
            <select
              id="qty-select"
              className="pd-qty-select"
              value={qty}
              onChange={(e) => setQty(Number(e.target.value))}
              aria-label="Select quantity"
            >
              {[1, 2, 3, 4, 5].map((n) => (
                <option key={n} value={n}>
                  {n}
                </option>
              ))}
            </select>
          </div>

          <div className="pd-actions">
            <button
              className="pd-add-btn"
              onClick={() => dispatch(addToCart({ product, quantity: qty }))}
              aria-label="Add to cart"
            >
              🛒 Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetailPage;
