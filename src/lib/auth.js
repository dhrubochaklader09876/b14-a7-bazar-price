import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import clientPromise from "@/lib/mongodb";

// clientPromise থেকে মূল MongoClient instance বের করে অ্যাডাপ্টারে দেওয়া হচ্ছে
const client = await clientPromise;

export const auth = betterAuth({
  database: mongodbAdapter(client), // সরাসরি client instance পাস করতে হবে
  emailAndPassword: {
    enabled: true,
  },
  secret: process.env.BETTER_AUTH_SECRET,
  baseURL: process.env.BETTER_AUTH_URL,
});