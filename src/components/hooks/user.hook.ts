import { useMutation } from "@tanstack/react-query";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";

import { updataUser } from "../services/user";

export const useUpdateUser = () => {
  return useMutation<any, Error, FieldValues>({
    mutationKey: ["_USER_UPDATE"],
    mutationFn: async (userData) => await updataUser(userData),
    onSuccess: () => {
      toast.success("Update  Successfully done ! ");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};
