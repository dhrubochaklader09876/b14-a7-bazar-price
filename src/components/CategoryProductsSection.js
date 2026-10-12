"use client";

import React, { useState } from 'react';
import ProductCard from './ProductCard';

function banglaToEnglishNumber(banglaNumStr) {
  if (!banglaNumStr) return 0;
  const banglaDigits = {'০':0, '১':1, '২':2, '৩':3, '৪':4, '৫':5, '৬':6, '৭':7, '৮':8, '৯':9};
  
  const cleanStr = banglaNumStr.toString().replace(/,/g, '').trim();
  
  let englishNumStr = '';
  for (let i = 0; i < cleanStr.length; i++) {
    const char = cleanStr[i];
    if (banglaDigits[char] !== undefined) {
      englishNumStr += banglaDigits[char];
    } else {
      englishNumStr += char; 
    }
  }
  return parseFloat(englishNumStr) || 0;
}

export default function CategoryProductsSection({ products, categoryName, categoryIcon }) {
  const [sortBy, setSortBy] = useState('default');

  const sortedProducts = [...products].sort((a, b) => {
    if (sortBy === 'low-to-high') {
      return banglaToEnglishNumber(a.today) - banglaToEnglishNumber(b.today);
    }
    if (sortBy === 'high-to-low') {
      return banglaToEnglishNumber(b.today) - banglaToEnglishNumber(a.today);
    }
    return 0; 
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      <div className="bg-white border border-gray-100 rounded-3xl p-6 shadow-xs flex items-center gap-4">
        <div className="w-16 h-16 bg-emerald-50 text-emerald-600 text-3xl rounded-2xl flex items-center justify-center shadow-xs">
          {categoryIcon}
        </div>
        <div>
          <h1 className="text-2xl font-black text-gray-900">{categoryName}</h1>
          <p className="text-xs text-gray-400 mt-1">
            {products.length}টি পণ্যের আজকের দাম ও পরিবর্তন
          </p>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-gray-100 pb-5">
        <p className="text-sm text-gray-500 font-medium">
          মোট <span className="text-gray-900 font-bold">{products.length}</span> টি পণ্য দেখানো হচ্ছে
        </p>

        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-400 font-semibold">সাজান:</span>
          <select 
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="select select-bordered select-sm rounded-xl text-xs bg-white text-gray-700 border-gray-200 focus:outline-hidden"
          >
            <option value="default">ডিফল্ট</option>
            <option value="low-to-high">দাম: কম থেকে বেশি</option>
            <option value="high-to-low">দাম: বেশি থেকে কম</option>
          </select>
        </div>
      </div>

      {sortedProducts.length === 0 ? (
        <div className="text-center py-20 text-sm text-gray-400 font-medium bg-white rounded-3xl border border-gray-50">
          এই ক্যাটাগরিতে বর্তমানে কোনো পণ্য খুঁজে পাওয়া যায়নি।
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {sortedProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}

    </div>
  );
}
