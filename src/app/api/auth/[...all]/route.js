import { auth } from "@/lib/auth";
import { toNextJsHandler } from "better-auth/next-js";

export const dynamic = "force-dynamic";

export const GET = async (request) => {
  const { GET: handleGET } = toNextJsHandler(auth);
  return handleGET(request);
};

export const POST = async (request) => {
  const { POST: handlePOST } = toNextJsHandler(auth);
  return handlePOST(request);
};