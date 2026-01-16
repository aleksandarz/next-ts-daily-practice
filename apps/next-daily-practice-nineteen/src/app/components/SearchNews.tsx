"use client"

import { useSearchContext } from "@/app/context/SearchContext";
import { useState } from "react";

const SearchNews = () => {
  const [search, setSearch] = useState<string>("");
  const { setSearchId } = useSearchContext();

  const handleSearch = () => {
    const trimmed = search.trim();
    if (!trimmed) {
      alert("Enter News ID (number from 1 to 100)");
      return;
    }
    setSearchId(trimmed);
    setSearch("");
  };

  return (
    <div className="flex gap-3 m-6">
      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Enter ID (number from 1 to 100)"
        className="w-96 h-9 rounded border border-pink-400 pl-1.5 outline-none focus:border-pink-600"
        type="text"/>
      <button
        onClick={handleSearch}
        className="w-36 h-9 bg-pink-500 text-white rounded hover:bg-pink-600 transition"
        type="button">
        Search
      </button>
    </div>
  );
};

export default SearchNews;