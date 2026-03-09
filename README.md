# Blinkit Clone - Full Stack Junior Developer Task

A high-performance MERN stack application built to simulate a "10-minute delivery" e-commerce experience. This project features a dynamic product catalog, persistent cart management and a robust order processing system with real-time stock updates.

## 🚀 Live Links
- **Frontend (Client):** https://blinkit-client-eta.vercel.app
- **Backend (Server):** https://blinkit-server-production.up.railway.app

## 🛠️ Tech Stack
- **Frontend:** React 19, React Router 7, TanStack Query 5, Tailwind CSS 4.
- **Backend:** Node.js, Express 5, MongoDB Driver 7.
- **Database:** MongoDB Atlas.
- **Testing:** Detailed API Documentation available in `/docs/API_GUIDE.md`.

## ✨ Key Technical Implementations
- **Stock Management:** Integrated `bulkWrite` operations in the `/orders` POST endpoint to atomically update product stock levels upon successful order placement.
- **Advanced Filtering:** Server-side search (regex), category filtering and pagination logic implemented within the `/products` endpoint.
- **UX Excellence:** Custom-built shimmer loading states and a fully responsive "Bento" layout.
- **Cart Logic:** Server-side cart management with quantity validation against available stock.

## 💻 Local Setup

### 1. Backend Setup
```bash
cd blinkit-server
npm install
# Add .env with DB_USER and DB_PASS (Port defaults to 3000)
npm start
```
### 2. Frontend Setup
```bash
cd blinkit-client
npm install
npm run dev
```

# Blinkit Frontend - React 19 & Tailwind 4

A modern, mobile-first interface built inside the `blinkit-client` directory.

### Features
- **TanStack Query v5:** Utilized for fetching product lists and individual order details with robust caching.
- **React Router v7:** Implements a persistent layout strategy with a shared Navbar and Footer.
- **Bento Layout:** A visually structured UI built with Tailwind CSS 4's latest features.
- **SweetAlert2:** Integrated for polished user feedback during cart and order actions.