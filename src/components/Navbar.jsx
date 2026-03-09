import React, { use } from 'react';
import { Link } from 'react-router';
import { CartContext } from '../contexts/CartContext';

const Navbar = () => {

    const { subTotal, cartCount } = use(CartContext)

    return (
        <header className="sticky top-0 z-50 w-full border-b border-gray-100 bg-white/80 backdrop-blur-md shadow-sm">
            <nav className="mx-auto flex h-16 sm:h-20 max-w-7xl items-center justify-between px-4 sm:px-6">

                {/* Left: Logo & Location */}
                <div className="flex items-center gap-3 md:gap-8">
                    <Link to="/" className="flex flex-col group">
                        <h1 className="text-2xl sm:text-3xl font-black tracking-tighter text-[#F8CB46] transition-transform group-active:scale-95">
                            blink<span className="text-gray-900">it</span>
                        </h1>
                    </Link>

                    {/* Location - Hidden on very small mobile, visible from sm up */}
                    <div className="hidden sm:flex flex-col border-l border-gray-200 pl-4 sm:pl-6 leading-tight">
                        <span className="text-[10px] font-black text-gray-900 uppercase tracking-tight">
                            Delivery in 10 mins
                        </span>
                        <span className="text-xs font-bold text-gray-500 truncate max-w-30 md:max-w-none">
                            Chittagong, BD ▾
                        </span>
                    </div>
                </div>

                {/* Right Actions */}
                <div className="flex items-center gap-3 sm:gap-6">
                    {/* Cart Button */}
                    <Link
                        to="/cart"
                        className="flex items-center gap-2 sm:gap-3 rounded-xl bg-[#0C831F] px-3 py-2 sm:px-4 sm:py-2.5 font-black text-white shadow-lg shadow-green-100 hover:bg-green-800 transition-all active:scale-95 group"
                    >
                        <div className="relative flex items-center">
                            <span className="text-lg sm:text-xl">🛒</span>
                            {cartCount > 0 && (
                                <span className="absolute -top-2.5 -right-2.5 flex h-5 w-5 animate-in zoom-in items-center justify-center rounded-full bg-yellow-400 text-[10px] font-black text-gray-900 border-2 border-[#0C831F]">
                                    {cartCount}
                                </span>
                            )}
                        </div>

                        <div className="flex flex-col items-start leading-tight min-w-12.5 sm:min-w-15">
                            {cartCount > 0 ? (
                                <>
                                    <span className="text-[9px] font-black uppercase tracking-tighter text-green-100">
                                        {cartCount} {cartCount === 1 ? 'item' : 'items'}
                                    </span>
                                    <span className="text-xs sm:text-sm font-black">
                                        ${subTotal.toFixed(2)}
                                    </span>
                                </>
                            ) : (
                                <span className="text-sm font-black">My Cart</span>
                            )}
                        </div>
                    </Link>
                </div>
            </nav>
        </header>
    );
};

export default Navbar;