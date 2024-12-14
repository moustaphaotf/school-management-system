import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { getCurrentSchool } from "@/lib/utils/session";
import { subjectSchema } from "@/lib/validations/subject";
import { canManageSchool } from "@/lib/utils/permissions";
import {
  errorResponse,
  unauthorizedResponse,
  forbiddenResponse,
  notFoundResponse,
  successResponse,
} from "@/lib/utils/api-response";

export async function GET(
  req: Request,
  { params }: { params: { subjectId: string } }
) {
  const session = await getServerSession(authOptions);
  const currentSchool = await getCurrentSchool();

  if (!session?.user?.id || !currentSchool) {
    return unauthorizedResponse();
  }

  try {

    const subject = await db.subject.findUnique({
      where: {
        id: params.subjectId,
        schoolId: currentSchool.schoolId,
      },
    });

    if (!subject) {
      return notFoundResponse("Matière non trouvée");
    }

    return NextResponse.json(subject);
  } catch (error) {
    console.error("[GET_SUBJECT_ERROR]", error);
    return errorResponse();
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { subjectId: string } }
) {
  const session = await getServerSession(authOptions);
  const currentSchool = await getCurrentSchool();

  if (!session?.user?.id || !currentSchool) {
    return unauthorizedResponse();
  }
  
  if (!canManageSchool(currentSchool.role)) {
    return forbiddenResponse();
  }
  
  try {
    const body = await req.json();
    const values = subjectSchema.partial().parse(body);

    const subject = await db.subject.update({
      where: {
        id: params.subjectId,
        schoolId: currentSchool.schoolId,
      },
      data: values,
    });

    return successResponse(subject, { status: 200 });
  } catch (error) {
    console.error("[UPDATE_SUBJECT_ERROR]", error);
    return errorResponse();
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { subjectId: string } }
) {
  const session = await getServerSession(authOptions);
  const currentSchool = await getCurrentSchool();

  if (!session?.user?.id || !currentSchool) {
    return unauthorizedResponse();
  }

  if (!canManageSchool(currentSchool.role)) {
    return forbiddenResponse();
  }
  
  try {
    const subject = await db.subject.delete({
      where: {
        id: params.subjectId,
        schoolId: currentSchool.schoolId,
      },
    });

    successResponse(subject, { status: 200 });
  } catch (error) {
    console.error("[DELETE_SUBJECT_ERROR]", error);
    return errorResponse();
  }
}
