import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import clientPromise from "@/lib/mongodb";

// clientPromise থেকে সরাসরি client বের করে database (Db) অবজেক্ট তৈরি করা হচ্ছে
const client = await clientPromise;
const db = client.db();

export const auth = betterAuth({
  database: mongodbAdapter(db), // এখানে সরাসরি db অবজেক্টটি পাস করা হলো
  emailAndPassword: {
    enabled: true,
  },
  secret: process.env.BETTER_AUTH_SECRET,
  baseURL: process.env.BETTER_AUTH_URL,
});