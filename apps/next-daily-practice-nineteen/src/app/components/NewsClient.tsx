"use client"

import { useRouter } from "next/navigation";
import { useState, Suspense } from "react";

export type PostsType = {
  body: string;
  id: number;
  title: string;
  userId: number;
}

interface NewsClientProps {
  news: PostsType[];
  initialError: string | null;
}

const NewsClient = ({ news: news, initialError }: NewsClientProps) => {
  const router = useRouter();

  const [loading, setLoading] = useState<boolean>(false);

  return (
    <>
      <div className="min-h-screen w-full items-center justify-center">

        <Suspense fallback={<p className="text-center text-blue-400 text-xl mt-10">Fetching news data...</p>}>
          {initialError && (
            <>
              <p className="text-center text-red-400 text-xl mt-10">{initialError}</p>
            </>
          )}

          <div>
            <button
              onClick={router.refresh}
              disabled={loading}
              className="bg-pink-400 text-white w-36 h-9 rounded"
              type="button">
              {loading ? "Loading..." : "Retry"}
            </button>
          </div>

          <div className="flex flex-col gap-3 items-center">
            {news !== null && news.length > 0 && (
              news.map((n) => (
                <>
                  <div
                    className="flex flex-col gap-2 w-[50rem] h-fit p-10 border-b-2 border-pink-400"
                    key={n.id}>
                    <h2 className="text-xl font-semibold">{n.title}</h2>
                    <p>{n.body}</p>
                  </div>
                </>
              ))
            )}
          </div>
        </Suspense>

      </div>
    </>
  );
}

export default NewsClient;