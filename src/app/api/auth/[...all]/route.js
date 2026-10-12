import { auth } from "@/lib/auth";
import { toNextJsHandler } from "better-auth/next-js";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

const handler = toNextJsHandler(auth);

export const GET = async (request) => {
  return handler.GET(request);
};

export const POST = async (request) => {
  return handler.POST(request);
};