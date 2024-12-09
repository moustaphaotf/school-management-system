import { z } from "zod";

export const academicYearSchema = z.object({
    name: z.string().min(1, "Le nom est requis"),
    startDate: z.string().min(1, "La date de début est requise"),
    endDate: z.string().min(1, "La date de fin est requise"),
    isCurrent: z.boolean(),
});

export type AcademicYearFormValues = z.infer<typeof academicYearSchema>;