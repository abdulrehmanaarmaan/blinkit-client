import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter } from "react-router";
import Cart from "../pages/Cart";
import Home from "../pages/Home";
import RootLayout from "../layouts/RootLayout";
import ProductDetails from "../pages/ProductDetails";
import OrderSuccess from "../pages/OrderSuccess";
import NotFound from "../pages/NotFound";

export const router = createBrowserRouter([
    {
        path: "/",
        errorElement: <NotFound></NotFound>,
        Component: RootLayout,
        children: [
            {
                path: '/',
                element: <Home></Home>,
            },
            {
                path: '/product-details/:id',
                element: <ProductDetails></ProductDetails>
            },
            {
                path: "/cart",
                element: <Cart></Cart>
            },
            {
                path: '/order-success/:id',
                element: <OrderSuccess></OrderSuccess>
            }
        ]
    }
]);
