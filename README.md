# LUXE — Premium E‑Commerce

LUXE is a modern e‑commerce frontend where users can browse curated products, filter/search listings, view product details, save items to a wishlist, add items to a cart, and complete a simple checkout flow.

## Features

- Product catalog with **categories**, **search**, and **sorting**
- Product details with image gallery, reviews (mock), and related products
- Cart with quantity updates and order summary
- Checkout form with validation + success flow (demo)
- Wishlist
- Static info pages: About, Contact, FAQ, Shipping, Returns
- Decorative **Three.js** hero background (auto-disables on mobile / reduced-motion)
- Image fallbacks so broken links don’t show broken icons

## Tech stack

- React + TypeScript
- Vite
- Redux Toolkit (state management)
- React Router (routing)
- Tailwind CSS + shadcn/ui (UI primitives)
- Vitest (tests)
- Three.js (decorative hero background)

## Getting started

### Prerequisites

- Node.js (LTS recommended)
- npm

### Install & run

```sh
npm install
npm run dev
```

Vite will print the local URL (default: `http://localhost:8080/`).

## Scripts

- `npm run dev`: start the dev server
- `npm run build`: production build
- `npm run preview`: preview the production build locally
- `npm run lint`: run ESLint
- `npm test`: run unit tests (Vitest)

## Routes

Core routes live in `src/App.tsx`:

- `/` Home
- `/products` Product listing (supports `?category=electronics` etc.)
- `/product/:id` Product details
- `/cart` Cart
- `/checkout` Checkout
- `/login` Login (demo auth)
- `/register` Register (demo auth)
- `/wishlist` Wishlist
- `/about`, `/contact`, `/faq`, `/shipping`, `/returns` Static pages

## Project structure (high level)

- `src/pages/`: route-level pages
- `src/components/`: shared UI + layout components
- `src/store/`: Redux slices + store setup
- `src/services/`: API wrapper (mock/local)
- `src/data/`: mock product data
- `public/`: static assets (e.g. `placeholder.svg`, OG image)

## Notes

- **Data & auth are demo/mock** (no real backend by default).
- Product images use remote URLs in the mock data; the UI includes a fallback to `public/placeholder.svg` if an image fails to load.

## License

MIT
