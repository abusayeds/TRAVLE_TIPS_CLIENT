"use server";
import { cookies } from "next/headers";

export const getToken = () => {
  const cookieStore = cookies();
  const token = cookieStore.get("accessToken");

  return token ? token.value : undefined;
};
