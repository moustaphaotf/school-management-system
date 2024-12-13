"use client";
import Cookies from "js-cookie";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { SchoolForm } from "./school-form";
import { useSchool } from "@/hooks/api";

export function SchoolSettings() {
  const { data, isLoading } = useSchool();

  if (isLoading || !data) {
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
        <CardTitle>Informations de l&apos;établissement</CardTitle>
        <CardDescription>
          Gérez les informations de votre établissement
        </CardDescription>
      </CardHeader>
      <CardContent>
        <SchoolForm initialData={data.school} />
      </CardContent>
    </Card>
  );
}
