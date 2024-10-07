"use client";
import { FiEye } from "react-icons/fi";
import Link from "next/link";
import React, { useState } from "react";
import { FieldValues, SubmitHandler } from "react-hook-form";
import axios from "axios";

import TInput from "@/src/components/form/TInput";
import TForm from "@/src/components/form/TForm";
import Loading from "@/src/components/loading";
import { CLIENT_API_KEY } from "@/src/config/envConfig";
import { useUserRegistration } from "@/src/components/hooks/auth.hooks";

const Register = () => {
  const [profileImgName, setProfileImgName] = useState<string | undefined>(" ");
  const [ImgUploadLoading, setImgUploadloding] = useState(false);
  const { mutate: handleRegister } = useUserRegistration();
  const [profileImg, setProfileIMg] = useState("");

  const hendleSummit: SubmitHandler<FieldValues> = async (data) => {
    const userData = {
      ...data,
      profilePhoto: profileImg,
    };

    handleRegister(userData);
  };
  const profileImageUpload = async (e: any) => {
    setProfileImgName(e.name);
    setImgUploadloding(true);
    const formData = new FormData();

    formData.append("image", e);
    try {
      const res = await axios.post(
        `https://api.imgbb.com/1/upload?key=${CLIENT_API_KEY}`,
        formData,
      );

      if (res.data.success) {
        const imgURL = res.data.data.url;

        setProfileIMg(imgURL);
        setImgUploadloding(false);
      }
    } catch (err) {
      console.log(err);
      setImgUploadloding(false);
    }
  };

  return (
    <div className="font-[sans-serif]">
      {ImgUploadLoading && <Loading />}
      <div className="min-h-screen flex flex-col items-center justify-center">
        <div className="grid md:grid-cols-2 items-center gap-4 max-md:gap-8 max-w-6xl max-md:max-w-lg w-full p-4 m-4 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)] rounded-md">
          <div className="md:max-w-md w-full px-4 py-4">
            <TForm
              //   resolver={zodResolver(fromValidation.registrationValidation)}
              onSubmit={hendleSummit}
            >
              <div className="mb-12">
                <h3 className=" text-3xl font-serif font-extrabold">Sign in</h3>
                <p className="text-sm mt-4 font-sans ">
                  Don't have an account{" "}
                  <Link
                    className="text-blue-600 font-semibold underline ml-1  whitespace-nowrap"
                    href="login"
                  >
                    Login hear
                  </Link>
                </p>
              </div>

              <div>
                <div className=" items-center ">
                  <p className=" text-xs block mb-2">Name</p>

                  <TInput
                    name="name"
                    placeholder="Enter your name"
                    type="text"
                  />
                </div>
              </div>
              <div>
                <p className=" mt-6 text-xs block mb-2">Email</p>
                <div className="flex  items-center">
                  <TInput
                    name="email"
                    placeholder="Enter your email"
                    type="email"
                  />
                </div>
              </div>
              <div className="mt-6">
                <p className="text-xs block mb-2">Password</p>
                <div className="relative flex items-center">
                  <TInput
                    name="password"
                    placeholder="Enter your password"
                    type="password"
                  />
                  <FiEye className="w-[18px] h-[18px] absolute right-2 cursor-pointer" />
                </div>
              </div>
              <div className="mt-6">
                <p className="text-xs block mb-2">Phone No : </p>
                <div className="flex items-center">
                  <TInput
                    name="mobileNumber"
                    placeholder="Your Phone No"
                    type="text"
                  />
                </div>
              </div>
              <div className="mt-6">
                <p className="text-xs block mb-2">Profile images </p>

                <div className="relative flex items-center">
                  <label
                    className=" flex h-full w-full py-[5px] text-sm   border-gray-500  rounded-lg cursor-pointer dark:text-gray-400   dark:placeholder-gray-400"
                    htmlFor="file_input"
                  >
                    <p className=" text-xs bg-gray-600 hover:bg-gray-700 duration-500 rounded-sm  font-sans  p-2 text-white">
                      {" "}
                      Upload Image{" "}
                    </p>
                  </label>

                  <p className=" absolute text-sm left-28 cursor-pointer ">
                    {profileImgName}
                  </p>
                </div>
                <input
                  multiple
                  className="hidden"
                  id="file_input"
                  type="file"
                  onChange={(e) => profileImageUpload(e.target.files?.[0])}
                />
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
              </div>

              <div className="mt-8">
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

export default Register;
