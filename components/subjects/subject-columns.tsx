"use client";

import { Button } from "@/components/ui/button";
import { Subject } from "@prisma/client";
import { SubjectForm } from "./subject-form";
import { ConfirmationDialog } from "../ui/confirmation-dialog";
import { useDeleteSubject } from "@/hooks/api";
import { ColumnDef } from "@tanstack/react-table";

export function useSubjectColumns() {
  const { mutate: deleteSubject, isPending } = useDeleteSubject();

  const columns: ColumnDef<Subject>[] = [
    {
      accessorKey: "name",
      header: "Matière",
    },
    {
      id: "actions",
      header: () => <span className="block text-end">Actions</span>,
      cell: ({ row }) => {
        const subject = row.original;
        return (
          <div className="flex justify-end space-x-2">
            <SubjectForm
              initialData={subject}
              trigger={
                <Button variant={"outline"} size={"sm"}>
                  Modifier
                </Button>
              }
            />
            <ConfirmationDialog
              title="Êtes-vous sûr ?"
              description={`Cette action est irréversible. Cela supprimera définitivement la
                  matière ${subject.name} et toutes les données associées.`}
              onConfirm={() => deleteSubject(subject.id)}
              confirmText="Oui, supprimer"
              cancelText="Non, conserver"
              triggerText="Supprimer"
              triggerSize={"sm"}
              isLoading={isPending}
              triggerVariant={"destructive"}
            />
          </div>
        );
      },
    },
  ];

  return columns;
}
