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
import { Subject } from "@prisma/client";
import { SubjectForm } from "./subject-form";
import { ConfirmationDialog } from "../ui/confirmation-dialog";
import { useDeleteSubject } from "@/hooks/api";

interface SubjectListProps {
  subjects: Subject[];
}

export function SubjectList({ subjects }: SubjectListProps) {
  const { mutate: deleteSubject, isPending } = useDeleteSubject();

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Nom</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {subjects?.map((subject) => (
          <TableRow key={subject.id}>
            <TableCell>{subject.name}</TableCell>
            <TableCell className="flex justify-end space-x-2">
              <SubjectForm
                initialData={subject}
                trigger={
                  <Button variant={"outline"} size={"sm"}>
                    Modifier
                  </Button>
                }
              />
              <ConfirmationDialog
                title="Êtes-vous sûr ?"
                description={`Cette action est irréversible. Cela supprimera définitivement la
                matière ${subject.name} et toutes les données associées.`}
                onConfirm={() => deleteSubject(subject.id)}
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
