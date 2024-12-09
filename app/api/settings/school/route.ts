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

    const school = await db.school.findUnique({
      where: {
        id: session.user.schoolId,
      },
      select: {
        name: true,
        location: true,
        bio: true,
        website: true,
        facebook: true,
        twitter: true,
        instagram: true,
      },
    });

    return NextResponse.json(school);
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

    const school = await db.school.update({
      where: {
        id: session.user.schoolId,
      },
      data: {
        name: body.name,
        location: body.location,
        bio: body.bio,
        website: body.website,
        facebook: body.facebook,
        twitter: body.twitter,
        instagram: body.instagram,
      },
    });

    return NextResponse.json(school);
  } catch (error) {
    return new NextResponse("Internal Error", { status: 500 });
  }
}