"use client";

import { cn } from "@/lib/utils";
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
import { GripVertical } from "lucide-react";
import { Button } from "./button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./table";

interface BaseItem {
  id: string;
  order: number;
}

interface Column<T> {
  header: string;
  accessor: keyof T | ((item: T) => React.ReactNode);
  className?: string;
}

interface ReorderableListProps<T extends BaseItem> {
  items: T[];
  columns: Column<T>[];
  onReorder: (items: T[]) => void;
  renderActions?: (item: T) => React.ReactNode;
  groupBy?: keyof T;
  className?: string;
}

function SortableRow<T extends BaseItem>({
  item,
  columns,
  renderActions,
}: {
  item: T;
  columns: Column<T>[];
  renderActions?: (item: T) => React.ReactNode;
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: item.id });

  const style = {
    transform: transform
      ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
      : undefined,
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
      {columns.map((column, index) => (
        <TableCell key={index} className={column.className}>
          {typeof column.accessor === "function"
            ? column.accessor(item)
            : (item[column.accessor] as number | string)}
        </TableCell>
      ))}
      {renderActions && (
        <TableCell className="text-right">{renderActions(item)}</TableCell>
      )}
    </TableRow>
  );
}

export function ReorderableList<T extends BaseItem>({
  items,
  columns,
  onReorder,
  renderActions,
  groupBy,
  className,
}: ReorderableListProps<T>) {
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = items.findIndex((item) => item.id === active.id);
      const newIndex = items.findIndex((item) => item.id === over.id);

      const activeItem = items[oldIndex];
      const overItem = items[newIndex];

      // If grouping is enabled, only allow reordering within the same group
      if (groupBy && activeItem[groupBy] !== overItem[groupBy]) {
        return;
      }

      const newItems = arrayMove(items, oldIndex, newIndex).map(
        (item, index) => ({
          ...item,
          order: index + 1,
        })
      );

      onReorder(newItems);
    }
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <Table className={className}>
        <TableHeader>
          <TableRow>
            <TableHead style={{ width: 50 }}></TableHead>
            {columns.map((column, index) => (
              <TableHead key={index} className={column.className}>
                {column.header}
              </TableHead>
            ))}
            {renderActions && (
              <TableHead className="text-right">Actions</TableHead>
            )}
          </TableRow>
        </TableHeader>
        <TableBody>
          <SortableContext items={items} strategy={verticalListSortingStrategy}>
            {items.map((item) => (
              <SortableRow
                key={item.id}
                item={item}
                columns={columns}
                renderActions={renderActions}
              />
            ))}
          </SortableContext>
        </TableBody>
      </Table>
    </DndContext>
  );
}
