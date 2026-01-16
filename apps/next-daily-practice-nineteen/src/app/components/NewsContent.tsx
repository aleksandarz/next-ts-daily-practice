"use client"

import { useSearchContext } from "@/app/context/SearchContext";
import { fetchNewsById } from "@/app/api/fetchNews";
import { useEffect, useState } from "react";
import { PostsType } from "@/app/components/NewsClient";

const NewsContent = () => {
  const { searchId } = useSearchContext();

  const [newsData, setNewsData] = useState<PostsType | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const loadNewsById = async () => {
    if (!searchId.trim()) return;

    setLoading(true);
    setError(null);

    try {
      const data = await fetchNewsById(searchId);
      setNewsData(data);
    } catch (err) {
      setError("We couldn't load news with specific ID.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadNewsById();
  }, [searchId]);

  const handleRetry = () => {
    loadNewsById();
  };

  if (!searchId) {
    return <p className="text-center text-gray-500 mt-10">Enter ID for search</p>;
  }

  return (
    <div className="w-full max-w-4xl mx-auto p-6">
      {loading && (
        <p className="text-center text-blue-500 text-xl">Loading news...</p>
      )}

      {error && (
        <div className="text-center mb-8">
          <p className="text-red-500 text-xl mb-4">{error}</p>
          <button
            onClick={handleRetry}
            disabled={loading}
            className="px-8 py-3 bg-red-500 text-white rounded hover:bg-red-600 transition disabled:opacity-50">
            {loading ? "Loading..." : "Try again"}
          </button>
        </div>
      )}

      {!loading && !error && newsData && (
        <div className="p-8 border border-pink-400 rounded-lg shadow-lg bg-white">
          <h2 className="text-3xl font-bold mb-4">{newsData.title}</h2>
          <p className="text-gray-700 text-lg leading-relaxed">{newsData.body}</p>
          <p className="mt-4 text-sm text-gray-500">ID: {newsData.id} | Author ID: {newsData.userId}</p>
        </div>
      )}

      {!loading && !error && !newsData && searchId && (
        <p className="text-center text-gray-500">No news for ID: {searchId}</p>
      )}
    </div>
  );
};

export default NewsContent;