import apiClient from "@/lib/services/axios";
import { AcademicYear } from "@prisma/client";
import { AcademicYearFormValues } from "@/lib/validations";
import { ACADEMIC_YEAR_ENDPOINTS } from "../endpoints";

export const academicYearService = {
  getAcademicYears: async () => {
    const { data } = await apiClient.get<AcademicYear[]>(
      ACADEMIC_YEAR_ENDPOINTS.BASE
    );
    return data;
  },

  getAcademicYear: async (id: string) => {
    const { data } = await apiClient.get<AcademicYear>(
      `/settings/academic-years/${id}`
    );
    return data;
  },

  createAcademicYear: async (body: AcademicYearFormValues) => {
    const { data } = await apiClient.post<AcademicYear>(
      ACADEMIC_YEAR_ENDPOINTS.BASE,
      body
    );
    return data;
  },

  updateAcademicYear: async (
    id: string,
    body: Partial<AcademicYearFormValues>
  ) => {
    const { data } = await apiClient.patch<AcademicYear>(
      ACADEMIC_YEAR_ENDPOINTS.DETAIL(id),
      body
    );
    return data;
  },

  deleteAcademicYear: async (id: string) => {
    const { data } = await apiClient.delete<AcademicYear>(
      ACADEMIC_YEAR_ENDPOINTS.DETAIL(id)
    );
    return data;
  },
};
