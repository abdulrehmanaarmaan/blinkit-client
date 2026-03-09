import React, { use } from 'react';
import { Link } from 'react-router';
import Swal from 'sweetalert2';
import useAddToast from '../hooks/useAddToast';
import { CartContext } from '../contexts/CartContext';
import useAction from '../hooks/useAction';

const Product = ({ product }) => {

    const { _id, image_url, name, rating, brand, unit, price, stock, category, currency } = product

    const addToast = useAddToast()

    const { instance, cart, refetch } = use(CartContext)

    const { loading, setLoading } = useAction()

    const cartProduct = cart.find(product => product?.name === name)

    const onAddToCart = () => {
        setLoading(true)
        const product = {
            name: name,
            category: category,
            brand: brand,
            price: price,
            currency: currency,
            unit: unit,
            image_url: image_url,
            quantity: 1,
            stock: stock
        }
        instance.post('/cart', product)
            .then(() => {
                refetch()
                    .then(() => {
                        addToast.fire({
                            icon: 'success',
                            title: 'Added to cart'
                        });
                        setLoading(false)
                    })
            })
            .catch(() => {
                const emptyStock = stock === 0
                Swal.fire({
                    title: emptyStock ? "Out of Stock" : "Limit Reached",
                    text: emptyStock
                        ? `Sorry, ${name} is currently unavailable.`
                        : `We only have ${stock} units of ${name} available.`,
                    icon: emptyStock ? "error" : "warning",
                    confirmButtonColor: "#0C831F", // Blinkit Green
                });
                setLoading(false)
            })
    }

    return (
        <article className="group relative flex flex-col justify-between rounded-2xl border border-gray-100 bg-white p-3 transition-all hover:shadow-xl hover:shadow-gray-200/50">
            {/* Clickable Image Area */}
            <Link to={`/product-details/${_id}`} className="block">
                <div className="relative mb-3 flex aspect-square items-center justify-center overflow-hidden rounded-xl bg-gray-50 p-4 transition-colors group-hover:bg-gray-100/50">
                    <img
                        src={image_url}
                        alt={name}
                        className="h-full w-full object-contain mix-blend-multiply transition-transform duration-300 group-hover:scale-110"
                    />

                    {/* Floating Badge (Rating or Discount) */}
                    <div className="absolute left-2 top-2 flex items-center gap-1 rounded-lg bg-white/90 px-2 py-1 text-[10px] font-black shadow-sm backdrop-blur-sm">
                        <span className="text-yellow-500">★</span> {rating}
                    </div>

                    {stock <= 5 && stock > 0 && (
                        <div className="absolute bottom-2 left-2 rounded-md bg-orange-100 px-1.5 py-0.5 text-[9px] font-bold text-orange-700">
                            Only {stock} left
                        </div>
                    )}
                </div>
            </Link>

            {/* Product Metadata */}
            <div className="flex flex-1 flex-col">
                <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
                    {brand}
                </span>
                <h4 className="mt-1 line-clamp-2 min-h-8 text-xs font-bold leading-tight text-gray-800 sm:text-sm">
                    {name}
                </h4>
                <p className="mt-1 text-[11px] font-medium text-gray-500">
                    {unit}
                </p>

                {/* Price and Action Row */}
                <div className="mt-4 flex items-center justify-between gap-2">
                    <div className="flex flex-col">
                        <span className="text-sm font-black text-gray-900 sm:text-base">
                            {currency === "USD" ? "$" : "₹"}{price}
                        </span>
                        <span className={`text-[9px] font-bold uppercase tracking-tighter ${stock > 0 ? 'text-green-600' : 'text-red-500'}`}>
                            {stock > 0 ? 'Available' : 'Out of Stock'}
                        </span>
                    </div>

                    <button
                        onClick={onAddToCart}
                        disabled={!stock || cartProduct || loading}
                        className={`group/btn relative flex h-9 w-20 items-center justify-center overflow-hidden rounded-xl border-2 font-black transition-all active:scale-95 ${cartProduct
                            ? "border-green-600 bg-green-50 text-green-700 hover:bg-green-600 hover:text-white"
                            : !stock
                                ? "border-gray-200 bg-gray-100 text-gray-400 cursor-not-allowed"
                                : "border-green-600 text-green-700 hover:bg-green-600 hover:text-white cursor-pointer"
                            } disabled:opacity-50`}
                    >
                        <span className="text-[11px] uppercase tracking-tighter">
                            {!stock ? 'SOLD' : cartProduct ? 'ADDED' : 'ADD'}
                        </span>

                        {/* Loading Spinner overlay */}
                        {loading && (
                            <div className="absolute inset-0 flex items-center justify-center bg-white/80">
                                <div className="h-4 w-4 animate-spin rounded-full border-2 border-green-600 border-t-transparent" />
                            </div>
                        )}
                    </button>
                </div>
            </div>
        </article>
    );
};

export default Product;