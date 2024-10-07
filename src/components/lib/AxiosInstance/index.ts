"use server";
import axios from "axios";
import { cookies } from "next/headers";

import { baseAPI } from "@/src/config/envConfig";

const axiosInastances = axios.create({
  baseURL: baseAPI,
});

export default axiosInastances;

axiosInastances.interceptors.request.use(
  function (config) {
    const cookieStore = cookies();
    const accessToken = cookieStore.get("accessToken")?.value;

    if (accessToken) {
      config.headers.Authorization = accessToken;
    }

    return config;
  },
  function (error) {
    return Promise.reject(error);
  },
);

axiosInastances.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    return Promise.reject(error);
  },
);
