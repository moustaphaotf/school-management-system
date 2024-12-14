"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { ClassForm } from "./class-form";
import { ClassList } from "./class-list";
import { useClasses } from "@/hooks/api";

export function Classes() {
  const { data: classes, isLoading, isError } = useClasses();

  if (isLoading || isError) {
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
        <CardTitle>Classes</CardTitle>
        <CardDescription>
          Gérez les classes de votre établissement. Glissez-déposez les lignes
          pour réorganiser l&apos;ordre des classes.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <ClassForm />
        </div>
        <ClassList classes={classes || []} />
      </CardContent>
    </Card>
  );
}
