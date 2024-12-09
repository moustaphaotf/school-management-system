import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { EducationLevel } from "@prisma/client";
import { ReorderEducationLevel } from "@/types/education-level";

export async function PATCH(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.schoolId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const levels: ReorderEducationLevel[] = await req.json();

    // Update all levels in a transaction
    await db.$transaction(
      levels.map((level) =>
        db.educationLevel.update({
          where: { id: level.id },
          data: { order: level.order },
        })
      )
    );

    return NextResponse.json(levels);
  } catch (error) {
    return new NextResponse("Internal Error", { status: 500 });
  }
}