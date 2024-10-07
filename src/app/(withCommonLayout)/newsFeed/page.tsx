"use client";

import { useAllPost } from "@/src/components/hooks/post.hook";
import Post from "@/src/components/Ul/post/Post";
import { IReceivedPost } from "@/src/types";

export default function AboutPage() {
  const { data } = useAllPost();

  const posts = data?.data || [];

  return (
    <div className=" flex flex-col gap-y-6  ">
      {posts?.length ? (
        posts.map((post: IReceivedPost, index: number) => (
          <Post key={index} post={post} />
        ))
      ) : (
        <div className="flex min-h-screen w-full items-center justify-center rounded-md bg-default-100">
          <h1 className="text-4xl">There is no post hear !</h1>
        </div>
      )}
    </div>
  );
}
