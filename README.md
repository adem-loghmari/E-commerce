# Shopper — Full-Stack E-Commerce Platform

[![CI](https://github.com/adem-loghmari/E-commerce/actions/workflows/ci.yml/badge.svg)](https://github.com/adem-loghmari/E-commerce/actions/workflows/ci.yml)

Live demo: https://smartshop-lqyf.onrender.com

A full-stack e-commerce application with a customer-facing storefront, persistent shopping cart, JWT authentication, order management, and a separate admin dashboard — all served from a single Node.js backend.

---

## Features

### Customer Storefront
- Browse products by category (Men, Women, Kids) with price and name sorting
- Product detail pages with size selection
- Real-time search with autocomplete suggestions
- Persistent shopping cart (synced to database when logged in)
- Checkout flow with shipping address and payment method selection
- Order history with status tracking
- User profile management
- Light and dark themes

### Admin Dashboard
- Secure admin login (separate credentials from user accounts)
- Product management: add, edit, and delete products with image upload
- Order management: view all orders, update status, modify or remove orders
- User management: view and remove user accounts
- Analytics dashboard with Chart.js

---

## Tech Stack

| Layer | Technology |
|---|---|
| Customer Frontend | React 18 + Vite, React Router v6, MUI |
| Admin Panel | React 18 + Vite, MUI, Chart.js |
| Backend | Node.js, Express |
| Database | MongoDB (Mongoose ODM) |
| Auth | JWT + bcrypt |
| Security | Helmet (CSP), rate limiting, server-side validation |
| File Storage | Multer (local disk) |

---

## Project Structure

```
E-commerce/
├── backend/       # Express API + static file serving
├── frontend/      # Customer-facing React app (Vite)
└── admin/         # Admin dashboard (Vite + React)
```

The Express backend serves both React apps as static files, with `/admin` routing to the admin panel and `*` falling back to the customer frontend.

---

## Getting Started

### Prerequisites
- Node.js 18+
- MongoDB Atlas account (or local MongoDB)

### 1. Clone the repo

```bash
git clone <repo-url>
cd E-commerce
```

### 2. Configure environment variables

Copy `backend/.env.example` to `backend/.env` and fill it in:

```env
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=a_long_random_string
ADMIN_USERNAME=admin
ADMIN_PASSWORD_HASH=your_bcrypt_hashed_password
CORS_ORIGIN=
PORT=4000
```

`CORS_ORIGIN` can stay empty when the backend serves both apps itself (the default setup). The server refuses to start if a required variable is missing.

To generate a JWT secret and an admin password hash:
```bash
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
node -e "require('bcrypt').hash('yourpassword', 12).then(console.log)"
```

Never commit `.env`. Use a strong admin password, since the admin panel is reachable by anyone who knows the URL.

### 3. Install dependencies

```bash
cd backend && npm install
cd ../frontend && npm install
cd ../admin && npm install
```

### 4. Build the frontend apps

```bash
cd frontend && npm run build
cd ../admin && npm run build
```

### 5. Start the server

```bash
cd backend && npm start
```

The app is now available at `http://localhost:4000`.  
Admin panel: `http://localhost:4000/admin`

### Development

Run the three dev servers together from the repository root:

```bash
npm install
npm run dev
```

Storefront: `http://localhost:3000`, admin: `http://localhost:5173/admin`, API: `http://localhost:4000`.

---

## API Overview

| Method | Route | Auth | Description |
|---|---|---|---|
| GET | `/api/allproducts` | Public | List all products |
| GET | `/api/search/suggestions?q=` | Public | Search autocomplete |
| POST | `/api/signup` | Public | Register user |
| POST | `/api/login` | Public | Login user |
| POST | `/api/addtocart` | User JWT | Add a product to the cart |
| POST | `/api/updateProfile` | User JWT | Update profile or change password |
| POST | `/api/orders` | User JWT | Place an order |
| POST | `/api/orderslog` | User JWT | Get user's orders |
| POST | `/api/admin/login` | Public | Admin login |
| GET | `/api/allorders` | Admin JWT | Get all orders |
| GET | `/api/allusers` | Admin JWT | Get all users |
| POST | `/api/addproduct` | Admin JWT | Add a product |
| POST | `/api/removeproduct` | Admin JWT | Delete a product |
| POST | `/api/upload` | Admin JWT | Upload a product image |

---

## Security

- Passwords are hashed with bcrypt and never returned by the API.
- Customer sessions use JWTs that expire after 7 days; admin sessions expire after 8 hours.
- Login and signup endpoints are rate limited.
- Order totals are calculated on the server from catalog prices, not from values sent by the browser.
- Request bodies are validated, and search input is escaped before it is used in a query.
- Image uploads are limited to PNG, JPG and WEBP files up to 5 MB.
- Helmet sets security headers, including a Content Security Policy.

---

## Demo

**Storefront: browsing and sorting the catalog**

![Browsing the storefront](./screenshots/demo/storefront-browse.gif)

**Storefront: search, cart, checkout and order history**

![Search, cart and checkout](./screenshots/demo/storefront-checkout.gif)

**Admin panel: login, dashboard, products, orders and users**

![Admin panel walkthrough](./screenshots/demo/admin-panel.gif)

---

## Screenshots

### Customer Storefront

| Home | Category |
|---|---|
| ![Home](./screenshots/store-home.png) | ![Category](./screenshots/store-category.png) |

| Product page | Search with autocomplete |
|---|---|
| ![Product page](./screenshots/store-product.png) | ![Search](./screenshots/store-search.png) |

| Cart | Checkout |
|---|---|
| ![Cart](./screenshots/store-cart.png) | ![Checkout](./screenshots/store-checkout.png) |

| Order history | Account settings |
|---|---|
| ![Order history](./screenshots/store-orders.png) | ![Account settings](./screenshots/store-account.png) |

| Login and sign up | Dark mode |
|---|---|
| ![Login](./screenshots/store-login.png) | ![Dark mode home](./screenshots/store-home-dark.png) |

![Product page in dark mode](./screenshots/store-product-dark.png)

### Admin Dashboard

| Admin login | Dashboard |
|---|---|
| ![Admin login](./screenshots/admin-login.png) | ![Dashboard](./screenshots/admin-dashboard.png) |

| Product management | Add product |
|---|---|
| ![Product management](./screenshots/admin-products.png) | ![Add product](./screenshots/admin-add-product.png) |

| Edit product | Order management |
|---|---|
| ![Edit product](./screenshots/admin-edit-product.png) | ![Order management](./screenshots/admin-orders.png) |

| Edit order | User management |
|---|---|
| ![Edit order](./screenshots/admin-edit-order.png) | ![User management](./screenshots/admin-users.png) |

Customer emails and phone numbers are blurred in the admin captures.
