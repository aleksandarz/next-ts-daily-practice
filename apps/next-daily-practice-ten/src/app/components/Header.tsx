"use client"

import { useThemeContext } from "@/app/context/themeContext";

const Header = () => {

  const  { theme, setTheme } = useThemeContext();

  return (
    <>
        <header className={`flex items-center justify-center h-1/6 min-w-full
          ${ theme === "dark" ? "bg-gray-800 text-white" : "bg-white text-black" }`}>
        <h2 className="text-xl">ToggleTheme</h2>
      </header>
    </>
  );
}

export default Header;