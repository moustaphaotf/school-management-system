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
import { useSubjects } from "@/hooks/use-subjects";
import { SubjectForm } from "./subject-form";
import { SubjectList } from "./subject-list";
import { Subject } from "@prisma/client";

export function Subjects() {
  const { subjects, isLoading, createSubject, updateSubject, deleteSubject } =
    useSubjects();
  const [isOpen, setIsOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [editingSubject, setEditingSubject] = useState<Subject | null>(null);
  const [deletingSubject, setDeletingSubject] = useState<Subject | null>(null);

  const handleSubmit = async (values: any) => {
    if (editingSubject) {
      await updateSubject({
        id: editingSubject.id,
        ...values,
      });
    } else {
      await createSubject(values);
    }
    setIsOpen(false);
    setEditingSubject(null);
  };

  const handleEdit = (subject: Subject) => {
    setEditingSubject(subject);
    setIsOpen(true);
  };

  const handleDelete = (subject: Subject) => {
    setDeletingSubject(subject);
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    if (deletingSubject) {
      await deleteSubject(deletingSubject.id);
      setIsDeleteDialogOpen(false);
      setDeletingSubject(null);
    }
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
        <CardTitle>Matières</CardTitle>
        <CardDescription>
          Gérez les matières enseignées dans votre établissement
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
              <Button
                onClick={() => {
                  setEditingSubject(null);
                }}
              >
                Ajouter une matière
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>
                  {editingSubject
                    ? "Modifier la matière"
                    : "Ajouter une matière"}
                </DialogTitle>
              </DialogHeader>
              <SubjectForm
                initialData={editingSubject}
                onSubmit={handleSubmit}
                onCancel={() => setIsOpen(false)}
              />
            </DialogContent>
          </Dialog>
        </div>
        <SubjectList
          subjects={subjects || []}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />

        <AlertDialog
          open={isDeleteDialogOpen}
          onOpenChange={setIsDeleteDialogOpen}
        >
          <AlertDialogContent aria-describedby={undefined}>
            <AlertDialogHeader>
              <AlertDialogTitle>Êtes-vous sûr ?</AlertDialogTitle>
              <AlertDialogDescription>
                Cette action est irréversible. Cela supprimera définitivement la
                matière
                {deletingSubject?.name && ` "${deletingSubject.name}"`} et
                toutes les données associées.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Annuler</AlertDialogCancel>
              <AlertDialogAction
                onClick={confirmDelete}
                className="bg-red-500 hover:bg-red-600"
              >
                Supprimer
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </CardContent>
    </Card>
  );
}
