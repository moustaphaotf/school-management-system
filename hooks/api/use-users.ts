import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { userService } from "@/lib/services/api/user.service";
import { User } from "@prisma/client";
import { toastSuccess, toastError } from "@/lib/utils/toast";

export function useUsers() {
  return useQuery({
    queryKey: ["users"],
    queryFn: userService.getUsers,
  });
}

export function useUser(id: string) {
  return useQuery({
    queryKey: ["users", id],
    queryFn: () => userService.getUser(id),
    enabled: !!id,
  });
}

export function useUpdateUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<User> }) =>
      userService.updateUser(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      toastSuccess("Utilisateur mis à jour avec succès");
    },
    onError: () => {
      toastError("Erreur lors de la mise à jour de l'utilisateur");
    },
  });
}
