// "use client";

// import axios from "axios";
// import { useEffect, useState } from "react";
// import { FaSearch } from "react-icons/fa";

// import Post from "@/src/components/Ul/post/Post";
// import { getToken } from "@/src/components/utils/getToken";
// import { baseAPI } from "@/src/config/envConfig";
// import { IReceivedPost, TPost } from "@/src/types";
// import { useUser } from "@/src/components/context/context.providet";

// export default function NewsFeed() {
//   const { search } = useUser();
//   const [data, ] = useState<TPost | null>(null);
//   const [searchdata, setSearchData] = useState<TPost | null>(null);

//   const posts = data?.data || [];
//   const searchposts = searchdata?.data || [];

//   const fetchPost = async () => {
//     const token = await getToken();

//     try {
//       const { data } = await axios.get(
//         `${baseAPI}/all-post?sort=-totalVote&page`,
//         {
//           headers: {
//             Authorization: token as string,
//           },
//         }
//       );
//     } catch (error) {
//       console.error("Failed to fetch posts", error);
//     }
//   };

//   const searchData = async (searchField: string) => {
//     const token = await getToken();

//     if (
//       searchField === "Exploration" ||
//       searchField === "Business Travel" ||
//       searchField === "Adventure"
//     ) {
//       const { data } = await axios.get(
//         `${baseAPI}/all-post?sort=-totalVote&category=${searchField}`,
//         {
//           headers: {
//             Authorization: token as string,
//           },
//         }
//       );

//       setSearchData(data);
//     } else {
//       const { data } = await axios.get(
//         `${baseAPI}/all-post?sort=-totalVote&searchTerm=${searchField}`,
//         {
//           headers: {
//             Authorization: token as string,
//           },
//         }
//       );

//       setSearchData(data);
//     }
//   };

//   useEffect(() => {
//     fetchPost();
//   }, []);

//   return (
//     <main className="flex flex-col gap-y-2 relative">
//       <div
//         className={`transition-all duration-300 flex items-center gap-2 ${
//           search
//             ? "sticky top-16 bg-default-100 rounded-lg z-10 p-4 shadow-md opacity-100"
//             : "opacity-0 pointer-events-none"
//         }`}
//       >
//         <div className="relative w-full">
//           <FaSearch className="absolute right-4 text-lg h-full" />
//           <input
//             className="w-full border rounded-md p-2 transition duration-500 ease-in-out"
//             placeholder="Search..."
//             type="text"
//             onChange={(e) => searchData(e.target.value)}
//           />
//         </div>
//         <select
//           className="outline-none text-sm h-10 rounded-md px-2"
//           onChange={(e) => searchData(e.target.value)}
//         >
//           <option disabled selected value="">
//             Found US
//           </option>
//           <option value="Exploration">Exploration</option>
//           <option value="Business Travel">Business Travel</option>
//           <option value="Adventure">Adventure</option>
//         </select>
//       </div>
//       <div className="flex flex-col gap-4">
//         {searchposts.length
//           ? searchposts.map((post: IReceivedPost, index: number) => (
//               <Post key={index} fetchPost={fetchPost} post={post} />
//             ))
//           : posts.map((post: IReceivedPost, index: number) => (
//               <Post key={index} fetchPost={fetchPost} post={post} />
//             ))}
//       </div>
//     </main>
//   );
// }
