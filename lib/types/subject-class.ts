import { Class, Subject, SubjectClass } from "@prisma/client";

export interface SubjectClassesFilters {
  page?: number;
  limit?: number;
  classId?: string;
  subjectId?: string;
  search?: string;
}

export interface SubjectClassWithRelations extends SubjectClass {
  class: Class;
  subject: Subject;
}
