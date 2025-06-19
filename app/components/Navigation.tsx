"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X, Palette, ChevronDown } from "lucide-react"
import { useTheme } from "./ThemeProvider"

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [showThemeMenu, setShowThemeMenu] = useState(false)
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navItems = ["Home", "About", "Projects", "Services", "Contact"]
  const themes = [
    { name: "Light", value: "light" as const, color: "#ffffff" },
    { name: "Dark", value: "dark" as const, color: "#000000" },
    { name: "Rainbow", value: "rainbow" as const, color: "#ff9ff3" },
    { name: "Ocean", value: "ocean" as const, color: "#0891b2" },
    { name: "Forest", value: "forest" as const, color: "#65a30d" },
    { name: "Sunset", value: "sunset" as const, color: "#f97316" },
    { name: "Lavender", value: "lavender" as const, color: "#8b5cf6" },
    { name: "Rose", value: "rose" as const, color: "#ec4899" },
    { name: "Sky", value: "sky" as const, color: "#0ea5e9" },
    { name: "Cyberpunk", value: "cyberpunk" as const, color: "#fb7185" },
  ]

  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled ? "bg-black/80 backdrop-blur-md" : "bg-transparent"
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <motion.div
          className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent"
          whileHover={{ scale: 1.05 }}
        >
          SuperWow
        </motion.div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          {navItems.map((item, index) => (
            <motion.a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="text-white/80 hover:text-white transition-colors"
              whileHover={{ y: -2 }}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              {item}
            </motion.a>
          ))}

          
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center gap-3">
          <button 
            className="relative p-2 text-white/80 hover:text-white"
            onClick={() => setShowThemeMenu(!showThemeMenu)}
            data-interactive
          >
            <Palette size={20} />
          </button>
          
          <button 
            className="text-white" 
            onClick={() => setIsOpen(!isOpen)}
            data-interactive
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Theme Menu */}
      <AnimatePresence>
        {showThemeMenu && (
          <motion.div 
            className="md:hidden absolute right-16 top-16 bg-black/90 backdrop-blur-md rounded-lg p-2 z-50"
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
                    theme === themeOption.value ? "bg-purple-500/30 text-white" : "text-white/80 hover:text-white hover:bg-white/10"
                  }`}
                >
                  <span 
                    className="w-3 h-3 rounded-full" 
                    style={{ background: themeOption.color }}
                  ></span>
                  {themeOption.name}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Navigation */}
      <motion.div
        className={`md:hidden bg-black/95 backdrop-blur-md ${isOpen ? "block" : "hidden"}`}
        initial={{ opacity: 0, height: 0 }}
        animate={{ opacity: isOpen ? 1 : 0, height: isOpen ? "auto" : 0 }}
      >
        <div className="container mx-auto px-4 py-4 space-y-4">
          {navItems.map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="block text-white/80 hover:text-white transition-colors"
              onClick={() => setIsOpen(false)}
            >
              {item}
            </a>
          ))}
        </div>
      </motion.div>
    </motion.nav>
  )
}
