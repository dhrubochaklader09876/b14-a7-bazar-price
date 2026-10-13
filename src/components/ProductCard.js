"use client";

import React from 'react';
import { useRouter } from 'next/navigation';

export default function ProductCard({ product }) {
  const router = useRouter();

  const isUp = product.change?.dir === "up";
  const isDown = product.change?.dir === "down";
  const percent = product.change?.pct || "0.0";

  const handleCardClick = () => {
    
    router.push(`/product/${product.id || product._id}`);
  };

  return (
    <div 
      onClick={handleCardClick}
      className="bg-white rounded-2xl p-5 border border-gray-100 shadow-xs flex flex-col justify-between hover:shadow-md transition-shadow cursor-pointer"
    >
      <div>
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center text-2xl">
            {product.image || product.categoryIcon || "🛒"}
          </div>
          <div>
            <h3 className="text-base font-bold text-gray-800">{product.nameBn}</h3>
            <p className="text-xs text-gray-400 mt-0.5">প্রতি {product.unit}</p>
          </div>
        </div>

        <div className="flex flex-col gap-1 mt-5">
          <p className="text-[11px] text-gray-400 font-medium">আজকের দাম</p>
          <p className="text-xl font-black text-gray-900 mt-0.5">
            {product.today} <span className="text-sm font-bold text-gray-500">টাকা</span>
          </p>
        </div>
      </div>

      <div className="mt-4 flex justify-end">
        <span className={`px-2 py-1 rounded-lg text-xs font-bold flex items-center gap-0.5 ${
          isUp ? 'bg-red-50 text-red-600' :
          isDown ? 'bg-green-50 text-green-600' : 'bg-gray-50 text-gray-500'
        }`}>
          {isUp ? '▲' : isDown ? '▼' : ''} {percent}%
        </span>
      </div>
    </div>
  );
}