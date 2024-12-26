"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useSubjects } from "@/hooks/api";
import { SubjectForm } from "./subject-form";
import { DataTable } from "../ui/data-table";
import { useSubjectColumns } from "./subject-columns";

export function Subjects() {
  const { data: subjects, isLoading, isError } = useSubjects();
  const columns = useSubjectColumns();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Matières</CardTitle>
        <CardDescription>
          Gérez les matières enseignées dans votre établissement
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <SubjectForm />
        </div>
        <DataTable
          columns={columns}
          data={subjects || []}
          isLoading={isError || isLoading}
          pageCount={subjects?.length || 0}
        />
      </CardContent>
    </Card>
  );
}
