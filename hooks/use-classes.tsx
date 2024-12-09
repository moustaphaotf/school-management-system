import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "@/lib/api-client";
import { toast } from "sonner";
import { Class, EducationLevel } from "@prisma/client";
import { ClassFormValues } from "@/lib/validations/class";

interface ClassWithLevel extends Class {
  level: EducationLevel;
}

export function useClasses() {
  const queryClient = useQueryClient();

  const { data: classes, isLoading } = useQuery<ClassWithLevel[]>({
    queryKey: ["classes"],
    queryFn: () => apiClient.get("/api/settings/classes"),
  });

  const { mutate: createClass } = useMutation({
    mutationFn: (data: ClassFormValues) =>
      apiClient.post("/api/settings/classes", data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["classes"] });
      toast.success("Classe créée avec succès");
    },
    onError: () => {
      toast.error("Une erreur est survenue lors de la création de la classe");
    },
  });

  const { mutate: updateClass } = useMutation({
    mutationFn: (data: Class) =>
      apiClient.patch("/api/settings/classes", data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["classes"] });
      toast.success("Classe mise à jour avec succès");
    },
    onError: () => {
      toast.error("Une erreur est survenue lors de la mise à jour de la classe");
    },
  });

  const { mutate: deleteClass } = useMutation({
    mutationFn: (id: string) =>
      apiClient.delete(`/api/settings/classes/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["classes"] });
      toast.success("Classe supprimée avec succès");
    },
    onError: () => {
      toast.error("Une erreur est survenue lors de la suppression de la classe");
    },
  });

  return {
    classes,
    isLoading,
    createClass,
    updateClass,
    deleteClass,
  };
}