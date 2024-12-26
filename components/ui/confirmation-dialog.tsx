"use client";

import React, { ReactNode } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button, ButtonProps } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ConfirmationDialogProps {
  // Dialog content
  title?: string;
  description?: string | ReactNode;

  // Trigger button
  trigger?: ReactNode;
  triggerText?: string;
  triggerVariant?: ButtonProps["variant"];
  triggerSize?: ButtonProps["size"];
  triggerClassName?: string;

  // Action buttons
  cancelText?: string;
  confirmText?: string;
  confirmVariant?: ButtonProps["variant"];
  confirmClassName?: string;

  // State and callbacks
  isLoading?: boolean;
  onConfirm: () => void;
  onCancel?: () => void;
}

export const ConfirmationDialog = React.forwardRef(
  (
    {
      // Dialog content
      title = "Êtes-vous sûr ?",
      description = "Cette action est irréversible.",

      // Trigger button
      trigger,
      triggerText = "Confirmer",
      triggerVariant = "ghost",
      triggerSize = "sm",
      triggerClassName,

      // Action buttons
      cancelText = "Annuler",
      confirmText = "Confirmer",
      confirmVariant = "default",
      confirmClassName,

      // State and callbacks
      isLoading = false,
      onConfirm,
      onCancel,
    }: ConfirmationDialogProps,
    ref
  ) => {
    return (
      <AlertDialog>
        <AlertDialogTrigger asChild>
          {trigger || (
            <Button
              variant={triggerVariant}
              size={triggerSize}
              className={triggerClassName}
            >
              {triggerText}
            </Button>
          )}
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{title}</AlertDialogTitle>
            {typeof description === "string" ? (
              <AlertDialogDescription>{description}</AlertDialogDescription>
            ) : (
              description
            )}
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={onCancel} disabled={isLoading}>
              {cancelText}
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={onConfirm}
              disabled={isLoading}
              className={cn(
                confirmVariant === "destructive" &&
                  "bg-red-500 hover:bg-red-600",
                confirmClassName
              )}
            >
              {isLoading ? "Chargement..." : confirmText}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    );
  }
);

ConfirmationDialog.displayName = 'ConfirmationDialog'
