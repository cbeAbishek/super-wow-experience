"use client";
import React, { useState, useEffect } from 'react';
import { ChevronRight, Sparkles, Zap, Globe, ArrowRight, Star, Layers, Rocket } from 'lucide-react';

const HeroSection = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  type Particle = {
    id: number;
    x: number;
    y: number;
    size: number;
    delay: number;
    duration: number;
  };
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    // Generate floating particles
    const newParticles = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 2,
      delay: Math.random() * 2,
      duration: Math.random() * 3 + 2,
    }));
    setParticles(newParticles);
  }, []);

  interface MousePosition {
    x: number;
    y: number;
  }


  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    });
  };

  return (
    <div 
      className="relative min-h-screen bg-gradient-to-br from-purple-950 via-blue-900 to-indigo-950 overflow-hidden"
      onMouseMove={handleMouseMove}
    >
      {/* Animated Background Grid */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-purple-500 to-transparent transform -skew-y-12 animate-pulse"></div>
        <div 
          className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-500 to-transparent transform skew-x-12 animate-pulse"
          style={{ animationDelay: '1s' }}
        ></div>
      </div>

      {/* Floating Particles */}
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute w-1 h-1 bg-white rounded-full opacity-60"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            animation: `float ${particle.duration}s ease-in-out infinite`,
            animationDelay: `${particle.delay}s`,
          }}
        ></div>
      ))}

      {/* Dynamic Gradient Orb */}
      <div 
        className="absolute w-96 h-96 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 opacity-20 blur-3xl transition-all duration-1000 ease-out"
        style={{
          left: `${mousePosition.x}%`,
          top: `${mousePosition.y}%`,
          transform: 'translate(-50%, -50%)',
        }}
      ></div>

      {/* Main Content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen px-4">
        <div className="text-center max-w-6xl mx-auto">
          
          {/* Floating Icons */}
          <div className="relative mb-8">
            <div className="absolute -top-20 -left-20 animate-bounce" style={{ animationDelay: '0s' }}>
              <Sparkles className="w-8 h-8 text-yellow-400 opacity-80" />
            </div>
            <div className="absolute -top-16 -right-16 animate-bounce" style={{ animationDelay: '0.5s' }}>
              <Zap className="w-6 h-6 text-blue-400 opacity-80" />
            </div>
            <div className="absolute -bottom-10 -left-16 animate-bounce" style={{ animationDelay: '1s' }}>
              <Globe className="w-7 h-7 text-green-400 opacity-80" />
            </div>
            <div className="absolute -bottom-8 -right-12 animate-bounce" style={{ animationDelay: '1.5s' }}>
              <Star className="w-5 h-5 text-purple-400 opacity-80" />
            </div>
          </div>

          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 mb-8 group hover:bg-white/20 transition-all duration-300 hover:scale-105">
            <Rocket className="w-4 h-4 text-purple-300 group-hover:animate-pulse" />
            <span className="text-sm font-medium text-purple-200 group-hover:text-white transition-colors">
              Next-Gen Web Experience
            </span>
            <ChevronRight className="w-4 h-4 text-purple-300 group-hover:translate-x-1 transition-transform" />
          </div>

          {/* Main Title */}
          <h1 className="text-6xl md:text-8xl font-bold mb-6 leading-tight">
            <span className="inline-block bg-gradient-to-r from-white via-purple-200 to-blue-200 bg-clip-text text-transparent animate-gradient-x">
              Super
            </span>
            <br />
            <span className="inline-block bg-gradient-to-r from-purple-400 via-pink-400 to-purple-600 bg-clip-text text-transparent hover:scale-110 transition-transform duration-500 cursor-default">
              Wow
            </span>
          </h1>

          {/* Description */}
          <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed opacity-0 animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
            Experience the future of web design with{' '}
            <span className="text-purple-300 font-semibold hover:text-purple-200 transition-colors cursor-default">
              stunning visuals
            </span>
            {' '}and{' '}
            <span className="text-blue-300 font-semibold hover:text-blue-200 transition-colors cursor-default">
              seamless interactions
            </span>
          </p>

          {/* CTA Button */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 opacity-0 animate-fade-in-up" style={{ animationDelay: '1s' }}>
            <button 
              className="group relative px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full font-semibold text-white shadow-2xl hover:shadow-purple-500/25 transition-all duration-300 hover:scale-105 active:scale-95 overflow-hidden"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative flex items-center gap-2">
                <Layers className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
                <span className="text-lg">Explore Now</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-300" />
              </div>
              
              {/* Button shine effect */}
              <div className="absolute inset-0 -top-2 -bottom-2 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
            </button>

            {/* Secondary Button */}
            <button className="group px-6 py-3 border-2 border-white/30 rounded-full font-medium text-white hover:bg-white/10 hover:border-white/50 transition-all duration-300 hover:scale-105 backdrop-blur-sm">
              <div className="flex items-center gap-2">
                <span>Learn More</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </button>
          </div>

          {/* Stats or Features */}
          <div className="flex flex-wrap justify-center gap-8 mt-16 opacity-0 animate-fade-in-up" style={{ animationDelay: '1.5s' }}>
            {[
              { icon: Zap, label: 'Lightning Fast', value: '99.9%' },
              { icon: Globe, label: 'Global Reach', value: '150+' },
              { icon: Star, label: 'User Rating', value: '5.0' }
            ].map((stat, index) => (
              <div 
                key={index}
                className="group px-6 py-4 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300 hover:scale-105 cursor-default"
              >
                <div className="flex items-center gap-3">
                  <stat.icon className="w-6 h-6 text-purple-400 group-hover:text-purple-300 group-hover:rotate-12 transition-all duration-300" />
                  <div>
                    <div className="text-2xl font-bold text-white">{stat.value}</div>
                    <div className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors">{stat.label}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Custom Styles */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
        
        @keyframes gradient-x {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-gradient-x {
          background-size: 200% 200%;
          animation: gradient-x 3s ease infinite;
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default HeroSection;