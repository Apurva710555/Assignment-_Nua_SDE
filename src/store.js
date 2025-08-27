import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "./slices/productsSlice";
import cartReducer from "./slices/cartSlice";
import { loadState, saveState, removeState } from "./utils/localStorage";

const PERSIST_KEY = "cart";

// Try to load only the cart slice (if available)
const preloadedCart = loadState(PERSIST_KEY);

const store = configureStore({
  reducer: {
    products: productsReducer,
    cart: cartReducer,
  },
  // only provide preloadedState for cart if it exists
  preloadedState: preloadedCart ? { cart: preloadedCart } : undefined,
});

// Simple shallow compare reference to avoid unnecessary writes:
let currentCart = store.getState().cart;

// Subscribe and persist cart slice on changes.
// For production you may want to throttle this (lodash.throttle) to reduce writes.
store.subscribe(() => {
  const previous = currentCart;
  currentCart = store.getState().cart;

  // If cart object reference didn't change, skip write
  if (previous === currentCart) return;

  // If cart is empty, remove saved key to keep localStorage tidy
  if (
    !currentCart ||
    !Array.isArray(currentCart.items) ||
    currentCart.items.length === 0
  ) {
    removeState(PERSIST_KEY);
    return;
  }

  // Otherwise save the cart slice
  saveState(currentCart, PERSIST_KEY);
});

export default store;
