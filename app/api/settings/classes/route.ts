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

    const classes = await db.class.findMany({
      where: {
        schoolId: session.user.schoolId,
      },
      include: {
        level: true,
      },
      orderBy: [
        {
          level: {
            order: 'asc',
          }
        },
        {
          order: 'asc',
        },
        {
          name: 'asc',
        },
      ],
    });

    return NextResponse.json(classes);
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

    // Get the highest order for the level
    const highestOrder = await db.class.findFirst({
      where: {
        levelId: body.levelId,
        schoolId: session.user.schoolId,
      },
      orderBy: {
        order: 'desc',
      },
      select: {
        order: true,
      },
    });

    const class_ = await db.class.create({
      data: {
        name: body.name,
        levelId: body.levelId,
        schoolId: session.user.schoolId,
        order: (highestOrder?.order || 0) + 1,
      },
      include: {
        level: true,
      },
    });

    return NextResponse.json(class_);
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

    const class_ = await db.class.update({
      where: {
        id: body.id,
      },
      data: {
        name: body.name,
        levelId: body.levelId,
      },
      include: {
        level: true,
      },
    });

    return NextResponse.json(class_);
  } catch (error) {
    return new NextResponse("Internal Error", { status: 500 });
  }
}