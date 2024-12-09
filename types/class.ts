import { Class, EducationLevel } from "@prisma/client";

export interface ClassWithLevel extends Class {
  level: EducationLevel;
}

export type ReorderClass = Pick<Class, "id" | "order" | "levelId">