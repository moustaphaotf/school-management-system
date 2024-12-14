export const dynamic = 'force-dynamic'

import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { setCurrentSchoolCookie } from "@/lib/utils/cookies";
import { errorResponse, successResponse } from "@/lib/utils/api-response";

export async function POST(
  req: Request,
  { params }: { params: { schoolId: string } }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return ;
    }

    // Verify membership
    const membership = await db.schoolMembership.findUnique({
      where: {
        userId_schoolId: {
          userId: session.user.id,
          schoolId: params.schoolId,
        },
      },
      select: {
        role: true,
        school: {
          select: {
            id: true,
            name: true,
          }
        }
      },
    });

    if (!membership) {
      return new NextResponse("School not found", { status: 404 });
    }

    // Set cookie
    setCurrentSchoolCookie(params.schoolId)

    return successResponse(membership, { status: 200 })
  } catch (error) {
    console.error("[SWITCH_SCHOOL_ERROR]", error);
    return errorResponse();
  }
}