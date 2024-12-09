"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useSchoolSettings } from "@/hooks/use-school-settings";
import { SchoolForm } from "./school-form";
import { SchoolView } from "./school-view";

export function SchoolSettings() {
  const { settings, isLoading, updateSettings } = useSchoolSettings();
  const [isEditing, setIsEditing] = useState(false);

  if (isLoading || !settings) {
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

  const handleSubmit = async (values: any) => {
    await updateSettings(values);
    setIsEditing(false);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Informations de l&apos;établissement</CardTitle>
        <CardDescription>
          Gérez les informations de votre établissement
        </CardDescription>
      </CardHeader>
      <CardContent>
        {isEditing ? (
          <SchoolForm
            initialData={settings}
            onSubmit={handleSubmit}
          />
        ) : (
          <SchoolView
            data={settings!}
            onEdit={() => setIsEditing(true)}
          />
        )}
      </CardContent>
    </Card>
  );
}