"use client"

import React, { createContext, useContext, useState } from "react";
import { CountType } from "@/app/types/countType";

export const CountContext = createContext<CountType | undefined>(undefined);

export const useCountContext = () => {
  const context = useContext(CountContext);
  if(context === undefined) {
    throw new Error("useCountContext must be within CountContext");
  }
  return context;
}

export const CountProvider = ({ children }: { children: React.ReactNode }) => {
  const [count, setCount] = useState<number>(0);

  const increment = () => {
    setCount(count + 1);
  }

  const decrement = () => {
    setCount(count - 1);
  }

  const reset = () => {
    setCount(0);
  }

  return (
    <CountContext.Provider value={{count, increment, decrement, reset}}>
      {children}
    </CountContext.Provider>
  );
}

