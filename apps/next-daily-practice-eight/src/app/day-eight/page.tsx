"use client"

import { posts } from "@/app/day-eight/data";
import { useRouter } from "next/navigation";

const Page = () => {

  const router = useRouter();

  const handleClick = (id: string) => {
    router.push(`/day-eight/${id}`)
  }

  return (
    <>
      <div className="min-w-full min-h-screen flex flex-col items-center">
        {posts.map((post) => (
          <div
            onClick={() => handleClick(String(post.id))}
            className="h-fit w-[40rem] flex flex-col gap-3 items-center
              p-5 border-b-2 border-gray-300 cursor-pointer"
            key={post.id}>
            <h2 className="text-xl font-semibold">{post.title}</h2>
            <p className="break-normal">{post.description}</p>
          </div>
        ))}
      </div>
    </>
  );
}

export default Page;