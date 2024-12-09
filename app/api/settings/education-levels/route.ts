import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";

export async function GET() {
  try {
    const levels = await db.educationLevel.findMany({
      orderBy: {
        order: 'asc'
      }
    });

    return NextResponse.json(levels);
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

    const lastLevel = await db.educationLevel.findFirst({
      orderBy: {
        order: 'desc'
      }
    });

    const newOrder = lastLevel ? lastLevel.order + 1 : 1;

    const level = await db.educationLevel.create({
      data: {
        name: body.name,
        order: newOrder
      }
    });

    return NextResponse.json(level);
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

    const level = await db.educationLevel.update({
      where: {
        id: body.id
      },
      data: {
        name: body.name,
        order: body.order
      }
    });

    return NextResponse.json(level);
  } catch (error) {
    return new NextResponse("Internal Error", { status: 500 });
  }
}