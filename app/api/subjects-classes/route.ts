export const dynamic = "force-dynamic";

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { getCurrentSchool } from "@/lib/utils/session";
import { canManageSchool } from "@/lib/utils/permissions";
import {
  errorResponse,
  unauthorizedResponse,
  forbiddenResponse,
  successResponse,
} from "@/lib/utils/api-response";
import { z } from "zod";

const subjectClassSchema = z.object({
  subjectId: z.string().min(1),
  classId: z.string().min(1),
  coefficient: z.number().min(0.1).max(10),
});

export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    const currentSchool = await getCurrentSchool();

    if (!session?.user?.id || !currentSchool) {
      return unauthorizedResponse();
    }

    const { searchParams } = new URL(req.url);
    const page = Number(searchParams.get("page")) || 1;
    const limit = Number(searchParams.get("limit")) || 10;
    const search = searchParams.get("search") || "";
    const subjectId = searchParams.get("subjectId");
    const classId = searchParams.get("classId");

    const where = {
      subject: {
        schoolId: currentSchool.schoolId,
      },
      ...(subjectId && { subjectId }),
      ...(classId && { classId }),
      ...(search && {
        OR: [
          { subject: { name: { contains: search } } },
          { class: { name: { contains: search } } },
        ],
      }),
    };

    const [subjectClasses, total] = await Promise.all([
      db.subjectClass.findMany({
        where,
        include: {
          subject: true,
          class: true,
        },
        skip: (page - 1) * limit,
        take: limit,
      }),
      db.subjectClass.count({ where }),
    ]);

    return successResponse({
      data: subjectClasses,
      total,
      page,
      limit,
    });
  } catch (error) {
    console.error("[GET_SUBJECT_CLASSES_ERROR]", error);
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
    const values = subjectClassSchema.parse(body);

    // Verify subject and class belong to the school
    const [subject, class_] = await Promise.all([
      db.subject.findUnique({
        where: { id: values.subjectId, schoolId: currentSchool.schoolId },
      }),
      db.class.findUnique({
        where: { id: values.classId, schoolId: currentSchool.schoolId },
      }),
    ]);

    if (!subject || !class_) {
      return errorResponse("Matière ou classe invalide");
    }

    const subjectClass = await db.subjectClass.create({
      data: values,
      include: {
        subject: true,
        class: true,
      },
    });

    return successResponse(subjectClass);
  } catch (error) {
    console.error("[CREATE_SUBJECT_CLASS_ERROR]", error);
    return errorResponse();
  }
}
