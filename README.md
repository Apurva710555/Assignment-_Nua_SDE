# MyShop — Mini E-commerce Frontend (React + Vite)

A small single-page e-commerce frontend built with **React (Vite)**, **Redux Toolkit** and plain CSS.
Implements product listing, product detail, shopping cart and checkout flow. Uses a public fake-products API (Fake Store API / DummyJSON) with local fallback and caching.

---

## Demo

**Live site:** (automatic deploy via Netlify / Vercel)  
If the live site link is unavailable, use the demo video below.

### ▶ Watch demo (hosted)

<!-- Replace the `YOUTUBE_VIDEO_ID` below with your actual YouTube ID -->
<figure>
  <iframe width="100%" height="420" src="https://www.youtube.com/watch?v=jfzrWuZPy_U" title="MyShop demo" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
  <figcaption>Demo: homepage → product → add to cart → checkout</figcaption>
</figure>

## Project Requirements Implemented

- **Product Listing** (`/`)
  - Responsive grid (image, title, price)
  - Search box (filter by title) and category dropdown
  - Loading indicator and fetch error handling
- **Product Detail** (`/product/:id`)
  - Image, title, description, price, rating
  - Quantity selector (1–5) and Add to Cart
- **Shopping Cart** (`/cart`)
  - Thumbnail, title, unit price, qty selector (1–10), subtotal
  - Remove items, update quantities
  - Grand total and “Proceed to Checkout”
- **Checkout** (`/checkout`)
  - Order summary (items + total)
  - Simple validated form (name, email, address)
  - Place Order clears cart and shows confirmation
- **Data Caching**
  - Products and product details cached in `localStorage`
- **State Management**
  - Redux Toolkit (slices + `configureStore`)
- **Project Structure**
  - Clean separation of `components`, `pages`, `slices`, `utils`, etc.

---

## Important files & purpose

- `src/main.jsx` — app entry: wraps app with Redux `<Provider>` and React Router `<BrowserRouter>`.
- `src/store.js` — configures Redux store with `products` and `cart` reducers; optionally rehydrates/persists cart to `localStorage`.
- `src/slices/productsSlice.js` — holds product list state (`setProducts`, `clearProducts`).
- `src/slices/cartSlice.js` — cart reducers (`addToCart`, `updateQuantity`, `removeFromCart`, `clearCart`); accepts both `product` and `{ product, quantity }` payload shapes for convenience.
- `src/pages/*` — route pages (Home, ProductDetail, Cart, Checkout).
- `src/components/Header.jsx` — topbar with logo and cart badge (updates live).
- `src/utils/localStorage.js` — helpers for caching and rehydration.

---

## Design decisions & trade-offs

**State management**

- Chose **Redux Toolkit** to centralize cart & products state; `createSlice` and `configureStore` keep code concise and beginner-friendly.

**Caching & persistence**

- Products and product details cached to `localStorage` to speed revisits.
- Cart persisted to `localStorage` and rehydrated on app start.
- Trade-off: `localStorage` may hold stale data; acceptable for a demo. For production use, implement TTL or server-driven cache control.

**Styling**

- Used plain CSS for clarity and minimal dependencies. Simple responsive grid for product listing.

**API**

- Primary: `https://fakestoreapi.com`

---

## Contact / Author

- **Author:** Apurva
- **Email :** amuthaye123@gmail.com
