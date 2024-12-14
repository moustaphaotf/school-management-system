export const dynamic = 'force-dynamic'

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { getCurrentSchool } from "@/lib/utils/session";
import { educationLevelSchema } from "@/lib/validations/education-level";
import { canManageSchool } from "@/lib/utils/permissions";
import {
  errorResponse,
  unauthorizedResponse,
  forbiddenResponse,
  successResponse,
} from "@/lib/utils/api-response";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    const currentSchool = await getCurrentSchool();

    if (!session?.user?.id || !currentSchool) {
      return unauthorizedResponse();
    }

    const levels = await db.educationLevel.findMany({
      where: {
        schoolId: currentSchool.schoolId,
      },
      orderBy: {
        order: "asc",
      },
    });

    return successResponse(levels, { status: 200 });
  } catch (error) {
    console.error("[GET_EDUCATION_LEVELS_ERROR]", error);
    return errorResponse();
  }
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    const currentSchool = await getCurrentSchool();

    if (!session?.user?.id || !currentSchool) {
      return unauthorizedResponse();
    }

    if (!canManageSchool(currentSchool.role)) {
      return forbiddenResponse();
    }

    const body = await req.json();
    const values = educationLevelSchema.parse(body);

    // Get the highest order
    const highestOrder = await db.educationLevel.findFirst({
      orderBy: {
        order: "desc",
      },
      select: {
        order: true,
      },
    });

    const level = await db.educationLevel.create({
      data: {
        ...values,
        schoolId: currentSchool.schoolId,
        order: (highestOrder?.order || 0) + 1,
      },
    });

    return successResponse(level, { status: 201 });
  } catch (error) {
    console.error("[CREATE_EDUCATION_LEVEL_ERROR]", error);
    return errorResponse();
  }
}
