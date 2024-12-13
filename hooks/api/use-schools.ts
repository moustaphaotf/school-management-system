import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { schoolService } from "@/lib/services/api";
import { SchoolFormValues } from "@/lib/validations";
import { toastSuccess, toastError } from "@/lib/utils/toast";
import { PatchedRequest } from "@/lib/types/api";

export function useSchools() {
  return useQuery({
    queryKey: ["schools"],
    queryFn: () => schoolService.getSchools(),
  });
}

export function useSchool() {
  return useQuery({
    queryKey: ["schools", "current"],
    queryFn: () => schoolService.getCurrentSchool(),
  });
}

export function useSwitchSchool() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => schoolService.switchSchool(id),
    onSuccess: () => {
      queryClient.invalidateQueries();
      toastSuccess("Bienvenue dans votre espace de travail");
    },
    onError: (error) => {
      console.log(error);
      toastError("Une erreur est survenue lors du basculement");
    },
  });
}

export function useCreateSchool() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: SchoolFormValues) => schoolService.createSchool(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["schools"] });
      toastSuccess("Votre établissement scolaire a été créé avec succès");
    },
    onError: () => {
      toastError("Erreur lors de la création de l'établissement scolaire");
    },
  });
}

export function useUpdateSchool() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, body }: PatchedRequest<SchoolFormValues>) =>
      schoolService.updateSchool(id, body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["schools"] });
      toastSuccess(
        "Les informations de l'établissement ont été mises à jours avec succès"
      );
    },
    onError: () => {
      toastError(
        "Erreur lors de la mise à jour des informations de l'établissement"
      );
    },
  });
}
