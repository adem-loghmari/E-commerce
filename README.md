# Shopper — Full-Stack E-Commerce Platform

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
| Customer Frontend | React 18 (Create React App), React Router v6, MUI |
| Admin Panel | React 18 + Vite, MUI, Chart.js, Tailwind CSS |
| Backend | Node.js, Express |
| Database | MongoDB (Mongoose ODM) |
| Auth | JWT + bcrypt |
| File Storage | Multer (local disk) |

---

## Project Structure

```
E-commerce/
├── backend/       # Express API + static file serving
├── frontend/      # Customer-facing React app (CRA)
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

Create `backend/.env` with the following:

```env
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
ADMIN_USERNAME=admin
ADMIN_PASSWORD_HASH=your_bcrypt_hashed_password
CORS_ORIGIN=http://localhost:4000
PORT=4000
```

To generate an admin password hash:
```bash
node -e "const bcrypt = require('bcrypt'); bcrypt.hash('yourpassword', 10).then(console.log)"
```

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

---

## API Overview

| Method | Route | Auth | Description |
|---|---|---|---|
| GET | `/api/allproducts` | — | List all products |
| GET | `/api/search?q=` | — | Search products |
| POST | `/api/signup` | — | Register user |
| POST | `/api/login` | — | Login user |
| POST | `/api/orders` | User JWT | Place an order |
| POST | `/api/orderslog` | User JWT | Get user's orders |
| GET | `/api/allorders` | Admin | Get all orders |
| POST | `/api/addproduct` | Admin | Add a product |
| POST | `/api/removeproduct` | Admin | Delete a product |

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
