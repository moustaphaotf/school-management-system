import { EducationLevel } from "@prisma/client";

export type ReorderEducationLevel = Pick<EducationLevel, "id" | "order">
