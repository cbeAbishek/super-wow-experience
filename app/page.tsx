"use client";

import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Loader } from "./components/Preloader";
import Navigation from "./components/Navigation";
import ScrollProgress from "./components/ScrollProgress";
import Hero from "./components/Hero";
import About from "./components/About";
import Projects from "./components/Projects";
import TabbedSection from "./components/TabbedSection";
import Testimonials from "./components/Testimonials";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Chatbot from "./components/Chatbot";
import MusicPlayer from "./components/MusicPlayer";
import ThemeProvider from "./components/ThemeProvider";
import NotificationToast from "./components/NotificationToast";
import CustomCursor from "./components/CustomCursor";
import ThemeSwitcher from "./components/ThemeSwitcher";
import TechMetricsDashboard from "./components/chart";
import TechPopup from "./components/TechPopup";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [showToast, setShowToast] = useState(false);
  const [showThemePanel, setShowThemePanel] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
      setShowToast(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <ThemeProvider>
      <div className="relative min-h-screen">
        <CustomCursor />
        <AnimatePresence mode="wait">
          {isLoading ? (
            <Loader key="preloader" isLoading={isLoading} />
          ) : (
            <main key="main" className="relative">
              <ScrollProgress />
              <Navigation />
              <Hero />
              <About />
              <Projects />
              <TabbedSection />
              <TechMetricsDashboard />
              <Testimonials />
              <Contact />
              <Footer />
              <Chatbot />
              <MusicPlayer />

              {/* Theme panel toggle button */}
              <motion.button
                className="fixed bottom-6 left-24 w-12 h-12 bg-black/50 backdrop-blur-md rounded-full flex items-center justify-center text-white/70 hover:text-white border border-white/20 hover:border-white/40 transition-all duration-300 z-40"
                onClick={() => setShowThemePanel(!showThemePanel)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                data-interactive
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="5"></circle>
                  <path d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4"></path>
                </svg>
              </motion.button>

              {/* Theme panel */}
              <AnimatePresence>
                {showThemePanel && (
                  <motion.div
                    className="fixed bottom-24 left-6 z-40"
                    initial={{ opacity: 0, y: 20, x: 0 }}
                    animate={{ opacity: 1, y: 0, x: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ThemeSwitcher type="panel" />
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Popup */}
              {!isLoading && <TechPopup />}
            </main>
          )}
        </AnimatePresence>
      </div>
    </ThemeProvider>
  );
}
                   