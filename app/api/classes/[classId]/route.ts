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

export async function GET(
  req: Request,
  { params }: { params: { classId: string } }
) {
  const session = await getServerSession(authOptions);
  const currentSchool = await getCurrentSchool();

  if (!session?.user?.id || !currentSchool) {
    return unauthorizedResponse();
  }

  try {
    const class_ = await db.class.findUnique({
      where: {
        id: params.classId,
        schoolId: currentSchool.schoolId,
      },
      include: {
        level: true,
      },
    });

    if (!class_) {
      return notFoundResponse("Classe non trouvée");
    }

    return successResponse(class_, { status: 200 });
  } catch (error) {
    console.error("[GET_CLASS_ERROR]", error);
    return errorResponse();
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { classId: string } }
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
    const values = classSchema.partial().parse(body);

    const class_ = await db.class.update({
      where: {
        id: params.classId,
        schoolId: currentSchool.schoolId,
      },
      data: values,
      include: {
        level: true,
      },
    });

    return successResponse(class_, { status: 200 });
  } catch (error) {
    console.error("[UPDATE_CLASS_ERROR]", error);
    return errorResponse();
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { classId: string } }
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
    const class_ = await db.class.delete({
      where: {
        id: params.classId,
        schoolId: currentSchool.schoolId,
      },
    });

    return successResponse(class_, { status: 200 });
  } catch (error) {
    console.error("[DELETE_CLASS_ERROR]", error);
    return errorResponse();
  }
}
