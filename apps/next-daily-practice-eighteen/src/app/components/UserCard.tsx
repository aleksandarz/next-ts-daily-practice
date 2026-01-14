"use client"

import { useState, useEffect } from "react";
import { fetchUser } from "@/app/api/fetchUser";

export type User = {
  dob: {
    age: number;
  };
  email: string;
  gender: string;
  location: {
    city: string;
  };
  name: {
    first: string;
    last: string;
  };
  phone: string;
  picture: {
    thumbnail: string;
  };
}

const UserCard = () => {

  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadUser = async () => {
    try {
      setLoading(true);
      const result = await fetchUser();
      setUser(result);
    } catch (err) {
      setError("Failed to fetch user. Check your internet connection.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUser();
  }, []);

  const fetchNextUser = async () => {
    loadUser();
  }

  const handleRetry = () => {
    setError(null);
    loadUser();
  };

  return (
    <>
      <div className="min-h-screen w-full flex items-center justify-center">

        {loading && (
          <p className="text-blue-500 text-xl">Loading new user...</p>
        )}

        {error && (
          <div className="text-center mb-6">
            <p className="text-red-500 text-lg">{error}</p>
            <button
              onClick={handleRetry}
              className="mt-4 px-6 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition">
              Try again
            </button>
          </div>
        )}

        {!loading && !error && user && (
          <div className="flex flex-col items-center gap-6">
            <div className="border border-blue-400 rounded-lg p-8 w-[30rem] flex flex-col md:flex-row gap-6 shadow-lg">
              <div className="flex-shrink-0">
                <img
                  src={user.picture.thumbnail}
                  alt={`${user.name.first} ${user.name.last}`}
                  className="w-48 h-48 rounded-full object-cover border-4 border-blue-300"
                />
              </div>

              <div className="flex flex-col gap-2">
                <h2 className="text-2xl font-bold">
                  {user.name.first} {user.name.last}
                </h2>
                <p className="text-gray-600">Gender: {user.gender}</p>
                <p className="text-gray-600">Years: {user.dob.age}</p>
                <p className="text-gray-600">Phone: {user.phone}</p>
                <p className="text-gray-600">Email: {user.email}</p>
                <p className="text-gray-600">City: {user.location.city}</p>
              </div>
            </div>

            <button
              onClick={fetchNextUser}
              disabled={loading}
              className="px-8 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition disabled:opacity-50">
              {loading ? "Loading..." : "Next user"}
            </button>
          </div>
        )}

        {!loading && !error && !user && (
          <p className="text-gray-500 text-lg">No data at this moment</p>
        )}
      </div>
    </>
  );
}

export default UserCard;