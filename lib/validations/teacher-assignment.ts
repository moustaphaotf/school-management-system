import { z } from "zod";

export const teacherAssignmentSchema = z.object({
  academicYearId: z.string().min(1, "L'année académique est requise"),
  teacherId: z.string().min(1, "L'enseignant est requis"),
  subjectId: z.string().min(1, "La matière est requise"),
  classId: z.string().min(1, "La classe est requise"),
});

export type TeacherAssignmentFormValues = z.infer<
  typeof teacherAssignmentSchema
>;
