"use client";
import React, { useEffect, useState } from "react";
import { BiLike } from "react-icons/bi";
import { BiDislike } from "react-icons/bi";
import axios from "axios";
import { toast } from "sonner";
import { FaUserPlus } from "react-icons/fa";

import { getToken } from "../../utils/getToken";
import { delay } from "../../utils/delay";
import { useUser } from "../../context/context.providet";

import EditPost from "./EditPost";
import DeletePost from "./DeletePost";

import { IReceivedPost } from "@/src/types";
import { baseAPI } from "@/src/config/envConfig";

type TProps = {
  post: IReceivedPost;
  fetchPost: () => Promise<void>; // Add fetchPost to the props type
};

const Post = ({ post, fetchPost }: TProps) => {
  const { user } = useUser();

  const localStorageKey = `isFollowing_${post?.user?._id}`;
  const [isFollowing, setIsFollowing] = useState<boolean>(() => {
    const savedStatus = localStorage.getItem(localStorageKey);

    return savedStatus ? JSON.parse(savedStatus) : false;
  });

  useEffect(() => {
    localStorage.setItem(localStorageKey, JSON.stringify(isFollowing));
  }, [isFollowing, localStorageKey]);

  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [hasVoted, setHasVoted] = useState<"upvoted" | "downvoted" | null>(
    null
  );
  const [totalVotes, setTotalVotes] = useState(post.totalVote);

  useEffect(() => {
    const storedVote = localStorage.getItem(`voteStatus`);

    if (storedVote) {
      setHasVoted(storedVote as "upvoted" | "downvoted");
    }
  }, [post._id]);
  const handleUpvote = async (id: string) => {
    if (hasVoted === "upvoted") return;
    try {
      const token = await getToken();

      await axios.put(`${baseAPI}/upvote/${id}`, {
        headers: {
          Authorization: token as string,
        },
      });
      setHasVoted("upvoted");
      setTotalVotes(totalVotes + (hasVoted === "downvoted" ? 1 : 1));
      localStorage.setItem(`voteStatus`, "upvoted");
    } catch (error) {
      console.error("Failed to upvote", error);
    }
  };
  const handleDownvote = async (id: string) => {
    if (hasVoted === "downvoted") return;
    try {
      const token = await getToken();

      await axios.put(`${baseAPI}/downvote/${id}`, {
        headers: {
          Authorization: token as string,
        },
      });
      setHasVoted("downvoted");
      setTotalVotes(totalVotes - (hasVoted === "upvoted" ? 1 : 1));
      localStorage.setItem(`voteStatus`, "downvoted");
    } catch (error) {
      console.error("Failed to upvote", error);
    }
  };
  const openEditModal = () => {
    setIsEditModalVisible(true);
    fetchPost();
  };

  const closeEditModal = () => {
    setIsEditModalVisible(false);
    fetchPost();
  };
  const openDeleteModal = () => {
    setIsDeleteModalVisible(true);
    fetchPost();
  };

  const closeDeleteModal = () => {
    setIsDeleteModalVisible(false);
    fetchPost();
  };

  const handleFlow = async (followerId: string) => {
    const token = await getToken();
    const FlowData = {
      follower: followerId,
    };

    await axios.post(`${baseAPI}/create-flow`, FlowData, {
      headers: {
        Authorization: token as string,
      },
    });
    toast.promise(delay(2), {
      success: "Flow added 👌",
      error: "Failed to update the post",
    });
  };
  const unFlow = async (followerId: string) => {
    const token = await getToken();
    const FlowData = {
      follower: followerId,
    };

    await axios.post(`${baseAPI}/un-flow`, FlowData, {
      headers: {
        Authorization: token as string,
      },
    });
    toast.promise(delay(2), {
      success: " successfully unFlow  👌",
      error: "Failed to update the post",
    });
  };

  const handleFollowClick = () => {
    handleFlow(post?.user?._id);
    setIsFollowing(true);
  };

  const handleUnfollowClick = () => {
    unFlow(post?.user?._id);
    setIsFollowing(false);
  };

  return (
    <div className=" flex flex-col gap-4 rounded-lg shadow-md border p-4 font-titlefont">
      <EditPost
        isVisible={isEditModalVisible}
        post={post}
        onClose={closeEditModal}
      />
      <DeletePost
        isVisible={isDeleteModalVisible}
        postId={post._id}
        onClose={closeDeleteModal}
      />
      <div className="flex justify-between ">
        <div className="flex items-center ">
          <img
            alt="Profil"
            className=" h-10 w-10 md:w-12 md:h-12 rounded-full mr-3"
            src="https://i.ibb.co.com/VDXy8gH/o.jpg"
          />
          <div className=" flex flex-col gap-y-1 justify-start">
            <h2 className=" text-sm md:text-lg font-semibold  font-serif">
              {post?.user?.name}
            </h2>
            {user?.data?.email !== post.user.email && (
              <div>
                {" "}
                {isFollowing ? (
                  <button
                    className="flex items-center justify-center gap-1 border  text-xs font-semibold  border-gray-300 transition duration-300 ease-in-out w-20 px-3 py-1 rounded-md shadow-sm"
                    onClick={handleUnfollowClick}
                  >
                    Unfollow
                  </button>
                ) : (
                  <button
                    className="flex items-center justify-center gap-1 border  text-xs font-semibold  border-gray-300 transition duration-300 ease-in-out w-20 px-3 py-1 rounded-md shadow-sm"
                    onClick={handleFollowClick}
                  >
                    <FaUserPlus />
                    Follow
                  </button>
                )}
              </div>
            )}
          </div>
        </div>

        {user?.data?.email === post.user.email && (
          <div className=" flex gap-2 md:gap-4 ">
            <button
              className=" mt-[0.5] underline text-blue-600"
              onClick={() => {
                openEditModal();
              }}
            >
              Edit
            </button>
            <button
              className=" font-bold  text-red-600 "
              onClick={() => openDeleteModal()}
            >
              X
            </button>
          </div>
        )}
      </div>

      <div className=" text-start ">
        <p>{post?.title}</p>
      </div>

      <div className=" flex flex-col gap-2">
        <div className="w-full grid grid-cols-2 gap-4">
          {post?.images.length % 2 === 1 && (
            <div className="col-span-2">
              <img
                alt="Profile"
                className="w-full h-28 md:h-44 object-cover rounded"
                src={post?.images[0]}
              />
            </div>
          )}
          {post?.images
            .slice(post?.images.length % 2 === 1 ? 1 : 0)
            .map((img, index) => (
              <img
                key={index}
                alt="Profile"
                className="w-full h-28 md:h-44 object-cover rounded"
                src={img}
              />
            ))}
        </div>

        <div className=" text-start">
          <p dangerouslySetInnerHTML={{ __html: post?.description }} />
        </div>
        <hr />
        <div className=" flex justify-between items-center ">
          <div className="flex items-center space-x-4">
            <div className="flex gap-x-1">
              <button
                className={`p-1 border flex gap-1 rounded-full justify-items-center ${
                  hasVoted === "upvoted" ? "bg-blue-600 text-white" : ""
                }`}
                onClick={() => handleUpvote(post._id)}
              >
                <BiLike className="text-xl" />
              </button>

              <button
                className={`p-1 border flex gap-1 rounded-full justify-items-center ${
                  hasVoted === "downvoted" ? "bg-red-600 text-white" : ""
                }`}
                onClick={() => handleDownvote(post._id)}
              >
                <BiDislike className="text-xl" />
              </button>
            </div>
            <span className="text-1xl font-extrabold">
              {totalVotes}{" "}
              <small className="text-xs font-titlefont">likes</small>
            </span>
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
