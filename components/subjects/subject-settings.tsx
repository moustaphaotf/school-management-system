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
import { SubjectList } from "./subject-list";

export function Subjects() {
  const { data: subjects, isLoading } = useSubjects();

  if (isLoading || !subjects) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="space-y-4">
            <div className="h-4 w-1/4 animate-pulse rounded bg-gray-200" />
            <div className="h-32 animate-pulse rounded bg-gray-200" />
          </div>
        </CardContent>
      </Card>
    );
  }

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
        <SubjectList subjects={subjects || []} />
      </CardContent>
    </Card>
  );
}
