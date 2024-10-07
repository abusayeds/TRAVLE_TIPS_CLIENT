"use server";

import { FieldValues } from "react-hook-form";

import axiosInastances from "../../lib/AxiosInstance";

export const addPost = async (userData: FieldValues) => {
  try {
    const { data } = await axiosInastances.post("/post", userData);

    return data;
  } catch (err: any) {
    throw new Error(err);
  }
};
export const allPost = async () => {
  try {
    const { data } = await axiosInastances.get("/all-post");

    console.log("get all post ", data);

    return data;
  } catch (err: any) {
    throw new Error(err);
  }
};
