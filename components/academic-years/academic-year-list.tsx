"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { AcademicYear } from "@prisma/client";
import { AcademicYearForm } from "./academic-year-form";
import { ConfirmationDialog } from "../ui/confirmation-dialog";
import { useDeleteAcademicYear } from "@/hooks/api";
import { Button } from "../ui/button";

interface AcademicYearListProps {
  years: AcademicYear[];
}

export function AcademicYearList({ years }: AcademicYearListProps) {
  const { mutate: deleteYear, isPending } = useDeleteAcademicYear();
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
              {year.isCurrent && <Badge>Année en cours</Badge>}
            </TableCell>
            <TableCell className="flex justify-end space-x-2">
              <AcademicYearForm
                trigger={
                  <Button variant={"outline"} size={"sm"}>
                    Modifier
                  </Button>
                }
                initialData={year}
              />
              <ConfirmationDialog
                onConfirm={() => deleteYear(year.id)}
                title="Êtes-vous sûr ?"
                description={`Cette action est irréversible. Cela supprimera définitivement l'année academique ${year?.name} et toutes les données associées.`}
                confirmText="Oui, supprimer"
                cancelText="Non, conserver"
                triggerText="Supprimer"
                triggerSize={"sm"}
                isLoading={isPending}
                triggerVariant={"destructive"}
              />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
