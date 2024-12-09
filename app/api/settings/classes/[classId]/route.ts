import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";

export async function DELETE(
  req: Request,
  { params }: { params: { classId: string } }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.schoolId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const class_ = await db.class.delete({
      where: {
        id: params.classId,
        schoolId: session.user.schoolId,
      },
    });

    return NextResponse.json(class_);
  } catch (error) {
    return new NextResponse("Internal Error", { status: 500 });
  }
}