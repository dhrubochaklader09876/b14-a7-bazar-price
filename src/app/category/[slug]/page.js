import React, { Suspense } from 'react';
import CategoryProductsSection from '@/components/CategoryProductsSection';

// নির্দিষ্ট ক্যাটাগরির প্রোডাক্ট ফেচ করার সার্ভার ফাংশন
async function getCategoryProducts(slug) {
  try {
    const res = await fetch(`https://openapi.programming-hero.com/api/bazardor/products?category=${slug}`);
    if (!res.ok) throw new Error('Failed to fetch category products');
    return res.json();
  } catch (error) {
    console.error("Error fetching category products:", error);
    return [];
  }
}

// ১. কন্টেন্ট লোড করার সাব-কম্পোনেন্ট (params এর জন্য await এখন এখানে হবে)
async function CategoryContent({ paramsPromise }) {
  // প্রাক-রেন্ডারিং এরর এড়াতে প্রপ্স হিসেবে আসা প্রমিসকে এখানে অ্যাওয়েট করা হলো
  const params = await paramsPromise;
  const slug = params.slug;
  
  const products = await getCategoryProducts(slug);

  const categoryName = products?.categoryNameBn || "বাজার পণ্য";
  const categoryIcon = products?.categoryIcon || "💼";

  return (
    <CategoryProductsSection 
      products={products} 
      categoryName={categoryName} 
      categoryIcon={categoryIcon} 
    />
  );
}

// ২. মেইন পেজ এক্সপোর্ট (এখানে কোনো await params থাকবে না, সরাসরি প্রমিস পাস হবে)
export default function CategoryPage({ params }) {
  return (
    <div className="bg-[#F8FAFC] min-h-screen pb-20">
      {/* params অবজেক্টটিকে সরাসরি প্রমিস আকারে ভেতরে পাঠানো হলো যাতে রেন্ডারিং ব্লক না হয় */}
      <Suspense fallback={
        <div className="text-center py-20 text-sm text-gray-400 font-medium">
          ক্যাটাগরির পণ্যগুলো লোড হচ্ছে...
        </div>
      }>
        <CategoryContent paramsPromise={params} />
      </Suspense>
    </div>
  );
}
