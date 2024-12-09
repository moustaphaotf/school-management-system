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
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { AcademicYear } from "@prisma/client";

interface AcademicYearListProps {
  years: AcademicYear[];
  onEdit: (year: AcademicYear) => void;
}

export function AcademicYearList({ years, onEdit }: AcademicYearListProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Nom</TableHead>
          <TableHead>Début</TableHead>
          <TableHead>Fin</TableHead>
          <TableHead>Statut</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {years?.map((year) => (
          <TableRow key={year.id}>
            <TableCell>{year.name}</TableCell>
            <TableCell>
              {format(new Date(year.startDate), "dd MMMM yyyy", { locale: fr })}
            </TableCell>
            <TableCell>
              {format(new Date(year.endDate), "dd MMMM yyyy", { locale: fr })}
            </TableCell>
            <TableCell>
              {year.isCurrent && (
                <Badge>Année en cours</Badge>
              )}
            </TableCell>
            <TableCell className="text-right">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onEdit(year)}
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