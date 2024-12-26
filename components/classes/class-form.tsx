"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
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
import { Input } from "@/components/ui/input";
import { Class } from "@prisma/client";
import { ClassFormValues, classSchema } from "@/lib/validations/class";
import {
  useCreateClass,
  useEducationLevels,
  useUpdateClass,
} from "@/hooks/api";
import { FormDialog, useFormDialog, withFormDialog } from "../ui/form-dialog";
import { FormWrapper } from "../ui/form-wrapper";

interface ClassFormProps {
  initialData?: Class | null;
  trigger?: React.ReactNode;
}

export const ClassForm = withFormDialog(
  ({ initialData, trigger }: ClassFormProps) => {
    const { data: levels } = useEducationLevels();
    const { mutate: createClass, isPending: isCreating } = useCreateClass();
    const { mutate: updateClass, isPending: isUpdating } = useUpdateClass();
    const { setOpen } = useFormDialog();

    const form = useForm<ClassFormValues>({
      resolver: zodResolver(classSchema),
      defaultValues: {
        name: initialData?.name || "",
        levelId: initialData?.levelId || "",
      },
    });

    const onSubmit = (values: ClassFormValues) => {
      if (initialData) {
        updateClass(
          { id: initialData.id, data: values },
          {
            onSuccess: () => setOpen(false),
          }
        );
      } else {
        createClass(values, {
          onSuccess: () => {
            setOpen(false);
            form.reset();
          },
        });
      }
    };

    return (
      <FormDialog
        title={initialData ? "Modifier la classe" : "Ajouter une classe"}
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
                    {levels &&
                      levels.map((level) => (
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
        </FormWrapper>
      </FormDialog>
    );
  }
);
