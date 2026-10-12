"use client";

import React, { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "@/lib/auth-client";
import Link from "next/link";

export default function ProductDetailsPage({ params }) {
  const resolvedParams = use(params);
  const productId = resolvedParams.id;

  const router = useRouter();
  const { data: session, isPending } = useSession();
  const [product, setProduct] = useState(null);
  const [loadingProduct, setLoadingProduct] = useState(true);

  useEffect(() => {
    if (!isPending && !session) {
      router.push("/signin");
    }
  }, [session, isPending, router]);

  
  useEffect(() => {
    if (session) {
      const fetchProductDetails = async () => {
        try {
          const res = await fetch(`https://api.abcz.workers.dev/api/bazardor/products/${productId}`);
          if (!res.ok) throw new Error("Failed to fetch product details");
          const data = await res.json();
          setProduct(data);
        } catch (error) {
          console.error("Error:", error);
        } finally {
          setLoadingProduct(false);
        }
      };
      fetchProductDetails();
    }
  }, [productId, session]);

  if (isPending || loadingProduct) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center bg-[#F8FAFC]">
        <p className="text-sm text-gray-400 font-medium">তথ্য লোড হচ্ছে...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center bg-[#F8FAFC]">
        <p className="text-sm text-red-400 font-medium">পণ্যটির কোনো তথ্য পাওয়া যায়নি।</p>
      </div>
    );
  }

  return (
    <div className="bg-[#F8FAFC] min-h-screen py-10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        
        <Link href="/" className="inline-flex items-center text-xs font-bold text-gray-500 hover:text-emerald-600 transition-colors gap-1">
          ← হোম পেজে ফিরুন
        </Link>

        
        <div className="bg-white border border-gray-100 rounded-3xl p-6 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-gray-50 text-3xl rounded-2xl flex items-center justify-center shadow-xs">
              {product.image || product.categoryIcon || "🛒"}
            </div>
            <div>
              <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md uppercase">
                {product.categoryNameBn}
              </span>
              <h1 className="text-2xl font-black text-gray-900 mt-1">{product.nameBn}</h1>
              <p className="text-xs text-gray-400 mt-0.5">পরিমাপের একক: প্রতি {product.unit}</p>
            </div>
          </div>

          <div className="text-left sm:text-right shrink-0">
            <p className="text-xs text-gray-400 font-semibold">আজকের গড় মূল্য</p>
            <p className="text-3xl font-black text-gray-900 mt-1">
              {product.today} <span className="text-base font-bold text-gray-500">টাকা</span>
            </p>
          </div>
        </div>

        
        <div className="bg-white border border-gray-100 rounded-3xl p-6 shadow-xs space-y-4">
          <h2 className="text-lg font-black text-gray-900 border-b border-gray-50 pb-3">📍 বিভিন্ন বাজারের দামের তালিকা</h2>
          
          <div className="divide-y divide-gray-50">
            {product.markets && product.markets.map((m, idx) => (
              <div key={idx} className="py-4 flex flex-col sm:flex-row justify-between sm:items-center gap-3 first:pt-0 last:pb-0">
                <div>
                  <p className="text-sm font-bold text-gray-800">{m.market}</p>
                  <p className="text-[11px] text-gray-400 font-medium mt-0.5">🏢 বিভাগ: {m.division}</p>
                </div>
                
                <div className="flex items-center gap-6 text-xs sm:text-sm">
                  <div className="text-left sm:text-right">
                    <p className="text-[10px] text-gray-400 font-bold">সর্বনিম্ন</p>
                    <p className="font-extrabold text-gray-700 mt-0.5">{m.min} টাকা</p>
                  </div>
                  <div className="text-left sm:text-right">
                    <p className="text-[10px] text-gray-400 font-bold">সর্বোচ্চ</p>
                    <p className="font-extrabold text-red-500 mt-0.5">{m.max} টাকা</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
