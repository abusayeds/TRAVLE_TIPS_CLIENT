"use client";
import { Button } from "@nextui-org/button";
import Link from "next/link";
import { MdEdit } from "react-icons/md";
import { usePathname, useRouter } from "next/navigation";
import { FaCamera } from "react-icons/fa";
import axios from "axios";
import { useState } from "react";
import { FaUserPlus } from "react-icons/fa";

import Loading from "../../loading";
import { logout } from "../../services/authServices";
import { useUser } from "../../context.providet";
import { useSingleUser, useUpdateUser } from "../../hooks/user.hook";

import { SidebarOptions } from "./SideberOptions";
import { adminLinks, userLinks } from "./constant";

import { protectedRoutes } from "@/src/constant";
import { CLIENT_API_KEY } from "@/src/config/envConfig";
import PostCreationModal from "@/src/app/(withCommonLayout)/(user)/profile/create-post/page";

const Sideber = () => {
  const [ImgUploadLoading, setImgUploadloding] = useState(false);
  const pathName = usePathname();

  const router = useRouter();
  const { user, setIsLoading: userLoading } = useUser();

  const { data: singleuser } = useSingleUser();

  const [isModalVisible, setIsModalVisible] = useState(false);

  const { mutate: updateUser } = useUpdateUser();

  const handleLogOut = () => {
    logout();
    userLoading(true);
    if (protectedRoutes.some((route) => pathName.match(route))) {
      router.push("/");
    }
  };

  const uploadProfileImage = async (e: any) => {
    setImgUploadloding(true);
    const formData = new FormData();

    formData.append("image", e);
    try {
      const res = await axios.post(
        `https://api.imgbb.com/1/upload?key=${CLIENT_API_KEY}`,
        formData,
      );

      if (res.data.success) {
        const imgURL = {
          profilePhoto: res.data.data.url,
        };
        const userData = {
          id: user?.decodedToken?.user?._id,
          imgURL,
        };

        updateUser(userData);

        setImgUploadloding(false);
      }
    } catch (err) {
      setImgUploadloding(false);
    }
  };
  const uploadCoverImage = async (e: any) => {
    setImgUploadloding(true);
    const formData = new FormData();

    formData.append("image", e);
    try {
      const res = await axios.post(
        `https://api.imgbb.com/1/upload?key=${CLIENT_API_KEY}`,
        formData,
      );

      if (res.data.success) {
        const imgURL = {
          coverPhoto: res.data.data.url,
        };
        const userData = {
          id: user?.decodedToken?.user?._id,
          imgURL,
        };

        updateUser(userData);
        setImgUploadloding(false);
      }
    } catch (err) {
      setImgUploadloding(false);
    }
  };
  const openModal = () => {
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
  };

  return (
    <div>
      {/* {isPending && <Loading />} */}
      {ImgUploadLoading && <Loading />}
      <PostCreationModal isVisible={isModalVisible} onClose={closeModal} />
      <div className="rounded-xl  bg-default-200 p-2 font-titlefont">
        <div className="w-full rounded-md">
          <div className="max-w-2xl  sm:max-w-sm md:max-w-sm lg:max-w-sm xl:max-w-sm sm:mx-auto md:mx-auto lg:mx-auto xl:mx-auto   shadow-xl rounded-lg ">
            <div className="rounded-t-lg h-32 relative overflow-hidden">
              <img
                alt="Mountain"
                className="h-full w-full object-cover"
                src={
                  singleuser?.data?.coverPhoto ||
                  "https://i.ibb.co.com/qsP8FjL/No-image-available.png"
                }
              />

              <input
                accept="image/*"
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                id="coverimageUpload"
                type="file"
                onChange={(e) => uploadCoverImage(e.target.files?.[0])}
              />

              <FaCamera
                className="absolute right-6 bottom-1  bg-white p-1 rounded text-gray-600 hover:text-gray-700 duration-500  w-8 h-8 cursor-pointer"
                onClick={() => {
                  const fileInput = document.getElementById("coverimageUpload");

                  if (fileInput) {
                    fileInput.click();
                  }
                }}
              />
            </div>

            <div className="mx-auto w-32 h-32 relative -mt-16  border-4 rounded-full overflow-hidden">
              <img
                alt="Woman looking front"
                className="object-cover object-center h-32"
                src={
                  singleuser?.data?.profilePhoto ||
                  "https://i.ibb.co.com/qsP8FjL/No-image-available.png"
                }
              />
              <input
                accept="image/*"
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                id="profile"
                type="file"
                onChange={(e) => uploadProfileImage(e.target.files?.[0])}
              />
              <FaCamera
                className="absolute right-[10] bottom-1 rounded  transform -translate-y-1/2 bg-white p-[0.5]  text-gray-600 hover:text-gray-700 duration-500  first-letter:  w-6 h-6 "
                onClick={() => {
                  const fileInput = document.getElementById("profile");

                  if (fileInput) {
                    fileInput.click();
                  }
                }}
              />
            </div>
            <div className=" flex flex-col gap-y-3 p-2">
              <div className=" flex flex-col gap-y-2">
                <div>
                  <p className="text-2xl   font-bodyfont font-semibold">
                    {" "}
                    {singleuser?.data?.name}
                  </p>
                </div>
                <div>
                  <button className="flex font-titlefont  items-center border-2 border-gray-500 font-semibold  px-3 text-sm rounded-md  transition-colors duration-300">
                    <FaUserPlus className="mr-1" /> Follow
                  </button>
                </div>
              </div>
              <div className="break-words  md:text-sm flex md:gap-5 gap-x-2">
                <p className="text-sm">
                  <span className="  underline"> Post </span> <span>1</span>
                </p>
                <p className="text-sm">
                  <span className=" underline"> Followers</span>{" "}
                  <span>10K</span>
                </p>
                <p className="text-sm">
                  <span className=" underline"> Following </span>{" "}
                  <span>10</span>
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-2 w-full rounded-md flex  justify-around items-center gap-2 ">
          <Button
            as={Link}
            className=" text-xs w-full font-bodyfont "
            color="primary"
            href={"/profile/create-post"}
            size="sm"
            variant="solid"
            onClick={() => openModal()}
          >
            + Add to post
          </Button>
          <Button
            as={Link}
            className="  font-bodyfont w-full text-x"
            color="primary"
            endContent={<MdEdit />}
            href={"/profile/edit-profile"}
            size="sm"
            variant="flat"
          >
            Edit Profile
          </Button>
          <Button color="primary" size="sm" variant="light">
            ....
          </Button>
        </div>
      </div>
      <div className="mt-3 space-y-2 rounded-xl bg-default-300 p-2">
        <SidebarOptions
          links={singleuser?.data?.role === "USER" ? userLinks : adminLinks}
        />

        <Button
          className="mt-2 w-full rounded-md font-titlefont"
          color="danger"
          onClick={() => handleLogOut()}
        >
          logout
        </Button>
      </div>
    </div>
  );
};

export default Sideber;
