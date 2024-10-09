"use client";
import { Button } from "@nextui-org/button";
import Link from "next/link";
import { MdEdit } from "react-icons/md";
import { usePathname, useRouter } from "next/navigation";
import { FaCamera } from "react-icons/fa";
import axios from "axios";
import { useEffect, useState } from "react";
import { TbPremiumRights } from "react-icons/tb";
import { RiVerifiedBadgeFill } from "react-icons/ri";
import Loading from "../../loading";
import { logout } from "../../services/authServices";
import { useUser } from "../../context/context.providet";
import { useUpdateUser } from "../../hooks/user.hook";
import { useMyPost } from "../../hooks/post.hook";

import { SidebarOptions } from "./SideberOptions";
import { adminLinks, userLinks } from "./constant";

import { protectedRoutes } from "@/src/constant";
import { baseAPI, CLIENT_API_KEY } from "@/src/config/envConfig";
import PostCreationModal from "@/src/app/(withCommonLayout)/(user)/profile/create-post/page";

const Sideber = () => {
  const { user, setIsLoading, reFactehUser } = useUser();
  const { data } = useMyPost();
  const [subTotalVote, setSubTotalVote] = useState(0);

  useEffect(() => {
    if (data?.data && Array.isArray(data.data)) {
      const total = data.data.reduce((acc: any, item: any) => {
        return acc + (item.totalVote || 0);
      }, 0);
      setSubTotalVote(total);
    }
    reFactehUser();
  }, [data]);

  const router = useRouter();
  const [ImgUploadLoading, setImgUploadloding] = useState(false);
  const pathName = usePathname();
  const [isModalVisible, setIsModalVisible] = useState(false);

  const { mutate: updateUser } = useUpdateUser();

  const handleLogOut = () => {
    logout();
    localStorage.removeItem("voteStatus");

    setIsLoading(true);
    reFactehUser();
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
        formData
      );

      if (res.data.success) {
        const imgURL = {
          profilePhoto: res.data.data.url,
        };
        const userData = {
          id: user?.data?._id,
          imgURL,
        };

        updateUser(userData);
        reFactehUser();
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
        formData
      );

      if (res.data.success) {
        const imgURL = {
          coverPhoto: res.data.data.url,
        };
        const userData = {
          id: user?.data?._id,
          imgURL,
        };

        updateUser(userData);
        reFactehUser();
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
    router.push("/profile");
    reFactehUser();
  };

  const handlePayment = async (id: any) => {
    const res = await fetch(`${baseAPI}/payment/${id}`, {
      method: "POST",
    });
    const data = await res.json();

    if (data?.success) {
      window.location.href = data?.data?.payment_url;
    }
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
                  user?.data?.coverPhoto ||
                  "https://i.ibb.co.com/qsP8FjL/No-image-available.png"
                }
              />

              <input
                accept="image/*"
                className="absolute inset-0 w-full h-full opacity-0 "
                id="coverimageUpload"
                type="file"
                onChange={(e) => uploadCoverImage(e.target.files?.[0])}
              />

              <FaCamera
                className="absolute right-6 bottom-1  bg-white p-1 rounded text-gray-600 hover:text-gray-700 duration-500  w-8 h-8 "
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
                  user?.data?.profilePhoto ||
                  "https://i.ibb.co.com/qsP8FjL/No-image-available.png"
                }
              />
              <input
                accept="image/*"
                className="absolute inset-0 w-full h-full opacity-0 "
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
                <div className=" flex gap-3 items-center ">
                  <p className="text-2xl font-serif font-semibold">
                    {user?.data?.name}
                  </p>

                  {user?.data?.status === "BLOCKED" && (
                    <RiVerifiedBadgeFill className=" text-blue-700 text-lg" />
                  )}
                </div>
                {user?.data?.status !== "BLOCKED" && (
                  <div>
                    {subTotalVote > 0 && (
                      <button
                        onClick={() => handlePayment(user?.data?._id)}
                        className=" flex items-center w-24 gap-1 rounded bg-black text-white text-xs px-2 py-[0.5]"
                      >
                        Premium <TbPremiumRights />{" "}
                      </button>
                    )}
                  </div>
                )}
              </div>
              <div className="break-words  md:text-sm flex md:gap-5 gap-x-2">
                <Link className="text-sm" href={"/profile"}>
                  <span className="  underline">
                    {" "}
                    Post {data?.data?.length}{" "}
                  </span>
                </Link>
                <Link className="text-sm" href={"/profile/follower"}>
                  <span className=" underline"> Followers</span>{" "}
                  <span>{user?.data?.follower?.length}</span>
                </Link>
                <Link className="text-sm" href={"/profile/following"}>
                  <span className=" underline">
                    Following {user?.data?.following?.length}{" "}
                  </span>{" "}
                </Link>
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
          links={user?.data?.role === "USER" ? userLinks : adminLinks}
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
