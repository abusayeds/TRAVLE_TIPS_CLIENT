"use server";

import { FieldValues } from "react-hook-form";
import { cookies } from "next/headers";
import { jwtDecode } from "jwt-decode";
import { toast } from "sonner";
import axios from "axios";

import axiosInastances from "../../lib/AxiosInstance";

export const registerUser = async (userData: FieldValues) => {
  try {
    const { data } = await axiosInastances.post("/auth/signup", userData);

    return data;
  } catch (err: any) {
    throw new Error(err);
  }
};
export const loginUser = async (userData: FieldValues) => {
  try {
    const { data } = await axiosInastances.post("/auth/login", userData);

    if (data.success) {
      cookies().set("accessToken", data?.token);
    }

    if (data?.data?.success) {
      toast.success(data.data.message);
    }
  } catch (error) {
    const axiosError = error as any;

    console.log(axios);
    console.log("grt to error");

    toast.error(axiosError?.response?.data?.message);
  }
};
export const logout = () => {
  cookies().delete("accessToken");
};
export const getCurrentUser = async () => {
  let decodedToken = null;
  const accessToken = cookies().get("accessToken")?.value;

  if (accessToken) {
    decodedToken = await jwtDecode(accessToken);

    return {
      decodedToken,
    };
  }
};
