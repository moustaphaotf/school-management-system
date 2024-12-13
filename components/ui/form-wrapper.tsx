"use client";

import { ReactNode } from "react";
import { UseFormReturn } from "react-hook-form";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";

interface FormWrapperProps {
  form: UseFormReturn<any>;
  onSubmit: (values: any) => void;
  children: ReactNode;
  isLoading?: boolean;
  submitText?: string;
  loadingText?: string;
}

export function FormWrapper({
  form,
  onSubmit,
  children,
  isLoading = false,
  submitText = "Enregistrer",
  loadingText = "Enregistrement...",
}: FormWrapperProps) {
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        {children}
        <Button type="submit" disabled={isLoading} className="w-full">
          {isLoading ? loadingText : submitText}
        </Button>
      </form>
    </Form>
  );
}