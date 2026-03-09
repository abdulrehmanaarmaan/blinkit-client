import { useNavigate } from 'react-router';
import CartProduct from '../components/CartProduct';
import Swal from 'sweetalert2';
import useAction from '../hooks/useAction';
import useCart from '../hooks/useCart';

const Cart = () => {

    const { cart, refetch, instance, subTotal, deliveryCharge, isLoading } = useCart()

    const grandTotal = subTotal + deliveryCharge + 0.50

    const navigate = useNavigate()

    const { loading, setLoading } = useAction()

    const placeOrder = () => {
        setLoading(true)
        // 1. Show Confirmation Dialog
        Swal.fire({
            title: 'Confirm Order?',
            text: `Total Amount: $${grandTotal.toFixed(2)}. Do you want to proceed?`,
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#0C831F', // Blinkit Green
            cancelButtonColor: '#6e7881',
            confirmButtonText: 'Yes, Place Order',
            cancelButtonText: 'No, Cancel'
        }).then((result) => {
            if (result.isConfirmed) {

                // 2. Show "Processing" Loading State
                Swal.fire({
                    title: 'Processing Order...',
                    allowOutsideClick: false,
                    didOpen: () => {
                        Swal.showLoading();
                    }
                });

                const orderProducts = cart.map(product => ({
                    productId: product?._id,
                    name: product?.name,
                    price: product?.price,
                    quantity: product?.quantity,
                    image_url: product?.image_url,
                    unit: product?.unit
                }));

                const order = {
                    products: orderProducts,
                    subTotal: subTotal,
                    deliveryCharge: deliveryCharge,
                    grandTotal: grandTotal,
                    status: 'Placed',
                    createdAt: new Date()
                };

                // 3. API Calls
                instance.post('/orders', order)
                    .then(res => {
                        // Chain the delete and refetch
                        return instance.delete('/cart').then(() => {
                            refetch();
                            return res; // Pass the order response forward
                        });
                    })
                    .then(res => {
                        Swal.close(); // Close processing alert
                        navigate(`/order-success/${res?.data?.insertedId}`);
                        setLoading(false)
                    })
                    .catch(() => {
                        Swal.fire({
                            icon: 'error',
                            title: 'Order Failed',
                            text: 'There was an issue placing your order. Please try again.',
                            confirmButtonColor: '#0C831F'
                        });
                        setLoading(false)
                    });
            }
            setLoading(false)
        });
    };

    if (isLoading) {
        return (
            <div className="min-h-screen bg-gray-50 py-12">
                <div className="mx-auto max-w-5xl px-4">
                    <div className="h-10 w-48 bg-gray-200 animate-pulse rounded-lg mb-8" />
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        <div className="lg:col-span-2 bg-white p-6 rounded-3xl shadow-sm">
                            <Loader type="list" count={3} />
                        </div>
                        <div className="bg-white p-6 rounded-3xl h-80 animate-pulse shadow-sm" />
                    </div>
                </div>
            </div>
        );
    }

    // 2. Empty Cart State
    if (cart.length === 0) {
        return (
            <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6 text-center">
                <div className="relative mb-6">
                    <div className="text-8xl sm:text-9xl opacity-20">🛒</div>
                    <div className="absolute inset-0 flex items-center justify-center text-4xl sm:text-5xl">🚫</div>
                </div>
                <h2 className="text-2xl sm:text-3xl font-black text-gray-900">Your cart is empty</h2>
                <p className="mt-3 text-base sm:text-lg font-medium text-gray-500 max-w-xs">
                    Looks like you haven't added anything yet. Your favorites are waiting!
                </p>
                <button
                    onClick={() => navigate('/')}
                    className="mt-8 rounded-2xl bg-[#0C831F] px-8 py-4 font-black text-white shadow-xl shadow-green-100 hover:bg-green-700 transition-all active:scale-95 cursor-pointer"
                >
                    Start Shopping
                </button>
            </div>
        );
    }

    return (
        <div className="bg-gray-50 pb-24 lg:py-12">
            <div className="mx-auto max-w-5xl px-4 sm:px-6">
                <div className="flex items-end gap-3 py-6 lg:py-0 lg:mb-8">
                    <h1 className="text-2xl sm:text-3xl font-black text-gray-900">Checkout</h1>
                    <span className="mb-1 text-xs sm:text-sm font-bold text-gray-400">({cart.length} {cart.length === 1 ? 'item' : 'items'})</span>
                </div>

                <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                    {/* Left: Items List */}
                    <section className="lg:col-span-2 space-y-6">
                        <div className="rounded-2xl sm:rounded-3xl bg-white p-4 sm:p-8 shadow-sm border border-gray-100">
                            <h2 className="mb-6 text-lg sm:text-xl font-black text-gray-900">Order Summary</h2>
                            <div className="divide-y divide-gray-50">
                                {cart.map((product) => (
                                    <CartProduct
                                        product={product}
                                        key={product?._id}
                                    />
                                ))}
                            </div>
                        </div>

                        {/* Guarantee Box */}
                        <div className="rounded-2xl border-2 border-dashed border-gray-200 p-6 flex items-center gap-4 bg-white/50">
                            <div className="h-12 w-12 shrink-0 rounded-full bg-green-100 flex items-center justify-center text-xl">🚚</div>
                            <div>
                                <h4 className="font-bold text-gray-900 text-sm">On-time Guarantee</h4>
                                <p className="text-xs text-gray-500 leading-tight">If we're late, you get a discount voucher!</p>
                            </div>
                        </div>
                    </section>

                    {/* Right: Bill Details (Sticky on Desktop) */}
                    <section className="space-y-6">
                        <div className="rounded-2xl sm:rounded-3xl bg-white p-6 sm:p-8 shadow-sm border border-gray-100 lg:sticky lg:top-24">
                            <h2 className="mb-6 text-lg sm:text-xl font-black text-gray-900">Bill Details</h2>

                            <div className="space-y-4 border-b border-gray-100 pb-6">
                                <div className="flex justify-between text-sm font-bold">
                                    <span className="text-gray-500">Item Total</span>
                                    <span className="text-gray-900">${subTotal.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between text-sm font-bold">
                                    <span className="text-gray-500">Delivery Charge</span>
                                    <span className="text-green-600">
                                        {deliveryCharge === 0 ? "FREE" : `$${deliveryCharge.toFixed(2)}`}
                                    </span>
                                </div>
                                <div className="flex justify-between text-sm font-bold">
                                    <div className="flex items-center gap-1">
                                        <span className="text-gray-500">Handling Charge</span>
                                        <span className="cursor-help text-[10px] text-gray-300 border border-gray-200 rounded-full w-4 h-4 flex items-center justify-center" title="Processing fee">i</span>
                                    </div>
                                    <span className="text-gray-900">$0.50</span>
                                </div>
                            </div>

                            <div className="flex justify-between pt-6">
                                <span className="text-lg font-black text-gray-900">Grand Total</span>
                                <span className="text-lg font-black text-gray-900">${grandTotal.toFixed(2)}</span>
                            </div>

                            {/* Hidden on mobile, shown on desktop */}
                            <button
                                onClick={placeOrder}
                                disabled={loading}
                                className="hidden lg:block mt-8 w-full rounded-2xl bg-[#0C831F] py-5 text-center font-black text-white shadow-xl shadow-green-100 transition-all hover:bg-green-700 active:scale-95 disabled:bg-gray-300 cursor-pointer"
                            >
                                {loading ? 'PROCESSING...' : 'Place Order'}
                            </button>

                            <p className="mt-4 text-center text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                                🛡️ Secure Checkout
                            </p>
                        </div>
                    </section>
                </div>
            </div>

            {/* Mobile Sticky Bottom Bar */}
            <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 p-4 shadow-[0_-10px_20px_rgba(0,0,0,0.05)] z-50">
                <div className="flex items-center justify-between max-w-5xl mx-auto gap-4">
                    <div className="flex flex-col">
                        <span className="text-[10px] font-black text-gray-400 uppercase tracking-wider">To Pay</span>
                        <span className="text-xl font-black text-gray-900">${grandTotal.toFixed(2)}</span>
                    </div>
                    <button
                        onClick={placeOrder}
                        disabled={loading}
                        className="flex-1 rounded-xl bg-[#0C831F] py-4 text-center font-black text-white shadow-lg transition-all active:scale-95 disabled:bg-gray-300"
                    >
                        {loading ? 'PROCESSING...' : 'Place Order'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Cart;