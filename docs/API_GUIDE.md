# API Documentation & Testing Guide

Since this project utilizes the free version of Thunder Client, please use the following endpoints for manual testing.

### 1. Products
- **Get All Products:** `GET /products`
- **Search:** `GET /products?search=orange` (Case-insensitive regex search)
- **Filter by Category:** `GET /products?category=Juices`
- **Pagination:** `GET /products?page=1&limit=12`
- **Single Product:** `GET /products?id=[OBJECT_ID]`

### 2. Cart Logic
- **Add/Update Item:** `POST /cart` (Body: `{ "name": "...", "quantity": 1, "stock": 100 }`)
- **Modify Quantity:** `PATCH /cart/:id` (Body: `{ "operation": "inc" }` or `"dec"`)

### 3. Orders & Stock Management
- **Place Order:** `POST /orders`
- **Logic:** This endpoint executes a `bulkWrite` to atomically decrease product stock levels upon success.
- **Get Receipt:** `GET /orders/:id`