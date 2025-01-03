export const dynamic = 'force-dynamic'

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { getCurrentSchool } from "@/lib/utils/session";

import {
  successResponse,
  unauthorizedResponse,
} from "@/lib/utils/api-response";

export async function GET(req: Request) {
  const session = await getServerSession(authOptions);
  const currentSchool = await getCurrentSchool();

  if (!session?.user?.id || !currentSchool) {
    return unauthorizedResponse();
  }

  return successResponse(currentSchool, { status: 200 });
}
