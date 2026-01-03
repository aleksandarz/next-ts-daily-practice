"use client"

import { useThemeContext } from "@/app/context/themeContext";

const ThemeToggle = () => {
  const { theme, setTheme } = useThemeContext();

  const toggle = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  return (
    <div>
      <button
        onClick={toggle}
        className="w-40 h-10 my-10 rounded text-white bg-red-500 border border-red-500
          hover:bg-transparent hover:text-red-500 transition duration-200 ease-in-out"
        type="button"
      >
        Toggle Theme ({theme})
      </button>
    </div>
  );
};

export default ThemeToggle;