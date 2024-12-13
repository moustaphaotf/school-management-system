"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { useAcademicYears } from "@/hooks/api";
import { AcademicYearForm } from "./academic-year-form";
import { AcademicYearList } from "./academic-year-list";

export function AcademicYears() {
  const { data: years, isLoading } = useAcademicYears();


  if (isLoading) {
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
        <CardTitle>Années académiques</CardTitle>
        <CardDescription>
          Gérez les années académiques de votre établissement
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <AcademicYearForm />
        </div>
        <AcademicYearList
          years={years || []}
        />
      </CardContent>
    </Card>
  );
}