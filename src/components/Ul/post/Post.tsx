import React from "react";
import { BiDislike } from "react-icons/bi";
import { BiLike } from "react-icons/bi";

import { IReceivedPost } from "@/src/types";
type TProps = {
  post: IReceivedPost;
};
const Post = ({ post }: TProps) => {
  const {
    description,
    title,

    downvoteCount,
    upvoteCount,
    images,
    comments,
  } = post || {};

  const isOdd = images && images.length % 2 !== 0;

  return (
    <div className=" flex flex-col gap-4 rounded-lg shadow-md border p-4 font-titlefont">
      <div className="flex justify-between">
        <div className="flex">
          <img
            alt="Profil"
            className="w-12 h-12 rounded-full mr-3"
            src="https://i.ibb.co.com/VDXy8gH/o.jpg"
          />
          <div>
            <h2 className="text-lg font-semibold">John Doe</h2>
            <button className=" border px-4 text-sm rounded">Follow </button>
          </div>
        </div>
        <div className=" flex gap-4 ">
          <small className=" mt-[0.5] underline text-blue-600">Edit</small>
          <p className=" font-bold  text-red-600 ">X</p>
        </div>
      </div>

      <div className=" text-start ">
        <p>{title}</p>
      </div>

      <div className=" flex flex-col gap-2">
         <div className="w-full grid grid-cols-2 gap-4">
        {images.length % 2 === 1 && (
          <div className="col-span-2">
            <img
              alt="Profile"
              src={images[0]}
              className="w-full h-28 md:h-44 object-cover rounded" // Ensures full width and responsive height
            />
          </div>
        )}
        {images.slice(images.length % 2 === 1 ? 1 : 0).map((img, index) => (
          <img
            key={index}
            alt="Profile"
            src={img}
            className="w-full h-28 md:h-44 object-cover rounded" // Ensures full width and responsive height
          />
        ))}
      </div>

        <div className=" text-start">
          <p>{description}</p>
        </div>
        <hr />
        <div className=" flex justify-between items-center ">
          <div className="flex items-center space-x-4">
            <button className="p-1 border flex gap-2 rounded-md  justify-items-center  ">
              <small className=" text-xs">Vote</small>
              <BiLike />
            </button>
            <span className=" font-bold">00</span>
            <button className="p-1 border flex gap-2 rounded-md justify-items-center ">
              <small className=" text-xs"> Downvote</small>
              <BiDislike />
            </button>
          </div>
          <div>
            <p className=" underline">comment</p>
          </div>
        </div>
      </div>

      {/* <!-- Comment Container --> */}
      <div>
        <div className="flex w-full justify-between border rounded-md text-xs">
          <div className="p-3 flex  gap-8  w-full h-auto items-center">
            <div className="flex gap-1 items-center">
              <img
                alt=""
                className="object-cover w-8 h-8 rounded-full border-2 border-emerald-400  shadow-emerald-400"
                src="https://avatars.githubusercontent.com/u/22263436?v=4"
              />
              <h3 className=" font-bold">
                User 1
                <br />
                <span className="text-sm text-gray-400 font-normal">
                  Level 1
                </span>
              </h3>
            </div>
            <div>
              <p className="text-gray-600 mt-2">this is sample commnent</p>
              <button className="text-right text-blue-500">Reply</button>
            </div>
          </div>
        </div>

        {/* <!-- Comment Container --> */}
      </div>
    </div>
  );
};

export default Post;
