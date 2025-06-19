"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";

type Theme =
  | "light"
  | "dark"
  | "rainbow"
  | "ocean"
  | "forest"
  | "sunset"
  | "lavender"
  | "rose"
  | "sky"
  | "cyberpunk";

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};

export default function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>("dark");

  useEffect(() => {
    const root = document.documentElement;
    root.className = ""; // Clear existing classes

    switch (theme) {
      case "light":
        root.classList.add("theme-light");
        break;
      case "dark":
        root.classList.add("theme-dark");
        break;
      case "rainbow":
        root.classList.add("theme-rainbow");
        break;
      case "ocean":
        root.classList.add("theme-ocean");
        break;
      case "forest":
        root.classList.add("theme-forest");
        break;
      case "sunset":
        root.classList.add("theme-sunset");
        break;
      case "lavender":
        root.classList.add("theme-lavender");
        break;
      case "rose":
        root.classList.add("theme-rose");
        break;
      case "sky":
        root.classList.add("theme-sky");
        break;
      case "cyberpunk":
        root.classList.add("theme-cyberpunk");
        break;
    }
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
