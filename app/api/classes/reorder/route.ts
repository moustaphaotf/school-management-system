import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { getCurrentSchool } from "@/lib/utils/session";
import { canManageSchool } from "@/lib/utils/permissions";
import {
  errorResponse,
  unauthorizedResponse,
  forbiddenResponse,
  successResponse,
} from "@/lib/utils/api-response";
import { ReorderClass } from "@/lib/types/class";

export async function PATCH(req: Request) {
  const session = await getServerSession(authOptions);
  const currentSchool = await getCurrentSchool();

  if (!session?.user?.id || !currentSchool) {
    return unauthorizedResponse();
  }

  if (!canManageSchool(currentSchool.role)) {
    return forbiddenResponse();
  }
  
  try {

    const classes: ReorderClass[] = await req.json();

    // Update orders within each level
    await db.$transaction(
      classes.map((class_) =>
        db.class.update({
          where: {
            id: class_.id,
            schoolId: currentSchool.schoolId,
          },
          data: {
            order: class_.order,
          },
        })
      )
    );

    const updatedClasses = await db.class.findMany({
      where: {
        schoolId: currentSchool.schoolId,
      },
      include: {
        level: true,
      },
      orderBy: [
        {
          level: {
            order: "asc",
          },
        },
        {
          order: "asc",
        },
      ],
    });

    return successResponse(updatedClasses, { status: 200 });
  } catch (error) {
    console.error("[REORDER_CLASSES_ERROR]", error);
    return errorResponse();
  }
}
