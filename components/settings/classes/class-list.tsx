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
import { Class, EducationLevel } from "@prisma/client";

interface ClassWithLevel extends Class {
  level: EducationLevel;
}

interface ClassListProps {
  classes: ClassWithLevel[];
  onEdit: (class_: ClassWithLevel) => void;
  onDelete: (class_: ClassWithLevel) => void;
}

export function ClassList({ classes, onEdit, onDelete }: ClassListProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Nom</TableHead>
          <TableHead>Niveau</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {classes?.map((class_) => (
          <TableRow key={class_.id}>
            <TableCell>{class_.name}</TableCell>
            <TableCell>{class_.level.name}</TableCell>
            <TableCell className="text-right space-x-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onEdit(class_)}
              >
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
        ))}
      </TableBody>
    </Table>
  );
}