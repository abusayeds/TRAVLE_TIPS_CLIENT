"use server";

import { FieldValues } from "react-hook-form";
import { cookies } from "next/headers";
import { jwtDecode } from "jwt-decode";

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

    return data;
  } catch (err: any) {
    throw new Error(err);
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
