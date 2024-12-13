"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Subject } from "@prisma/client";
import { SubjectFormValues, subjectSchema } from "@/lib/validations/subject";
import {
  FormDialog,
  useFormDialog,
  withFormDialogProvider,
} from "../ui/form-dialog";
import { useCreateSubject, useUpdateSubject } from "@/hooks/api";
import { FormWrapper } from "../ui/form-wrapper";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";

interface SubjectFormProps {
  initialData?: Subject | null;
  trigger?: React.ReactNode;
}

export const SubjectForm = withFormDialogProvider<SubjectFormProps>(
  ({ initialData, trigger }: SubjectFormProps) => {
    const form = useForm<SubjectFormValues>({
      resolver: zodResolver(subjectSchema),
      defaultValues: {
        name: initialData?.name || "",
      },
    });

    const updateEducationLevel = useUpdateSubject();
    const createEducationLevel = useCreateSubject();
    const { setOpen } = useFormDialog();

    const onSubmit = (values: SubjectFormValues) => {
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
            ? "Modifier une matière"
            : "Ajouter une matière"
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
                <FormLabel>Nom de la matière</FormLabel>
                <FormControl>
                  <Input placeholder="Ex: Mathématiques" {...field} />
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
