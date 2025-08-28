// src/pages/HomePage.jsx
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setProducts } from "../../slices/productsSlice";
import { Link } from "react-router-dom";
import "./HomePage.css";
import Shimmer from "../../components/Shimmer/Shimmer";

const HomePage = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.items) || [];
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let mounted = true;
    setLoading(true);

    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data) => {
        if (!mounted) return;
        dispatch(setProducts(data));
      })
      .catch((err) => {
        // keep console error for debugging
        // you can dispatch an error state here if needed
        console.error("Failed to fetch products:", err);
      })
      .finally(() => {
        if (mounted) setLoading(false);
      });

    return () => {
      mounted = false;
    };
  }, [dispatch]);

  const categories = [
    "all",
    ...Array.from(new Set(products.map((p) => p.category))),
  ];

  const filtered = products.filter((p) => {
    const matchesCategory =
      selectedCategory === "all" || p.category === selectedCategory;
    const matchesSearch = p.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="home-container">
      <h1 className="home-title">PRODUCT LIST</h1>

      <div className="controls" role="region" aria-label="product controls">
        <div className="category-wrapper">
          <label htmlFor="category" className="category-label">
            Category
          </label>

          <select
            id="category"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="category-select"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        <input
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          type="text"
          placeholder="Search products..."
          aria-label="Search products"
          className="search-input"
        />
      </div>

      {loading ? (
        <Shimmer count={8} /> // Added this Shimmer Component to enhance the user-experience
      ) : (
        <div className="product-grid" data-testid="product-grid">
          {filtered.map((p) => (
            <div
              key={p.id}
              className="product-card"
              role="article"
              aria-label={p.title}
            >
              <Link to={`/product/${p.id}`} className="product-link">
                <img src={p.image} alt={p.title} className="product-image" />
                <h2 className="product-title">{p.title}</h2>
              </Link>

              <p className="product-price">${p.price}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default HomePage;
