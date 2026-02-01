"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";

const DarkMode = () => {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      aria-label="Toggle theme"
      className="flex justify-center items-center relative bg-[#072611]/60 backdrop-blur-sm hover:bg-white/30 border-0 text-white dark:bg-slate-900/20 dark:hover:bg-white/10"
    >
      <Sun
        className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 text-white"
        strokeWidth={3.5}
      />
      <Moon
        className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 text-white"
        strokeWidth={3.5}
      />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
};

export default DarkMode;
