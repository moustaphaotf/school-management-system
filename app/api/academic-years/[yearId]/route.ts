import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { getCurrentSchool } from "@/lib/utils/session";
import { classSchema } from "@/lib/validations/class";
import { canManageSchool } from "@/lib/utils/permissions";
import {
  errorResponse,
  unauthorizedResponse,
  forbiddenResponse,
  notFoundResponse,
  successResponse,
} from "@/lib/utils/api-response";

import { academicYearSchema } from "@/lib/validations";

export async function PATCH(
  req: Request,
  { params }: { params: { yearId: string } }
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
    const values = academicYearSchema.partial().parse(body);

    const year = await db.academicYear.update({
      where: {
        id: params.yearId,
        schoolId: currentSchool.schoolId,
      },
      data: values,
    });

    return successResponse(year, { status: 200 });
  } catch (error) {
    console.error("[UPDATE_ACADEMIC_YEAR_ERROR]", error);
    return errorResponse();
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { yearId: string } }
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

    const year = await db.academicYear.delete({
      where: {
        id: params.yearId,
        schoolId: currentSchool.schoolId,
      },
    });

    return successResponse(year, { status: 200 });
  } catch (error) {
    console.error("[DELETE_ACADEMIC_YEAR_ERROR]", error);
    return errorResponse();
  }
}
