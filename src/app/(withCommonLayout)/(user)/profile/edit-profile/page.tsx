/* eslint-disable prettier/prettier */
"use client";
import React, { useState } from "react";
import axios from "axios";

import { CLIENT_API_KEY } from "@/src/config/envConfig";
import Loading from "@/src/components/loading";
import { useSingleUser, useUpdateUser } from "@/src/components/hooks/user.hook";

const EditProfile = () => {
  const { data, isLoading,  } = useSingleUser();
  const {mutate :updateUser } = useUpdateUser() 
  const [profleImg, setProfileImg] = useState();
  const [ImgUploadLoading, setImgUploadloding] = useState(false);

  const hendleSummit = async (event: any) => {
    event.preventDefault();
    const form = event.target;
    const userData = {
      name: form?.name?.value,
      email: form?.email?.value,
      mobileNumber: form?.phone?.value,
      profilePhoto: profleImg,
    };
    

    updateUser(userData);
  };
  const uploadProfileImage = async (e: any) => {
    setImgUploadloding(true);
    const formData = new FormData();

    formData.append("image", e);

    try {
      const res = await axios.post(
        `https://api.imgbb.com/1/upload?key=${CLIENT_API_KEY}`,
        formData
      );

      if (res.data.success) {
        const imgURL = res.data.data.url;

        setProfileImg(imgURL);
        setImgUploadloding(false);
      }
    } catch (err) {
      console.log(err);
      setImgUploadloding(false);
    }
  };

  return (
    <div>
      <div className="font-[sans-serif]">
        {ImgUploadLoading && <Loading />}
        {isLoading && <Loading />}
        <div className="">
          <div className="">
            <div className="">
              <form onSubmit={hendleSummit}>
                <div className="mb-12">
                  <h3 className=" text-3xl font-serif font-extrabold">
                    Edit your profile
                  </h3>
                </div>

                <div>
                  <div className=" items-center ">
                    <p className=" text-xs block mb-2">Name</p>

                    <input
                      className=" focus:outline-none border-2  border-gray-500 rounded-lg p-1 w-full"
                      defaultValue={data?.data?.name}
                      name="name"
                      type="text"
                    />
                  </div>
                </div>
                <div>
                  <p className=" mt-6 text-xs block mb-2">Email</p>
                  <div className="flex  items-center">
                    <input
                      className=" focus:outline-none border-2  border-gray-500 rounded-lg p-1 w-full"
                      defaultValue={data?.data?.email}
                      name="email"
                      type="email"
                    />
                  </div>
                </div>

                <div className="mt-6">
                  <p className="text-xs block mb-2">Phone No : </p>
                  <div className="flex items-center">
                    <input
                      className=" focus:outline-none border-2  border-gray-500 rounded-lg p-1 w-full"
                      defaultValue={data?.data?.mobileNumber}
                      name="phone"
                      type="text"
                    />
                  </div>
                </div>
                <div className="mt-6 md:flex gap-8">
                  <div className="  md:w-1/2 ">
                    <p className="text-xs block mb-2">Change Profile image</p>
                    <label
                      className=" flex gap-2 items-center  text-sm   rounded-lg cursor-pointer dark:text-gray-400   dark:placeholder-gray-400"
                      htmlFor="file_input"
                    >
                      <p className="   text-xs bg-gray-600 hover:bg-gray-700 duration-500 rounded-sm  font-sans  p-2 text-white">
                        Upload Image{" "}
                      </p>

                      <img
                        alt=""
                        className={`${profleImg ? " border-dashed border-1 rounded-lg border-indigo-600 w-32 h-12 ml-30" : ""} `}
                        src={profleImg}
                      />

                      <input
                        multiple
                        className="hidden"
                        id="file_input"
                        type="file"
                        onChange={(e) =>
                          uploadProfileImage(e.target.files?.[0])
                        }
                      />
                    </label>
                  </div>
                </div>

                <div className=" mt-4">
                  <button
                    className=" shadow-xl py-2.5 px-4 text-sm tracking-wide rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none"
                    type="submit"
                  >
                    Updata profile
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
