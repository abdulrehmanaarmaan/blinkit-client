import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router'
import { router } from './router/routes.jsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import CartProvider from './contexts/CartProvider.jsx'

const queryClient = new QueryClient()

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <CartProvider>
        <RouterProvider router={router} ></RouterProvider>
      </CartProvider>
    </QueryClientProvider>
  </StrictMode >
)
