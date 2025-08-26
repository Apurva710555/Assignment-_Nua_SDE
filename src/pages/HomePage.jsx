import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setProducts } from "../slices/productsSlice";
import { Link } from "react-router-dom";

const HomePage = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.items);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  // Fetch products from Fake Store API on mount
  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data) => {
        dispatch(setProducts(data));
      })
      .catch((err) => console.error(err));
  }, [dispatch]);

  // Compute categories from products
  const categories = ["all", ...new Set(products.map((p) => p.category))];

  // Filter products by search term and category
  const filtered = products.filter((p) => {
    const matchesCategory =
      selectedCategory === "all" || p.category === selectedCategory;
    const matchesSearch = p.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div
      style={{
        padding: "24px",
        boxSizing: "border-box",
        maxWidth: "1100px",
        margin: "0 auto",
      }}
    >
      <h1
        style={{
          margin: "0 0 18px 0",
          textAlign: "center",
          fontSize: "2rem",
          fontWeight: 700,
          color: "#6b7280",
          marginTop: "60px",
          fontFamily: "cursive",
        }}
      >
        PRODUCT LIST
      </h1>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "12px",
          alignItems: "center",
          justifyContent: "center",
          paddingTop: "6px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}
        >
          <label
            htmlFor="category"
            style={{
              fontSize: "0.95rem",
              color: "#6b7280",
              marginRight: "8px", // spacing between label and select
            }}
          >
            Category
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              style={{
                fontSize: "0.95rem",
                color: "#374151", // darker text for readability
                marginLeft: "6px", // spacing between text "Category" and dropdown
                padding: "6px 10px", // better clickable area
                border: "1px solid #d1d5db",
                borderRadius: "6px",
                minWidth: "120px", // proper width
                backgroundColor: "#fff",
              }}
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </label>
        </div>

        <input
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          type="text"
          placeholder="Search products..."
          aria-label="Search products"
          style={{
            minWidth: "220px",
            padding: "8px 10px",
            border: "1px solid #e5e7eb",
            borderRadius: "6px",
            outline: "none",
            boxSizing: "border-box",
          }}
        />
      </div>

      <div
        className="product-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
          gap: "18px",
          marginTop: "20px",
        }}
      >
        {filtered.map((p) => (
          <div
            key={p.id}
            className="product-card"
            style={{
              display: "flex",
              flexDirection: "column",
              border: "1px solid #e5e7eb",
              borderRadius: "8px",
              padding: "12px",
              textAlign: "center",
              background: "#fff",
              boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
              justifyContent: "space-between",
              minHeight: "300px",
            }}
          >
            <Link to={`/product/${p.id}`} style={{ textDecoration: "none" }}>
              <img
                src={p.image}
                alt={p.title}
                style={{
                  width: "150 px",
                  height: "150px",
                  objectFit: "contain",
                  marginBottom: "10px",
                }}
              />
              <h2
                style={{
                  fontSize: "1rem",
                  color: "#374151",
                  margin: "10px 0",
                  fontWeight: 500,
                  minHeight: "40px", // reserve space so all titles align
                  marginBottom: "8px",
                }}
              >
                {p.title}
              </h2>
            </Link>
            <p style={{ fontWeight: 600, color: "#111827", minHeight: "60px" }}>
              ${p.price}
            </p>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <button
                style={{
                  marginTop: "auto",
                  padding: "10px",
                  backgroundColor: "#d78888",
                  color: "#fff",
                  border: "none",
                  borderRadius: "6px",
                  cursor: "pointer",
                  width: "120px",
                }}
                onClick={() => dispatch({ type: "cart/addToCart", payload: p })}
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
