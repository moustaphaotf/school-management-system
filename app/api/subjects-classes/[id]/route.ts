export const dynamic = 'force-dynamic'

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { getCurrentSchool } from "@/lib/utils/session";
import { canManageSchool } from "@/lib/utils/permissions";
import {
  errorResponse,
  unauthorizedResponse,
  forbiddenResponse,
  notFoundResponse,
  successResponse,
} from "@/lib/utils/api-response";
import { z } from "zod";

const updateSubjectClassSchema = z.object({
  coefficient: z.number().min(0.1).max(10),
});

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
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
    const values = updateSubjectClassSchema.parse(body);

    const subjectClass = await db.subjectClass.findFirst({
      where: {
        id: params.id,
        subject: {
          schoolId: currentSchool.schoolId,
        },
      },
    });

    if (!subjectClass) {
      return notFoundResponse();
    }

    const updated = await db.subjectClass.update({
      where: { id: params.id },
      data: values,
      include: {
        subject: true,
        class: true,
      },
    });

    return successResponse(updated);
  } catch (error) {
    console.error("[UPDATE_SUBJECT_CLASS_ERROR]", error);
    return errorResponse();
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    const currentSchool = await getCurrentSchool();

    if (!session?.user?.id || !currentSchool) {
      return unauthorizedResponse();
    }

    if (!canManageSchool(currentSchool.role)) {
      return forbiddenResponse();
    }

    const subjectClass = await db.subjectClass.findFirst({
      where: {
        id: params.id,
        subject: {
          schoolId: currentSchool.schoolId,
        },
      },
    });

    if (!subjectClass) {
      return notFoundResponse();
    }

    await db.subjectClass.delete({
      where: { id: params.id },
    });

    return successResponse({ success: true });
  } catch (error) {
    console.error("[DELETE_SUBJECT_CLASS_ERROR]", error);
    return errorResponse();
  }
}