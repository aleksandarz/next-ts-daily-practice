"use client"

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

const NewsClient = ({ news: initialNews, initialError }: NewsClientProps) => {
  const [localNews, setLocalNews] = useState<PostsType[]>(initialNews);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(initialError);

  const handleRetry = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("https://jsonplaceholder.typicode.com/posts?_limit=10", {
        cache: "no-store",
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const data: PostsType[] = await response.json();
      setLocalNews(data);
    } catch (err) {
      setError("We couldn't load news. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center p-8">
      <Suspense fallback={<p className="text-blue-500 text-xl">Loading news...</p>}>
        {error && (
          <div className="text-center mb-8">
            <p className="text-red-500 text-xl mb-4">{error}</p>
            <button
              onClick={handleRetry}
              disabled={loading}
              className="px-6 py-3 bg-red-500 text-white rounded hover:bg-red-600 transition disabled:opacity-50"
            >
              {loading ? "Loading..." : "Try again"}
            </button>
          </div>
        )}

        {!loading && !error && localNews.length === 0 && (
          <p className="text-gray-500 text-xl">No news at this moment</p>
        )}

        {!loading && !error && localNews.length > 0 && (
          <div className="w-full max-w-4xl space-y-6">
            {localNews.map((item) => (
              <div
                key={item.id}
                className="p-6 border border-pink-400 rounded-lg shadow-md bg-white">
                <h2 className="text-2xl font-bold mb-3">{item.title}</h2>
                <p className="text-gray-700">{item.body}</p>
              </div>
            ))}
          </div>
        )}
      </Suspense>
    </div>
  );
};

export default NewsClient;