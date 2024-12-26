import { z } from "zod";

export const subjectClassSchema = z.object({
  classId: z.string().min(1, "La classe est requise"),
  subjectId: z.string().min(1, "La matière est requise"),
  coefficient: z.coerce
    .number()
    .min(1, "Le coefficient doit être supérieur à 0")
    .max(4, "Le coefficient doit être inférieur à 4"),
});

export type SubjectClassFormValues = z.infer<typeof subjectClassSchema>;
