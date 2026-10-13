"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { authClient } from '@/lib/auth-client';

export default function Navbar() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [session, setSession] = useState(null);
  const [isPending, setIsPending] = useState(true);

 useEffect(() => {
   
    const getSessionData = async () => {
      try {
        const res = await authClient.getSession();
        
        if (res?.data) {
          setSession(res.data);
        } else if (res) {
          setSession(res);
        }
      } catch (err) {
        console.error("Session error:", err);
      } finally {
        setIsPending(false);
      }
    };
    getSessionData();

    const fetchCategories = async () => {
      try {
        const res = await fetch('https://openapi.programming-hero.com/api/bazardor/categories');
        if (!res.ok) throw new Error('Failed to fetch categories');
        const data = await res.json();
        setCategories(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  const handleSignOut = async () => {
    try {
      await authClient.signOut({
        fetchOptions: {
          onSuccess: () => {
            setSession(null);
            setDropdownOpen(false);
            window.location.href = "/signin";
          }
        }
      });
    } catch (error) {
      console.error("Sign out error:", error);
      setSession(null);
      window.location.href = "/signin";
    }
  };

  return (
    <header className="w-full bg-white border-b border-gray-100 shadow-xs relative z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col lg:flex-row justify-between items-center gap-4">
        
        <div className="flex items-center gap-3 shrink-0">
          <Link href="/" className="bg-[#10B981] text-white px-4 py-2 rounded-xl font-bold text-xl shadow-xs flex items-center gap-2">
            <Image src="/logo-icon.png" alt="Bazar Dor Logo" width={20} height={20} className="object-contain invert brightness-0" />
            <span>বাজার দর</span>
          </Link>
          <div className="text-xs text-gray-500 border-l border-gray-200 pl-3 hidden sm:block">
            <p className="font-semibold text-gray-700">মঙ্গলবার</p>
            <p>৬ অক্টোবর, ২০২৫</p>
          </div>
        </div>

        <nav className="flex flex-wrap justify-center items-center gap-2 bg-gray-50 p-1.5 rounded-2xl border border-gray-100 text-sm">
          {loading ? (
            <span className="text-xs text-gray-400 px-4 py-2">ক্যাটাগরি লোড হচ্ছে...</span>
          ) : (
            categories.map((category, index) => (
              <Link 
                key={category.id || index} 
                href={`/category/${category.slug}`} 
                className="px-4 py-1.5 rounded-xl font-medium text-gray-600 hover:text-[#10B981] hover:bg-white hover:shadow-xs transition-all flex items-center gap-1.5"
              >
                <span>{category.icon}</span>
                <span>{category.nameBn}</span>
              </Link>
            ))
          )}
        </nav>

        <div className="flex items-center gap-3 relative shrink-0">
          {!isPending && (
            session?.user ? (
              <div className="relative">
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center gap-2 cursor-pointer bg-gray-50 hover:bg-gray-100 py-1.5 px-3 rounded-xl border border-gray-200 transition-colors"
                >
                  <div className="w-8 h-8 rounded-full bg-[#E6F4EA] flex items-center justify-center text-[#10B981] font-bold text-sm">
                    {session.user.name ? session.user.name.charAt(0).toUpperCase() : 'U'}
                  </div>
                  <span className="text-sm font-semibold text-gray-700">{session.user.name}</span>
                  <svg className={`w-4 h-4 text-gray-500 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-100 rounded-2xl shadow-xl py-2 z-50">
                    <Link
                      href="/profile"
                      onClick={() => setDropdownOpen(false)}
                      className="flex items-center gap-2 px-4 py-2.5 text-gray-700 hover:bg-gray-50 font-medium text-sm transition-colors"
                    >
                      <span>👤</span> আমার প্রোফাইল
                    </Link>
                    <button
                      onClick={handleSignOut}
                      className="w-full text-left flex items-center gap-2 px-4 py-2.5 text-red-600 hover:bg-red-50 font-medium text-sm transition-colors cursor-pointer"
                    >
                      <span>🚪</span> সাইন আউট
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link href="/signin" className="px-4 py-1.5 rounded-xl text-sm font-bold text-gray-600 hover:bg-gray-100 transition-colors">
                  সাইন ইন
                </Link>
                <Link href="/signup" className="px-4 py-1.5 rounded-xl text-sm font-bold text-white bg-[#10B981] hover:bg-[#0D9668] shadow-xs transition-colors">
                  সাইন আপ
                </Link>
              </div>
            )
          )}
        </div>

      </div>
    </header>
  );
}