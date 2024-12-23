"use client";

import { Button } from "@/components/ui/button";
import { EducationLevel } from "@prisma/client";
import { EducationLevelForm } from "./education-level-form";
import {
  useDeleteEducationLevel,
  useReorderEducationLevels,
} from "@/hooks/api";
import { ConfirmationDialog } from "../ui/confirmation-dialog";
import { ReorderableList } from "../ui/reorderable-list";

interface EducationLevelListProps {
  levels: EducationLevel[];
}

export function EducationLevelList({ levels }: EducationLevelListProps) {
  const reorderEducationLevels = useReorderEducationLevels();
  const { mutate: deleteLevel, isPending } = useDeleteEducationLevel();

  const columns = [
    {
      header: "Nom",
      accessor: "name" as const,
    },
  ];

  const renderActions = (level: EducationLevel) => (
    <div className="flex justify-end space-x-2">
      <EducationLevelForm
        trigger={
          <Button variant={"outline"} size={"sm"}>
            Modifier
          </Button>
        }
        initialData={level}
      />

      <ConfirmationDialog
        onConfirm={() => deleteLevel(level.id)}
        title="Êtes-vous sûr ?"
        description={`Cette action est irréversible. Cela supprimera définitivement le niveau ${level?.name} et toutes les données associées.`}
        confirmText="Oui, supprimer"
        cancelText="Non, conserver"
        triggerSize={"sm"}
        triggerText="Supprimer"
        isLoading={isPending}
        triggerVariant={"destructive"}
      />
    </div>
  );

  return (
    <ReorderableList
      items={levels}
      columns={columns}
      onReorder={(newLevels) => {
        const updatedLevels = newLevels.map((level) => ({
          id: level.id,
          order: level.order,
        }));
        reorderEducationLevels.mutate(updatedLevels);
      }}
      renderActions={renderActions}
    />
  );
}
