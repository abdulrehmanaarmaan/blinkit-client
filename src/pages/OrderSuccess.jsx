import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useNavigate, useParams } from 'react-router';
import useAxios from '../hooks/useAxios';

const OrderSuccess = () => {

    const { id } = useParams()

    const instance = useAxios()

    const { data: order, isLoading } = useQuery({
        queryKey: ['order', id],
        queryFn: async () => {
            const result = await instance.get(`/orders/${id}`)
            return result?.data
        }
    })

    const navigate = useNavigate()

    if (isLoading) {
        return (
            <div className="flex min-h-screen flex-col items-center justify-center bg-white p-6 text-center">
                <div className="text-6xl mb-4">⚠️</div>
                <h2 className="text-2xl font-black text-gray-900">Order Not Found</h2>
                <p className="mt-2 text-gray-500">We couldn't retrieve your order details.</p>
                <button
                    onClick={() => navigate('/')}
                    className="mt-6 rounded-xl bg-black px-8 py-3 font-bold text-white cursor-pointer"
                >
                    Go Home
                </button>
            </div>
        )
    }

    const { _id, products, grandTotal, createdAt } = order

    return (
        <div className="min-h-screen bg-gray-50 pb-20 pt-10 sm:py-16">
            <div className="mx-auto max-w-xl px-4 text-center">
                {/* Success Header */}
                <div className="mb-10 flex flex-col items-center">
                    <div className="relative mb-6">
                        <div className="absolute inset-0 animate-ping rounded-full bg-green-200 opacity-20"></div>
                        <div className="relative flex h-24 w-24 items-center justify-center rounded-full bg-green-100 text-5xl shadow-inner animate-bounce">
                            ✅
                        </div>
                    </div>
                    <h1 className="text-3xl font-black tracking-tight text-gray-900 sm:text-4xl">Order Confirmed!</h1>
                    <p className="mt-4 text-base sm:text-lg font-medium text-gray-500 leading-relaxed">
                        Sit tight! Your drinks are being packed and <br className="hidden sm:block" />
                        will arrive in <span className="font-black text-green-600">10 minutes</span>.
                    </p>
                </div>

                {/* Detailed Receipt Card */}
                <section className="overflow-hidden rounded-[2.5rem] border border-gray-100 bg-white shadow-2xl shadow-gray-200/60 transition-all">
                    {/* Receipt Header */}
                    <div className="flex items-center justify-between border-b border-gray-50 bg-gray-50/50 px-6 py-6 sm:px-8">
                        <div className="text-left">
                            <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Order Reference</p>
                            <p className="font-mono text-sm font-bold text-gray-900">#{_id?.slice(-8).toUpperCase()}</p>
                        </div>
                        <div className="text-right">
                            <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Placed On</p>
                            <p className="text-sm font-bold text-gray-900">
                                {new Date(createdAt || new Date()).toLocaleDateString('en-US', {
                                    day: 'numeric',
                                    month: 'short',
                                    hour: '2-digit',
                                    minute: '2-digit'
                                })}
                            </p>
                        </div>
                    </div>

                    {/* Item List */}
                    <div className="p-6 sm:p-8">
                        <div className="mb-6 flex items-center gap-2">
                            <h3 className="text-xs font-black uppercase tracking-widest text-gray-900">Items Ordered</h3>
                            <div className="h-px flex-1 bg-gray-100"></div>
                        </div>

                        <div className="space-y-6">
                            {products.map((product, index) => (
                                <div key={index} className="flex justify-between items-center group">
                                    <div className="flex items-center gap-4 text-left">
                                        <div className="h-10 w-10 shrink-0 rounded-lg bg-gray-50 p-1 border border-gray-100">
                                            <img
                                                src={product?.image_url}
                                                alt=""
                                                className="h-full w-full object-contain mix-blend-multiply"
                                            />
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="text-sm font-bold text-gray-900 leading-tight">{product?.name}</span>
                                            <span className="text-[11px] font-semibold text-gray-400">
                                                {product?.quantity} × ${product?.price?.toFixed(2)}
                                            </span>
                                        </div>
                                    </div>
                                    <span className="text-sm font-black text-gray-900">
                                        ${(product?.price * product?.quantity).toFixed(2)}
                                    </span>
                                </div>
                            ))}
                        </div>

                        {/* Grand Total Section */}
                        <div className="mt-8 rounded-2xl bg-green-50 p-6 border border-green-100/50">
                            <div className="flex items-center justify-between">
                                <div className="text-left">
                                    <span className="block text-[10px] font-black uppercase tracking-widest text-green-600">Amount Paid</span>
                                    <span className="text-xs font-bold text-green-700/60 italic">Via Cash on Delivery</span>
                                </div>
                                <span className="text-3xl font-black text-green-700">
                                    ${grandTotal?.toFixed(2)}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Security Message */}
                    <div className="bg-gray-900 py-3">
                        <p className="text-[9px] font-black text-white/60 uppercase tracking-[0.2em]">
                            ⚡ Real-time Delivery Tracking Enabled
                        </p>
                    </div>
                </section>

                {/* Main Action */}
                <div className="mt-10 px-4">
                    <button
                        onClick={() => navigate('/')}
                        className="group relative w-full overflow-hidden rounded-2xl bg-black py-5 text-lg font-black text-white transition-all active:scale-[0.98] cursor-pointer"
                    >
                        <span className="relative z-10">Continue Shopping</span>
                        <div className="absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-white/10 to-transparent transition-transform duration-500 group-hover:translate-x-full"></div>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default OrderSuccess;