"use client";

import React from "react";

import { useUser } from "@/src/components/context/context.providet";

const Follower = () => {
  const { user } = useUser();

  return (
    <div className="bg-white  rounded-md w-full">
      <p className=" text-center text-4xl text-blue-500 font-serif  my-4">
        Your Follower is hear !{" "}
      </p>
      <div className="overflow-x-auto">
        <div className="inline-block min-w-full shadow-md rounded-lg overflow-hidden">
          <table className="min-w-full leading-normal">
            <thead>
              <tr>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Phone
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {user?.data?.follower && user.data.follower.length > 0 ? (
                user?.data?.follower?.map((follower, index) => (
                  <tr key={index}>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 w-10 h-10">
                          <img
                            alt="Vera Carpenter"
                            className="w-full h-full rounded-full"
                            src={follower?.profilePhoto}
                          />
                        </div>
                        <div className="ml-3">
                          <p className="text-gray-900 whitespace-no-wrap">
                            {follower.name}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <p className="text-gray-900 whitespace-no-wrap">
                        {follower.email}
                      </p>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <p className="text-gray-900 whitespace-no-wrap">
                        {follower.mobileNumber}
                      </p>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white  w-20">
                      <p className="py-2 px-4 text-xs leading-3 text-indigo-700 rounded-full bg-indigo-100">
                        {follower.status}
                      </p>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td className="text-center py-5" colSpan={4}>
                    <p className="text-4xl text-red-600">
                      😞 There are no following here !
                    </p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Follower;
