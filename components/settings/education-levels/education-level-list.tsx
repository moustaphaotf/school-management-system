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
import { EducationLevel } from "@prisma/client";

interface EducationLevelListProps {
  levels: EducationLevel[];
  onEdit: (level: EducationLevel) => void;
}

export function EducationLevelList({ levels, onEdit }: EducationLevelListProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Ordre</TableHead>
          <TableHead>Nom</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {levels?.map((level) => (
          <TableRow key={level.id}>
            <TableCell>{level.order}</TableCell>
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
        ))}
      </TableBody>
    </Table>
  );
}