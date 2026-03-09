import React from 'react';

const Loader = ({ type, count = 1 }) => {
    // Modern, faster shimmer for a high-performance feel
    const shimmer = "relative overflow-hidden bg-gray-100 before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_1.5s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/40 before:to-transparent";

    const renderSkeleton = (key) => {
        // HOME PAGE PRODUCT CARD SKELETON
        if (type === 'card') {
            return (
                <div key={key} className="flex flex-col justify-between rounded-2xl border border-gray-100 bg-white p-3">
                    {/* Image Aspect Square */}
                    <div className={`${shimmer} aspect-square w-full rounded-xl mb-3`} />
                    <div className="flex flex-1 flex-col gap-2">
                        <div className={`${shimmer} h-2.5 w-1/4 rounded-full`} /> {/* Brand */}
                        <div className="space-y-1.5">
                            <div className={`${shimmer} h-3.5 w-full rounded-full`} /> {/* Title Line 1 */}
                            <div className={`${shimmer} h-3.5 w-2/3 rounded-full`} /> {/* Title Line 2 */}
                        </div>
                        <div className={`${shimmer} h-2.5 w-1/3 rounded-full mt-1`} /> {/* Unit */}

                        {/* Price & Button Row */}
                        <div className="mt-4 flex items-center justify-between">
                            <div className="space-y-1">
                                <div className={`${shimmer} h-5 w-12 rounded-full`} />
                                <div className={`${shimmer} h-2 w-8 rounded-full`} />
                            </div>
                            <div className={`${shimmer} h-9 w-20 rounded-xl`} />
                        </div>
                    </div>
                </div>
            );
        }

        // PRODUCT DETAIL PAGE SKELETON
        if (type === 'detail') {
            return (
                <div key={key} className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-16">
                    {/* Image Skeleton - Responsive height */}
                    <div className={`${shimmer} h-72 sm:h-96 w-full rounded-[2.5rem]`} />

                    {/* Info Skeleton */}
                    <div className="flex flex-col gap-6">
                        <div className="space-y-4">
                            <div className={`${shimmer} h-3 w-20 rounded-full`} />
                            <div className={`${shimmer} h-10 w-full sm:w-3/4 rounded-2xl`} />
                            <div className={`${shimmer} h-4 w-24 rounded-full`} />
                        </div>
                        <div className={`${shimmer} h-12 w-32 sm:w-40 rounded-2xl mt-2`} />

                        <div className="flex flex-col sm:flex-row gap-4 mt-6">
                            <div className={`${shimmer} h-14 w-full sm:w-36 rounded-2xl`} />
                            <div className={`${shimmer} h-14 flex-1 rounded-2xl`} />
                        </div>

                        {/* Highlights Box */}
                        <div className={`${shimmer} h-40 w-full rounded-3xl mt-6`} />
                    </div>
                </div>
            );
        }

        // CART ITEM LIST SKELETON
        if (type === 'list') {
            return (
                <div key={key} className="flex flex-col sm:flex-row items-start sm:items-center py-5 gap-4 border-b border-gray-50">
                    <div className="flex items-center w-full gap-4">
                        <div className={`${shimmer} h-16 w-16 sm:h-20 sm:w-20 shrink-0 rounded-xl`} />
                        <div className="flex-1 space-y-2">
                            <div className={`${shimmer} h-4 w-1/2 rounded-full`} />
                            <div className={`${shimmer} h-3 w-1/4 rounded-full`} />
                            <div className={`${shimmer} h-5 w-16 rounded-full mt-2`} />
                        </div>
                    </div>
                    <div className="flex items-center justify-between w-full sm:w-auto gap-4 mt-2 sm:mt-0">
                        <div className={`${shimmer} h-10 w-28 sm:w-32 rounded-xl`} /> {/* Qty bar */}
                        <div className={`${shimmer} h-8 w-8 rounded-lg`} /> {/* Trash icon */}
                    </div>
                </div>
            );
        }

        // ORDER SUCCESS SKELETON
        if (type === 'success') {
            return (
                <div key={key} className="mx-auto max-w-xl flex flex-col items-center">
                    <div className={`${shimmer} h-24 w-24 rounded-full mb-8`} />
                    <div className={`${shimmer} h-10 w-64 rounded-2xl mb-4`} />
                    <div className={`${shimmer} h-5 w-full max-w-sm rounded-full mb-12`} />

                    {/* Receipt Card Skeleton */}
                    <div className="w-full rounded-[2.5rem] border border-gray-100 bg-white p-6 sm:p-8 shadow-sm">
                        <div className="flex justify-between mb-8 border-b border-gray-50 pb-6">
                            <div className="space-y-2"><div className={`${shimmer} h-2 w-16 rounded-full`} /><div className={`${shimmer} h-3 w-24 rounded-full`} /></div>
                            <div className="space-y-2"><div className={`${shimmer} h-2 w-16 rounded-full`} /><div className={`${shimmer} h-3 w-24 rounded-full`} /></div>
                        </div>
                        <div className="space-y-6">
                            {[1, 2].map(i => (
                                <div key={i} className="flex justify-between items-center">
                                    <div className="flex gap-3"><div className={`${shimmer} h-10 w-10 rounded-lg`} /><div className="space-y-2"><div className={`${shimmer} h-3 w-24 rounded-full`} /><div className={`${shimmer} h-2 w-12 rounded-full`} /></div></div>
                                    <div className={`${shimmer} h-4 w-12 rounded-full`} />
                                </div>
                            ))}
                        </div>
                        <div className={`${shimmer} h-16 w-full rounded-2xl mt-10`} />
                    </div>
                </div>
            );
        }

        // UTILITY VARIANTS
        const variants = {
            nav: "h-16 sm:h-20 w-full",
            banner: "h-48 sm:h-64 w-full rounded-[2rem]",
            text: "h-3 w-3/4 rounded-full",
            circle: "h-20 w-20 rounded-full",
        };

        return (
            <div
                key={key}
                className={`${shimmer} ${variants[type] || variants.text}`}
            />
        );
    };

    return (
        <div className="w-full animate-in fade-in duration-500">
            {Array(count).fill(0).map((_, i) => renderSkeleton(i))}
        </div>
    );
};

export default Loader;