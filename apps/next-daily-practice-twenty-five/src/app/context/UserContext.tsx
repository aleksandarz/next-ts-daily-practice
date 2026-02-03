"use client"

import { createContext, ReactNode, useContext, useState } from "react";

export type User = {
  id: number;
}

export type UserContextType = {
  user: User | null
  loading: boolean
  error: string | null
  fetchNewUser: () => Promise<void>
}

export const UserContext = createContext<UserContextType | undefined>(undefined);

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("UserContext must be within a UserProvider");
  }
  return context;
}

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchNewUser = async () => {
    try {
      setLoading(true);
      setError(null);

      const res = await fetch("/api/users");

      if (!res.ok) {
        throw new Error("Failed to fetch user");
      }

      const data = await res.json();
      setUser(data.user);
    } catch (err) {
      setError("Could not load user. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <UserContext.Provider
      value={{
        user,
        loading,
        error,
        fetchNewUser,
      }}>
      {children}
    </UserContext.Provider>
  );
}