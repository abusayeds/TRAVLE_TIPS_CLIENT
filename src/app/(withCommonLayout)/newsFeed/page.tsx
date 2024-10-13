"use client";

import axios from "axios";
import { useEffect, useState, useRef } from "react";
import { FaSearch } from "react-icons/fa";

import Post from "@/src/components/Ul/post/Post";
import { getToken } from "@/src/components/utils/getToken";
import { baseAPI } from "@/src/config/envConfig";
import { IReceivedPost, TPost } from "@/src/types";
import { useUser } from "@/src/components/context/context.providet";

export default function NewsFeed() {
  const { search } = useUser();
  const [searchdata, setSearchData] = useState<TPost | null>(null);
  const searchposts = searchdata?.data || [];
  const [data, setData] = useState<TPost | null>(null);
  const [page, setPage] = useState<number>(1); // To track the current page
  const [isLoading, setIsLoading] = useState<boolean>(false); // To prevent multiple fetches
  const posts = data?.data || [];
  const observerRef = useRef<HTMLDivElement | null>(null); // Ref to observe scrolling

  const fetchPost = async (pageNum = 1) => {
    const token = await getToken();

    try {
      setIsLoading(true);
      const { data } = await axios.get(
        `${baseAPI}/all-post?sort=-totalVote&page=${pageNum}`,
        {
          headers: {
            Authorization: token as string,
          },
        },
      );

      // Append new data to existing posts
      setData(
        (prevData) =>
          ({
            ...prevData,
            data: prevData ? [...prevData.data, ...data.data] : data.data,
          }) as any,
      );
    } catch (error) {
      console.error("Failed to fetch posts", error);
    } finally {
      setIsLoading(false);
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
        },
      );

      setSearchData(data);
    } else {
      const { data } = await axios.get(
        `${baseAPI}/all-post?sort=-totalVote&searchTerm=${searchField}`,
        {
          headers: {
            Authorization: token as string,
          },
        },
      );

      setSearchData(data);
    }
  };

  // Infinite scroll handler
  useEffect(() => {
    const handleScroll = () => {
      if (observerRef.current) {
        const { bottom } = observerRef.current.getBoundingClientRect();

        if (bottom <= window.innerHeight && !isLoading) {
          setPage((prevPage) => prevPage + 1);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isLoading]);

  useEffect(() => {
    fetchPost(page); // Fetch posts when page number changes
  }, [page]);

  return (
    <section>
      {posts.length === 0 && searchposts.length === 0 ? (
        ""
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
          {/* Observer div to detect scrolling */}
          <div ref={observerRef} className="h-10" />
          {isLoading && <p>Loading more posts...</p>}
        </main>
      )}
    </section>
  );
}
