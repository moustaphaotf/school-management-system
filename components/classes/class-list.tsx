"use client";

import { Button } from "@/components/ui/button";
import { ClassWithLevel } from "@/lib/types/class";
import { ClassForm } from "./class-form";
import { ConfirmationDialog } from "../ui/confirmation-dialog";
import { useDeleteClass, useReorderClasses } from "@/hooks/api";
import { ReorderableList } from "../ui/reorderable-list";

interface ClassListProps {
  classes: ClassWithLevel[];
}

export function ClassList({ classes }: ClassListProps) {
  const reorderClasses = useReorderClasses();
  const deleteClass = useDeleteClass();

  const columns = [
    {
      header: "Nom",
      accessor: "name" as const,
    },
    {
      header: "Niveau",
      accessor: (class_: ClassWithLevel) => class_.level.name,
    },
  ];

  const renderActions = (class_: ClassWithLevel) => (
    <div className="flex justify-end space-x-2">
      <ClassForm
        initialData={class_}
        trigger={
          <Button variant="ghost" size="sm">
            Modifier
          </Button>
        }
      />
      <ConfirmationDialog
        onConfirm={() => deleteClass.mutate(class_.id)}
        title="Êtes-vous sûr ?"
        description={`Cette action est irréversible. Cela supprimera définitivement la classe ${class_?.name} et toutes les données associées.`}
        confirmText="Oui, supprimer"
        cancelText="Non, conserver"
        triggerText="Supprimer"
        triggerSize={"sm"}
        isLoading={deleteClass.isPending}
        triggerVariant={"destructive"}
      />
    </div>
  );

  return (
    <ReorderableList
      items={classes}
      columns={columns}
      onReorder={(newClasses) => {
        const updatedClasses = newClasses.map((class_) => ({
          id: class_.id,
          order: class_.order,
          levelId: class_.levelId,
        }));
        reorderClasses.mutate(updatedClasses);
      }}
      renderActions={renderActions}
      groupBy="levelId"
    />
  );
}
