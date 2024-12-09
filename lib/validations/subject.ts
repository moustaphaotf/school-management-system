import { z } from "zod";

export const subjectSchema = z.object({
  name: z.string().min(1, "Le nom est requis"),
});

export type SubjectFormValues = z.infer<typeof subjectSchema>;