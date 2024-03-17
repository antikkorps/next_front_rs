import { toast } from "sonner";

export const toastNoAuth = (message: string) => {
  return toast.error(message);
};
