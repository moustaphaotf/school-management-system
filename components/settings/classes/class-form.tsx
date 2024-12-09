"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { DialogFooter } from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Class, EducationLevel } from "@prisma/client";
import { ClassFormValues, classSchema } from "@/lib/validations/class";

interface ClassFormProps {
  initialData?: Class | null;
  educationLevels: EducationLevel[];
  onSubmit: (values: ClassFormValues) => void;
  onCancel: () => void;
}

export function ClassForm({
  initialData,
  educationLevels,
  onSubmit,
  onCancel,
}: ClassFormProps) {
  const form = useForm<ClassFormValues>({
    resolver: zodResolver(classSchema),
    defaultValues: {
      name: initialData?.name || "",
      levelId: initialData?.levelId || "",
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nom de la classe</FormLabel>
              <FormControl>
                <Input placeholder="Ex: 6ème A" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="levelId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Niveau d&apos;éducation</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionnez un niveau" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {educationLevels.map((level) => (
                    <SelectItem key={level.id} value={level.id}>
                      {level.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

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
    </Form>
  );
}