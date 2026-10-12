"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signUp } from "@/lib/auth-client";
import { toast } from "react-toastify";

export default function SignUpPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSignUp = async (e) => {
    e.preventDefault();
    setError("");

    if (!name || !email || !password) {
      const msg = "অনুগ্রহ করে সকল তথ্য পূরণ করুন!";
      setError(msg);
      toast.error(msg);
      return;
    }

    try {
      setLoading(true);
      const res = await signUp.email({
        name,
        email,
        password,
        callbackURL: "/",
      });

      if (res?.error) {
        const errorMsg = res.error.message || "সাইন আপ করতে সমস্যা হয়েছে!";
        setError(errorMsg);
        toast.error(errorMsg);
      } else {
        toast.success("অ্যাকাউন্ট সফলভাবে তৈরি হয়েছে!");
        window.location.href = "/"; 
      }
    } catch (err) {
      console.error(err);
      const fallbackMsg = "অ্যাকাউন্ট তৈরি করতে সমস্যা হয়েছে!";
      setError(fallbackMsg);
      toast.error(fallbackMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center bg-[#1B365D] py-12 px-4 sm:px-6 lg:px-8">
      
      <div className="max-w-md w-full p-8 rounded-3xl bg-gradient-to-br from-[#f8f7f4] via-[#eeede7] to-[#e4e3dc] border border-stone-300 shadow-[0_20px_50px_rgba(0,0,0,0.3),inset_0_1px_3px_rgba(255,255,255,0.9)] space-y-6">
        
        <div className="text-center">
          <h2 className="text-2xl font-black text-gray-900 drop-shadow-xs">অ্যাকাউন্ট তৈরি করুন</h2>
          <p className="text-xs text-gray-600 mt-1">আজই সাইন আপ করে লেটেস্ট সব ফিচারের অ্যাক্সেস নিন!</p>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500/30 text-red-700 text-xs p-3 rounded-xl font-medium">
            ⚠️ {error}
          </div>
        )}

        <form onSubmit={handleSignUp} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1.5">নাম</label>
            <input
              type="text"
              placeholder="যেমন: রেজোয়ান আহমেদ"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-stone-300 bg-white/90 text-sm text-gray-800 placeholder-gray-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 shadow-inner"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1.5">ইমেইল</label>
            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-stone-300 bg-white/90 text-sm text-gray-800 placeholder-gray-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 shadow-inner"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1.5">পাসওয়ার্ড</label>
            <input
              type="password"
              placeholder="কমপক্ষে ৮ অক্ষরের"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-stone-300 bg-white/90 text-sm text-gray-800 placeholder-gray-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 shadow-inner"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-[#10B981] hover:bg-emerald-600 text-white font-bold text-sm rounded-xl shadow-md transition-all active:scale-[0.99]"
          >
            {loading ? "অ্যাকাউন্ট তৈরি হচ্ছে..." : "অ্যাকাউন্ট তৈরি করুন"}
          </button>
        </form>

        <div className="text-center text-xs text-gray-600">
          অ্যাকাউন্ট আছে?{" "}
          <Link href="/signin" className="text-emerald-700 font-bold hover:underline">
            সাইন ইন করুন
          </Link>
        </div>

      </div>
    </div>
  );
}