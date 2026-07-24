import { useRouter } from 'next/router';
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

export default function CategoryPage() {
  const router = useRouter();
  const { type } = router.query;

  let pageTitle = "আমাদের কালেকশন";
  let filteredProducts = allProducts;

  if (type === 'boys') {
    pageTitle = "ছেলেদের পোশাক";
    filteredProducts = allProducts.filter(p => p.category === 'boys');
  } else if (type === 'girls') {
    pageTitle = "মেয়েদের পোশাক";
    filteredProducts = allProducts.filter(p => p.category === 'girls');
  } else if (type === 'new') {
    pageTitle = "নতুন কালেকশন";
    filteredProducts = allProducts.filter(p => p.isNew);
  }

  return (
    <div className="min-h-screen bg-[#faf8f5] text-gray-800 font-serif">
      <header className="bg-white border-b border-amber-100 p-4 shadow-sm text-center">
        <Link href="/" className="text-xs text-[#8c1d40] font-sans font-bold uppercase tracking-wider block mb-1">
          ← হোমপেজে ফিরে যান
        </Link>
        <h1 className="text-2xl font-bold text-gray-900">{pageTitle}</h1>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <div key={product.id} className="bg-white border border-stone-200 overflow-hidden shadow-sm flex flex-col justify-between">
              <div>
                <img src={product.image} alt={product.name} className="w-full h-64 object-cover" />
                <div className="p-4">
                  <h4 className="font-semibold text-sm mb-3 text-gray-800 h-10">{product.name}</h4>
                  <p className="text-[#8c1d40] font-extrabold text-lg">৳{product.discountPrice}</p>
                </div>
              </div>
              <div className="p-4 pt-0">
                <Link 
                  href={`/checkout?name=${encodeURIComponent(product.name)}&price=${product.discountPrice}`}
                  className="block text-center bg-[#8c1d40] text-white text-xs font-sans font-semibold uppercase py-3"
                >
                  এখনই কিনুন
                </Link>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}