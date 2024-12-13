import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { classService } from "@/lib/services/api";
import { ClassFormValues } from "@/lib/validations";
import { ReorderClass } from "@/lib/types/class";
import { toastSuccess, toastError } from "@/lib/utils/toast";

export function useClasses() {
  return useQuery({
    queryKey: ["classes"],
    queryFn: classService.getClasses,
  });
}

export function useClass(id: string) {
  return useQuery({
    queryKey: ["classes", id],
    queryFn: () => classService.getClass(id),
    enabled: !!id,
  });
}

export function useCreateClass() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: ClassFormValues) => classService.createClass(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["classes"] });
      toastSuccess("Classe créée avec succès");
    },
    onError: () => {
      toastError("Erreur lors de la création de la classe");
    },
  });
}

export function useUpdateClass() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: string;
      data: Partial<ClassFormValues>;
    }) => classService.updateClass(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["classes"] });
      toastSuccess("Classe mise à jour avec succès");
    },
    onError: () => {
      toastError("Erreur lors de la mise à jour de la classe");
    },
  });
}

export function useDeleteClass() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => classService.deleteClass(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["classes"] });
      toastSuccess("Classe supprimée avec succès");
    },
    onError: () => {
      toastError("Erreur lors de la suppression de la classe");
    },
  });
}

export function useReorderClasses() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: ReorderClass[]) => classService.reorderClasses(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["classes"] });
      toastSuccess("Ordre des classes mis à jour avec succès");
    },
    onError: () => {
      toastError("Erreur lors de la réorganisation des classes");
    },
  });
}
