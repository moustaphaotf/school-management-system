import { z } from "zod";

export const educationLevelSchema = z.object({
    name: z.string().min(1, "Le nom est requis"),
});
  
export type EducationLevelFormValues = z.infer<typeof educationLevelSchema>;