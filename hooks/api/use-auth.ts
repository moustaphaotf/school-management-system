import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { authService } from "@/lib/services/api/auth.service";
import { RegisterFormValues } from "@/lib/validations/auth";
import { toastSuccess, toastError } from "@/lib/utils/toast";

export function useRegister() {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: (data: RegisterFormValues) => authService.register(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["auth", "user"] });
      toastSuccess("Compte créé avec succès");
      router.push("/auth/login");
    },
    onError: () => {
      toastError("Erreur lors de la création du compte");
    },
  });
}

