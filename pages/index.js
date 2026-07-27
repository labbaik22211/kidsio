import { useState } from 'react';
import Link from 'next/link';

const allProducts = [
  {
    id: 1,
    name: "Baby Boys Traditional Cotton Panjabi & Pajama Set",
    originalPrice: 1200,
    discountPrice: 600,
    discountPercent: 50,
    image: "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=500&q=80",
    category: "boys",
    isNew: true
  },
  {
    id: 2,
    name: "Cute Baby Girl Embroidered Frock & Dress",
    originalPrice: 1400,
    discountPrice: 700,
    discountPercent: 50,
    image: "https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?auto=format&fit=crop&w=500&q=80",
    category: "girls",
    isNew: true
  },
  {
    id: 3,
    name: "Soft Baby Denim Jeans & Printed Top Set",
    originalPrice: 1000,
    discountPrice: 500,
    discountPercent: 50,
    image: "https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?auto=format&fit=crop&w=500&q=80",
    category: "girls",
    isNew: false
  },
  {
    id: 4,
    name: "Comfortable Summer Polo & Shorts Combo",
    originalPrice: 800,
    discountPrice: 400,
    discountPercent: 50,
    image: "https://images.unsplash.com/photo-1503919545889-aef636e10ad4?auto=format&fit=crop&w=500&q=80",
    category: "boys",
    isNew: false
  }
];

