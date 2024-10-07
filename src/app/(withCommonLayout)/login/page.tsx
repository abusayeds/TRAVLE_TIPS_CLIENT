"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import React from "react";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { FiEye } from "react-icons/fi";
import { useRouter, useSearchParams } from "next/navigation";

import { fromValidation } from "@/src/components/form/Validation";
import TInput from "@/src/components/form/TInput";
import TForm from "@/src/components/form/TForm";
import { useUserLogin } from "@/src/components/hooks/auth.hooks";

const LoginPage = () => {
  const { mutate: handleUserLogin, isPending, isSuccess } = useUserLogin();
  const redirectParams = useSearchParams();
  const router = useRouter();

  const redirect = redirectParams.get("redirect");

  const hendleSummit: SubmitHandler<FieldValues> = async (data) => {
    handleUserLogin(data);
  };

  if (!isPending && isSuccess) {
    if (redirect) {
      router.push(redirect);
    }
    if (redirect === null) {
      router.push("/");
    }
  }

  return (
    <div className="font-[sans-serif]">
      <div className="min-h-screen flex flex-col items-center justify-center">
        <div className="grid md:grid-cols-2 items-center gap-4 max-md:gap-8 max-w-6xl max-md:max-w-lg w-full p-4 m-4 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)] rounded-md">
          <div className="md:max-w-md w-full px-4 py-4">
            <TForm
              resolver={zodResolver(fromValidation.loginValidation)}
              onSubmit={hendleSummit}
            >
              <div className="mb-12">
                <h3 className=" text-3xl font-extrabold">Sign in</h3>
                <p className="text-sm mt-4 ">
                  Don't have an account{" "}
                  <Link
                    className="text-blue-600 font-semibold hover:underline ml-1 whitespace-nowrap"
                    href="register"
                  >
                    Registaion hear
                  </Link>
                </p>
              </div>

              <div>
                <p className=" text-xs block mb-2">Email</p>
                <div className="relative flex items-center">
                  <TInput
                    defaultValue="abusayedstudent855@gmail.com"
                    name="email"
                    placeholder="Enter your email"
                    type="email"
                  />
                </div>
              </div>

              <div className="mt-8">
                <p className="text-xs block mb-2">Password</p>
                <div className="relative flex items-center">
                  <TInput
                    defaultValue="123456"
                    name="password"
                    placeholder="Enter your password"
                    type="password"
                  />
                  <FiEye className="w-[18px] h-[18px] absolute right-2 cursor-pointer" />
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-4 mt-6">
                <div className="flex items-center">
                  <input
                    className="h-4 w-4 shrink-0 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                  />
                  <label className="ml-3 block text-sm " htmlFor="remember-me">
                    Remember me
                  </label>
                </div>
                <div>
                  <a
                    className="text-blue-600 font-semibold text-sm hover:underline"
                    href="jajvascript:void(0);"
                  >
                    Forgot Password?
                  </a>
                </div>
              </div>

              <div className="mt-12">
                <button
                  className="w-full shadow-xl py-2.5 px-4 text-sm tracking-wide rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none"
                  type="submit"
                >
                  Sign in
                </button>
              </div>
            </TForm>
          </div>

          <div className="md:h-full  rounded-xl lg:p-12 p-8">
            <img
              alt="login-image"
              className="w-full h-full object-contain"
              src="https://readymadeui.com/signin-image.webp"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
