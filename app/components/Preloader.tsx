"use client";
import React, { useState, useEffect } from "react";

const LusionPreloader = () => {
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    const duration = 3000; // 3 seconds
    const interval = 16; // ~60fps
    const increment = 100 / (duration / interval);

    const timer = setInterval(() => {
      setProgress((prev) => {
        const newProgress = prev + increment;
        if (newProgress >= 100) {
          clearInterval(timer);
          setTimeout(() => setIsComplete(true), 500);
          return 100;
        }
        return newProgress;
      });
    }, interval);

    return () => clearInterval(timer);
  }, []);

  if (isComplete) {
    return (
      <div className="fixed inset-0 bg-black z-50 flex items-center justify-center opacity-0 pointer-events-none transition-opacity duration-1000">
        <div className="text-white text-2xl">Content Loaded</div>
      </div>
    );
  }

  return (
    <div
      className="fixed inset-0 bg-black z-50 flex items-center justify-center overflow-hidden"
      style={{
        backgroundColor:
          progress < 80
            ? "rgba(0, 0, 0, 1)"
            : `rgba(0, 0, 0, ${1 - (progress - 80) / 20})`,
      }}
    >
      {/* Progress Number - Bottom Left */}
      <div className="absolute bottom-12 left-12 text-white font-light text-2xl tracking-wider">
        {Math.floor(progress).toString().padStart(2, "0")}
      </div>

      {/* Central Symbol with Zoom In Animation */}
      <div className="relative flex items-center justify-center">
        <div
          className="text-white transition-all duration-75 ease-out"
          style={{
            transform: `scale(${0.5 + (progress / 100) * 142})`,
            opacity: progress < 80 ? 0.4 - (progress * 0.4) / 80 : 0,
          }}
        >
          <svg
            width="220"
            height="220"
            viewBox="0 0 140 140"
            fill="white"
            className="drop-shadow-2xl"
          >
            {/* I shape */}
            <path
              d="
              M60 40 
              H80 
              V50 
              H60 
              Z
              M67 50
              H73
              V90
              H67
              Z
              M60 90
              H80
              V100
              H60
              Z
            "
            />
          </svg>
        </div>

        {/* Subtle Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="w-full h-full bg-gradient-to-br from-white/10 to-transparent"></div>
        </div>
      </div>

      {/* Minimal Progress Bar - Bottom */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-white/20">
        <div
          className="h-full bg-white transition-all duration-75 ease-out"
          style={{ width: `${progress}%` }}
        ></div>
      </div>

      {/* Enhanced Ambient Glow Effect */}
      {/* Animated glow circle */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-white opacity-10 blur-3xl transition-all duration-300"
        style={{
          transform: `translate(-50%, -50%) scale(${
            0.4 + (progress / 100) * 1.2
          })`,
        }}
      ></div>
    </div>
  );
};

export default LusionPreloader;
