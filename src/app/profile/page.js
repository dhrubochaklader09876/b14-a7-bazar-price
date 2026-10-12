"use client";

import { useState, useEffect } from "react";
import { useSession, updateUser } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const { data: session, isPending } = useSession();
  const [newName, setNewName] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  
  useEffect(() => {
    if (session?.user) {
      setNewName(session.user.name);
    }
  }, [session]);

  
  useEffect(() => {
    if (!isPending && !session) {
      router.push("/signin");
    }
  }, [session, isPending, router]);

 
  const handleUpdateName = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await updateUser({ name: newName });
      alert("আপনার নাম সফলভাবে আপডেট হয়েছে!");
      window.location.reload();
    } catch (error) {
      alert("নাম আপডেট করতে সমস্যা হয়েছে!");
    } finally {
      setLoading(false);
    }
  };

  if (isPending) return <p className="text-center mt-10 text-gray-600">লোড হচ্ছে...</p>;
  if (!session) return null;

  return (
    <div className="max-w-4xl mx-auto mt-8 p-8 bg-white rounded-2xl border border-gray-100 shadow-sm text-black">
      <h2 className="text-xl font-bold mb-2">আমার প্রোফাইল</h2>
      <p className="text-xs text-gray-400 mb-6">আপনার অ্যাকাউন্ট তথ্য এখানে আপডেট করুন</p>

      <div className="flex items-center gap-4 border-b border-gray-50 pb-6 mb-6">
        <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center font-bold text-2xl text-emerald-700">
          {session.user.name.charAt(0)}
        </div>
        <div>
          <h3 className="text-lg font-bold text-gray-800">{session.user.name}</h3>
          <p className="text-sm text-gray-400">{session.user.email}</p>
        </div>
      </div>

      <form onSubmit={handleUpdateName} className="max-w-md flex flex-col gap-4">
        <div>
          <label className="block text-xs font-bold text-gray-500 mb-2">নাম</label>
          <input
            type="text"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            className="input input-bordered w-full bg-gray-50 border-gray-200 text-black font-medium"
            required
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="btn bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm rounded-xl"
        >
          {loading ? "আপডেট হচ্ছে..." : "আপডেট"}
        </button>
      </form>
    </div>
  );
}