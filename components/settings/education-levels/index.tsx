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
import { useEducationLevels } from "@/hooks/use-education-levels";
import { EducationLevelForm } from "./education-level-form";
import { EducationLevelList } from "./education-level-list";
import { EducationLevel } from "@prisma/client";
import { ReorderEducationLevel } from "@/types/education-level";

export function EducationLevels() {
  const { levels, isLoading, createLevel, updateLevel, reorderLevels } = useEducationLevels();
  const [isOpen, setIsOpen] = useState(false);
  const [editingLevel, setEditingLevel] = useState<EducationLevel | null>(null);

  const handleSubmit = async (values: { name: string }) => {
    if (editingLevel) {
      await updateLevel({
        id: editingLevel.id,
        name: values.name,
        order: editingLevel.order,
      });
    } else {
      await createLevel(values);
    }
    setIsOpen(false);
    setEditingLevel(null);
  };

  const handleEdit = (level: EducationLevel) => {
    setEditingLevel(level);
    setIsOpen(true);
  };

  const handleReorder = async (reorderedLevels: ReorderEducationLevel[]) => {
    await reorderLevels(reorderedLevels);
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
        <CardTitle>Niveaux d&apos;éducation</CardTitle>
        <CardDescription>
          Gérez les différents niveaux d&apos;éducation de votre établissement. 
          Glissez-déposez les lignes pour réorganiser l&apos;ordre des niveaux.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
              <Button onClick={() => {
                setEditingLevel(null);
              }}>
                Ajouter un niveau
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>
                  {editingLevel ? "Modifier le niveau" : "Ajouter un niveau"}
                </DialogTitle>
              </DialogHeader>
              <EducationLevelForm
                initialData={editingLevel}
                onSubmit={handleSubmit}
                onCancel={() => setIsOpen(false)}
              />
            </DialogContent>
          </Dialog>
        </div>
        <EducationLevelList
          levels={levels || []}
          onEdit={handleEdit}
          onReorder={handleReorder}
        />
      </CardContent>
    </Card>
  );
}