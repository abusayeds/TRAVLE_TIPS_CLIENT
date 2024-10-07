import { useMutation, useQuery } from "@tanstack/react-query";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";

import { addPost, allPost } from "../services/post";

export const useAddPost = () => {
  const promise = () =>
    new Promise((resolve) =>
      setTimeout(() => resolve({ name: "Sonner" }), 2000),
    );

  return useMutation<any, Error, FieldValues>({
    mutationKey: ["ADD_POST"],
    mutationFn: async (userData) => await addPost(userData),
    onSuccess: () => {
      toast.promise(promise, {
        loading: "Loading...",
        success: () => {
          return " Post added successful !";
        },
      });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};
export const useAllPost = () => {
  return useQuery({
    queryKey: ["ALL_POST"],
    queryFn: async () => await allPost(),
  });
};
