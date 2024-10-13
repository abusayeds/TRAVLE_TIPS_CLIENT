import { useMutation } from "@tanstack/react-query";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";

import { loginUser, registerUser } from "../services/authServices";

export const useUserRegistration = () => {
  const promise = () =>
    new Promise((resolve) =>
      setTimeout(() => resolve({ name: "Sonner" }), 2000),
    );

  return useMutation<any, Error, FieldValues>({
    mutationKey: ["USER_REGISTRATION"],
    mutationFn: async (userData) => await registerUser(userData),

    onSuccess: () => {
      toast.promise(promise, {
        loading: "Loading...",
        success: () => {
          return "User registration successful!";
        },
      });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};

export const useUserLogin = () => {
  const promise = () =>
    new Promise((resolve) =>
      setTimeout(() => resolve({ name: "Sonner" }), 2000),
    );

  return useMutation<any, Error, FieldValues>({
    mutationKey: ["USER_LOGIN"],
    mutationFn: async (userData) => await loginUser(userData),
    onSuccess: () => {
      toast.promise(promise, {
        loading: "Loading...",
        success: () => {
          return "Login successful!";
        },
      });
    },
    onError: () => {
      toast.message("something is wrong 😢");
    },
  });
};
