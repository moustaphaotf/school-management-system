import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "@/lib/api-client";
import { toast } from "sonner";
import { AcademicYearFormValues } from "@/lib/validations";
import { AcademicYear } from "@prisma/client";

export function useAcademicYears() {
  const queryClient = useQueryClient();

  const { data: years, isLoading } = useQuery<AcademicYear[]>({
    queryKey: ["academic-years"],
    queryFn: () => apiClient.get("/api/settings/academic-years"),
  });

  const { mutate: createYear } = useMutation({
    mutationFn: (data: Omit<AcademicYearFormValues, "id">) =>
      apiClient.post("/api/settings/academic-years", data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["academic-years"] });
      toast.success("Année académique créée avec succès");
    },
    onError: () => {
      toast.error("Une erreur est survenue lors de la création de l'année académique");
    },
  });

  const { mutate: updateYear } = useMutation({
    mutationFn: (data: AcademicYear) =>
      apiClient.patch("/api/settings/academic-years", data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["academic-years"] });
      toast.success("Année académique mise à jour avec succès");
    },
    onError: () => {
      toast.error("Une erreur est survenue lors de la mise à jour de l'année académique");
    },
  });

  return {
    years,
    isLoading,
    createYear,
    updateYear,
  };
}