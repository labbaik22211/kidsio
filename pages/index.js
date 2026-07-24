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

  // Filter products by search name and category
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
    <div className="min-h-screen bg-[#faf8f5] text-gray-800 font-serif">
      {/* Top Banner */}
      <div className="bg-[#8c1d40] text-white text-xs text-center py-2 px-4 font-sans">
        ✨ সারাদেশে ফ্রি হোম ডেলিভারি পেতে এখনই অর্ডার করুন! ✨
      </div>

      {/* Header with Logo & Hamburger Menu */}
      <header className="bg-white border-b border-amber-100 sticky top-0 z-40 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          
          {/* Left: Hamburger Button (Three Lines) */}
          <button 
            onClick={() => setIsSidebarOpen(true)}
            className="text-2xl text-[#8c1d40] focus:outline-none p-1 hover:opacity-80 transition"
            title="Open Filter Menu"
          >
            ☰
          </button>

          {/* Center: Custom Image Logo */}
          <div className="text-center">
            <Link href="/">
              <img 
                src="/logo.png" 
                alt="Kids Fashion Logo" 
                className="h-20 sm:h-28 mx-w-[280px] sm:max-w-[360px] w-full mx-auto object-contain hover:scale-105 transition duration-300"
              />
            </Link>
          </div>

          {/* Right Links (Desktop) */}
          <div className="hidden md:flex gap-6 text-xs font-sans tracking-wider text-gray-600 font-bold">
            <Link href="/category/new" className="hover:text-[#8c1d40]">নতুন কালেকশন</Link>
            <Link href="/category/boys" className="hover:text-[#8c1d40]">ছেলেদের পোশাক</Link>
            <Link href="/category/girls" className="hover:text-[#8c1d40]">মেয়েদের পোশাক</Link>
          </div>
        </div>
      </header>

      {/* Side Drawer Filter Sidebar */}
      {isSidebarOpen && (
        <div className="fixed inset-0 z-50 flex">
          <div className="fixed inset-0 bg-black/40" onClick={() => setIsSidebarOpen(false)}></div>
          
          <div className="relative bg-white w-72 max-w-full p-6 flex flex-col justify-between z-10 shadow-2xl font-sans">
            <div>
              <div className="flex justify-between items-center border-b pb-3 mb-6">
                <h3 className="font-bold text-lg text-[#8c1d40] uppercase tracking-wider">ফিল্টার মেনু</h3>
                <button onClick={() => setIsSidebarOpen(false)} className="text-2xl font-bold text-gray-500 hover:text-gray-800">×</button>
              </div>

              {/* Category Filter */}
              <div className="mb-6">
                <h4 className="font-semibold text-xs text-gray-500 uppercase tracking-widest mb-3">ক্যাটাগরি বাছাই করুন</h4>
                <div className="flex flex-col gap-2 text-sm font-medium">
                  <button 
                    onClick={() => { setSelectedCategory('all'); setIsSidebarOpen(false); }}
                    className={`text-left p-2.5 border transition ${selectedCategory === 'all' ? 'bg-[#8c1d40] text-white border-[#8c1d40]' : 'hover:bg-amber-50'}`}
                  >
                    সকল পোশাক
                  </button>
                  <Link 
                    href="/category/new" 
                    className="p-2.5 border hover:bg-amber-50 block text-gray-700 transition"
                  >
                    নতুন কালেকশন Page ➔
                  </Link>
                  <Link 
                    href="/category/boys" 
                    className="p-2.5 border hover:bg-amber-50 block text-gray-700 transition"
                  >
                    ছেলেদের পোশাক Page ➔
                  </Link>
                  <Link 
                    href="/category/girls" 
                    className="p-2.5 border hover:bg-amber-50 block text-gray-700 transition"
                  >
                    মেয়েদের পোশাক Page ➔
                  </Link>
                </div>
              </div>
            </div>

            <p className="text-[10px] text-gray-400 text-center border-t pt-4">© Kids Fashion Store</p>
          </div>
        </div>
      )}

      {/* Main Content & Search Filter */}
      <main className="max-w-6xl mx-auto px-4 py-8">
        {/* Name Search Box */}
        <div className="max-w-md mx-auto mb-8 font-sans">
          <div className="relative">
            <input
              type="text"
              placeholder="🔍 প্রোডাক্টের নাম দিয়ে খুঁজুন..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full p-3 pl-4 border border-amber-200 rounded-none shadow-sm focus:outline-none focus:border-[#8c1d40] text-sm bg-white"
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

        {/* Product Grid */}
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
    </div>
  );
}