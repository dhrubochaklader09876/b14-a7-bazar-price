import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import PriceTicker from "@/components/PriceTicker";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export const dynamic = "force-dynamic";

const inter = Inter({
  subsets: ["latin"],
});

export const metadata = {
  title: "Bazar Dor",
  description: "Azker Bazar Dor",
};

export default function RootLayout({ children }) {
  return (
    <html lang="bn" className="h-full">
      <body className={`${inter.className} min-h-full flex flex-col antialiased`}>
        <Navbar />
        <PriceTicker />

        <main className="flex-1">{children}</main>

        <footer className="w-full bg-white border-t border-gray-100 py-5 mt-auto">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center">
            <div>
              বাজার দর – প্রয়োজনীয় পণ্যের দাম এক নজরে।
            </div>
            <div className="text-center sm:text-right text-gray-400">
              সকল দাম সম্ভাব্য; market অবস্থার ওপর নির্ভর করে পরিবর্তিত হয়।
            </div>
          </div>
        </footer>

        <ToastContainer position="top-right" autoClose={3000} />

      </body>
    </html>
  );
}
