"use client";
import Link from "next/link";
import React, { useState } from "react";
import { FiEye } from "react-icons/fi";
import { useRouter, useSearchParams } from "next/navigation";

import ForgetPasswordModel from "../forgetPassword/page";
import PasswordChangeModal from "../changePasseord/page";

import { useUserLogin } from "@/src/components/hooks/auth.hooks";
import { delay } from "@/src/components/utils/delay";
import Loading from "@/src/components/loading";

const LoginPage = () => {
  const { mutate: handleUserLogin, isPending, isSuccess } = useUserLogin();
  const redirectParams = useSearchParams();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setSetPassword] = useState("123456");
  const [isLoding, setIsLoading] = useState(false);
  const redirect = redirectParams.get("redirect");
  const [openPasswordModal, setPasswordModal] = useState(false);
  const [openPasswordChangeModal, setPasswordChangeModal] = useState(false);

  const hendleSummit = async () => {
    setIsLoading(true);
    const data = {
      email: email,
      password: password,
    };

    handleUserLogin(data);
    await delay(1000, true);
    setIsLoading(false);
  };

  if (!isPending && isSuccess) {
    if (redirect) {
      router.push(redirect);
    }
    if (redirect === null) {
      router.push("/");
    }
  }
  const forgrtPassChangeModal = () => {
    router.push("/forgetPassword");
    setPasswordModal(true);
  };
  const PassChangeModal = () => {
    router.push("/changePasseord");
    setPasswordChangeModal(true);
  };

  return (
    <div className="font-[sans-serif]">
      {isLoding && <Loading />}
      {openPasswordModal && <ForgetPasswordModel />}
      {openPasswordChangeModal && <PasswordChangeModal />}
      <div className="min-h-screen flex flex-col items-center justify-center">
        <div className="grid md:grid-cols-2 items-center gap-4 max-md:gap-8 max-w-6xl max-md:max-w-lg w-full p-4 m-4 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)] rounded-md">
          <div className="md:max-w-md w-full px-4 py-4">
            <div>
              <div className="mb-12">
                <h3 className=" text-3xl font-extrabold">Sign in</h3>
                <p className="text-sm mt-4 ">
                  Don,t have an account
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
                  <input
                    className="w-full p-2 rounded border "
                    name="email"
                    placeholder="Enter your email"
                    type="email"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>

              <div className="mt-8">
                <p className="text-xs block mb-2">Password</p>
                <div className="relative flex items-center">
                  <input
                    className="w-full p-2 rounded border"
                    name="password"
                    placeholder="Enter your password"
                    type="password"
                    onChange={(e) => setSetPassword(e.target.value)}
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
                  <div className="text-blue-600 font-semibold text-sm hover:underline">
                    <button
                      className=" font-titlefont"
                      onClick={() => forgrtPassChangeModal()}
                    >
                      Forgot Password?
                    </button>
                  </div>
                  <button
                    className=" font-titlefont underline text-xs"
                    onClick={() => PassChangeModal()}
                  >
                    or Change Password
                  </button>
                </div>
              </div>

              <div className="mt-12">
                <button
                  className="w-full shadow-xl py-2.5 px-4 text-sm tracking-wide rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none"
                  onClick={() => hendleSummit()}
                >
                  Sign in
                </button>
              </div>
            </div>
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
