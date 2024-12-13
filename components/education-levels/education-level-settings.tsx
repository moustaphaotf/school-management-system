"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { EducationLevelList } from "./education-level-list";
import { useEducationLevels } from "@/hooks/api";
import { EducationLevelForm } from "./education-level-form";

export function EducationLevels() {
  const { data: levels, isLoading } = useEducationLevels();

  if (isLoading && !levels) {
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
        <CardTitle>Niveaux d&apos;éducation</CardTitle>
        <CardDescription>
          Gérez les différents niveaux d&apos;éducation de votre établissement.
          Glissez-déposez les lignes pour réorganiser l&apos;ordre des niveaux.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <EducationLevelForm trigger={<Button>Ajouter un niveau</Button>} />
        </div>
        <EducationLevelList levels={levels || []} />
      </CardContent>
    </Card>
  );
}
