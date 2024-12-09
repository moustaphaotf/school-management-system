"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DialogFooter } from "@/components/ui/dialog";
import { EducationLevel } from "@prisma/client";
import { EducationLevelFormValues, educationLevelSchema } from "@/lib/validations";

interface EducationLevelFormProps {
  initialData?: EducationLevel | null;
  onSubmit: (values: EducationLevelFormValues) => void;
  onCancel: () => void;
}

export function EducationLevelForm({
  initialData,
  onSubmit,
  onCancel,
}: EducationLevelFormProps) {
  const form = useForm<EducationLevelFormValues>({
    resolver: zodResolver(educationLevelSchema),
    defaultValues: {
      name: initialData?.name || "",
    },
  });

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">Nom du niveau</Label>
        <Input
          id="name"
          placeholder="Ex: Primaire"
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