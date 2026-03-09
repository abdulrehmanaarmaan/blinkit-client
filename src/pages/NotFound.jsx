import React from 'react';
import { useNavigate } from 'react-router';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const NotFound = () => {

    const navigate = useNavigate()

    return (
        <div>
            <Navbar></Navbar>
            <div className="min-h-[80vh] flex items-center justify-center bg-gray-50 px-4 py-12">
                <div className="max-w-md w-full text-center">

                    {/* Visual Illustration */}
                    <div className="relative mb-8 flex justify-center">
                        {/* Decorative Background Blob */}
                        <div className="absolute inset-0 bg-green-100/50 blur-3xl rounded-full scale-150 animate-pulse"></div>

                        {/* The "Spilled" Icon */}
                        <div className="relative z-10 flex flex-col items-center">
                            <span className="text-8xl sm:text-9xl mb-2 drop-shadow-xl animate-bounce">
                                🥤
                            </span>
                            <div className="h-4 w-20 bg-gray-200 rounded-[100%] blur-sm opacity-50"></div>
                        </div>
                    </div>

                    {/* Text Content */}
                    <div className="relative z-10">
                        <h1 className="text-6xl sm:text-7xl font-black text-gray-900 tracking-tighter mb-2">
                            404
                        </h1>
                        <h2 className="text-xl sm:text-2xl font-black text-gray-800 uppercase tracking-tight">
                            Oops! Page Spilled.
                        </h2>
                        <p className="mt-4 text-sm sm:text-base font-medium text-gray-500 leading-relaxed px-6">
                            The shelf you're looking for seems to be empty or moved.
                            Let’s get you back to the drinks!
                        </p>
                    </div>

                    {/* Actions */}
                    <div className="mt-10 flex flex-col sm:flex-row items-center gap-3 sm:gap-4 px-4">
                        <button
                            onClick={() => navigate('/')}
                            className="w-full sm:flex-1 bg-black text-white py-4 rounded-2xl font-black text-sm uppercase tracking-widest shadow-xl shadow-gray-200 hover:bg-gray-800 transition-all active:scale-95 cursor-pointer"
                        >
                            Go to Homepage
                        </button>

                        <button
                            onClick={() => navigate(-1)}
                            className="w-full sm:w-auto bg-white text-gray-900 border-2 border-gray-100 px-8 py-4 rounded-2xl font-black text-sm uppercase tracking-widest hover:border-green-600 hover:text-green-700 transition-all active:scale-95 cursor-pointer"
                        >
                            Go Back
                        </button>
                    </div>

                    {/* Suggestion Links */}
                    <div className="mt-12 pt-8 border-t border-dashed border-gray-200">
                        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-4">
                            Quick Shortcuts
                        </p>
                        <div className="flex flex-wrap justify-center gap-3 text-xs font-bold text-gray-500">
                            <button onClick={() => navigate('/cart')} className="hover:text-green-600 transition-colors cursor-pointer">View Cart</button>
                            <span className="text-gray-200">|</span>
                            <button className="hover:text-green-600 transition-colors cursor-pointer">Best Sellers</button>
                            <span className="text-gray-200">|</span>
                            <button className="hover:text-green-600 transition-colors cursor-pointer">Support</button>
                        </div>
                    </div>

                </div>
            </div>
            <Footer></Footer>
        </div >
    );
};

export default NotFound;