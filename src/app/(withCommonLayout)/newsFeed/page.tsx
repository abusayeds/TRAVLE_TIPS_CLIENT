"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

import Post from "@/src/components/Ul/post/Post";
import { getToken } from "@/src/components/utils/getToken";
import { baseAPI } from "@/src/config/envConfig";
import { IReceivedPost, TPost } from "@/src/types";
import { useUser } from "@/src/components/context/context.providet";
const travelImages = [
  { src: "image1.jpg", text: "Explore the mountains" },
  { src: "image2.jpg", text: "Relax at the beach" },
  { src: "image3.jpg", text: "Discover the city" },
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
        },
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

  useEffect(() => {
    fetchPost();
  }, []);

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === travelImages.length - 1 ? 0 : prevIndex + 1,
      );
    }, 4000); // 4 seconds interval

    return () => clearInterval(interval);
  }, []);

  return (
    <section>
      {posts.length === 0 && searchposts.length === 0 ? (
        <section>
          <div className="relative h-screen flex items-center justify-center">
            {/* Background Image */}
            <AnimatePresence exitBeforeEnter>
              {travelImages.map((item, index) =>
                index === currentIndex ? (
                  <motion.div
                    key={item.src}
                    animate={{ opacity: 1 }}
                    className="absolute inset-0"
                    exit={{ opacity: 0 }}
                    initial={{ opacity: 0 }}
                    transition={{ duration: 0.8 }}
                  >
                    <img
                      alt={item.text}
                      className="w-full h-full object-cover"
                      src={item.src}
                    />
                  </motion.div>
                ) : null,
              )}
            </AnimatePresence>

            {/* Text Section */}
            <div className="absolute z-10 text-center">
              <AnimatePresence exitBeforeEnter>
                <motion.h1
                  key={travelImages[currentIndex].text}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-white text-5xl md:text-7xl font-bold"
                  exit={{ opacity: 0, y: -50 }}
                  initial={{ opacity: 0, y: 50 }}
                  transition={{ duration: 0.8 }}
                >
                  {travelImages[currentIndex].text}
                </motion.h1>
              </AnimatePresence>
            </div>

            {/* Overlay for better text visibility */}
            <div className="absolute inset-0 bg-black opacity-30" />
          </div>
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
