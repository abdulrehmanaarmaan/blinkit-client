const Footer = () => {
    const footerLinks = ['Blog', 'Partner', 'Privacy', 'Franchise', 'Terms', 'Seller', 'FAQs', 'Warehouse'];

    const categories = [
        { name: 'Cold Drinks & Juices', highlight: true },
        { name: 'Tea, Coffee & Health', highlight: true },
        { name: 'Vegetables & Fruits' },
        { name: 'Dairy & Breakfast' },
        { name: 'Munchies' },
        { name: 'Sweet Tooth' },
        { name: 'Bakery & Biscuits' },
        { name: 'Chicken & Meat' },
        { name: 'Baby Care' },
    ];

    const socials = [
        { n: 'FB', c: 'hover:bg-blue-600' },
        { n: 'TW', c: 'hover:bg-sky-500' },
        { n: 'IG', c: 'hover:bg-pink-600' },
        { n: 'LI', c: 'hover:bg-blue-700' }
    ];

    return (
        <footer className="w-full bg-white border-t border-gray-100 pt-16 pb-8 transition-all duration-300" aria-label="Site Footer">
            <div className="mx-auto max-w-7xl px-4 sm:px-6">

                {/* Top Section: Links Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">

                    {/* Useful Links Column */}
                    <nav aria-labelledby="useful-links-heading">
                        <h4 id="useful-links-heading" className="text-xs font-black uppercase tracking-widest text-gray-900 mb-6">Useful Links</h4>
                        <ul className="grid grid-cols-2 gap-y-3 text-sm font-medium text-gray-500">
                            {footerLinks.map(link => (
                                <li key={link} className="hover:text-green-600 transition-colors cursor-pointer w-fit decoration-2 underline-offset-4 hover:underline">
                                    {link}
                                </li>
                            ))}
                        </ul>
                    </nav>

                    {/* Categories Column */}
                    <nav className="lg:col-span-2" aria-labelledby="categories-heading">
                        <div className="flex items-center justify-between mb-6 border-b border-gray-50 pb-2">
                            <h4 id="categories-heading" className="text-xs font-black uppercase tracking-widest text-gray-900">Categories</h4>
                            <span className="text-xs font-bold text-green-600 cursor-not-allowed hover:underline opacity-80">see all</span>
                        </div>
                        <ul className="grid grid-cols-2 md:grid-cols-3 gap-x-4 gap-y-3 text-sm font-medium text-gray-500">
                            {categories.map((cat) => (
                                <li
                                    key={cat.name}
                                    className={`${cat.highlight ? 'text-gray-900 font-bold' : ''} hover:text-green-600 cursor-pointer transition-colors duration-200`}
                                >
                                    {cat.name}
                                </li>
                            ))}
                        </ul>
                    </nav>

                    {/* Socials & Value Prop */}
                    <div className="flex flex-col gap-8">
                        <div>
                            <h4 className="text-xs font-black uppercase tracking-widest text-gray-900 mb-6">Follow Us</h4>
                            <div className="flex flex-wrap gap-3">
                                {socials.map((platform) => (
                                    <div
                                        key={platform.n}
                                        className={`h-10 w-10 rounded-2xl bg-gray-50 border border-gray-100 flex items-center justify-center text-gray-600 hover:text-white transition-all cursor-pointer shadow-sm active:scale-90 ${platform.c}`}
                                        role="link"
                                        aria-label={`Follow us on ${platform.n}`}
                                    >
                                        <span className="text-xs font-black">{platform.n}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <p className="text-xs font-bold text-gray-400 leading-relaxed max-w-50">
                            Bringing the store to your door in <span className="text-green-600">10 minutes</span>.
                        </p>
                    </div>
                </div>

                {/* Middle Section: Payment & App Links */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-t border-gray-50 py-8">
                    <div className="flex flex-wrap items-center gap-6 grayscale opacity-60 hover:opacity-100 transition-all duration-700">
                        <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">Trusted Payments</span>
                        <div className="flex gap-6 items-center font-black text-gray-400 text-sm select-none">
                            <span className="tracking-tighter italic">VISA</span>
                            <span className="lowercase tracking-tighter">mastercard</span>
                            <span className="font-serif">Paytm</span>
                            <span className="tracking-widest">UPI</span>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        {['App Store', 'Google Play'].map((store) => (
                            <button
                                key={store}
                                className="h-10 px-4 bg-black rounded-xl flex items-center text-white gap-2 transition-all active:scale-95 cursor-not-allowed hover:bg-gray-800"
                                aria-disabled="true"
                            >
                                <span className="text-lg">{store === 'App Store' ? '' : '▶'}</span>
                                <div className="flex flex-col items-start leading-none text-left">
                                    <span className="text-[7px] font-bold uppercase opacity-70">{store}</span>
                                    <span className="text-[10px] font-black tracking-tight">{store === 'App Store' ? 'Download Now' : 'Get It On'}</span>
                                </div>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Bottom Section: Legal */}
                <div className="border-t border-gray-100 pt-8">
                    <div className="flex flex-col lg:flex-row justify-between items-center gap-6 text-center lg:text-left">
                        <div className="text-[11px] font-bold text-gray-400 tracking-tight">
                            © Blink Commerce Private Limited, 2016-2026. All rights reserved.
                        </div>
                        <div className="flex items-center gap-1 rounded-full bg-green-50 px-3 py-1 border border-green-100 select-none">
                            <span className="text-[10px] font-black text-green-700">✓ 100% SECURE PAYMENTS</span>
                        </div>
                    </div>
                    <p className="mt-8 text-[10px] leading-relaxed text-gray-300 font-medium max-w-4xl italic text-center lg:text-left">
                        "Blinkit" is a trademark owned & managed by "Blink Commerce Private Limited". We operate as a marketplace to facilitate rapid delivery of groceries and drinks through our partner store network.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer