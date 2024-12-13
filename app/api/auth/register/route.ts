import { NextResponse } from "next/server";
import { hash } from "bcrypt";
import { db } from "@/lib/db";
import { registerSchema } from "@/lib/validations/auth";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, password, firstName, lastName } = registerSchema.parse(body);

    // Check if user exists
    const existingUser = await db.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return new NextResponse("Un utilisateur avec cet email existe déjà", { status: 400 });
    }

    // Hash password
    const hashedPassword = await hash(password, 10);

    // Create user
    const user = await db.user.create({
      data: {
        email,
        password: hashedPassword,
        firstName,
        lastName,
      },
    });

    return NextResponse.json({
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
    });
  } catch (error) {
    console.error("[REGISTER_ERROR]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}