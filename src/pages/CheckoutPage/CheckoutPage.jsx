import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { clearCart } from "../../slices/cartSlice";
import { Link, useNavigate } from "react-router-dom";
import "./CheckoutPage.css";

export default function CheckoutPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const items = useSelector((state) => state.cart.items || []);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [orderId, setOrderId] = useState(null);
  const [orderTotal, setOrderTotal] = useState(0);

  const lineSubtotal = (item) => {
    const price = Number(item.price) || 0;
    const qty = Number(item.quantity) || 0;
    return +(price * qty).toFixed(2);
  };
  const grandTotal = items.reduce((sum, it) => sum + lineSubtotal(it), 0);

  const isValidEmail = (s) => /\S+@\S+\.\S+/.test(s);

  const validate = () => {
    const e = {};
    if (!name.trim()) e.name = "Name is required";
    if (!email.trim()) e.email = "Email is required";
    else if (!isValidEmail(email)) e.email = "Enter a valid email";
    if (!address.trim()) e.address = "Address is required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handlePlaceOrder = (ev) => {
    ev.preventDefault();
    if (!validate()) return;

    const id = `ORD-${Date.now().toString().slice(-6)}`;
    setOrderTotal(grandTotal);
    setOrderId(id);
    setSubmitted(true);

    dispatch(clearCart());
  };

  if (items.length === 0 && !submitted) {
    return (
      <div className="checkout-page">
        <h1 className="checkout-title">Checkout</h1>
        <div className="checkout-card">
          <p className="checkout-empty">Your cart is empty.</p>
          <div>
            <Link to="/" className="checkout-link">
              Continue shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (submitted) {
    return (
      <div className="checkout-page">
        <div className="checkout-card">
          <h2>Thank you — your order is placed!</h2>
          <p>
            <strong>Order ID:</strong> {orderId}
          </p>
          <p>
            We've sent a confirmation to <strong>{email}</strong>
          </p>
          <p>
            <strong>Order total:</strong> ${orderTotal.toFixed(2)}
          </p>

          <div className="checkout-buttons">
            <button className="primary-btn" onClick={() => navigate("/")}>
              Continue shopping
            </button>
            <button
              className="secondary-btn"
              onClick={() => {
                setSubmitted(false);
                setName("");
                setEmail("");
                setAddress("");
                setOrderId(null);
              }}
            >
              Place another order
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="checkout-page">
      <h1 className="checkout-title">Checkout</h1>

      <div className="checkout-layout">
        {/* Left: Form */}
        <div className="checkout-card">
          <h3>Shipping details</h3>

          <form onSubmit={handlePlaceOrder} noValidate>
            <div className="checkout-field">
              <label>
                Name
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className={`checkout-input ${
                    errors.name ? "checkout-error-input" : ""
                  }`}
                />
              </label>
              {errors.name && (
                <div className="checkout-error">{errors.name}</div>
              )}
            </div>

            <div className="checkout-field">
              <label>
                Email
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={`checkout-input ${
                    errors.email ? "checkout-error-input" : ""
                  }`}
                />
              </label>
              {errors.email && (
                <div className="checkout-error">{errors.email}</div>
              )}
            </div>

            <div className="checkout-field">
              <label>
                Address
                <textarea
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className={`checkout-input checkout-textarea ${
                    errors.address ? "checkout-error-input" : ""
                  }`}
                />
              </label>
              {errors.address && (
                <div className="checkout-error">{errors.address}</div>
              )}
            </div>

            <div className="checkout-buttons">
              <button type="submit" className="primary-btn">
                Place Order
              </button>
              <button
                type="button"
                className="secondary-btn"
                onClick={() => navigate(-1)}
              >
                Back
              </button>
            </div>
          </form>
        </div>

        {/* Right: Order summary */}
        <aside className="checkout-card">
          <h3>Order summary</h3>
          <div className="checkout-items">
            {items.map((it) => (
              <div key={it.id} className="checkout-item">
                <img
                  src={it.image || "/placeholder-200.png"}
                  alt={it.title}
                  className="checkout-item-image"
                />
                <div className="checkout-item-info">
                  <div className="checkout-item-title" title={it.title}>
                    {it.title}
                  </div>
                  <div className="checkout-item-price">
                    {it.quantity} × ${Number(it.price || 0).toFixed(2)}
                  </div>
                </div>
                <div className="checkout-item-subtotal">
                  ${lineSubtotal(it).toFixed(2)}
                </div>
              </div>
            ))}
          </div>

          <div className="checkout-divider" />

          <div className="checkout-total">
            <span>Grand total</span>
            <strong>${grandTotal.toFixed(2)}</strong>
          </div>

          <div className="checkout-buttons">
            <button
              className="secondary-btn"
              onClick={() => dispatch(clearCart())}
            >
              Clear
            </button>
          </div>
        </aside>
      </div>
    </div>
  );
}
