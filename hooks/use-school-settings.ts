import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "@/lib/api-client";
import { toast } from "sonner";
import { School } from "@prisma/client";
import { SchoolFormValues } from "@/lib/validations";

export function useSchoolSettings() {
  const queryClient = useQueryClient();

  const { data: settings, isLoading } = useQuery<School>({
    queryKey: ["school-settings"],
    queryFn: () => apiClient.get("/api/settings/school"),
  });

  const { mutate: updateSettings } = useMutation({
    mutationFn: (data: SchoolFormValues) =>
      apiClient.patch("/api/settings/school", data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["school-settings"] });
      toast.success("Paramètres mis à jour avec succès");
    },
    onError: () => {
      toast.error("Une erreur est survenue lors de la mise à jour des paramètres");
    },
  });

  return {
    settings: settings,
    isLoading,
    updateSettings,
  };
}