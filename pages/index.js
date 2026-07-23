import Link from 'next/link';

const products = [
  {
    id: 1,
    name: "Baby Boys Traditional Cotton Panjabi & Pajama Set",
    originalPrice: 1200,
    discountPrice: 600,
    discountPercent: 50,
    image: "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=500&q=80",
    category: "Boys Ethnic"
  },
  {
    id: 2,
    name: "Cute Baby Girl Embroidered Frock & Dress",
    originalPrice: 1400,
    discountPrice: 700,
    discountPercent: 50,
    image: "https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?auto=format&fit=crop&w=500&q=80",
    category: "Girls Festive"
  },
  {
    id: 3,
    name: "Soft Baby Denim Jeans & Printed Top Set",
    originalPrice: 1000,
    discountPrice: 500,
    discountPercent: 50,
    image: "https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?auto=format&fit=crop&w=500&q=80",
    category: "Casual Wear"
  },
  {
    id: 4,
    name: "Comfortable Summer Polo & Shorts Combo",
    originalPrice: 800,
    discountPrice: 400,
    discountPercent: 50,
    image: "https://images.unsplash.com/photo-1503919545889-aef636e10ad4?auto=format&fit=crop&w=500&q=80",
    category: "Boys Casual"
  }
];

export default function Home() {
  return (
    <div className="min-h-screen bg-[#faf8f5] text-gray-800 font-serif">
      <div className="bg-[#8c1d40] text-white text-xs text-center py-2 px-4 tracking-widest font-sans">
        ✨ সারাদেশে ফ্রি হোম ডেলিভারি পেতে এখনই অর্ডার করুন! ✨
      </div>

      <header className="bg-white border-b border-amber-100 sticky top-0 z-50 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-center sm:text-left">
            <h1 className="text-3xl font-bold tracking-widest text-[#8c1d40] uppercase">
              KIDS FASHION
            </h1>
            <p className="text-[11px] tracking-widest text-amber-800 font-sans uppercase">
              Traditional & Modern Ethnic Wear
            </p>
          </div>

          <div className="flex gap-6 text-xs font-sans tracking-wider text-gray-600">
            <a href="#products" className="hover:text-[#8c1d40] transition">নতুন কালেকশন</a>
            <a href="#products" className="hover:text-[#8c1d40] transition">ছেলেদের পোশাক</a>
            <a href="#products" className="hover:text-[#8c1d40] transition">মেয়েদের পোশাক</a>
          </div>
        </div>
      </header>

      <section className="bg-[#f4efe8] py-12 px-4 text-center border-b border-amber-100">
        <div className="max-w-3xl mx-auto">
          <span className="text-xs uppercase tracking-widest text-[#8c1d40] font-sans font-semibold">
            Special Festivities Sale
          </span>
          <h2 className="text-3xl sm:text-4xl font-normal mt-2 mb-4 text-gray-900">
            বাচ্চাদের সেরা ট্রেন্ডি ও প্রিমিয়াম পোশাক
          </h2>
          <p className="text-sm font-sans text-gray-600 max-w-xl mx-auto leading-relaxed">
            আড়ং-এর মতো দেশীয় ও নান্দনিক ডিজাইনে আপনার সোনামণির জন্য বেছে নিন সেরা মানের পাঞ্জাবি, ফ্রক এবং ক্যাজুয়াল সেট।
          </p>
        </div>
      </section>

      <main id="products" className="max-w-6xl mx-auto px-4 py-12">
        <div className="flex justify-between items-end border-b pb-4 mb-8 border-amber-200">
          <div>
            <span className="text-xs font-sans uppercase tracking-widest text-amber-800">Featured Items</span>
            <h3 className="text-2xl font-bold text-gray-900 mt-1">আমাদের আকর্ষণীয় প্রোডাক্টসমূহ</h3>
          </div>
          <span className="text-xs font-sans text-gray-500 hidden sm:block">৫০% পর্যন্ত বিশেষ ছাড়</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <div 
              key={product.id} 
              className="bg-white border border-stone-200 rounded-none overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                <div className="relative overflow-hidden bg-stone-100">
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="w-full h-64 object-cover group-hover:scale-105 transition duration-500" 
                  />
                  <span className="absolute top-3 right-3 bg-[#8c1d40] text-white text-[10px] font-sans font-bold px-2.5 py-1 uppercase tracking-wider">
                    {product.discountPercent}% ছাড়
                  </span>
                </div>

                <div className="p-4">
                  <span className="text-[10px] font-sans uppercase tracking-widest text-amber-800 block mb-1">
                    {product.category}
                  </span>
                  <h4 className="font-semibold text-sm mb-3 text-gray-800 leading-snug line-clamp-2 h-10">
                    {product.name}
                  </h4>
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
          ))}
        </div>
      </main>

      <footer className="bg-[#2d2926] text-amber-50 py-10 px-4 font-sans border-t-4 border-[#8c1d40]">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
          <div>
            <h4 className="font-bold uppercase tracking-wider text-sm mb-2 text-amber-200">প্রিমিয়াম কোয়ালিটি</h4>
            <p className="text-xs text-stone-400 leading-relaxed">১০০% কটন এবং অ্যালার্জি মুক্ত নরম কাপড়ে তৈরি বাচ্চাদের কমফোর্ট ড্রেস।</p>
          </div>
          <div>
            <h4 className="font-bold uppercase tracking-wider text-sm mb-2 text-amber-200">সহজ ডেলিভারি ও পেমেন্ট</h4>
            <p className="text-xs text-stone-400 leading-relaxed">বিকাশ, নগদ বা ক্যাশ অন ডেলিভারিতে দ্রুত সারা বাংলাদেশে ডেলিভারি।</p>
          </div>
          <div>
            <h4 className="font-bold uppercase tracking-wider text-sm mb-2 text-amber-200">কাস্টমার সাপোর্ট</h4>
            <p className="text-xs text-stone-400 leading-relaxed">যেকোনো প্রশ্ন বা সাহায্যের জন্য আমাদের সাথে যোগাযোগ করুন।</p>
          </div>
        </div>
      </footer>
    </div>
  );
}