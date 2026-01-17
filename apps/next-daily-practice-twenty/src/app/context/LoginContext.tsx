"use client"

import { createContext, ReactNode, useContext, useState } from "react";
import { LoginType } from "@/app/types/loginType";

export const LoginContext = createContext<LoginType | undefined>(undefined);

export const useLoginContext = () => {
  const context = useContext(LoginContext);
  if (context === undefined) {
    throw new Error("useLoginContext must be within a LoginProvider");
  }
  return context;
}

export const LoginProvider = ({ children }: { children: ReactNode }) => {
  const [loggedIn, setLoggedIn] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  return (
    <>
      <LoginContext.Provider value={{loggedIn, setLoggedIn, loading, setLoading}}>
        {children}
      </LoginContext.Provider>
    </>
  );
}