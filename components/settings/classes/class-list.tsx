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
import { ClassWithLevel, ReorderClass } from "@/types/class";

interface ClassListProps {
  classes: ClassWithLevel[];
  onEdit: (class_: ClassWithLevel) => void;
  onDelete: (class_: ClassWithLevel) => void;
  onReorder: (classes: ReorderClass[]) => void;
}

function SortableRow({
  class_,
  onEdit,
  onDelete,
}: {
  class_: ClassWithLevel;
  onEdit: (class_: ClassWithLevel) => void;
  onDelete: (class_: ClassWithLevel) => void;
}) {
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
      <TableCell className="text-right space-x-2">
        <Button variant="ghost" size="sm" onClick={() => onEdit(class_)}>
          Modifier
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className="text-red-500 hover:text-red-600"
          onClick={() => onDelete(class_)}
        >
          Supprimer
        </Button>
      </TableCell>
    </TableRow>
  );
}

function LevelGroup({
  level,
  classes,
  onEdit,
  onDelete,
}: {
  level: EducationLevel;
  classes: ClassWithLevel[];
  onEdit: (class_: ClassWithLevel) => void;
  onDelete: (class_: ClassWithLevel) => void;
}) {
  return (
    <>
      {classes.map((class_) => (
        <SortableRow
          key={class_.id}
          class_={class_}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </>
  );
}

export function ClassList({
  classes,
  onEdit,
  onDelete,
  onReorder,
}: ClassListProps) {
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

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

      onReorder(updatedClasses);
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
                <LevelGroup
                  key={level.id}
                  level={level}
                  classes={classes}
                  onEdit={onEdit}
                  onDelete={onDelete}
                />
              ))}
          </SortableContext>
        </TableBody>
      </Table>
    </DndContext>
  );
}
