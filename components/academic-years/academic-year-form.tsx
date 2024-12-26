"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import {
  FormDialog,
  useFormDialog,
  withFormDialog,
} from "@/components/ui/form-dialog";
import { FormWrapper } from "@/components/ui/form-wrapper";
import { AcademicYear } from "@prisma/client";
import {
  AcademicYearFormValues,
  academicYearSchema,
} from "@/lib/validations/academic-year";
import { useCreateAcademicYear, useUpdateAcademicYear } from "@/hooks/api";

interface AcademicYearFormProps {
  initialData?: AcademicYear | null;
  trigger?: React.ReactNode;
}

export const AcademicYearForm = withFormDialog(
  ({ initialData, trigger }: AcademicYearFormProps) => {
    const { mutate: createYear, isPending: isCreating } =
      useCreateAcademicYear();
    const { mutate: updateYear, isPending: isUpdating } =
      useUpdateAcademicYear();

    const { setOpen } = useFormDialog();

    const form = useForm<AcademicYearFormValues>({
      resolver: zodResolver(academicYearSchema),
      defaultValues: {
        name: initialData?.name || "",
        startDate: initialData?.startDate
          ? new Date(initialData.startDate).toISOString().split("T")[0]
          : "",
        endDate: initialData?.endDate
          ? new Date(initialData.endDate).toISOString().split("T")[0]
          : "",
        isCurrent: initialData?.isCurrent || false,
      },
    });

    const onSubmit = (values: AcademicYearFormValues) => {
      if (initialData) {
        updateYear(
          { id: initialData.id, data: values },
          {
            onSuccess: () => {
              form.reset();
              setOpen(false);
            },
          }
        );
      } else {
        createYear(values, {
          onSuccess: () => {
            setOpen(false);
          },
        });
      }
    };

    return (
      <FormDialog
        title={initialData ? "Modifier l'année" : "Ajouter une année"}
        trigger={trigger}
      >
        <FormWrapper
          form={form}
          onSubmit={onSubmit}
          isLoading={isCreating || isUpdating}
          submitText={initialData ? "Modifier" : "Ajouter"}
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nom de l&apos;année</FormLabel>
                <FormControl>
                  <Input placeholder="Ex: 2023-2024" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="startDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Date de début</FormLabel>
                <FormControl>
                  <Input type="date" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="endDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Date de fin</FormLabel>
                <FormControl>
                  <Input type="date" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="isCurrent"
            render={({ field }) => (
              <FormItem className="flex items-center space-x-2">
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <FormLabel>Année en cours</FormLabel>
                <FormMessage />
              </FormItem>
            )}
          />
        </FormWrapper>
      </FormDialog>
    );
  }
);
