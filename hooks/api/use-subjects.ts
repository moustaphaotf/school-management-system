import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { subjectService } from "@/lib/services/api";
import { SubjectFormValues } from "@/lib/validations";
import { toastSuccess, toastError } from "@/lib/utils/toast";
import { PatchedRequest } from "@/lib/types/api";

export function useSubjects() {
  return useQuery({
    queryKey: ["subjects"],
    queryFn: subjectService.getSubjects,
  });
}

export function useSubject(id: string) {
  return useQuery({
    queryKey: ["subjects", id],
    queryFn: () => subjectService.getSubject(id),
    enabled: !!id,
  });
}

export function useCreateSubject() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: SubjectFormValues) => subjectService.createSubject(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["subjects"] });
      toastSuccess("Matière créée avec succès");
    },
    onError: () => {
      toastError("Erreur lors de la création de la matière");
    },
  });
}

export function useUpdateSubject() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, body }: PatchedRequest<SubjectFormValues>) =>
      subjectService.updateSubject(id, body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["subjects"] });
      toastSuccess("Matière mise à jour avec succès");
    },
    onError: () => {
      toastError("Erreur lors de la mise à jour de la matière");
    },
  });
}

export function useDeleteSubject() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => subjectService.deleteSubject(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["subjects"] });
      toastSuccess("Matière supprimée avec succès");
    },
    onError: () => {
      toastError("Erreur lors de la suppression de la matière");
    },
  });
}
