import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import "./Header.css";

const Header = () => {
  const navigate = useNavigate();
  const cartItems = useSelector((state) => state.cart.items || []);
  const totalCount = cartItems.reduce(
    (sum, item) => sum + (item.quantity || 0),
    0
  );

  return (
    <header className="site-header">
      <div
        role="link"
        tabIndex={0}
        onClick={() => navigate("/")}
        onKeyDown={(e) => {
          if (e.key === "Enter") navigate("/");
        }}
        className="site-header__brand"
        aria-label="Go to homepage"
      >
        <img src="/logo_Nua.png" alt="Logo" className="site-header__logo" />
      </div>

      <div className="site-header__actions">
        <button
          className="cart-button"
          onClick={() => navigate("/cart")}
          aria-label={`Open cart (${totalCount} items)`}
          title="View cart"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="26"
            height="26"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="cart-button__icon"
            aria-hidden="true"
          >
            <path d="M6 6h15l-1.34 7.34a2 2 0 0 1-1.98 1.66H9.32a2 2 0 0 1-1.98-1.66L6 6z" />
            <circle cx="10" cy="20" r="1" />
            <circle cx="18" cy="20" r="1" />
          </svg>

          {totalCount > 0 && (
            <span className="cart-button__badge" aria-hidden="false">
              {totalCount}
            </span>
          )}
        </button>
      </div>
    </header>
  );
};

export default Header;
