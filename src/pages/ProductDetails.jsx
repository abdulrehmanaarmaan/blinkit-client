import { useQuery } from '@tanstack/react-query';
import React, { use, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import Loader from '../components/Loader';
import Swal from 'sweetalert2';
import useAddToast from '../hooks/useAddToast';
import { CartContext } from '../contexts/CartContext';
import useAction from '../hooks/useAction';

const ProductDetails = () => {

    const navigate = useNavigate()

    const { id } = useParams()

    const { cart, instance, refetch } = use(CartContext)

    const { data: product, isLoading } = useQuery({
        queryKey: ['product', id],
        queryFn: async () => {
            const result = await instance.get(`/products?id=${id}`)
            return result?.data
        }
    })

    const addToast = useAddToast()

    const [quantity, setQuantity] = useState(1)

    const { loading, setLoading } = useAction()

    const cartProduct = cart?.find(p => p?.name === product?.name)

    useEffect(() => {
        if (isLoading || !product) return;

        const targetQuantity = cartProduct ? cartProduct.quantity : 1

        setQuantity(prevQuantity => {
            if (prevQuantity !== targetQuantity) {
                return targetQuantity;
            }
            return prevQuantity;
        });

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [cartProduct, product, isLoading]);

    if (isLoading) {
        return (
            <div className="min-h-screen bg-white">
                <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
                    <div className="mb-8 w-32"><Loader type="text" count={1} /></div>
                    <Loader type="detail" count={1} />
                </div>
            </div>
        )
    }

    const { category, image_url, name, unit, rating, brand, stock, currency, price } = product;

    const onAddToCart = () => {
        setLoading(true)
        if (cartProduct && cartProduct?.quantity === quantity) {
            addToast.fire({
                icon: 'info',
                title: 'Items already in cart',
                text: `You already have ${quantity} ${unit} in your cart.`,
                timer: 2000
            });
            setLoading(false)
            return; // Stop the API call entirely
        }

        const product = {
            name: name,
            category: category,
            brand: brand,
            price: price,
            currency: currency,
            unit: unit,
            image_url: image_url,
            quantity: quantity,
            stock: stock
        }

        instance.post('/cart', product)
            .then(() => {
                refetch()
                    .then(() => {
                        addToast.fire({
                            icon: 'success',
                            title: cartProduct ? 'Cart updated' : 'Added to cart'
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

    const handleDecrease = () => {
        setLoading(true)
        if (quantity > 0) {
            setQuantity(prev => prev - 1)
            setLoading(false)
        }
    }

    const handleIncrease = () => {
        setLoading(true)
        if (quantity < stock) {
            setQuantity(prev => prev + 1)
            setLoading(false)
        }
    }

    return (
        <div className='min-h-screen bg-white'>
            <div className="mx-auto max-w-7xl px-4 py-4 sm:py-8 sm:px-6 lg:py-12">
                {/* Breadcrumb - Better spacing on mobile */}
                <nav className="mb-6 sm:mb-8 flex items-center gap-2 text-[9px] sm:text-[10px] font-black uppercase tracking-[0.15em] text-gray-400 overflow-x-auto whitespace-nowrap scrollbar-hide">
                    <span className="cursor-pointer hover:text-green-600 transition-colors" onClick={() => navigate('/')}>Home</span>
                    <span className="text-gray-300">/</span>
                    <span className="text-gray-900">{category}</span>
                </nav>

                <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:items-start lg:gap-12">
                    {/* Left: Product Image - Adjusted padding and height for mobile */}
                    <section className="lg:sticky lg:top-24 flex items-center justify-center rounded-2xl sm:rounded-4xl bg-gray-50 p-6 sm:p-12 border border-gray-100 group shadow-inner relative">
                        <img
                            src={image_url}
                            alt={name}
                            className="max-h-64 sm:max-h-96 lg:max-h-125 w-full object-contain mix-blend-multiply transition-transform duration-500 group-hover:scale-105 sm:group-hover:scale-110"
                        />
                        <div className="absolute top-4 left-4 sm:top-6 sm:left-6 rounded-full bg-white/80 backdrop-blur px-3 py-1.5 sm:px-4 sm:py-2 text-[9px] sm:text-[10px] font-bold shadow-sm border border-gray-100">
                            ⚡ 10 MINS
                        </div>
                    </section>

                    {/* Right: Product Info */}
                    <section className="flex flex-col py-0 sm:py-2">
                        <div className="border-b border-gray-100 pb-6 sm:pb-8">
                            <span className="inline-block rounded-md bg-green-50 px-2 py-1 text-[9px] sm:text-[10px] font-black uppercase tracking-widest text-green-700">
                                {brand}
                            </span>
                            <h1 className="mt-2 sm:mt-4 text-3xl sm:text-4xl md:text-5xl font-black text-gray-900 leading-tight">
                                {name}
                            </h1>
                            <p className="mt-2 text-lg sm:text-xl font-bold text-gray-400">{unit}</p>

                            <div className="mt-4 sm:mt-6 flex items-center gap-4 sm:gap-6">
                                <div className="flex items-center gap-1.5 rounded-full bg-yellow-50 px-3 py-1 sm:px-4 sm:py-1.5 text-xs sm:text-sm font-black text-yellow-700">
                                    <span className="text-base sm:text-lg text-yellow-500">★</span> {rating}
                                </div>
                                <div className="h-1 w-1 rounded-full bg-gray-300" />
                                <span className={`text-[11px] sm:text-sm font-black uppercase tracking-wider ${stock > 0 ? 'text-blue-600' : 'text-red-500'}`}>
                                    {stock > 0 ? `${stock} units left` : 'Out of stock'}
                                </span>
                            </div>
                        </div>

                        <div className="mt-8 sm:mt-10">
                            <div className="flex flex-col gap-1">
                                <div className="flex items-center gap-3">
                                    <span className="text-4xl sm:text-5xl font-black text-gray-900">
                                        {currency === "USD" ? "$" : "₹"}{price}
                                    </span>
                                    <span className="rounded bg-gray-100 px-2 py-1 text-[9px] sm:text-[10px] font-bold text-gray-500 uppercase">Best Price</span>
                                </div>
                                <span className="text-[10px] sm:text-xs font-bold text-gray-400">(Inclusive of all taxes)</span>
                            </div>

                            {/* Interaction Area - Stacked on tiny mobile, row on larger screens */}
                            <div className="mt-8 sm:mt-12 flex flex-col sm:flex-row items-stretch gap-4">
                                <div className="flex h-14 sm:h-16 w-full sm:w-40 items-center justify-between rounded-xl sm:rounded-2xl border-2 border-green-600 bg-white px-6 shadow-sm shadow-green-50">
                                    <button
                                        onClick={handleDecrease}
                                        disabled={!quantity || loading}
                                        className="text-2xl sm:text-3xl font-light text-green-700 cursor-pointer disabled:opacity-20 hover:scale-125 transition-transform"
                                    >
                                        −
                                    </button>
                                    <span className="text-lg sm:text-xl font-black text-gray-900">{quantity}</span>
                                    <button
                                        onClick={handleIncrease}
                                        disabled={quantity === stock || loading}
                                        className="text-2xl sm:text-3xl font-light text-green-700 cursor-pointer disabled:opacity-20 hover:scale-125 transition-transform"
                                    >
                                        +
                                    </button>
                                </div>

                                <button
                                    onClick={() => onAddToCart()}
                                    disabled={!stock || !quantity || loading}
                                    className="h-16 flex-1 rounded-xl bg-[#0C831F] text-base sm:text-lg font-black text-white shadow-xl shadow-green-100 transition-all hover:bg-green-800 active:scale-95 disabled:bg-gray-200 disabled:shadow-none cursor-pointer flex items-center justify-center"
                                >
                                    {loading ? (
                                        <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                                    ) : !stock ? (
                                        'OUT OF STOCK'
                                    ) : cartProduct ? (
                                        'UPDATE QUANTITY'
                                    ) : (
                                        'ADD TO CART'
                                    )}
                                </button>
                            </div>
                        </div>

                        {/* Trust Badges - 3 cols on tablet, 1 col on mobile for better readability */}
                        <div className="mt-12 sm:mt-16 grid grid-cols-3 gap-2 sm:gap-4">
                            {[
                                { icon: '⚡', title: '10 Mins', desc: 'Delivery' },
                                { icon: '🛡️', title: 'Best Price', desc: 'Guaranteed' },
                                { icon: '📦', title: 'Wide Range', desc: 'Assortment' }
                            ].map((item, idx) => (
                                <div key={idx} className="flex flex-col items-center rounded-xl sm:rounded-2xl bg-gray-50 p-2 sm:p-4 text-center border border-gray-100/50">
                                    <span className="text-xl sm:text-2xl mb-1">{item.icon}</span>
                                    <span className="text-[9px] sm:text-[11px] font-black text-gray-900 uppercase tracking-tighter">{item.title}</span>
                                    <span className="text-[8px] sm:text-[10px] font-bold text-gray-400 leading-tight">{item.desc}</span>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;