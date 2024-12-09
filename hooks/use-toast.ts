import { toast } from "sonner";

export interface ToastProps {
  title?: string;
  description?: string;
}

export function useToast() {
  return {
    toast,
    success: (props: ToastProps) => {
      toast.success(props.title, {
        description: props.description,
      });
    },
    error: (props: ToastProps) => {
      toast.error(props.title, {
        description: props.description,
      });
    },
    warning: (props: ToastProps) => {
      toast.warning(props.title, {
        description: props.description,
      });
    },
    info: (props: ToastProps) => {
      toast.info(props.title, {
        description: props.description,
      });
    },
  };
}