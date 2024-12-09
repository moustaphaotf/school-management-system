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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useAcademicYears } from "@/hooks/use-academic-years";
import { AcademicYearForm } from "./academic-year-form";
import { AcademicYearList } from "./academic-year-list";
import { AcademicYear } from "@prisma/client";

export function AcademicYears() {
  const { years, isLoading, createYear, updateYear } = useAcademicYears();
  const [isOpen, setIsOpen] = useState(false);
  const [editingYear, setEditingYear] = useState<AcademicYear | null>(null);

  const handleSubmit = async (values: any) => {
    if (editingYear) {
      await updateYear({
        id: editingYear.id,
        ...values,
      });
    } else {
      await createYear(values);
    }
    setIsOpen(false);
    setEditingYear(null);
  };

  const handleEdit = (year: AcademicYear) => {
    setEditingYear(year);
    setIsOpen(true);
  };

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
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
              <Button onClick={() => {
                setEditingYear(null);
              }}>
                Ajouter une année
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>
                  {editingYear ? "Modifier l'année" : "Ajouter une année"}
                </DialogTitle>
              </DialogHeader>
              <AcademicYearForm
                initialData={editingYear}
                onSubmit={handleSubmit}
                onCancel={() => setIsOpen(false)}
              />
            </DialogContent>
          </Dialog>
        </div>
        <AcademicYearList
          years={years || []}
          onEdit={handleEdit}
        />
      </CardContent>
    </Card>
  );
}