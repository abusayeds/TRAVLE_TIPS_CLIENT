"use client";

import axios from "axios";
import { useEffect, useState, useCallback } from "react";

import Post from "@/src/components/Ul/post/Post";
import { getToken } from "@/src/components/utils/getToken";
import { baseAPI } from "@/src/config/envConfig";
import { IReceivedPost, TPost } from "@/src/types";
import { useUser } from "@/src/components/context/context.providet";

export default function NewsFeed() {
  const [data, setData] = useState<TPost | null>(null);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const posts = data?.data || [];
  const { search } = useUser();
  const fetchPost = useCallback(async () => {
    setLoading(true);
    const token = await getToken();

    try {
      const { data } = await axios.get(
        `${baseAPI}/all-post?sort=-totalVote&page=${page}`,
        {
          headers: {
            Authorization: token as string,
          },
        }
      );

      setData((prevData) => ({
        ...data,
        data: [...(prevData?.data || []), ...data.data],
      }));
    } catch (error) {
      console.error("Failed to fetch posts", error);
    } finally {
      setLoading(false);
    }
  }, [page]);

  useEffect(() => {
    fetchPost();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >= document.body.offsetHeight &&
        !loading
      ) {
        setPage((prevPage) => prevPage + 1);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loading]);

  return (
    <main className="flex flex-col  gap-y-2 relative">
      <div
        className={`transition-all duration-300 flex items-center gap-2 ${
          search
            ? "sticky  top-16 bg-default-100 rounded-lg z-10 p-4 shadow-md opacity-100"
            : "opacity-0 pointer-events-none"
        }`}
      >
       
        <input
          type="text"
          placeholder="Search..."
          className="w-full border rounded-md p-2 transition duration-500 ease-in-out"
        />
         <select className=" outline-none text-sm h-10 rounded-md px-2">
          <option selected value="">
            Found US
          </option>
          <option value="Exploration">Exploration</option>
          <option value="Business Travel">Business Travel</option>
          <option value="Adventure"> Adventure</option>{" "}
        </select>
      </div>
      <div className="flex flex-col ">
        {posts.length ? (
          posts.map((post: IReceivedPost, index: number) => (
            <Post key={index} fetchPost={fetchPost} post={post} />
          ))
        ) : (
          <div className="flex min-h-screen w-full items-center justify-center rounded-md bg-default-100">
            <h1 className="text-4xl">There is no post here!</h1>
          </div>
        )}
   
      </div>
    </main>
  );
}
