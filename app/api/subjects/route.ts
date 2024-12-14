export const dynamic = 'force-dynamic'

import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { getCurrentSchool } from "@/lib/utils/session";
import { subjectSchema } from "@/lib/validations/subject";
import {
  errorResponse,
  unauthorizedResponse,
  forbiddenResponse,
  successResponse,
} from "@/lib/utils/api-response";
import { canManageSchool } from "@/lib/utils/permissions";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    const currentSchool = await getCurrentSchool();

    if (!session?.user?.id || !currentSchool) {
      return unauthorizedResponse();
    }

    const subjects = await db.subject.findMany({
      where: {
        schoolId: currentSchool.schoolId,
      },
      orderBy: {
        name: "asc",
      },
    });

    return successResponse(subjects, { status: 200 });
  } catch (error) {
    console.error("[GET_SUBJECTS_ERROR]", error);
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
    const values = subjectSchema.parse(body);

    const subject = await db.subject.create({
      data: {
        ...values,
        schoolId: currentSchool.schoolId,
      },
    });

    return NextResponse.json(subject);
  } catch (error) {
    console.error("[CREATE_SUBJECT_ERROR]", error);
    return errorResponse();
  }
}
