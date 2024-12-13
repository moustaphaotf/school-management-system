"use client";

import {
  useState,
  ReactNode,
  createContext,
  useContext,
  FC,
  PropsWithChildren,
  useEffect,
} from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

const FormDialogContext = createContext<
  undefined | { open: boolean; setOpen: (open: boolean) => void }
>(undefined);

export const FormDialogProvider: React.FC<PropsWithChildren<{}>> = ({
  children,
}) => {
  const [open, setOpen] = useState(false);

  return (
    <FormDialogContext.Provider
      value={{
        open,
        setOpen,
      }}
    >
      {children}
    </FormDialogContext.Provider>
  );
};

export function useFormDialog() {
  const context = useContext(FormDialogContext);
  if (!context) {
    throw Error(
      "useFormDialog must be used within a FormDialogProvider component"
    );
  }

  return context;
}

interface FormDialogProps {
  title: string;
  children: ReactNode;
  trigger?: ReactNode;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export function FormDialog({
  title,
  children,
  trigger,
  defaultOpen = false,
  onOpenChange,
}: FormDialogProps) {
  const context = useContext(FormDialogContext);
  if (!context) {
    throw Error("FromDialog component must be within a FormDialogProvider");
  }

  const { open, setOpen } = context;

  useEffect(() => {
    setOpen(defaultOpen);
  }, [defaultOpen, setOpen]);

  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen);
    onOpenChange?.(newOpen);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>

      <DialogTrigger asChild>
        {trigger || <Button>{title}</Button>}
      </DialogTrigger>
      <DialogContent aria-describedby={undefined}>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  );
}

export function withFormDialogProvider<T extends object>(
  FormComponent: React.ComponentType<T>
) {
  const DecoratedComponent = (props: T) => (
    <FormDialogProvider>
      <FormComponent {...props} />
    </FormDialogProvider>
  );

  return DecoratedComponent;
}
