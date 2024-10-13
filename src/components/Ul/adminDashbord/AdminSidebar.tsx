"use client";
import { Button } from "@nextui-org/button";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { FaCamera } from "react-icons/fa";
import axios from "axios";
import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

import Loading from "../../loading";
import { logout } from "../../services/authServices";
import { useUser } from "../../context/context.providet";
import { getToken } from "../../utils/getToken";
import { SidebarOptions } from "../ProfileSidebar/SideberOptions";
import {
  adminLinks,
  monthlyPaymentsData,
  userLinks,
} from "../ProfileSidebar/constant";

import { protectedRoutes } from "@/src/constant";
import { baseAPI, CLIENT_API_KEY } from "@/src/config/envConfig";

const AdminSidebar = () => {
  const { user, reFactehUser, setUser } = useUser();

  const router = useRouter();
  const [ImgUploadLoading, setImgUploadloding] = useState(false);
  const pathName = usePathname();

  const handleLogOut = () => {
    logout();
    localStorage.removeItem("voteStatus");
    setUser(null);

    if (protectedRoutes.some((route) => pathName.match(route))) {
      router.push("/");
    }
  };

  const uploadProfileImage = async (e: any) => {
    setImgUploadloding(true);
    const formData = new FormData();
    const token = await getToken();

    formData.append("image", e);
    try {
      const res = await axios.post(
        `https://api.imgbb.com/1/upload?key=${CLIENT_API_KEY}`,
        formData,
      );

      if (res?.data?.success) {
        const imgURL = {
          profilePhoto: res?.data?.data?.url,
        };

        const response = await axios.put(
          `${baseAPI}/update-user/${user?.data?._id}`,
          imgURL,
          {
            headers: {
              Authorization: token as string,
            },
          },
        );

        if (response?.data?.success) {
          setImgUploadloding(false);
          reFactehUser();
        }
      }
    } catch (err) {
      setImgUploadloding(false);
    }
  };
  const uploadCoverImage = async (e: any) => {
    setImgUploadloding(true);
    const formData = new FormData();
    const token = await getToken();

    formData.append("image", e);
    try {
      const res = await axios.post(
        `https://api.imgbb.com/1/upload?key=${CLIENT_API_KEY}`,
        formData,
      );

      if (res?.data?.success) {
        const imgURL = {
          coverPhoto: res?.data?.data?.url,
        };

        const response = await axios.put(
          `${baseAPI}/update-user/${user?.data?._id}`,
          imgURL,
          {
            headers: {
              Authorization: token as string,
            },
          },
        );

        if (response?.data?.success) {
          setImgUploadloding(false);
          reFactehUser();
        }
      }
    } catch (err) {
      setImgUploadloding(false);
    }
  };

  useEffect(() => {
    reFactehUser();
  }, []);

  return (
    <div>
      {/* {isPending && <Loading />} */}
      {ImgUploadLoading && <Loading />}

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

            <div className=" flex gap-3 items-center p-2 ">
              <p className="text-3xl font-serif font-semibold">
                {user?.data?.name}{" "}
                <small className=" text-xs">
                  ( <span>{user?.data?.role}</span>)
                </small>
              </p>
            </div>
          </div>
        </div>
        <div className="mt-3 space-y-2 rounded-xl bg-default-300 p-2">
          <SidebarOptions
            links={user?.data?.role === "USER" ? userLinks : adminLinks}
          />
          <div className="flex flex-col gap-1">
            <Button
              as={Link}
              className="mt-2 w-full rounded-md bg-default-200"
              href="/admin/activeUser"
            >
              Active user
            </Button>
          </div>
          <div className="flex flex-col gap-1">
            <Button
              as={Link}
              className="mt-2 w-full rounded-md bg-default-200"
              href="/admin/paymentUser"
            >
              Paymet user
            </Button>
          </div>
          <div className="mt-4 p-4 bg-default-300 rounded-lg">
            <h2 className="text-lg font-bold mb-2">Monthly Payments</h2>
            <ResponsiveContainer height={200} width="100%">
              <LineChart data={monthlyPaymentsData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  activeDot={{ r: 8 }}
                  dataKey="payments"
                  stroke="#8884d8"
                  type="monotone"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <Button
            className="mt-2 w-full rounded-md font-titlefont"
            color="danger"
            onClick={() => handleLogOut()}
          >
            logout
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AdminSidebar;
