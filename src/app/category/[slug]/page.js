import React, { Suspense } from 'react';
import CategoryProductsSection from '@/components/CategoryProductsSection';

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

async function CategoryContent({ paramsPromise }) {
  
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


export default function CategoryPage({ params }) {
  return (
    <div className="bg-[#F8FAFC] min-h-screen pb-20">
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
