"use client";

import React, { useState, useEffect } from 'react';

export default function PriceTicker() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTickerData = async () => {
      try {
        const res = await fetch('https://api.abcz.workers.dev/api/bazardor/products');
        if (!res.ok) throw new Error('Failed to fetch product data');
        const data = await res.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching ticker data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTickerData();
  }, []);

  if (loading) {
    return (
      <div className="bg-[#F8FAFC] border-b border-gray-100 py-2.5 text-center text-xs text-gray-400 font-medium">
        আজকের বাজার দর লোড হচ্ছে...
      </div>
    );
  }

    return (
    <div className="bg-[#F8FAFC] border-b border-gray-100 py-2.5 overflow-hidden flex items-center">
      
      <div className="whitespace-nowrap custom-marquee-flow">
        {[...products, ...products].map((product, idx) => {
          const isUp = product.change?.dir === "up";
          const isDown = product.change?.dir === "down";
          const percent = product.change?.pct || "০.০";

          let badgeClass = "px-1.5 py-0.5 rounded text-[11px] font-bold flex items-center gap-0.5 ";
          if (isUp) badgeClass += "bg-red-50 text-red-600";
          else if (isDown) badgeClass += "bg-green-50 text-green-600";
          else badgeClass += "bg-gray-100 text-gray-500";

          return (
            <div key={idx} className="inline-flex items-center gap-2 text-xs md:text-sm font-medium">
              <span className="text-gray-300">•</span>
              <span>{product.categoryIcon || "🛒"}</span>
              <span className="text-gray-800 font-semibold">{product.nameBn}</span>
              <span className="text-gray-600">{product.today} টাকা/{product.unit}</span>
              <span className={badgeClass}>
                {isUp ? `▲ ${percent}%` : isDown ? `▼ ${percent}%` : `${percent}%`}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );

}
