import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toastSuccess, toastError } from "@/lib/utils/toast";
import { PatchedRequest } from "@/lib/types/api";
import { subjectClassService } from "@/lib/services/api";
import { SubjectClassesFilters } from "@/lib/types/subject-class";
import { SubjectClassFormValues } from "@/lib/validations";

export function useSubjectsClasses(params: SubjectClassesFilters = {}) {
  return useQuery({
    queryKey: ["subjects-classes", params],
    queryFn: () => subjectClassService.getSubjectsClasses(params),
  });
}

export function useCreateSubjectClass() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: SubjectClassFormValues) =>
      subjectClassService.createSubjectClass(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["subjects-classes"] });
      toastSuccess("Ajout effectué");
    },
    onError: () => {
      toastError("Erreur lors l'ajout");
    },
  });
}

export function useUpdateSubjectClass() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, body }: PatchedRequest<SubjectClassFormValues>) =>
      subjectClassService.updateSubjectClass(id, body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["subjects-classes"] });
      toastSuccess("Mise à jour effectuée");
    },
    onError: () => {
      toastError("Erreur lors de la mise à jour");
    },
  });
}

export function useDeleteSubjectClass() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => subjectClassService.deleteSubjectClass(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["subjects-classes"] });
      toastSuccess("Suppression effectuée");
    },
    onError: () => {
      toastError("Erreur lors de la suppression");
    },
  });
}
