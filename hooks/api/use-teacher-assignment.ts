import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { teacherAssignmentService } from "@/lib/services/api";
import { TeacherAssignmentFormValues } from "@/lib/validations";
import { toastSuccess, toastError } from "@/lib/utils/toast";

export function useTeacherAssignments(academicYearId: string) {
  return useQuery({
    queryKey: ["teacher-assignments", academicYearId],
    queryFn: () =>
      teacherAssignmentService.getTeacherAssignments(academicYearId),
    enabled: !!academicYearId,
  });
}

export function useAssignTeacher() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: TeacherAssignmentFormValues) =>
      teacherAssignmentService.assignTeacher(data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["teacher-assignments", variables.academicYearId],
      });
      toastSuccess("Enseignant assigné avec succès");
    },
    onError: () => {
      toastError("Erreur lors de l'assignation de l'enseignant");
    },
  });
}

export function useRemoveTeacherAssignment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      assignmentId,
      academicYearId,
    }: {
      assignmentId: string;
      academicYearId: string;
    }) => teacherAssignmentService.removeAssignment(assignmentId),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["teacher-assignments", variables.academicYearId],
      });
      toastSuccess("Assignation supprimée avec succès");
    },
    onError: () => {
      toastError("Erreur lors de la suppression de l'assignation");
    },
  });
}

export function useImportAssignments() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      fromYearId,
      toYearId,
    }: {
      fromYearId: string;
      toYearId: string;
    }) => teacherAssignmentService.importAssignments(fromYearId, toYearId),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["teacher-assignments", variables.toYearId],
      });
      toastSuccess("Assignations importées avec succès");
    },
    onError: () => {
      toastError("Erreur lors de l'importation des assignations");
    },
  });
}
