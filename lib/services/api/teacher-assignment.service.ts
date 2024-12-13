import apiClient from "@/lib/services/axios";
import { TeacherAssignement } from "@prisma/client";
import { TeacherAssignmentFormValues } from "@/lib/validations";
import { TEACHER_ASSIGNMENT_ENDPOINTS } from "../endpoints";

export const teacherAssignmentService = {
  getTeacherAssignments: async (academicYearId: string) => {
    const { data } = await apiClient.get<TeacherAssignement[]>(
      `${TEACHER_ASSIGNMENT_ENDPOINTS.BASE}?academicYearId=${academicYearId}`
    );
    return data;
  },

  assignTeacher: async (body: TeacherAssignmentFormValues) => {
    const { data } = await apiClient.post<TeacherAssignement>(
      TEACHER_ASSIGNMENT_ENDPOINTS.BASE,
      body
    );
    return data;
  },

  removeAssignment: async (id: string) => {
    const { data } = await apiClient.delete(
      TEACHER_ASSIGNMENT_ENDPOINTS.DETAIL(id)
    );
    return data;
  },

  importAssignments: async (fromYearId: string, toYearId: string) => {
    const { data } = await apiClient.post<TeacherAssignement[]>(
      TEACHER_ASSIGNMENT_ENDPOINTS.IMPORT,
      { fromYearId, toYearId }
    );
    return data;
  },
};
