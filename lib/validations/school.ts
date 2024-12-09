import { z } from "zod";

export const schoolFormSchema = z.object({
  name: z.string().min(1, "Le nom est requis"),
  location: z.string().min(1, "L'adresse est requise"),
  bio: z.string().optional(),
  website: z.string().url("URL invalide").optional().or(z.literal("")),
  facebook: z.string().url("URL invalide").optional().or(z.literal("")),
  twitter: z.string().url("URL invalide").optional().or(z.literal("")),
  instagram: z.string().url("URL invalide").optional().or(z.literal("")),
});

export type SchoolFormValues = z.infer<typeof schoolFormSchema>;