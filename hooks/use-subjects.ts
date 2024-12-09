import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "@/lib/api-client";
import { toast } from "sonner";
import { Subject } from "@prisma/client";
import { SubjectFormValues } from "@/lib/validations/subject";

export function useSubjects() {
  const queryClient = useQueryClient();

  const { data: subjects, isLoading } = useQuery<Subject[]>({
    queryKey: ["subjects"],
    queryFn: () => apiClient.get("/api/settings/subjects"),
  });

  const { mutate: createSubject } = useMutation({
    mutationFn: (data: SubjectFormValues) =>
      apiClient.post("/api/settings/subjects", data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["subjects"] });
      toast.success("Matière créée avec succès");
    },
    onError: () => {
      toast.error("Une erreur est survenue lors de la création de la matière");
    },
  });

  const { mutate: updateSubject } = useMutation({
    mutationFn: (data: Subject) =>
      apiClient.patch("/api/settings/subjects", data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["subjects"] });
      toast.success("Matière mise à jour avec succès");
    },
    onError: () => {
      toast.error("Une erreur est survenue lors de la mise à jour de la matière");
    },
  });

  const { mutate: deleteSubject } = useMutation({
    mutationFn: (id: string) =>
      apiClient.delete(`/api/settings/subjects/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["subjects"] });
      toast.success("Matière supprimée avec succès");
    },
    onError: () => {
      toast.error("Une erreur est survenue lors de la suppression de la matière");
    },
  });

  return {
    subjects,
    isLoading,
    createSubject,
    updateSubject,
    deleteSubject,
  };
}