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

    const subjects = await db.subject.findMany({
      where: {
        schoolId: session.user.schoolId,
      },
      orderBy: {
        name: 'asc',
      },
    });

    return NextResponse.json(subjects);
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

    const subject = await db.subject.create({
      data: {
        name: body.name,
        schoolId: session.user.schoolId,
      },
    });

    return NextResponse.json(subject);
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

    const subject = await db.subject.update({
      where: {
        id: body.id,
      },
      data: {
        name: body.name,
      },
    });

    return NextResponse.json(subject);
  } catch (error) {
    return new NextResponse("Internal Error", { status: 500 });
  }
}