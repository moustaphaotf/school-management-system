import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { schoolFormSchema } from "@/lib/validations";
import { canManageSchool } from "@/lib/utils/permissions";
import { getCurrentSchool } from "@/lib/utils/session";

import {
  forbiddenResponse,
  unauthorizedResponse,
} from "@/lib/utils/api-response";

export async function GET(
  req: Request,
  { params }: { params: { schoolId: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    console.log(session);

    if (!session?.user?.id) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const school = await db.school.findUnique({
      where: {
        id: params.schoolId,
      },
      include: {
        members: {
          where: {
            userId: session.user.id,
          },
        },
      },
    });

    if (!school || !school.members.length) {
      return new NextResponse("School not found", { status: 404 });
    }

    return NextResponse.json(school);
  } catch (error) {
    console.error("[GET_SCHOOL_ERROR]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { schoolId: string } }
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
    const values = schoolFormSchema.partial().parse(body);

    const school = await db.school.update({
      where: {
        id: params.schoolId,
      },
      data: values,
      include: {
        members: {
          where: {
            userId: session.user.id,
          },
        },
      },
    });

    return NextResponse.json(school);
  } catch (error) {
    console.error("[UPDATE_SCHOOL_ERROR]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
