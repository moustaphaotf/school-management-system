import { z } from "zod";

export const schoolFormSchema = z.object({
  name: z.string().min(1, "Le nom est requis"),
  bio: z.string().optional(),
  country: z.string().min(1, "Le pays est requis"),
  city: z.string().min(1, "La ville est requise"),
  phone: z
    .string()
    .trim()
    .min(1, "Le numéro de téléphone est requis")
    .regex(/^\+?[0-9\s-]+$/, "Format de numéro invalide"),
  location: z.string().min(1, "L'adresse est requise"),
  website: z.string().url("URL invalide").optional().or(z.literal("")),
  facebook: z.string().url("URL invalide").optional().or(z.literal("")),
  twitter: z.string().url("URL invalide").optional().or(z.literal("")),
  instagram: z.string().url("URL invalide").optional().or(z.literal("")),
});

export type SchoolFormValues = z.infer<typeof schoolFormSchema>;
