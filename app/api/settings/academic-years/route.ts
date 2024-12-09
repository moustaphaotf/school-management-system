import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.schoolId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const years = await db.academicYear.findMany({
      where: {
        schoolId: session.user.schoolId,
      },
      orderBy: {
        startDate: 'desc',
      },
    });

    return NextResponse.json(years);
  } catch (error) {
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.schoolId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const body = await req.json();

    if (body.isCurrent) {
      await db.academicYear.updateMany({
        where: {
          schoolId: session.user.schoolId,
          isCurrent: true,
        },
        data: {
          isCurrent: false,
        },
      });
    }

    const year = await db.academicYear.create({
      data: {
        name: body.name,
        startDate: new Date(body.startDate),
        endDate: new Date(body.endDate),
        isCurrent: body.isCurrent,
        schoolId: session.user.schoolId,
      },
    });

    return NextResponse.json(year);
  } catch (error) {
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function PATCH(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.schoolId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const body = await req.json();

    if (body.isCurrent) {
      await db.academicYear.updateMany({
        where: {
          schoolId: session.user.schoolId,
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