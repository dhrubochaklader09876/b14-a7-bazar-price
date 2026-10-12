import { betterAuth } from "better-auth";
import { mongodbAdapter } from "@better-auth/mongo-adapter";
import clientPromise from "./mongodb";

const client = await clientPromise;
const db = client.db("better-auth-db");

export const auth = betterAuth({
  database: mongodbAdapter(db),
  emailAndPassword: {
    enabled: true,
  },
  secret: process.env.BETTER_AUTH_SECRET || "bazarprice_secret_key_1234567890_secure",
  baseURL: process.env.BETTER_AUTH_URL || "http://localhost:3000",
});