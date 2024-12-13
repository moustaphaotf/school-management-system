import { cookies } from "next/headers";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { COOKIES_KEYS } from "../constants";

export async function getCurrentSchool() {
  const cookieStore = cookies();
  const schoolId = cookieStore.get(COOKIES_KEYS.CURRENT_SCHOOL)?.value;

  if (!schoolId) {
    return null;
  }

  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return null;
  }

  const membership = await db.schoolMembership.findUnique({
    where: {
      userId_schoolId: {
        userId: session.user.id,
        schoolId,
      },
    },
    select: {
      id: true,
      role: true,
      schoolId: true,
      school: true,
    },
  });

  return membership;
}
