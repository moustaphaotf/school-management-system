import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { getCurrentSchool } from "@/lib/utils/session";
import { academicYearSchema } from "@/lib/validations/academic-year";
import { canManageSchool } from "@/lib/utils/permissions";
import {
  errorResponse,
  forbiddenResponse,
  successResponse,
  unauthorizedResponse,
} from "@/lib/utils/api-response";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    const currentSchool = await getCurrentSchool();

    if (!session?.user?.id || !currentSchool) {
      return unauthorizedResponse();
    }

    const years = await db.academicYear.findMany({
      where: {
        schoolId: currentSchool.schoolId,
      },
      orderBy: {
        startDate: "desc",
      },
    });

    return successResponse(years, { status: 200 });
  } catch (error) {
    console.error("[GET_ACADEMIC_YEARS_ERROR]", error);
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
    const values = academicYearSchema.parse(body);

    if (values.isCurrent) {
      await db.academicYear.updateMany({
        where: {
          schoolId: currentSchool.schoolId,
          isCurrent: true,
        },
        data: {
          isCurrent: false,
        },
      });
    }

    const year = await db.academicYear.create({
      data: {
        name: values.name,
        startDate: new Date(values.startDate),
        endDate: new Date(values.endDate),
        schoolId: currentSchool.schoolId,
        isCurrent: values.isCurrent,
      },
    });

    return successResponse(year, { status: 201 });
  } catch (error) {
    console.error("[CREATE_ACADEMIC_YEAR_ERROR]", error);
    return errorResponse();
  }
}

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

    const body = await req.json();
    const values = academicYearSchema.parse(body);

    if (body.isCurrent) {
      await db.academicYear.updateMany({
        where: {
          schoolId: currentSchool.schoolId,
          isCurrent: true,
          id: {
            not: body.id,
          },
        },
        data: {
          isCurrent: false,
        },
      });
    }

    const year = await db.academicYear.update({
      where: {
        id: body.id,
      },
      data: {
        name: body.name,
        startDate: new Date(body.startDate),
        endDate: new Date(body.endDate),
        isCurrent: body.isCurrent,
      },
    });

    return NextResponse.json(year);
  } catch (error) {
    return new NextResponse("Internal Error", { status: 500 });
  }
}
