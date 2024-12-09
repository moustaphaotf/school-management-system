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
import { EducationLevel } from "@prisma/client";
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
import { ReorderEducationLevel } from "@/types/education-level";

interface EducationLevelListProps {
  levels: EducationLevel[];
  onEdit: (level: EducationLevel) => void;
  onReorder: (levels: ReorderEducationLevel[]) => void;
}

function SortableRow({ level, onEdit }: { level: EducationLevel; onEdit: (level: EducationLevel) => void }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: level.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <TableRow ref={setNodeRef} style={style} className={cn(isDragging && "opacity-50")}>
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
      <TableCell>{level.name}</TableCell>
      <TableCell className="text-right">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onEdit(level)}
        >
          Modifier
        </Button>
      </TableCell>
    </TableRow>
  );
}

export function EducationLevelList({ levels, onEdit, onReorder }: EducationLevelListProps) {
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = levels.findIndex((level) => level.id === active.id);
      const newIndex = levels.findIndex((level) => level.id === over.id);

      const newLevels = arrayMove(levels, oldIndex, newIndex).map((level, index) => ({
        id: level.id,
        order: index + 1,
      }));

      onReorder(newLevels);
    }
  }

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
            <TableHead>Nom</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <SortableContext
            items={levels}
            strategy={verticalListSortingStrategy}
          >
            {levels?.map((level) => (
              <SortableRow key={level.id} level={level} onEdit={onEdit} />
            ))}
          </SortableContext>
        </TableBody>
      </Table>
    </DndContext>
  );
}