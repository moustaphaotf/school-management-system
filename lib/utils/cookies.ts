import { cookies } from "next/headers";
import { COOKIES_KEYS } from "../constants";

export function getCurrentSchoolFromCookie(): string | undefined {
  const cookieStore = cookies();
  return cookieStore.get(COOKIES_KEYS.CURRENT_SCHOOL)?.value;
}

export function setCurrentSchoolCookie(schoolId: string) {
  cookies().set(COOKIES_KEYS.CURRENT_SCHOOL, schoolId, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
  });
}

export function removeCurrentSchoolCookie() {
  cookies().delete(COOKIES_KEYS.CURRENT_SCHOOL);
}