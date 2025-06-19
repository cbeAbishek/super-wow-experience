import React, { useState, useEffect } from 'react';

export default function TechPopup() {
  const [showPopup, setShowPopup] = useState(true);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (showPopup) {
      setTimeout(() => setIsVisible(true), 100);
    }
  }, [showPopup]);

  if (!showPopup) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
      <div
        className={`relative bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-8 rounded-2xl shadow-2xl max-w-md w-full mx-4 border border-purple-500/30 transform transition-all duration-500 ${
          isVisible ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
        }`}
      >
        {/* Animated background glow */}
        <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-cyan-400 rounded-2xl blur opacity-20 animate-pulse"></div>
        
        {/* Close button */}
        <button
          onClick={() => setShowPopup(false)}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors duration-200 z-10"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Content */}
        <div className="relative z-10 text-center">
          {/* Icon/Logo area */}
          <div className="mb-6 flex justify-center">
            <div className="w-16 h-16 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-xl flex items-center justify-center shadow-lg">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
          </div>

          <h2 className="text-2xl font-bold mb-3 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
            Ready for the Future?
          </h2>
          
          <p className="mb-6 text-gray-300 leading-relaxed">
            Join thousands of innovators building tomorrow&#39;s technology. Get early access to our revolutionary platform.
          </p>

          {/* Action buttons */}
          <div className="space-y-3">
            <button
              onClick={() => setShowPopup(false)}
              className="w-full px-6 py-3 bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-semibold rounded-xl hover:from-cyan-400 hover:to-purple-500 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-cyan-500/25"
            >
              Get Early Access
            </button>
            
            <button
              onClick={() => setShowPopup(false)}
              className="w-full px-6 py-2 text-gray-400 hover:text-white transition-colors duration-200 text-sm"
            >
              Maybe later
            </button>
          </div>

          {/* Tech accent */}
          <div className="mt-6 flex justify-center space-x-1">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"
                style={{ animationDelay: `${i * 0.3}s` }}
              ></div>
            ))}
          </div>
        </div>

        {/* Subtle grid pattern overlay */}
        <div className='absolute inset-0 bg-[url("")] rounded-2xl'>
        </div>
      </div>
    </div>
  );
}
