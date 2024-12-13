import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { getCurrentSchool } from "@/lib/utils/session";
import { successResponse, unauthorizedResponse } from "@/lib/utils/api-response";

export async function GET(
  req: Request,
  { params }: { params: { schoolId: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    const currentSchool = await getCurrentSchool();

    if (!session?.user?.id || !currentSchool) {
      return unauthorizedResponse();
    }

    return successResponse(currentSchool, { status: 200 });
  } catch (error) {
    console.error("[GET_SCHOOL_ERROR]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
