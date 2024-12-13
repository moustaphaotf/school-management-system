"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { GripVertical } from "lucide-react";
import { Class, EducationLevel } from "@prisma/client";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { cn } from "@/lib/utils";
import { ClassWithLevel, ReorderClass } from "@/lib/types/class";
import { ClassForm } from "./class-form";
import { ConfirmationDialog } from "../ui/confirmation-dialog";
import { useDeleteClass, useReorderClasses } from "@/hooks/api";

interface ClassListProps {
  classes: ClassWithLevel[];
}

function SortableRow({ class_ }: { class_: ClassWithLevel }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: class_.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const deleteClass = useDeleteClass();

  return (
    <TableRow
      ref={setNodeRef}
      style={style}
      className={cn(isDragging && "opacity-50")}
    >
      <TableCell>
        <Button
          variant="ghost"
          {...attributes}
          {...listeners}
          className="cursor-grab p-1 h-auto"
        >
          <GripVertical className="h-4 w-4" />
        </Button>
      </TableCell>
      <TableCell>{class_.level.name}</TableCell>
      <TableCell>{class_.name}</TableCell>
      <TableCell className="flex justify-end space-x-2">
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
      </TableCell>
    </TableRow>
  );
}

function LevelGroup({
  level,
  classes,
}: {
  level: EducationLevel;
  classes: ClassWithLevel[];
}) {
  return (
    <>
      {classes.map((class_) => (
        <SortableRow key={class_.id} class_={class_} />
      ))}
    </>
  );
}

export function ClassList({ classes }: ClassListProps) {
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const reorderClasses = useReorderClasses();

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = classes.findIndex((class_) => class_.id === active.id);
      const newIndex = classes.findIndex((class_) => class_.id === over.id);

      const activeClass = classes[oldIndex];
      const overClass = classes[newIndex];

      // Only allow reordering within the same level
      if (activeClass.levelId !== overClass.levelId) {
        return;
      }

      const newClasses = arrayMove(classes, oldIndex, newIndex);

      // Update orders only for classes in the affected level
      const levelClasses = newClasses.filter(
        (c) => c.levelId === activeClass.levelId
      );
      const updatedClasses = levelClasses.map((class_, index) => ({
        id: class_.id,
        order: index + 1,
        levelId: class_.levelId,
      }));

      reorderClasses.mutate(updatedClasses);
    }
  }

  // Group classes by level
  const classesByLevel = classes.reduce((acc, class_) => {
    if (!acc[class_.levelId]) {
      acc[class_.levelId] = {
        level: class_.level,
        classes: [],
      };
    }
    acc[class_.levelId].classes.push(class_);
    return acc;
  }, {} as Record<string, { level: EducationLevel; classes: ClassWithLevel[] }>);

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead></TableHead>
            <TableHead>Niveau</TableHead>
            <TableHead>Nom</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <SortableContext
            items={classes}
            strategy={verticalListSortingStrategy}
          >
            {Object.values(classesByLevel)
              .sort((a, b) => a.level.order - b.level.order)
              .map(({ level, classes }) => (
                <LevelGroup key={level.id} level={level} classes={classes} />
              ))}
          </SortableContext>
        </TableBody>
      </Table>
    </DndContext>
  );
}
