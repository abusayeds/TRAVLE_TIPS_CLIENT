"use client";

import axios from "axios";
import { toast } from "sonner";

import { getToken } from "../../utils/getToken";

import { baseAPI } from "@/src/config/envConfig";

const DeletePost = ({ isVisible, onClose, postId }: any) => {
  const deletepost = async () => {
    const token = await getToken();

    try {
      await axios.delete(`${baseAPI}/delete-post/${postId}`, {
        headers: {
          Authorization: token as string,
        },
      });
      toast.message("Post successfully deleted  👌 ! ");
    } catch (error) {
      console.error("Failed to delete", error);
      toast.message("Failed to delete ! ");
    }
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 p-4 flex flex-wrap justify-center items-center w-full h-full z-[1000] before:fixed before:inset-0 before:w-full before:h-full before:bg-[rgba(0,0,0,0.5)] overflow-auto font-[sans-serif]">
      <div className="w-full max-w-lg bg-white shadow-lg rounded-lg p-6 relative">
        <div className="my-4 text-center">
          <svg
            className="w-14 fill-red-500 inline"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M19 7a1 1 0 0 0-1 1v11.191A1.92 1.92 0 0 1 15.99 21H8.01A1.92 1.92 0 0 1 6 19.191V8a1 1 0 0 0-2 0v11.191A3.918 3.918 0 0 0 8.01 23h7.98A3.918 3.918 0 0 0 20 19.191V8a1 1 0 0 0-1-1Zm1-3h-4V2a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v2H4a1 1 0 0 0 0 2h16a1 1 0 0 0 0-2ZM10 4V3h4v1Z"
              data-original="#000000"
            />
            <path
              d="M11 17v-7a1 1 0 0 0-2 0v7a1 1 0 0 0 2 0Zm4 0v-7a1 1 0 0 0-2 0v7a1 1 0 0 0 2 0Z"
              data-original="#000000"
            />
          </svg>
          <h4 className="text-gray-800 text-base font-semibold mt-4">
            Are you sure you want to delete it?
          </h4>

          <div className="text-center space-x-4 mt-8">
            <button
              className="px-4 py-2 rounded-lg text-gray-800 text-sm bg-gray-200 hover:bg-gray-300 active:bg-gray-200"
              type="button"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              className="px-4 py-2 rounded-lg text-white text-sm bg-red-600 hover:bg-red-700 active:bg-red-600"
              type="button"
              onClick={() => {
                deletepost(), onClose();
              }}
            >
              Delete
            </button>
          </div>
        </div>
        <button
          className=" font-bold text-lg text-red-500 hover:text-red-700 absolute top-2 right-5 "
          onClick={onClose}
        >
          X
        </button>
      </div>
    </div>
  );
};

export default DeletePost;
