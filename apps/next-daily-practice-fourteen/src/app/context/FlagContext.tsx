"use client"

import { createContext, ReactNode, useContext, useState } from "react";
import { FeatureFlags, FlagContextType } from "@/app/types/flagType";

const initialFlags: FeatureFlags = {
  newDashboard: false,
};

export const FlagContext = createContext<FlagContextType | undefined>(undefined);

export const useFlagContext = () => {
  const context = useContext(FlagContext);
  if (context === undefined) {
    throw new Error("useFlagContext must be used within FlagProvider");
  }
  return context;
}

export const FlagProvider = ({ children }: { children: ReactNode }) => {
  const [flags, setFlags] = useState<FeatureFlags>(initialFlags);

  const toggleFlag = (flagName: string) => {
    setFlags((prev) => ({ ...prev, [flagName]: !prev[flagName] }));
  }

  return (
    <>
      <FlagContext.Provider value={{flags, toggleFlag}}>
        {children}
      </FlagContext.Provider>
    </>
  );
}