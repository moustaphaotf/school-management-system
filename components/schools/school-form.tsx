"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useCreateSchool, useUpdateSchool } from "@/hooks/api";
import { School } from "@prisma/client";
import { PhoneInputField } from "../ui/phone-input";
import { schoolFormSchema, SchoolFormValues } from "@/lib/validations/school";

interface SchoolFormProps {
  initialData?: School;
}

export function SchoolForm({ initialData }: SchoolFormProps) {
  const { mutate: createSchool, isPending: isCreating } = useCreateSchool();
  const { mutate: updateSchool, isPending: isUpdating } = useUpdateSchool();

  const form = useForm<SchoolFormValues>({
    resolver: zodResolver(schoolFormSchema),
    defaultValues: {
      name: initialData?.name || "",
      location: initialData?.location || "",
      country: initialData?.country || "",
      city: initialData?.city || "",
      phone: initialData?.phone || "",
      bio: initialData?.bio || "",
      website: initialData?.website || "",
      facebook: initialData?.facebook || "",
      twitter: initialData?.twitter || "",
      instagram: initialData?.instagram || "",
    },
  });

  const onSubmit = (values: SchoolFormValues) => {
    if (initialData) {
      updateSchool({ id: initialData.id, body: values });
    } else {
      createSchool(values);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nom de l&apos;établissement</FormLabel>
              <FormControl>
                <Input placeholder="Lycée Example" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="country"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Pays</FormLabel>
              <FormControl>
                <Input placeholder="Pays" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="city"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Ville</FormLabel>
              <FormControl>
                <Input placeholder="Ville" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Contact</FormLabel>
              <FormControl>
                <PhoneInputField
                  value={field.value}
                  onChange={(value) => field.onChange(value)}
                  error={!!form.formState.errors.phone}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Adresse</FormLabel>
              <FormControl>
                <Input placeholder="123 Rue Example" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {initialData && (
          <>
            <FormField
              control={form.control}
              name="bio"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Décrivez votre établissement..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="website"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Site web</FormLabel>
                  <FormControl>
                    <Input placeholder="https://example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              <FormField
                control={form.control}
                name="facebook"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Facebook</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="https://facebook.com/..."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="twitter"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Twitter</FormLabel>
                    <FormControl>
                      <Input placeholder="https://twitter.com/..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="instagram"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Instagram</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="https://instagram.com/..."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </>
        )}
        <Button type="submit" disabled={isCreating || isUpdating}>
          {isCreating || isUpdating
            ? "Enregistrement..."
            : initialData
            ? "Enregistrer les modifications"
            : "Créer mon établissement"}
        </Button>
      </form>
    </Form>
  );
}
