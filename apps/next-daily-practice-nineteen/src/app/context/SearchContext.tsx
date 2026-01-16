"use client"

import { createContext, ReactNode, useContext, useState } from "react";

export type SearchType = {
  searchId: string;
  setSearchId: (id: string) => void;
}

export const SearchContext = createContext<SearchType | undefined>(undefined);

export const useSearchContext = () => {
  const context = useContext(SearchContext);
  if (context === undefined) {
    throw new Error("useSearchContext must be used within the searchContextProvider");
  }
  return context;
}

export const SearchContextProvider = ({ children }: { children: ReactNode }) => {
  const [searchId, setSearchId] = useState<string>("");

  return (
    <>
      <SearchContext.Provider value={{searchId, setSearchId}}>
        {children}
      </SearchContext.Provider>
    </>
  );
}