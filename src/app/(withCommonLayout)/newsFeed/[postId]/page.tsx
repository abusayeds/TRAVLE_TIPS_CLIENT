"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";

import { getToken } from "@/src/components/utils/getToken";
import { baseAPI } from "@/src/config/envConfig";
import { TPost } from "@/src/types";
import Post from "@/src/components/Ul/post/Post";
interface IProps {
  params: {
    postId: string;
  };
}
const Detailpage = ({ params: { postId } }: IProps) => {
  const [data, setData] = useState<TPost | null>(null);

  const posts = data?.data || [];

  console.log({ posts });

  const fetchPost = async () => {
    const token = await getToken();

    try {
      const { data } = await axios.get(`${baseAPI}/single-post/${postId}`, {
        headers: {
          Authorization: token as string,
        },
      });

      setData(data);
    } catch (error) {
      console.error("Failed to fetch posts", error);
    }
  };

  console.log(posts.upvote);

  useEffect(() => {
    fetchPost();
  }, []);

  return (
    <div className=" flex flex-col gap-y-6  md:w-1/2 mx-auto ">
      {posts ? (
        <Post fetchPost={fetchPost} post={posts} singlePostDetials={true} />
      ) : (
        <div className="flex min-h-screen w-full items-center justify-center rounded-md bg-default-100">
          <h1 className="text-4xl">There is no post hear !</h1>
        </div>
      )}
    </div>
  );
};

export default Detailpage;
