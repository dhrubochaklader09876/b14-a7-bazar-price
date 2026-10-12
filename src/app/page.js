import { Suspense } from 'react';
import Image from 'next/image';
import ProductCard from '@/components/ProductCard';


async function getBazarProducts() {
  try {
    const res = await fetch('https://openapi.programming-hero.com/api/bazardor/products', { 
      cache: 'no-store',
      headers: {
        'Accept': 'application/json'
      }
    });
    
    if (!res.ok) {
      throw new Error(`API error: ${res.status}`);
    }
    
    const data = await res.json();
    return data?.products || data || []; 
  } catch (error) {
    console.error("Error fetching items:", error);
    return []; 
  }
}

async function BazarContent() {
  const allProducts = await getBazarProducts();

  const productsList = allProducts || [];

  const risers = productsList
    .filter(product => product?.change?.dir === "up")
    .sort((a, b) => (b.change?.pct || 0) - (a.change?.pct || 0))
    .slice(0, 6);

  const fallers = productsList
    .filter(product => product?.change?.dir === "down")
    .sort((a, b) => (b.change?.pct || 0) - (a.change?.pct || 0))
    .slice(0, 6);


  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 space-y-16">
      
      
      <section id="risers-section">
        <div className="flex items-center gap-2 mb-6">
          <span className="text-red-500 text-xl">▲</span>
          <h2 className="text-xl md:text-2xl font-black text-gray-900">আজ দাম বেড়েছে</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {risers.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      
      <section id="fallers-section">
        <div className="flex items-center gap-2 mb-6">
          <span className="text-green-500 text-xl">▼</span>
          <h2 className="text-xl md:text-2xl font-black text-gray-900">আজ দাম কমেছে</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {fallers.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      
      <section id="all-products-section" className="pt-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-gray-100 pb-5 mb-6">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <span className="text-emerald-500 text-xl">💼</span>
              <h2 className="text-xl md:text-2xl font-black text-gray-900">সব পণ্য</h2>
            </div>
            <p className="text-xs text-gray-400 font-medium">
              মোট {allProducts.length}টি পণ্য দেখানো হচ্ছে
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {allProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

    </div>
  );
}

export default function Home() {
  return (
    <div className="w-full">
      
      <section className="w-full bg-[#FFFFFF] py-12 md:py-16 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 items-center gap-8 md:gap-12">
          <div className="space-y-5 text-center md:text-left flex flex-col items-center md:items-start">
            <div className="inline-block px-3 py-1.5 bg-[#E6F4EA] text-[#137333] rounded-full text-xs font-semibold">
              📅 মঙ্গলবার, ৬ অক্টোবর, ২০২৬
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-[42px] font-black text-gray-900 leading-tight tracking-tight">
              আজকের বাজারের দাম এক নজরে
            </h1>
            <p className="text-sm md:text-base text-gray-500 max-w-md leading-relaxed font-normal">
              চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম —  বাজারভিত্তিক বিস্তারিত, গড়, সর্বনিম্ন-সর্বোচ্চ এবং দামের পরিবর্তন এক জায়গায়।
            </p>
            <div className="pt-2">
              <a href="#all-products-section" className="inline-block px-5 py-2.5 rounded-xl bg-[#10B981] hover:bg-emerald-600 text-white font-bold text-sm shadow-sm transition-all">
                সব পণ্য দেখুন
              </a>
            </div>
          </div>
          <div className="flex justify-center md:justify-end items-center">
            <div className="relative w-64 h-64 sm:w-80 sm:h-80 md:w-[360px] md:h-[360px]">
              <Image 
                src="/bazar-hero.png" 
                alt="Bazar Vegetables Basket" 
                fill 
                priority 
                sizes="(max-width: 768px) 256px, (max-width: 1024px) 320px, 360px"
                className="object-contain" 
              />
            </div>
          </div>
        </div>
      </section>

      <Suspense fallback={
        <div className="text-center py-12 text-sm text-gray-400 font-medium">
          বাজারের কার্ডগুলো লোড হচ্ছে...
        </div>
      }>
        <BazarContent />
      </Suspense>
    </div>
  );
}
