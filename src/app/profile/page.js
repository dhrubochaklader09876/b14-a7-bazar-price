"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { toast } from "react-toastify";

export default function ProfilePage() {
  const router = useRouter();
  const [session, setSession] = useState(null);
  const [isPending, setIsPending] = useState(true);
  const [newName, setNewName] = useState("");
  const [loading, setLoading] = useState(false);

  // Session fetch kora
  useEffect(() => {
    const fetchSession = async () => {
      try {
        const res = await authClient.getSession();
        const sessionData = res?.data || res;
        setSession(sessionData);
        if (sessionData?.user?.name) {
          setNewName(sessionData.user.name);
        }
      } catch (err) {
        console.error("Session fetch error:", err);
      } finally {
        setIsPending(false);
      }
    };
    fetchSession();
  }, []);

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!newName.trim()) {
      toast.error("নাম খালি রাখা যাবে না!");
      return;
    }

    setLoading(true);
    try {
      // Name update API call
      await authClient.updateUser({
        name: newName,
      });

      toast.success("নাম সফলভাবে আপডেট হয়েছে!");
      // Page reload kora jate Navbar ebong Profile UI instant update hoy
      window.location.reload();
    } catch (err) {
      console.error("Update error:", err);
      toast.error("নাম আপডেট করতে সমস্যা হয়েছে!");
    } finally {
      setLoading(false);
    }
  };

  if (isPending) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <p className="text-gray-500 font-medium">লোড হচ্ছে...</p>
      </div>
    );
  }

  if (!session) {
    router.push("/signin");
    return null;
  }

  return (
    <div className="max-w-2xl mx-auto my-10 p-6 bg-white rounded-3xl border border-gray-100 shadow-sm">
      <h1 className="text-2xl font-bold text-gray-800">আমার প্রোফাইল</h1>
      <p className="text-xs text-gray-400 mt-1 mb-6">আপনার অ্যাকাউন্ট তথ্য এখানে আপডেট করুন</p>

      <div className="flex items-center gap-4 mb-8 p-4 bg-gray-50 rounded-2xl">
        <div className="w-16 h-16 rounded-full bg-[#E6F4EA] flex items-center justify-center text-[#10B981] font-bold text-xl">
          {session.user?.name ? session.user.name.charAt(0).toUpperCase() : "U"}
        </div>
        <div>
          <h2 className="text-lg font-bold text-gray-800">{session.user?.name}</h2>
          <p className="text-xs text-gray-500">{session.user?.email}</p>
        </div>
      </div>

      <form onSubmit={handleUpdate} className="space-y-4">
        <div>
          <label className="block text-xs font-bold text-gray-700 mb-2">নাম</label>
          <input
            type="text"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-[#10B981] text-sm text-gray-800"
            placeholder="আপনার নাম লিখুন"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 bg-[#10B981] hover:bg-[#0D9668] text-white font-bold rounded-xl transition-colors cursor-pointer text-sm"
        >
          {loading ? "আপডেট হচ্ছে..." : "আপডেট"}
        </button>
      </form>
    </div>
  );
}