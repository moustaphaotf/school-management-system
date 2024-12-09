import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "@/lib/api-client";
import { toast } from "sonner";
import { ReorderEducationLevel } from "@/types/education-level";

export type EducationLevel = {
  id: string;
  name: string;
  order: number;
};

export function useEducationLevels() {
  const queryClient = useQueryClient();

  const { data: levels, isLoading } = useQuery<EducationLevel[]>({
    queryKey: ["education-levels"],
    queryFn: () => apiClient.get("/api/settings/education-levels"),
  });

  const { mutate: createLevel } = useMutation({
    mutationFn: (data: { name: string }) =>
      apiClient.post("/api/settings/education-levels", data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["education-levels"] });
      toast.success("Niveau d'éducation créé avec succès");
    },
    onError: () => {
      toast.error("Une erreur est survenue lors de la création du niveau");
    },
  });

  const { mutate: updateLevel } = useMutation({
    mutationFn: (data: EducationLevel) =>
      apiClient.patch("/api/settings/education-levels", data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["education-levels"] });
      toast.success("Niveau d'éducation mis à jour avec succès");
    },
    onError: () => {
      toast.error("Une erreur est survenue lors de la mise à jour du niveau");
    },
  });

  const { mutate: reorderLevels } = useMutation({
    mutationFn: (data: ReorderEducationLevel[]) =>
      apiClient.patch("/api/settings/education-levels/reorder", data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["education-levels"] });
      toast.success("Ordre des niveaux mis à jour avec succès");
    },
    onError: () => {
      toast.error("Une erreur est survenue lors de la réorganisation des niveaux");
    },
  });

  return {
    levels,
    isLoading,
    createLevel,
    updateLevel,
    reorderLevels,
  };
}