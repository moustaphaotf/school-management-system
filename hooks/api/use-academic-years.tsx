import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { academicYearService } from "@/lib/services/api/academic-year.service";
import { AcademicYearFormValues } from "@/lib/validations/academic-year";
import { toastSuccess, toastError } from "@/lib/utils/toast";

toastSuccess;
export function useAcademicYears() {
  return useQuery({
    queryKey: ["academic-years"],
    queryFn: academicYearService.getAcademicYears,
  });
}

export function useAcademicYear(id: string) {
  return useQuery({
    queryKey: ["academic-years", id],
    queryFn: () => academicYearService.getAcademicYear(id),
    enabled: !!id,
  });
}

export function useCreateAcademicYear() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: AcademicYearFormValues) =>
      academicYearService.createAcademicYear(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["academic-years"] });
      toastSuccess("Année académique créée avec succès");
    },
    onError: () => {
      toastError("Erreur lors de la création de l'année académique");
    },
  });
}

export function useDeleteAcademicYear() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) =>
      academicYearService.deleteAcademicYear(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["academic-years"] });
      toastSuccess("Année académique supprimée avec succès");
    },
    onError: () => {
      toastError("Erreur lors de la suppression de l'année académique");
    },
  });
}

export function useUpdateAcademicYear() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: string;
      data: Partial<AcademicYearFormValues>;
    }) => academicYearService.updateAcademicYear(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["academic-years"] });
      toastSuccess("Année académique mise à jour avec succès");
    },
    onError: () => {
      toastError("Erreur lors de la mise à jour de l'année académique");
    },
  });
}
