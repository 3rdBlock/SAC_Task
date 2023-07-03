import React, { useState, useEffect } from "react";
import { SunIcon, MoonIcon } from "@heroicons/react/24/solid";

const DarkModeToggle: React.FC = () => {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    if (darkMode) {
      document.body.classList.remove("dark");
      localStorage.setItem("theme", "light");
      setDarkMode(false);
    } else {
      document.body.classList.add("dark");
      localStorage.setItem("theme", "dark");
      setDarkMode(true);
    }
  };

  useEffect(() => {
    const theme = localStorage.getItem("theme");
    if (theme === "dark") {
      document.body.classList.add("dark");
      setDarkMode(true);
    } else {
      document.body.classList.remove("dark");
      setDarkMode(false);
    }
  }, []);

  return (
    <div
      onClick={toggleDarkMode}
      role="button"
      tabIndex={0}
      className="text-sm font-medium text-zinc-900 dark:text-zinc-100 bg-transparent p-2 cursor-pointer hover:opacity-80 dark:hover:opacity-80 transition-all duration-300"
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          toggleDarkMode();
        }
      }}
    >
      {darkMode ? <SunIcon height={21} /> : <MoonIcon height={21} />}
    </div>
  );
};

export default DarkModeToggle;
