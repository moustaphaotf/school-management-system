import { z } from "zod";

export const classSchema = z.object({
  name: z.string().min(1, "Le nom est requis"),
  levelId: z.string().min(1, "Le niveau d'éducation est requis"),
});

export type ClassFormValues = z.infer<typeof classSchema>;