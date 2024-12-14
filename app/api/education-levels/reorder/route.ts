export const dynamic = 'force-dynamic'

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { getCurrentSchool } from "@/lib/utils/session";
import {
  errorResponse,
  forbiddenResponse,
  successResponse,
  unauthorizedResponse,
} from "@/lib/utils/api-response";
import { EducationLevel } from "@prisma/client";
import { canManageSchool } from "@/lib/utils/permissions";

export async function PATCH(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    const currentSchool = await getCurrentSchool();

    if (!session?.user?.id || !currentSchool) {
      return unauthorizedResponse();
    }

    if (!canManageSchool(currentSchool.role)) {
      return forbiddenResponse();
    }

    const levels: Pick<EducationLevel, "id" | "order">[] = await req.json();

    // Update all levels in a transaction
    const updatedLevels = await db.$transaction(
      levels.map((level) =>
        db.educationLevel.update({
          where: { id: level.id },
          data: { order: level.order },
        })
      )
    );

    return successResponse(updatedLevels, { status: 200 });
  } catch (error) {
    console.error("[REORDER_EDUCATION_LEVEL_ERROR]", error);
    return errorResponse();
  }
}
