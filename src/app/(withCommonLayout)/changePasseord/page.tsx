"use client";

import { useState } from "react";
import Link from "next/link";
import axios from "axios";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

import { baseAPI } from "@/src/config/envConfig";

const PasswordChangeModal = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("123456");
  const [confirmPassword, setConfirmPassword] = useState(" ");
  const [oldPassword, setOldPassword] = useState(" ");
  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const [setConfirmPasswordTouched] = useState(false);

  const handleNewPasswordChange = (e: any) => {
    setNewPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e: any) => {
    setConfirmPassword(e.target.value);
  };
  const handleConfirmPasswordBlur = () => {
    setConfirmPasswordTouched(true);
    if (confirmPassword !== newPassword) {
      setPasswordsMatch(false);
    } else {
      setPasswordsMatch(true);
    }
  };
  const handlePasswordChange = async () => {
    try {
      const data = {
        email: email,
        newPassword: confirmPassword,
        oldPassword: oldPassword,
      };
      const res = await axios.post(`${baseAPI}/change-password`, data);

      if (res?.data?.success) {
        toast.success(res.data.message);
        router.push("/login");
      }
    } catch (error) {
      const axiosError = error as any;

      toast.error(axiosError?.response?.data?.message);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 font-titlefont">
      <main className="w-full max-w-md mx-auto p-6" id="content" role="main">
        <div className="mt-7 bg-white relative rounded-xl shadow-lg dark:bg-gray-800 dark:border-gray-700">
          <div className="p-4 sm:p-7 relative">
            <div className="text-center">
              <h1 className="block text-2xl font-bold text-gray-800 dark:text-white">
                Reset password?
              </h1>

              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                Remember your password?
                <Link
                  className="text-blue-600 decoration-2 hover:underline font-medium"
                  href="/login"
                >
                  Login here
                </Link>
              </p>
            </div>

            <div className="mt-5">
              <div>
                <div className="grid gap-y-4">
                  <div>
                    <div className=" flex flex-col">
                      <label htmlFor="newPassword">Enter Your email </label>
                      <input
                        className="w-full p-2  rounded border"
                        id="newPassword"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                      <label htmlFor="newPassword">Old Password</label>
                      <input
                        className="w-full p-2  rounded border"
                        id="newPassword"
                        type="password"
                        value={oldPassword}
                        onChange={(e) => setOldPassword(e.target.value)}
                      />
                      <label htmlFor="newPassword">New Password</label>
                      <input
                        className="w-full p-2  rounded border"
                        id="newPassword"
                        type="password"
                        value={newPassword}
                        onChange={handleNewPasswordChange}
                      />

                      <label htmlFor="confirmPassword">Confirm Password</label>
                      <input
                        className="w-full p-2 rounded border"
                        id="confirmPassword"
                        type="password"
                        value={confirmPassword}
                        onBlur={handleConfirmPasswordBlur}
                        onChange={handleConfirmPasswordChange}
                      />
                      <div>
                        <input
                          className="h-4 mt-4 w-4 shrink-0 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                          id="remember-me"
                          name="remember-me"
                          type="checkbox"
                        />
                        <label
                          className=" block text-sm "
                          htmlFor="remember-me"
                        >
                          Remember me
                        </label>
                      </div>

                      {!passwordsMatch && (
                        <p style={{ color: "red" }}>
                          Passwords do not match. Please try again.
                        </p>
                      )}
                    </div>
                  </div>
                  {confirmPassword === newPassword && (
                    <button
                      className="py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800"
                      onClick={() => handlePasswordChange()}
                    >
                      Change Passsword
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
          <Link
            className="absolute top-0 right-0 bg-red-600 text-white px-2 font-bold text-lg"
            href="/"
          >
            X
          </Link>
        </div>
      </main>
    </div>
  );
};

export default PasswordChangeModal;
