import React, { use } from 'react';
import Swal from 'sweetalert2';
import useRemoveToast from '../hooks/useRemoveToast';
import useAddToast from '../hooks/useAddToast';
import { CartContext } from '../contexts/CartContext';
import useAction from '../hooks/useAction';

const CartProduct = ({ product }) => {

    const { _id, image_url, name, unit, quantity, stock, currency, price } = product;

    const removeToast = useRemoveToast()

    const addToast = useAddToast()

    const { refetch, instance } = use(CartContext)

    const { loading, setLoading } = useAction()

    const handleDecrease = (id) => {
        setLoading(true)
        instance.patch(`/cart/${id}`, { operation: 'dec' })
            .then(() => {
                refetch()
                    .then(() => {
                        addToast.fire({
                            icon: 'success',
                            title: 'Cart updated'
                        })
                        setLoading(false)
                    })
            })
            .catch(() => {
                Swal.fire({
                    title: "Oops...",
                    text: "Something went wrong!",
                    icon: "error"
                });
                setLoading(false)
            })
    }

    const handleIncrease = (id) => {
        setLoading(true)
        instance.patch(`/cart/${id}`, { operation: 'inc' })
            .then(() => {
                refetch()
                    .then(() => {
                        addToast.fire({
                            icon: "success",
                            title: "Cart updated",
                        });
                        setLoading(false)
                    })
            })
            .catch(() => {
                Swal.fire({
                    title: "Oops...",
                    text: "Something went wrong!",
                    icon: "error"
                });
                setLoading(false)
            })
    }

    const onRemoveItem = (id) => {
        setLoading(true)
        Swal.fire({
            title: 'Remove Item?',
            text: `Are you sure you want to remove ${name} from your cart?`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',    // Red for "Delete"
            cancelButtonColor: '#6e7881',
            confirmButtonText: 'Yes, remove it!',
            cancelButtonText: 'No, keep it'
        }).then(res => {
            if (res.isConfirmed) {
                // 1. Call your API/State function to remove
                instance.delete(`/cart?id=${id}`)
                    .then(() => {
                        refetch()
                            .then(() => {
                                removeToast.fire({
                                    icon: 'info',
                                    title: 'Item removed'
                                })
                                setLoading(false)
                            })
                    })
                    .catch(() => {
                        Swal.fire({
                            title: "Oops...",
                            text: "Something went wrong!",
                            icon: "error"
                        });
                        setLoading(false)
                    })
            }
            setLoading(false)
        });
    }

    return (
        <div className="flex flex-col sm:flex-row items-start sm:items-center py-5 gap-4 border-b border-gray-50 last:border-0">
            {/* Top Row: Image and Info */}
            <div className="flex items-center w-full gap-4">
                {/* Image - Fixed size to prevent shrinking */}
                <div className="h-16 w-16 sm:h-20 sm:w-20 shrink-0 rounded-xl bg-gray-50 p-2 border border-gray-100 flex items-center justify-center">
                    <img
                        src={image_url}
                        alt={name}
                        className="h-full w-full object-contain mix-blend-multiply"
                    />
                </div>

                {/* Info - Takes available space */}
                <div className="flex-1 min-w-0">
                    <h3 className="text-sm sm:text-base font-black text-gray-900 truncate pr-2" title={name}>
                        {name}
                    </h3>
                    <p className="text-[10px] sm:text-xs font-bold text-gray-400 uppercase tracking-widest">{unit}</p>
                    <p className="mt-1 text-sm sm:text-base font-black text-green-700">
                        {currency === "USD" ? "$" : "₹"}{price}
                    </p>
                </div>
            </div>

            {/* Bottom Row / Right Side: Controls */}
            <div className="flex items-center justify-between w-full sm:w-auto sm:justify-end gap-4 mt-2 sm:mt-0">
                {/* Quantity Controls - Fixed width to prevent overlapping internal buttons */}
                <div className="flex items-center justify-between w-28 sm:w-32 rounded-xl border-2 border-green-600 bg-white p-1 shadow-sm h-10 sm:h-11">
                    <button
                        onClick={() => handleDecrease(_id)}
                        disabled={loading}
                        className="flex h-8 w-8 items-center justify-center text-xl font-medium text-green-700 hover:bg-green-50 rounded-lg active:scale-90 transition-all disabled:opacity-20 cursor-pointer"
                    >
                        −
                    </button>

                    <span className="flex-1 text-center text-sm font-black text-gray-900">
                        {loading ? <span className="animate-pulse">...</span> : quantity}
                    </span>

                    <button
                        onClick={() => handleIncrease(_id)}
                        disabled={quantity === stock || loading}
                        className="flex h-8 w-8 items-center justify-center text-xl font-medium text-green-700 hover:bg-green-50 rounded-lg active:scale-90 transition-all disabled:opacity-20 cursor-pointer"
                    >
                        +
                    </button>
                </div>

                {/* Quick Delete */}
                <button
                    onClick={() => onRemoveItem(_id)}
                    disabled={loading}
                    className="p-2 text-gray-300 hover:text-red-500 transition-colors cursor-pointer group"
                >
                    <span className="text-xl group-hover:rotate-12 inline-block transition-transform">🗑️</span>
                </button>
            </div>
        </div>
    );
};

export default CartProduct;