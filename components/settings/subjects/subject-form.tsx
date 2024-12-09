"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DialogFooter } from "@/components/ui/dialog";
import { Subject } from "@prisma/client";
import { SubjectFormValues, subjectSchema } from "@/lib/validations/subject";

interface SubjectFormProps {
  initialData?: Subject | null;
  onSubmit: (values: SubjectFormValues) => void;
  onCancel: () => void;
}

export function SubjectForm({
  initialData,
  onSubmit,
  onCancel,
}: SubjectFormProps) {
  const form = useForm<SubjectFormValues>({
    resolver: zodResolver(subjectSchema),
    defaultValues: {
      name: initialData?.name || "",
    },
  });

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">Nom de la matière</Label>
        <Input
          id="name"
          placeholder="Ex: Mathématiques"
          {...form.register("name")}
        />
        {form.formState.errors.name && (
          <p className="text-sm text-red-500">
            {form.formState.errors.name.message}
          </p>
        )}
      </div>
      <DialogFooter>
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
        >
          Annuler
        </Button>
        <Button type="submit">
          {initialData ? "Modifier" : "Ajouter"}
        </Button>
      </DialogFooter>
    </form>
  );
}