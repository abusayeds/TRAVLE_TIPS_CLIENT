"use client";

import axios from "axios";
import { useEffect, useState } from "react";

import Post from "@/src/components/Ul/post/Post";
import { getToken } from "@/src/components/utils/getToken";
import { baseAPI } from "@/src/config/envConfig";
import { IReceivedPost, TPost } from "@/src/types";

export default function NewsFeed() {
  const [data, setData] = useState<TPost | null>(null);
  const posts = data?.data || [];

  const fetchPost = async () => {
    const token = await getToken();

    try {
      const { data } = await axios.get(`${baseAPI}/all-post?sort=-totalVote`, {
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
    <div className=" flex flex-col gap-y-6  ">
      {posts.length ? (
        posts.map((post: IReceivedPost, index: number) => (
          <Post key={index} fetchPost={fetchPost} post={post} />
        ))
      ) : (
        <div className="flex min-h-screen w-full items-center justify-center rounded-md bg-default-100">
          <h1 className="text-4xl">There is no post hear !</h1>
        </div>
      )}
    </div>
  );
}
