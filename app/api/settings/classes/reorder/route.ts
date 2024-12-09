import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { Class } from "@prisma/client";
import { ReorderClass } from "@/types/class";

export async function PATCH(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.schoolId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const classes: ReorderClass[] = await req.json();

    // Group classes by level
    const classesByLevel = classes.reduce((acc, class_) => {
      if (!acc[class_.levelId]) {
        acc[class_.levelId] = [];
      }
      acc[class_.levelId].push(class_);
      return acc;
    }, {} as Record<string, ReorderClass[]>);

    // Update orders within each level
    await db.$transaction(
      Object.values(classesByLevel).flatMap((levelClasses) =>
        levelClasses.map((class_, index) =>
          db.class.update({
            where: { id: class_.id },
            data: { order: index + 1 },
          })
        )
      )
    );

    return NextResponse.json(classes);
  } catch (error) {
    return new NextResponse("Internal Error", { status: 500 });
  }
}