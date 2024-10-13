"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";

import { getToken } from "@/src/components/utils/getToken";
import { baseAPI } from "@/src/config/envConfig";
import { IUser, Tcommmon } from "@/src/types";

const UserProfile = () => {
  const [data, setData] = useState<IUser | null>(null);
  const users = data?.data || [];
  const fetchPost = async () => {
    const token = await getToken();

    try {
      const { data } = await axios.get(`${baseAPI}/all-user`, {
        headers: {
          Authorization: token as string,
        },
      });

      setData(data);
    } catch (error) {
      console.error("Failed to fetch votes", error);
    }
  };

  useEffect(() => {
    fetchPost();
  }, []);

  return (
    <main>
      <div className="relative overflow-x-auto font-titlefont">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th className="px-6 py-3" scope="col">
                User Name
              </th>
              <th className="px-6 py-3" scope="col">
                status
              </th>
              <th className="px-6 py-3" scope="col">
                Email :
              </th>
              <th className="px-6 py-3" scope="col">
                phone
              </th>
              <th className="px-6 py-3" scope="col">
                Delete
              </th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(users) &&
              users
                .filter((user: Tcommmon) => user.role === "USER") // Filter users based on payment status
                .map((user: Tcommmon) => (
                  <tr key={user._id} className="bg-white border-b">
                    <td>
                      <div className="md:flex gap-2 items-center">
                        <img
                          alt="Profile"
                          className="h-10 w-10 rounded-full mr-3"
                          src={user.profilePhoto}
                        />
                        <h3 className="font-bold text-xs md:my-0 mt-2">
                          {user.name}
                        </h3>
                      </div>
                    </td>
                    <td className="px-6 py-4">{user.status}</td>
                    <td className="px-6 py-4">{user.email}</td>
                    <td className="px-6 py-4">{user.mobileNumber}</td>
                    <td className="px-6 py-4 font-bold text-1xl ml-8 text-red-600">
                      x
                    </td>
                  </tr>
                ))}
          </tbody>
        </table>
      </div>
    </main>
  );
};

export default UserProfile;
