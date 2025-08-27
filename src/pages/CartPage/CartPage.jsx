import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  updateQuantity,
  removeFromCart,
  clearCart,
} from "../../slices/cartSlice";
import { Link, useNavigate } from "react-router-dom";
import "./CartPage.css"; // <-- new CSS file

export default function CartPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const items = useSelector((state) => state.cart.items || []);

  useEffect(() => {
    console.log("Cart items (store):", items);
  }, [items]);

  const formatPrice = (n) =>
    typeof n === "number" ? n.toFixed(2) : Number(n || 0).toFixed(2);

  const lineSubtotal = (item) => {
    const price = Number(item.price) || 0;
    const qty = Number(item.quantity) || 0;
    return +(price * qty).toFixed(2);
  };

  const grandTotal = items.reduce((sum, it) => sum + lineSubtotal(it), 0);

  if (!items.length) {
    return (
      <div className="cart-page">
        <h1 className="cart-page__title">Your cart</h1>

        <div className="cart-page__empty">
          <p className="muted">Your cart is empty.</p>
          <p style={{ marginTop: 12 }}>
            <Link to="/" className="link-plain">
              Continue shopping
            </Link>
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <h1 className="cart-page__title">Your Cart</h1>

      <div className="cart-page__layout">
        {/* Items list */}
        <div className="cart-list">
          {items.map((item) => {
            const subtotal = lineSubtotal(item);
            const unitPrice = Number(item.price) || 0;

            return (
              <div className="cart-item" key={item.id}>
                <div className="cart-item__media">
                  <img
                    src={item.image || "/placeholder-200.png"}
                    alt={item.title}
                    className="cart-item__img"
                  />
                </div>

                <div className="cart-item__info">
                  <div className="cart-item__title" title={item.title}>
                    {item.title}
                  </div>

                  <div className="cart-item__meta">
                    Unit price: Rs.{formatPrice(unitPrice)}
                  </div>

                  <div className="cart-item__controls">
                    <label className="cart-item__qty">
                      Qty:
                      <select
                        value={item.quantity}
                        onChange={(e) =>
                          dispatch(
                            updateQuantity({
                              id: item.id,
                              quantity: Number(e.target.value),
                            })
                          )
                        }
                        className="select"
                      >
                        {Array.from({ length: 10 }, (_, i) => i + 1).map(
                          (n) => (
                            <option key={n} value={n}>
                              {n}
                            </option>
                          )
                        )}
                      </select>
                    </label>

                    <button
                      onClick={() => dispatch(removeFromCart(item.id))}
                      className="btn btn--ghost"
                    >
                      Remove
                    </button>
                  </div>
                </div>

                <div className="cart-item__subtotal">
                  <div className="muted small">Subtotal</div>
                  <div className="cart-item__subtotal-value">
                    Rs.{formatPrice(subtotal)}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Summary */}
        <aside className="cart-summary">
          <div className="summary-row">
            <div className="muted">Subtotal</div>
            <div className="summary-value">Rs.{formatPrice(grandTotal)}</div>
          </div>

          <div className="divider" />

          <div className="summary-row small muted">
            <div>Shipping</div>
            <div>Calculated at checkout</div>
          </div>

          <div className="summary-row small muted">
            <div>Tax</div>
            <div>—</div>
          </div>

          <div className="summary-row grand">
            <div className="grand-label">Grand total</div>
            <div className="grand-value">Rs.{formatPrice(grandTotal)}</div>
          </div>

          <div className="summary-actions">
            <button
              onClick={() => navigate("/checkout")}
              className="btn btn--primary"
            >
              Proceed to Checkout
            </button>

            <button onClick={() => navigate(-1)} className="btn btn--outline">
              Continue
            </button>
          </div>

          <div className="summary-clear">
            <button
              onClick={() => dispatch(clearCart())}
              className="btn btn--clear"
            >
              Clear Cart
            </button>
          </div>
        </aside>
      </div>
    </div>
  );
}
