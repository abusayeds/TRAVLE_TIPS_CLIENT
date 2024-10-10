"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";

import Post from "@/src/components/Ul/post/Post";
import { getToken } from "@/src/components/utils/getToken";
import { baseAPI } from "@/src/config/envConfig";
import { IReceivedPost, TPost } from "@/src/types";
import { useUser } from "@/src/components/context/context.providet";
import Hero from "@/src/components/utils/Hero";
import Link from "next/link";
const images = [
  { src: "/images/travel1.jpg", text: "Discover new places" },
  { src: "/images/travel2.jpg", text: "Adventure awaits" },
  { src: "/images/travel3.jpg", text: "Explore the world" },
];

export default function NewsFeed() {
  const { search } = useUser();
  const [data, setData] = useState<TPost | null>(null);
  const [searchdata, setSearchData] = useState<TPost | null>(null);

  const posts = data?.data || [];
  const searchposts = searchdata?.data || [];

  const fetchPost = async () => {
    const token = await getToken();

    try {
      const { data } = await axios.get(
        `${baseAPI}/all-post?sort=-totalVote&page`,
        {
          headers: {
            Authorization: token as string,
          },
        }
      );

      setData(data);
    } catch (error) {
      console.error("Failed to fetch posts", error);
    }
  };

  const searchData = async (searchField: string) => {
    const token = await getToken();

    if (
      searchField === "Exploration" ||
      searchField === "Business Travel" ||
      searchField === "Adventure"
    ) {
      const { data } = await axios.get(
        `${baseAPI}/all-post?sort=-totalVote&category=${searchField}`,
        {
          headers: {
            Authorization: token as string,
          },
        }
      );

      setSearchData(data);
    } else {
      const { data } = await axios.get(
        `${baseAPI}/all-post?sort=-totalVote&searchTerm=${searchField}`,
        {
          headers: {
            Authorization: token as string,
          },
        }
      );

      setSearchData(data);
    }
  };

  useEffect(() => {
    fetchPost();
  }, []);

  return (
    <section>
      {posts.length === 0 && searchposts.length === 0 ? (
        <section className=" flex flex-col justify-center items-center">
          <p className=" font-serif text-4xl text-red-600">There is no post hear !  😢 </p>
          <Link className="bg-blue-400 p-2 mt-8 rounded text-white" href="/login"> Log in now </Link>
        </section>
      ) : (
        <main className="flex flex-col gap-y-2 relative">
          <div
            className={`transition-all duration-300 flex items-center gap-2 ${
              search
                ? "sticky top-16 bg-default-100 rounded-lg z-10 p-4 shadow-md opacity-100"
                : "opacity-0 pointer-events-none"
            }`}
          >
            <div className="relative w-full">
              <FaSearch className="absolute right-4 text-lg h-full" />
              <input
                className="w-full border rounded-md p-2 transition duration-500 ease-in-out"
                placeholder="Search..."
                type="text"
                onChange={(e) => searchData(e.target.value)}
              />
            </div>
            <select
              className="outline-none text-sm h-10 rounded-md px-2"
              onChange={(e) => searchData(e.target.value)}
            >
              <option disabled selected value="">
                Found US
              </option>
              <option value="Exploration">Exploration</option>
              <option value="Business Travel">Business Travel</option>
              <option value="Adventure">Adventure</option>
            </select>
          </div>
          <div className="flex flex-col gap-4">
            {searchposts.length
              ? searchposts.map((post: IReceivedPost, index: number) => (
                  <Post key={index} fetchPost={fetchPost} post={post} />
                ))
              : posts.map((post: IReceivedPost, index: number) => (
                  <Post key={index} fetchPost={fetchPost} post={post} />
                ))}
          </div>
        </main>
      )}
    </section>
  );
}