export default function Home() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const filteredProducts = allProducts.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' 
      ? true 
      : selectedCategory === 'new' 
      ? product.isNew 
      : product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-[#faf8f5] text-gray-800 font-serif relative">
      {/* 1. Top Notice Banner */}
      <div className="bg-[#8c1d40] text-white text-xs text-center py-2 px-4 font-sans font-medium tracking-wide">
        ✨ সারাদেশে ফ্রি হোম ডেলিভারি পেতে এখনই অর্ডার করুন! ✨
      </div>

      {/* 2. Header & Logo */}
      <header className="bg-white border-b border-amber-100 sticky top-0 z-40 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <button 
            onClick={() => setIsSidebarOpen(true)}
            className="text-2xl text-[#8c1d40] focus:outline-none p-1 hover:opacity-80 transition"
            title="Open Menu"
          >
            ☰
          </button>

          <div className="text-center">
            <Link href="/">
              <img 
                src="/logo.png" 
                alt="Kids Fashion Logo" 
                className="h-16 sm:h-24 max-w-[280px] sm:max-w-[380px] w-full mx-auto object-contain hover:scale-105 transition duration-300"
              />
            </Link>
          </div>

          <div className="hidden md:flex gap-6 text-xs font-sans tracking-wider text-gray-700 font-bold">
            <Link href="/category/new" className="hover:text-[#8c1d40] transition">নতুন কালেকশন</Link>
            <Link href="/category/boys" className="hover:text-[#8c1d40] transition">ছেলেদের পোশাক</Link>
            <Link href="/category/girls" className="hover:text-[#8c1d40] transition">মেয়েদের পোশাক</Link>
          </div>
        </div>
      </header>

      {/* 3. Sidebar Drawer Menu */}
      {isSidebarOpen && (
        <div className="fixed inset-0 z-50 flex">
          <div className="fixed inset-0 bg-black/40" onClick={() => setIsSidebarOpen(false)}></div>
          <div className="relative bg-white w-72 max-w-full p-6 flex flex-col justify-between z-10 shadow-2xl font-sans">
            <div>
              <div className="flex justify-between items-center border-b pb-3 mb-6">
                <h3 className="font-bold text-lg text-[#8c1d40] uppercase tracking-wider">মেনু ও ফিল্টার</h3>
                <button onClick={() => setIsSidebarOpen(false)} className="text-2xl font-bold text-gray-500 hover:text-gray-800">×</button>
              </div>

              <div className="mb-6">
                <h4 className="font-semibold text-xs text-gray-500 uppercase tracking-widest mb-3">ক্যাটাগরি বাছাই করুন</h4>
                <div className="flex flex-col gap-2 text-sm font-medium">
                  <button 
                    onClick={() => { setSelectedCategory('all'); setIsSidebarOpen(false); }}
                    className={`text-left p-2.5 border transition ${selectedCategory === 'all' ? 'bg-[#8c1d40] text-white border-[#8c1d40]' : 'hover:bg-amber-50'}`}
                  >
                    সকল পোশাক
                  </button>
                  <Link href="/category/new" className="p-2.5 border hover:bg-amber-50 block text-gray-700 transition">নতুন কালেকশন Page ➔</Link>
                  <Link href="/category/boys" className="p-2.5 border hover:bg-amber-50 block text-gray-700 transition">ছেলেদের পোশাক Page ➔</Link>
                  <Link href="/category/girls" className="p-2.5 border hover:bg-amber-50 block text-gray-700 transition">মেয়েদের পোশাক Page ➔</Link>
                </div>
              </div>
            </div>
            <p className="text-[10px] text-gray-400 text-center border-t pt-4">© Kids Fashion Store</p>
          </div>
        </div>
      )}

      {/* 4. Hero Banner Section */}
      <section className="bg-amber-50/60 border-b border-amber-100 py-10 px-4">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left md:w-1/2">
            <span className="bg-[#8c1d40] text-white text-xs font-sans px-3 py-1 font-bold rounded-full uppercase tracking-widest inline-block mb-3">
              স্পেশাল কালেকশন
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 leading-tight mb-3">
              আপনার সোনামণির জন্য সবচেয়ে ক্যুট পোশাক!
            </h2>
            <p className="text-gray-600 font-sans text-sm mb-6">
              ১০০% প্রিমিয়াম কটন কাপড়ে তৈরি শিশুদের আরামদায়ক ট্রেন্ডি পোশাকের সেরা কালেকশন।
            </p>
            <a href="#products" className="inline-block bg-[#8c1d40] hover:bg-[#6e1632] text-white font-sans text-sm font-bold px-7 py-3 transition shadow-md hover:shadow-lg">
              কালেকশন দেখুন ➔
            </a>
          </div>
          <div className="md:w-1/2 flex justify-center">
            <img 
              src="https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?auto=format&fit=crop&w=600&q=80" 
              alt="Hero Banner" 
              className="rounded-lg shadow-xl max-h-72 object-cover border-4 border-white"
            />
          </div>
        </div>
      </section>

      {/* 5. Trust Badges */}
      <section className="bg-white border-b border-stone-200 py-6">
        <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-6 text-center font-sans">
          <div className="flex items-center justify-center gap-3 p-3 bg-stone-50 rounded-lg">
            <span className="text-2xl">🚚</span>
            <div className="text-left">
              <h5 className="font-bold text-sm text-gray-800">দ্রুত ডেলিভারি</h5>
              <p className="text-xs text-gray-500">সারাদেশে ৩-৫ দিনের মধ্যে</p>
            </div>
          </div>
          <div className="flex items-center justify-center gap-3 p-3 bg-stone-50 rounded-lg">
            <span className="text-2xl">💵</span>
            <div className="text-left">
              <h5 className="font-bold text-sm text-gray-800">ক্যাশ অন ডেলিভারি</h5>
              <p className="text-xs text-gray-500">পণ্য হাতে পেয়ে টাকা দিন</p>
            </div>
          </div>
          <div className="flex items-center justify-center gap-3 p-3 bg-stone-50 rounded-lg">
            <span className="text-2xl">🔄</span>
            <div className="text-left">
              <h5 className="font-bold text-sm text-gray-800">সহজ রিটার্ন</h5>
              <p className="text-xs text-gray-500">৭ দিনের মধ্যে পরিবর্তনের সুবিধা</p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Main Product Content */}
      <main id="products" className="max-w-6xl mx-auto px-4 py-12">
        <div className="text-center mb-8">
          <h3 className="text-2xl font-bold text-gray-900 tracking-wide mb-2">আমাদের জনপ্রিয় পোশাকসমূহ</h3>
          <div className="w-16 h-1 bg-[#8c1d40] mx-auto mb-6"></div>

          {/* Search Box */}
          <div className="max-w-md mx-auto font-sans">
            <div className="relative">
              <input
                type="text"
                placeholder="🔍 প্রোডাক্টের নাম দিয়ে খুঁজুন..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full p-3 pl-4 border border-amber-200 shadow-sm focus:outline-none focus:border-[#8c1d40] text-sm bg-white"
              />
              {searchTerm && (
                <button 
                  onClick={() => setSearchTerm('')} 
                  className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600 text-sm font-bold"
                >
                  Clear
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Product Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <div key={product.id} className="bg-white border border-stone-200 overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col justify-between group">
                <div>
                  <div className="relative overflow-hidden bg-stone-100">
                    <img src={product.image} alt={product.name} className="w-full h-64 object-cover group-hover:scale-105 transition duration-500" />
                    <span className="absolute top-3 right-3 bg-[#8c1d40] text-white text-[10px] font-sans font-bold px-2.5 py-1 uppercase tracking-wider shadow-sm">
                      {product.discountPercent}% ছাড়
                    </span>
                  </div>
                  <div className="p-4">
                    <h4 className="font-semibold text-sm mb-3 text-gray-800 leading-snug h-10">{product.name}</h4>
                    <div className="flex items-baseline gap-2 mb-4 font-sans">
                      <span className="text-gray-400 line-through text-xs">৳{product.originalPrice}</span>
                      <span className="text-[#8c1d40] font-extrabold text-lg">৳{product.discountPrice}</span>
                    </div>
                  </div>
                </div>
                <div className="p-4 pt-0">
                  <Link 
                    href={`/checkout?name=${encodeURIComponent(product.name)}&price=${product.discountPrice}`}
                    className="block text-center bg-[#8c1d40] hover:bg-[#6e1632] text-white text-xs font-sans font-semibold tracking-widest uppercase py-3 transition shadow-sm"
                  >
                    এখনই কিনুন
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-12 text-gray-500 font-sans">
              "<b>{searchTerm}</b>" নামের কোনো পোশাক খুঁজে পাওয়া যায়নি।
            </div>
          )}
        </div>
      </main>

      {/* 7. Floating WhatsApp Button */}
      <a 
        href="https://wa.me/8801978020786" 
        target="_blank" 
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 bg-green-500 text-white p-3.5 rounded-full shadow-2xl hover:bg-green-600 hover:scale-110 transition duration-300 z-50 flex items-center justify-center"
        title="Chat on WhatsApp"
      >
        <svg className="w-7 h-7 fill-current" viewBox="0 0 24 24">
          <path d="M12.031 0c-6.627 0-12 5.373-12 12 0 2.123.555 4.115 1.528 5.842l-1.558 5.708 5.845-1.533c1.67.901 3.58 1.413 5.603 1.413 6.627 0 12-5.373 12-12s-5.373-12-12-12zm.031 22c-1.817 0-3.535-.486-5.025-1.332l-.36-.204-3.731.978.996-3.642-.224-.356c-.927-1.474-1.428-3.189-1.428-4.974 0-5.216 4.244-9.46 9.46-9.46 5.216 0 9.46 4.244 9.46 9.46 0 5.216-4.244 9.46-9.46 9.46z"/>
        </svg>
      </a>
    </div>
  );
}