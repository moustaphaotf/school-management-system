"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { EducationLevel } from "@prisma/client";
import {
  EducationLevelFormValues,
  educationLevelSchema,
} from "@/lib/validations";
import { FormDialog, useFormDialog, withFormDialog } from "../ui/form-dialog";
import { FormWrapper } from "../ui/form-wrapper";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { useCreateEducationLevel, useUpdateEducationLevel } from "@/hooks/api";

interface EducationLevelFormProps {
  initialData?: EducationLevel | null;
  trigger?: React.ReactNode;
}

export const EducationLevelForm = withFormDialog<EducationLevelFormProps>(
  ({ initialData, trigger }: EducationLevelFormProps) => {
    const form = useForm<EducationLevelFormValues>({
      resolver: zodResolver(educationLevelSchema),
      defaultValues: {
        name: initialData?.name || "",
      },
    });
    const updateEducationLevel = useUpdateEducationLevel();
    const createEducationLevel = useCreateEducationLevel();
    const { setOpen } = useFormDialog();

    const onSubmit = (values: EducationLevelFormValues) => {
      if (initialData) {
        updateEducationLevel.mutate(
          { id: initialData.id, body: values },
          {
            onSuccess: () => setOpen(false),
          }
        );
      } else {
        createEducationLevel.mutate(values, {
          onSuccess: () => {
            setOpen(false);
            form.reset();
          },
        });
      }
    };

    return (
      <FormDialog
        title={
          initialData
            ? "Modifier un niveau d'études"
            : "Ajouter un niveau d'études"
        }
        trigger={trigger}
        onOpenChange={(open) => console.log(open)}
      >
        <FormWrapper
          form={form}
          onSubmit={onSubmit}
          isLoading={
            updateEducationLevel.isPending || createEducationLevel.isPending
          }
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nom du niveau</FormLabel>
                <FormControl>
                  <Input placeholder="Ex: Primaire" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </FormWrapper>
      </FormDialog>
    );
  }
);
