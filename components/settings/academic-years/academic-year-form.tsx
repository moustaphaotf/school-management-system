"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DialogFooter } from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import { AcademicYearFormValues, academicYearSchema } from "@/lib/validations";
import { AcademicYear } from "@prisma/client";


interface AcademicYearFormProps {
  initialData?: AcademicYear | null;
  onSubmit: (values: AcademicYearFormValues) => void;
  onCancel: () => void;
}

export function AcademicYearForm({
  initialData,
  onSubmit,
  onCancel,
}: AcademicYearFormProps) {
  const form = useForm<AcademicYearFormValues>({
    resolver: zodResolver(academicYearSchema),
    defaultValues: {
      name: initialData?.name || "",
      startDate: initialData?.startDate ? new Date(initialData.startDate).toISOString().split('T')[0] : "",
      endDate: initialData?.endDate ? new Date(initialData.endDate).toISOString().split('T')[0] : "",
      isCurrent: initialData?.isCurrent || false,
    },
  });

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">Nom de l&apos;année</Label>
        <Input
          id="name"
          placeholder="Ex: 2023-2024"
          {...form.register("name")}
        />
        {form.formState.errors.name && (
          <p className="text-sm text-red-500">
            {form.formState.errors.name.message}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="startDate">Date de début</Label>
        <Input
          id="startDate"
          type="date"
          {...form.register("startDate")}
        />
        {form.formState.errors.startDate && (
          <p className="text-sm text-red-500">
            {form.formState.errors.startDate.message}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="endDate">Date de fin</Label>
        <Input
          id="endDate"
          type="date"
          {...form.register("endDate")}
        />
        {form.formState.errors.endDate && (
          <p className="text-sm text-red-500">
            {form.formState.errors.endDate.message}
          </p>
        )}
      </div>

      <div className="flex items-center space-x-2">
        <Switch
          id="isCurrent"
          checked={form.watch("isCurrent")}
          onCheckedChange={(checked) => form.setValue("isCurrent", checked)}
        />
        <Label htmlFor="isCurrent">Année en cours</Label>
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