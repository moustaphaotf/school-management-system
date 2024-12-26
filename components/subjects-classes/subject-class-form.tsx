"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FormDialog, useFormDialog, withFormDialog } from "../ui/form-dialog";
import { FormWrapper } from "../ui/form-wrapper";
import { z } from "zod";
import {
  useSubjects,
  useClasses,
  useCreateSubjectClass,
  useUpdateSubjectClass,
} from "@/hooks/api";
import { SubjectClass } from "@prisma/client";
import { subjectClassSchema } from "@/lib/validations";

type SubjectClassFormValues = z.infer<typeof subjectClassSchema>;

interface SubjectClassFormProps {
  initialData?: SubjectClass | null;
  trigger?: React.ReactNode;
  onSubmitSuccess?: () => void;
  excludeSubjectIds?: string[];
}

export const SubjectClassForm = withFormDialog<SubjectClassFormProps>(
  ({
    initialData,
    trigger,
    onSubmitSuccess,
    excludeSubjectIds = [],
  }: SubjectClassFormProps) => {
    const { data: subjects } = useSubjects();
    const { data: classes } = useClasses();
    const { setOpen } = useFormDialog();

    const createMutation = useCreateSubjectClass();
    const updateMutation = useUpdateSubjectClass();

    const form = useForm<SubjectClassFormValues>({
      resolver: zodResolver(subjectClassSchema),
      defaultValues: {
        classId: initialData?.classId || "",
        subjectId: initialData?.subjectId || "",
        coefficient: initialData?.coefficient || 1,
      },
    });

    const handleSubmit = (data: SubjectClassFormValues) => {
      if (initialData) {
        updateMutation.mutate(
          { id: initialData.id, body: data },
          {
            onSuccess: () => {
              form.reset();
              setOpen(false);
              onSubmitSuccess?.();
            },
          }
        );
      } else {
        createMutation.mutate(data, {
          onSuccess: () => {
            form.reset();
            setOpen(false);
            onSubmitSuccess?.();
          },
        });
      }
    };

    const availableSubjects = subjects?.filter(
      (subject) => !excludeSubjectIds.includes(subject.id)
    );

    return (
      <FormDialog
        title={initialData ? "Modifier une matière" : "Ajouter une matière"}
        trigger={trigger}
      >
        <FormWrapper
          form={form}
          onSubmit={form.handleSubmit(handleSubmit)}
          submitText={initialData ? "Modifier" : "Ajouter"}
          isLoading={updateMutation.isPending || createMutation.isPending}
        >
          <FormField
            control={form.control}
            name="classId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Classe</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionnez une classe" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {classes?.map((classItem) => (
                      <SelectItem key={classItem.id} value={classItem.id}>
                        {classItem.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="subjectId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Matière</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionnez une matière" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {availableSubjects?.map((subject) => (
                      <SelectItem key={subject.id} value={subject.id}>
                        {subject.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="coefficient"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Coefficient</FormLabel>
                <FormControl>
                  <Input type="number" step="0.1" {...field} />
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
