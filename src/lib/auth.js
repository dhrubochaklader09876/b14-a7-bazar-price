import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import clientPromise from "@/lib/mongodb";


const client = await clientPromise;
const db = client.db(); 

export const auth = betterAuth({
  database: mongodbAdapter(db), 
  emailAndPassword: {
    enabled: true,
  },
  secret: process.env.BETTER_AUTH_SECRET,
  baseURL: process.env.BETTER_AUTH_URL,
});