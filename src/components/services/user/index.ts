"use server";

import { FieldValues } from "react-hook-form";
import { cookies } from "next/headers";
import { jwtDecode, JwtPayload } from "jwt-decode";

import axiosInastances from "../../lib/AxiosInstance";
interface CustomJwtPayload extends JwtPayload {
  user?: {
    _id: string;
  };
}
export const updataUser = async (userData: FieldValues): Promise<any> => {
  let token = null;

  try {
    const accessToken = cookies().get("accessToken")?.value;

    if (accessToken) {
      token = jwtDecode<CustomJwtPayload>(accessToken);
    }
    const { data } = await axiosInastances.put(
      `/update-user/${token?.user?._id}`,
      userData,
    );

    return data;
  } catch (error: any) {
    throw new Error(error);
  }
};
// export const singleUser = async () => {
//   let token = null;

//   try {
//     const accessToken = cookies().get("accessToken")?.value;

//     if (accessToken) {
//       token = jwtDecode<CustomJwtPayload>(accessToken);
//     }
//     const { data } = await axiosInastances.get(
//       `/single-user/${token?.user?._id}`,
//     );

//     return data;
//   } catch (error: any) {
//     throw new Error(error);
//   }
// };
