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
  successResponse,
} from "@/lib/utils/api-response";

export async function GET() {
  const session = await getServerSession(authOptions);
  const currentSchool = await getCurrentSchool();

  if (!session?.user?.id || !currentSchool) {
    return unauthorizedResponse();
  }

  try {
    const classes = await db.class.findMany({
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

    return successResponse(classes, { status: 200 });
  } catch (error) {
    console.error("[GET_CLASSES_ERROR]", error);
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
    const values = classSchema.parse(body);

    // Get the highest order for the level
    const highestOrder = await db.class.findFirst({
      where: {
        levelId: values.levelId,
        schoolId: currentSchool.schoolId,
      },
      orderBy: {
        order: "desc",
      },
      select: {
        order: true,
      },
    });

    const class_ = await db.class.create({
      data: {
        ...values,
        schoolId: currentSchool.schoolId,
        order: (highestOrder?.order || 0) + 1,
      },
      include: {
        level: true,
      },
    });

    return successResponse(class_, { status: 201 });
  } catch (error) {
    console.error("[CREATE_CLASS_ERROR]", error);
    return errorResponse();
  }
}
