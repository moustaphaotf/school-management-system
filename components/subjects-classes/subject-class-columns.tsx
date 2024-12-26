import { SubjectClassWithRelations } from "@/lib/types/subject-class";
import { ColumnDef } from "@tanstack/react-table";
import { SubjectClassForm } from "./subject-class-form";
import { Button } from "../ui/button";
import { ConfirmationDialog } from "../ui/confirmation-dialog";
import { useDeleteSubjectClass } from "@/hooks/api";

export function useSubjectClassColumns() {
  const { mutate, isPending } = useDeleteSubjectClass();

  const columns: ColumnDef<SubjectClassWithRelations>[] = [
    {
      accessorKey: "subject.name",
      header: "Matière",
    },
    {
      accessorKey: "class.name",
      header: "Classe",
    },
    {
      accessorKey: "coefficient",
      header: "Coefficient",
    },
    {
      id: "actions",
      header: () => <span className="block text-end">Actions</span>,
      cell: ({ row }) => {
        const subjectClass = row.original;
        return (
          <div className="flex justify-end space-x-2">
            <SubjectClassForm
              initialData={subjectClass}
              trigger={
                <Button variant="outline" size="sm">
                  Modifier
                </Button>
              }
            />
            <ConfirmationDialog
              onConfirm={() => mutate(subjectClass.id)}
              title="Êtes-vous sûr ?"
              description={`Cette action est irréversible. Cela supprimera définitivement l'association entre la matière ${subjectClass.subject.name} et la classe ${subjectClass.class.name}.`}
              confirmText="Oui, supprimer"
              cancelText="Non, conserver"
              triggerText="Supprimer"
              triggerSize="sm"
              triggerVariant="destructive"
              isLoading={isPending}
            />
          </div>
        );
      },
    },
  ];

  return columns;
}
