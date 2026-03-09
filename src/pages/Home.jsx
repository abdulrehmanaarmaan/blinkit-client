import { useQuery } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';
import Product from '../components/Product';
import Loader from '../components/Loader';
import useAxios from '../hooks/useAxios';

const Home = () => {

    const instance = useAxios();

    const [search, setSearch] = useState('')
    const [category, setCategory] = useState('All')
    const [currentPage, setCurrentPage] = useState(1)
    const itemsPerPage = 12

    const { data, refetch, isLoading, isFetching } = useQuery({
        queryKey: ['products', currentPage, search, category],
        queryFn: async () => {
            const result = await instance.get('/products', {
                params: {
                    page: currentPage,
                    limit: itemsPerPage,
                    search: search,
                    category: category // Axios will convert "&" to "%26" correctly
                }
            })
            return result?.data
        }
    })

    const products = data?.products || []
    console.log(products)
    const totalPages = data?.totalPages || 1

    const categories = ['All', 'Juices', 'Soft Drinks', 'Energy Drinks', 'Water', 'Tea & Coffee']

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [currentPage]);

    return (
        <div className="bg-white">
            {/* HERO SECTION - Adjusted padding and text size for mobile */}
            <section className="mx-auto max-w-7xl px-4 pt-4 sm:pt-6 sm:px-6">
                <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl bg-[#D9F2FF] p-6 md:p-16">
                    <div className="relative z-10 max-w-xl">
                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#0D47A1] leading-tight">
                            Quench your thirst <br className="hidden sm:block" /> in 10 minutes.
                        </h2>
                        <p className="mt-3 text-base sm:text-lg font-semibold text-blue-700/80">
                            Premium juices, soda, and energy drinks delivered to your doorstep.
                        </p>
                    </div>
                    {/* Decorative Blur - Scaled down for mobile */}
                    <div className="absolute -right-10 -top-10 h-40 w-40 sm:h-80 sm:w-80 rounded-full bg-blue-300/40 blur-[60px] sm:blur-[100px]" />
                </div>
            </section>

            {/* STICKY FILTER & SEARCH BAR - Better stacking on mobile */}
            <section className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-sm mt-6 sm:mt-8">
                <div className="mx-auto max-w-7xl px-4 py-3 sm:px-6 flex flex-col lg:flex-row gap-4 justify-between items-center">

                    {/* Search Input - Full width on mobile */}
                    <div className="relative w-full lg:max-w-md group">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-green-600">
                            🔍
                        </span>
                        <input
                            type="text"
                            value={search}
                            placeholder="Search for drinks..."
                            className="w-full border-2 border-gray-100 rounded-xl sm:rounded-2xl pl-11 pr-10 py-2 sm:py-2.5 focus:border-green-600 focus:bg-white bg-gray-50 outline-none transition-all text-sm sm:text-base"
                            onChange={(e) => {
                                setSearch(e.target.value);
                                setCurrentPage(1);
                            }}
                        />
                        {search && (
                            <button
                                onClick={() => setSearch('')}
                                className="absolute right-3 top-1/2 -translate-y-1/2 h-6 w-6 flex items-center justify-center rounded-full bg-gray-200 text-[10px] text-gray-500 hover:bg-red-100 hover:text-red-500"
                            >
                                ✕
                            </button>
                        )}
                    </div>

                    {/* Category Tabs - Horizontal scroll with hidden scrollbar */}
                    <div className="flex gap-2 overflow-x-auto pb-1 w-full lg:w-auto scrollbar-hide">
                        <div className="flex gap-2 min-w-max px-1">
                            {categories.map((cat) => (
                                <button
                                    key={cat}
                                    onClick={() => {
                                        setCategory(cat);
                                        setCurrentPage(1);
                                    }}
                                    className={`px-4 py-1.5 sm:px-5 sm:py-2 rounded-full text-xs sm:text-sm font-bold border-2 transition-all whitespace-nowrap ${category === cat
                                        ? "bg-green-600 border-green-600 text-white shadow-md shadow-green-100"
                                        : "border-gray-100 text-gray-500 hover:border-green-600 bg-white cursor-pointer"
                                        }`}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* PRODUCT CATALOG - Optimized Grid */}
            <section className="mx-auto max-w-7xl px-4 py-8 sm:py-12 sm:px-6">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-6 sm:mb-10 gap-2">
                    <div>
                        <h3 className="text-xl sm:text-2xl font-black text-gray-900">Featured Drinks</h3>
                        <p className="text-xs sm:text-sm font-medium text-gray-400">
                            {isFetching ? 'Refreshing catalog...' : `Showing ${products.length} items`}
                        </p>
                    </div>
                </div>

                {/* Grid: 2 cols on mobile, 3 on tablet, up to 6 on desktop */}
                <div className={`grid grid-cols-2 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-x-4 sm:gap-y-10 transition-opacity duration-300 ${isFetching ? 'opacity-50' : 'opacity-100'}`}>
                    {isLoading ? (
                        <Loader type="card" count={12} />
                    ) : products.length === 0 ? (
                        <div className="col-span-full flex flex-col items-center justify-center py-16 sm:py-24 bg-gray-50 rounded-2xl sm:rounded-3xl border-2 border-dashed border-gray-200 px-4 text-center">
                            <span className="text-4xl sm:text-6xl mb-4">🥤</span>
                            <h3 className="text-lg sm:text-xl font-bold text-gray-900">No drinks found</h3>
                            <p className="text-sm text-gray-500 mt-1">Try adjusting your filters or search term</p>
                            <button
                                onClick={() => { setSearch(''); setCategory('All'); }}
                                className="mt-4 text-green-600 text-sm font-bold hover:underline cursor-pointer"
                            >
                                Clear all filters
                            </button>
                        </div>
                    ) : (
                        products.map(product => (
                            <Product product={product} key={product?._id} refetch={refetch} />
                        ))
                    )}
                </div>
            </section>

            {/* PAGINATION - Adaptive layout for small screens */}
            {products.length > 0 && (
                <section className="mx-auto max-w-7xl px-4 pb-12 sm:pb-20 sm:px-6 flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-8">
                    <div className="flex items-center gap-4">
                        <button
                            disabled={currentPage === 1}
                            onClick={() => setCurrentPage(prev => prev - 1)}
                            className={`p-2 sm:px-6 sm:py-2.5 border-2 border-gray-100 rounded-xl font-bold text-gray-600 hover:border-green-600 hover:text-green-600 disabled:opacity-30 transition-all ${currentPage !== 1 && 'cursor-pointer'}`}
                        >
                            <span className="sm:hidden">←</span>
                            <span className="hidden sm:inline">← Prev</span>
                        </button>

                        <div className="flex items-center gap-2">
                            <span className="text-xs sm:text-sm text-gray-400 font-bold uppercase tracking-wider">Page</span>
                            <span className="flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-lg bg-gray-900 text-white text-sm sm:text-base font-black shadow-lg">
                                {currentPage}
                            </span>
                            <span className="text-xs sm:text-sm text-gray-400 font-bold uppercase tracking-wider">of {totalPages}</span>
                        </div>

                        <button
                            disabled={currentPage === totalPages}
                            onClick={() => setCurrentPage(prev => prev + 1)}
                            className={`p-2 sm:px-6 sm:py-2.5 border-2 border-gray-100 rounded-xl font-bold text-gray-600 hover:border-green-600 hover:text-green-600 disabled:opacity-30 transition-all ${currentPage !== totalPages && 'cursor-pointer'}`}
                        >
                            <span className="sm:hidden">→</span>
                            <span className="hidden sm:inline">Next →</span>
                        </button>
                    </div>
                </section>
            )}
        </div>
    );
};

export default Home;