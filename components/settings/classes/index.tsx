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
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useClasses } from "@/hooks/use-classes";
import { useEducationLevels } from "@/hooks/use-education-levels";
import { ClassForm } from "./class-form";
import { ClassList } from "./class-list";
import { Class, EducationLevel } from "@prisma/client";
import { ClassWithLevel, ReorderClass } from "@/types/class";

export function Classes() {
  const { classes, isLoading, createClass, updateClass, deleteClass, reorderClasses } = useClasses();
  const { levels, isLoading: isLoadingLevels } = useEducationLevels();
  const [isOpen, setIsOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [editingClass, setEditingClass] = useState<ClassWithLevel | null>(null);
  const [deletingClass, setDeletingClass] = useState<ClassWithLevel | null>(null);

  const handleSubmit = async (values: any) => {
    if (editingClass) {
      await updateClass({
        id: editingClass.id,
        ...values,
      });
    } else {
      await createClass(values);
    }
    setIsOpen(false);
    setEditingClass(null);
  };

  const handleEdit = (class_: ClassWithLevel) => {
    setEditingClass(class_);
    setIsOpen(true);
  };

  const handleDelete = (class_: ClassWithLevel) => {
    setDeletingClass(class_);
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    if (deletingClass) {
      await deleteClass(deletingClass.id);
      setIsDeleteDialogOpen(false);
      setDeletingClass(null);
    }
  };

  const handleReorder = async (reorderedClasses: ReorderClass[]) => {
    await reorderClasses(reorderedClasses);
  };

  if (isLoading || isLoadingLevels) {
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
          Gérez les classes de votre établissement.
          Glissez-déposez les lignes pour réorganiser l&apos;ordre des classes.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
              <Button onClick={() => {
                setEditingClass(null);
              }}>
                Ajouter une classe
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>
                  {editingClass ? "Modifier la classe" : "Ajouter une classe"}
                </DialogTitle>
              </DialogHeader>
              <ClassForm
                initialData={editingClass}
                educationLevels={levels || []}
                onSubmit={handleSubmit}
                onCancel={() => setIsOpen(false)}
              />
            </DialogContent>
          </Dialog>
        </div>
        <ClassList
          classes={classes || []}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onReorder={handleReorder}
        />

        <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Êtes-vous sûr ?</AlertDialogTitle>
              <AlertDialogDescription>
                Cette action est irréversible. Cela supprimera définitivement la classe
                {deletingClass?.name && ` "${deletingClass.name}"`} et toutes les données associées.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Annuler</AlertDialogCancel>
              <AlertDialogAction onClick={confirmDelete} className="bg-red-500 hover:bg-red-600">
                Supprimer
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </CardContent>
    </Card>
  );
}