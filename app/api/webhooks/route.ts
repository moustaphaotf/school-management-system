import { successResponse } from "@/lib/utils/api-response";

export async function POST(req: Request) {
  // const body = await req.json();

  console.log({ requestContent: req.body });
  // return successResponse(req.body);
  return successResponse({ status: "OK" });
}

export async function GET(req: Request) {
  console.log("WEBHOOK AVAILABILITY CHECK");
  return successResponse({
    status: "OK",
  });
}
