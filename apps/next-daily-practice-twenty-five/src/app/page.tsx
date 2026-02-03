"use client";

import { useUserContext } from "@/app/context/UserContext";

export default function Home() {
  const { user, loading, error, fetchNewUser } = useUserContext();

  return (
    <main style={{ padding: "2rem" }}>
      <button
        className="bg-orange-400 text-white w-60 h-10 rounded"
        onClick={fetchNewUser}>
        Fetch user
      </button>

      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {user && <p>User ID: {user.id}</p>}
    </main>
  );
}
