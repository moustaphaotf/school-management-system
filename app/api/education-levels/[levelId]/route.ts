import { NextResponse } from "next/server";
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
  notFoundResponse,
  successResponse,
} from "@/lib/utils/api-response";

export async function GET(
  req: Request,
  { params }: { params: { levelId: string } }
) {
  const session = await getServerSession(authOptions);
  const currentSchool = await getCurrentSchool();

  if (!session?.user?.id || !currentSchool) {
    return unauthorizedResponse();
  }

  try {

    const level = await db.educationLevel.findUnique({
      where: {
        id: params.levelId,
      },
    });

    if (!level) {
      return notFoundResponse("Niveau d'éducation non trouvé");
    }

    return successResponse(level, { status: 200 });
  } catch (error) {
    console.error("[GET_EDUCATION_LEVEL_ERROR]", error);
    return errorResponse();
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { levelId: string } }
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
    const values = educationLevelSchema.partial().parse(body);

    const level = await db.educationLevel.update({
      where: {
        id: params.levelId,
      },
      data: values,
    });

    return successResponse(level, { status: 200 });
  } catch (error) {
    console.error("[UPDATE_EDUCATION_LEVEL_ERROR]", error);
    return errorResponse();
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { levelId: string } }
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
    const level = await db.educationLevel.delete({
      where: {
        id: params.levelId,
      },
    });

    return NextResponse.json(level);
  } catch (error) {
    console.error("[DELETE_EDUCATION_LEVEL_ERROR]", error);
    return errorResponse();
  }
}
