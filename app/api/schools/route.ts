export const dynamic = 'force-dynamic'

import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { schoolFormSchema } from "@/lib/validations";
import { ROLES } from "@/lib/constants/roles";
import { setCurrentSchoolCookie } from "@/lib/utils/cookies";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const schools = await db.schoolMembership.findMany({
      where: {
        userId: session.user.id,
      },
      select: {
        id: true,
        role: true,
        school: {
          select: {
            id: true,
            name: true,
            location: true,
            logo: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    return NextResponse.json(schools);
  } catch (error) {
    console.error("[GET_SCHOOLS_ERROR]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const body = await req.json();
    const values = schoolFormSchema.parse(body);

    // Create school and membership in a transaction
    const result = await db.$transaction(async (tx) => {
      const school = await tx.school.create({
        data: values,
      });

      const membership = await tx.schoolMembership.create({
        data: {
          userId: session.user.id,
          schoolId: school.id,
          role: ROLES.SCHOOL_OWNER,
        },
        include: {
          school: true,
        },
      });

      // Set initial school cookie
      const response = NextResponse.json(membership);
      setCurrentSchoolCookie(school.id);

      return response;
    });

    return result;
  } catch (error) {
    console.error("[CREATE_SCHOOL_ERROR]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
