"use client"

import { useThemeContext } from "@/app/context/themeContext";
import ThemeToggle from "@/app/components/ThemeToggle";

const Content = () => {

  const { theme, setTheme } = useThemeContext();

  return (
    <>
      <main className={`flex flex-col gap-5 justify-center items-center h-5/6 min-w-full
        ${ theme === "dark" ? "bg-gray-800 text-white" : "bg-white text-black" }`}>
        <ThemeToggle />
        <p className="text-3xl">Toggle Theme practice</p>
      </main>
    </>
  );
}

export default Content;