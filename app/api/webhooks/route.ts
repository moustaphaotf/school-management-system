import { successResponse } from "@/lib/utils/api-response";

export async function POST(req: Request) {
  const body = await req.json();
  console.log({ type: typeof body, body, requestContent: body });
  return successResponse(body);
}

export async function GET(req: Request) {
  console.log("WEBHOOK AVAILABILITY CHECK");
  return successResponse({
    status: "OK",
  });
}
