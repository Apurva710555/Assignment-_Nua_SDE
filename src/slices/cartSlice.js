import { createSlice } from "@reduxjs/toolkit";

const safeNumber = (v, fallback = 0) => {
  const n = Number(v);
  return Number.isFinite(n) ? n : fallback;
};

const normalizeId = (id) => String(id); // compare ids as strings (1 and "1" match)

const toCurrency = (n) => Number(parseFloat(n || 0).toFixed(2));

const recalc = (price, qty) => toCurrency(price * qty);

const initialState = { items: [] };

// ---------- slice ----------
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    /**
     * addToCart
     * Accepts two shapes:
     *  - addToCart(product)
     *  - addToCart({ product, quantity })
     *
     * Behavior:
     *  - If item exists -> increase its quantity (cap at 99)
     *  - If item doesn't exist -> add a new entry
     */
    addToCart(state, action) {
      const payload = action.payload ?? {};
      // if payload is { product, quantity } use payload.product, otherwise payload is treated as the product
      const product = payload.product ?? payload;
      const quantityToAdd = Math.max(
        1,
        Math.floor(safeNumber(payload.quantity, 1))
      );

      // defensive: ignore bad payloads
      if (!product || typeof product.id === "undefined") return;

      const id = normalizeId(product.id);
      const unitPrice = safeNumber(product.price, 0);

      // try to find existing item
      const existing = state.items.find((it) => normalizeId(it.id) === id);

      if (existing) {
        // increase qty but don't go over 99
        existing.quantity = Math.min(
          99,
          (existing.quantity || 0) + quantityToAdd
        );
        // recompute subtotal using stored price if present, otherwise use unitPrice from payload
        existing.subtotal = recalc(
          existing.price ?? unitPrice,
          existing.quantity
        );
      } else {
        // push new item (keep fields simple and predictable)
        state.items.push({
          id: product.id,
          title: product.title ?? "Untitled product",
          price: unitPrice,
          image: product.image ?? product.thumbnail ?? "/placeholder-200.png",
          quantity: quantityToAdd,
          subtotal: recalc(unitPrice, quantityToAdd),
        });
      }
    },

    /**
     * updateQuantity
     * payload: { id, quantity }
     * - if quantity <= 0, remove the item
     * - otherwise set exact quantity (capped to 99) and update subtotal
     */
    updateQuantity(state, action) {
      const { id: rawId, quantity } = action.payload ?? {};
      if (typeof rawId === "undefined") return;

      const id = normalizeId(rawId);
      const q = Math.floor(safeNumber(quantity, 0));

      if (q <= 0) {
        // remove item
        state.items = state.items.filter((it) => normalizeId(it.id) !== id);
        return;
      }

      const it = state.items.find((it) => normalizeId(it.id) === id);
      if (!it) return;

      it.quantity = Math.min(99, q);
      it.subtotal = recalc(it.price, it.quantity);
    },

    /**
     * removeFromCart
     * payload: id
     */
    removeFromCart(state, action) {
      const id = normalizeId(action.payload);
      state.items = state.items.filter((it) => normalizeId(it.id) !== id);
    },

    /**
     * clearCart
     * empties the cart
     */
    clearCart(state) {
      state.items = [];
    },
  },
});

// same action names as before so your components don't need changes
export const { addToCart, updateQuantity, removeFromCart, clearCart } =
  cartSlice.actions;

export default cartSlice.reducer;
