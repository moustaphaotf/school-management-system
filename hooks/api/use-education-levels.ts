import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toastSuccess, toastError } from "@/lib/utils/toast";
import { EducationLevelFormValues } from "@/lib/validations";
import { PatchedRequest } from "@/lib/types/api";
import { educationLevelService } from "@/lib/services/api/education-level.service";
import { EducationLevel } from "@prisma/client";

export function useEducationLevels() {
  return useQuery({
    queryKey: ["education-levels"],
    queryFn: () => educationLevelService.getLevels(),
  });
}

export function useCreateEducationLevel() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: EducationLevelFormValues) =>
      educationLevelService.createLevel(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["education-levels"] });
      toastSuccess("Niveau d'éducation créé avec succès");
    },
    onError: () => {
      toastError("Une erreur est survenue lors de la création du niveau");
    },
  });
}

export function useDeleteEducationLevel() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => educationLevelService.deleteLevel(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["education-levels"] });
      toastSuccess("Niveau d'éducation supprimé avec succès");
    },
    onError: () => {
      toastError("Une erreur est survenue lors de la suppression du niveau");
    },
  });
}

export function useUpdateEducationLevel() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, body }: PatchedRequest<EducationLevelFormValues>) =>
      educationLevelService.updateLevel(id, body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["education-levels"] });
      toastSuccess("Niveau d'éducation mis à jour avec succès");
    },
    onError: () => {
      toastError("Une erreur est survenue lors de la mise à jour du niveau");
    },
  });
}

export function useReorderEducationLevels() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: Pick<EducationLevel, "id" | "order">[]) =>
      educationLevelService.reorderLevels(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["education-levels"] });
      toastSuccess("Ordre des niveaux mis à jour avec succès");
    },
    onError: () => {
      toastError(
        "Une erreur est survenue lors de la réorganisation des niveaux"
      );
    },
  });
}
