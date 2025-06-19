"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Palette, ChevronDown } from "lucide-react";
import { useTheme } from "./ThemeProvider";

interface ThemeSwitcherProps {
  type?: "dropdown" | "sidebar" | "panel";
}

export default function ThemeSwitcher({
  type = "dropdown",
}: ThemeSwitcherProps) {
  const [showThemeMenu, setShowThemeMenu] = useState(false);
  const { theme, setTheme } = useTheme();

  const themes = [
    { name: "Light", value: "light" as const, color: "#ffffff", border: true },
    { name: "Dark", value: "dark" as const, color: "#000000", border: true },
    {
      name: "Rainbow",
      value: "rainbow" as const,
      color: "linear-gradient(45deg, #ff6b6b, #4ecdc4, #45b7d1)",
      border: false,
    },
    { name: "Ocean", value: "ocean" as const, color: "#0891b2", border: false },
    {
      name: "Forest",
      value: "forest" as const,
      color: "#65a30d",
      border: false,
    },
    {
      name: "Sunset",
      value: "sunset" as const,
      color: "linear-gradient(135deg, #7f1d1d, #b45309, #d97706)",
      border: false,
    },
    {
      name: "Lavender",
      value: "lavender" as const,
      color: "#8b5cf6",
      border: false,
    },
    { name: "Rose", value: "rose" as const, color: "#ec4899", border: false },
    { name: "Sky", value: "sky" as const, color: "#0ea5e9", border: false },
    {
      name: "Cyberpunk",
      value: "cyberpunk" as const,
      color: "#fb7185",
      border: false,
    },
  ];

  if (type === "panel") {
    return (
      <div className="p-4 bg-black/30 backdrop-blur-md rounded-xl border border-white/10">
        <h3 className="text-white/90 text-lg font-medium mb-3">Choose Theme</h3>
        <div className="grid grid-cols-5 gap-2">
          {themes.map((themeOption) => (
            <button
              key={themeOption.value}
              onClick={() => setTheme(themeOption.value)}
              className={`flex flex-col items-center justify-center p-2 rounded-lg transition-all ${
                theme === themeOption.value
                  ? "ring-2 ring-purple-500 scale-105"
                  : "hover:bg-white/5"
              }`}
              title={themeOption.name}
            >
              <span
                className={`w-8 h-8 rounded-full mb-1 ${
                  themeOption.border ? "border border-white/20" : ""
                }`}
                style={{ background: themeOption.color }}
              ></span>
              <span className="text-xs text-white/80">{themeOption.name}</span>
            </button>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="relative">
      <button
        className="flex items-center gap-2 p-2 text-white/80 hover:text-white transition-colors"
        onClick={() => setShowThemeMenu(!showThemeMenu)}
        data-interactive
      >
        <Palette size={20} />
        <span>Theme</span>
        <ChevronDown
          size={16}
          className={`transform transition-transform ${
            showThemeMenu ? "rotate-180" : ""
          }`}
        />
      </button>

      <AnimatePresence>
        {showThemeMenu && (
          <motion.div
            className="absolute top-full right-0 mt-2 bg-black/90 backdrop-blur-md rounded-lg p-2 min-w-[200px] z-50 shadow-lg border border-white/10"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            <div className="grid grid-cols-2 gap-1">
              {themes.map((themeOption) => (
                <button
                  key={themeOption.value}
                  onClick={() => {
                    setTheme(themeOption.value);
                    setShowThemeMenu(false);
                  }}
                  className={`flex items-center gap-2 px-3 py-2 rounded text-sm transition-colors ${
                    theme === themeOption.value
                      ? "bg-purple-500/30 text-white"
                      : "text-white/80 hover:text-white hover:bg-white/10"
                  }`}
                >
                  <span
                    className={`w-3 h-3 rounded-full ${
                      themeOption.border ? "border border-white/20" : ""
                    }`}
                    style={{ background: themeOption.color }}
                  ></span>
                  {themeOption.name}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
