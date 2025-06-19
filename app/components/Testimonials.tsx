"use client"
import { motion, AnimatePresence } from "framer-motion"
import { useState, useEffect } from "react"
import { Star, Quote, ChevronLeft, ChevronRight, Play, Pause } from "lucide-react"

export default function TrendyTestimonials() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlay, setIsAutoPlay] = useState(true)
  const [direction, setDirection] = useState(0)

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "CEO, TechCorp",
      company: "TechCorp",
      content: "The most incredible web experience I've ever seen. The attention to detail and innovative approach completely transformed our business.",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b332?w=150&h=150&fit=crop&crop=face",
      rating: 5,
      bgGradient: "from-rose-400 to-pink-600"
    },
    {
      name: "Michael Chen",
      role: "Creative Director",
      company: "Design Studio",
      content: "Revolutionary design and flawless execution. This sets a new standard for what's possible in web development.",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      rating: 5,
      bgGradient: "from-blue-400 to-purple-600"
    },
    {
      name: "Emily Rodriguez",
      role: "CTO",
      company: "Innovation Labs",
      content: "The technical implementation is outstanding. Pure genius! The performance and user experience are unmatched.",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      rating: 5,
      bgGradient: "from-emerald-400 to-teal-600"
    },
    {
      name: "David Kim",
      role: "Product Manager",
      company: "Future Tech",
      content: "Absolutely phenomenal work. The team's creativity and technical expertise delivered beyond our wildest expectations.",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      rating: 5,
      bgGradient: "from-orange-400 to-red-600"
    },
    {
      name: "Lisa Wang",
      role: "Head of UX",
      company: "Digital Agency",
      content: "The user experience is flawless. Every interaction feels magical and purposeful. This is the future of web design.",
      avatar: "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=150&h=150&fit=crop&crop=face",
      rating: 5,
      bgGradient: "from-violet-400 to-indigo-600"
    }
  ]

  useEffect(() => {
    if (!isAutoPlay) return
    
    const interval = setInterval(() => {
      setDirection(1)
      setCurrentIndex((prev) => (prev + 1) % testimonials.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [isAutoPlay, testimonials.length])

  interface Testimonial {
    name: string
    role: string
    company: string
    content: string
    avatar: string
    rating: number
    bgGradient: string
  }

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.8,
      rotateY: direction > 0 ? 45 : -45,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1,
      rotateY: 0,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.8,
      rotateY: direction < 0 ? 45 : -45,
    }),
  }

  interface NavigateFn {
    (newDirection: number): void
  }

  const navigate: NavigateFn = (newDirection) => {
    setDirection(newDirection)
    if (newDirection === 1) {
      setCurrentIndex((prev: number) => (prev + 1) % testimonials.length)
    } else {
      setCurrentIndex((prev: number) => (prev - 1 + testimonials.length) % testimonials.length)
    }
  }

  const floatingElements = Array.from({ length: 6 }, (_, i) => (
    <motion.div
      key={i}
      className="absolute w-2 h-2 bg-white/20 rounded-full"
      style={{
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
      }}
      animate={{
        y: [0, -20, 0],
        opacity: [0.3, 1, 0.3],
        scale: [1, 1.5, 1],
      }}
      transition={{
        duration: 3 + Math.random() * 2,
        repeat: Infinity,
        delay: Math.random() * 2,
      }}
    />
  ))

  return (
    <section className="relative min-h-screen py-20 overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(120,119,198,0.3),transparent_50%)]" />
        <motion.div
          className="absolute inset-0 opacity-30"
          animate={{
            background: [
              "radial-gradient(circle at 20% 50%, rgba(120,119,198,0.3) 0%, transparent 50%)",
              "radial-gradient(circle at 80% 50%, rgba(236,72,153,0.3) 0%, transparent 50%)",
              "radial-gradient(circle at 40% 40%, rgba(59,130,246,0.3) 0%, transparent 50%)",
            ],
          }}
          transition={{ duration: 10, repeat: Infinity }}
        />
        {floatingElements}
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 mb-6"
            whileHover={{ scale: 1.05 }}
          >
            <Star className="text-yellow-400 fill-current" size={16} />
            <span className="text-white/80 text-sm font-medium">Client Testimonials</span>
          </motion.div>
          
          <h2 className="text-6xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-purple-200 to-pink-200 mb-4">
            Love Stories
          </h2>
          <p className="text-xl text-white/60 max-w-2xl mx-auto">
            Discover what our clients say about their transformative experiences
          </p>
        </motion.div>

        {/* Main Testimonial Card */}
        <div className="max-w-6xl mx-auto relative">
          <div className="relative h-[600px] perspective-1000">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 300, damping: 30 },
                  opacity: { duration: 0.2 },
                  scale: { duration: 0.4 },
                  rotateY: { duration: 0.4 },
                }}
                className="absolute inset-0"
              >
                <div className="h-full w-full">
                  {/* Glassmorphism Card */}
                  <motion.div
                    className="relative h-full bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 overflow-hidden"
                    whileHover={{ scale: 1.02, y: -10 }}
                    transition={{ duration: 0.3 }}
                  >
                    {/* Dynamic Background Gradient */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${testimonials[currentIndex].bgGradient} opacity-10`} />
                    
                    {/* Content */}
                    <div className="relative z-10 p-12 h-full flex flex-col justify-center">
                      <div className="text-center">
                        {/* Quote Icon */}
                        <motion.div
                          className="inline-flex items-center justify-center w-20 h-20 bg-white/10 backdrop-blur-sm rounded-full mb-8"
                          whileHover={{ rotate: 180, scale: 1.1 }}
                          transition={{ duration: 0.5 }}
                        >
                          <Quote className="text-white/60" size={32} />
                        </motion.div>

                        {/* Rating */}
                        <motion.div
                          className="flex justify-center mb-6"
                          initial={{ opacity: 0, scale: 0 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.3, duration: 0.5 }}
                        >
                          {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                            <motion.div
                              key={i}
                              initial={{ opacity: 0, scale: 0, rotate: 0 }}
                              animate={{ opacity: 1, scale: 1, rotate: 360 }}
                              transition={{ delay: 0.1 * i, duration: 0.5 }}
                            >
                              <Star className="text-yellow-400 fill-current mx-1" size={24} />
                            </motion.div>
                          ))}
                        </motion.div>

                        {/* Testimonial Text */}
                        <motion.blockquote
                          className="text-2xl md:text-3xl lg:text-4xl text-white/90 mb-8 font-light leading-relaxed"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.4, duration: 0.6 }}
                        >
                          "{testimonials[currentIndex].content}"
                        </motion.blockquote>

                        {/* Avatar and Info */}
                        <motion.div
                          className="flex items-center justify-center gap-6"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.6, duration: 0.6 }}
                        >
                          <motion.div
                            className="relative"
                            whileHover={{ scale: 1.1 }}
                          >
                            <div className="w-16 h-16 rounded-full overflow-hidden border-4 border-white/20">
                              <img
                                src={testimonials[currentIndex].avatar}
                                alt={testimonials[currentIndex].name}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-400 rounded-full border-2 border-white/20" />
                          </motion.div>
                          
                          <div className="text-left">
                            <div className="font-semibold text-xl text-white">
                              {testimonials[currentIndex].name}
                            </div>
                            <div className="text-white/60">
                              {testimonials[currentIndex].role}
                            </div>
                            <div className="text-white/40 text-sm">
                              {testimonials[currentIndex].company}
                            </div>
                          </div>
                        </motion.div>
                      </div>
                    </div>

                    {/* Decorative Elements */}
                    <div className="absolute top-4 right-4">
                      <motion.div
                        className="w-8 h-8 bg-white/10 rounded-full"
                        animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center justify-between mt-12">
            {/* Previous Button */}
            <motion.button
              onClick={() => navigate(-1)}
              className="flex items-center justify-center w-14 h-14 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 text-white hover:bg-white/20 transition-all duration-300"
              whileHover={{ scale: 1.1, x: -5 }}
              whileTap={{ scale: 0.95 }}
            >
              <ChevronLeft size={24} />
            </motion.button>

            {/* Indicators */}
            <div className="flex items-center gap-4">
              {/* Dot Indicators */}
              <div className="flex gap-2">
                {testimonials.map((_, index) => (
                  <motion.button
                    key={index}
                    onClick={() => {
                      setDirection(index > currentIndex ? 1 : -1)
                      setCurrentIndex(index)
                    }}
                    className={`relative overflow-hidden rounded-full transition-all duration-300 ${
                      index === currentIndex ? "w-12 h-3" : "w-3 h-3"
                    }`}
                    whileHover={{ scale: 1.2 }}
                  >
                    <div className={`w-full h-full transition-all duration-300 ${
                      index === currentIndex 
                        ? "bg-white" 
                        : "bg-white/30 hover:bg-white/50"
                    }`} />
                    {index === currentIndex && (
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-400"
                        layoutId="activeIndicator"
                        transition={{ duration: 0.3 }}
                      />
                    )}
                  </motion.button>
                ))}
              </div>

              {/* Play/Pause Button */}
              <motion.button
                onClick={() => setIsAutoPlay(!isAutoPlay)}
                className="flex items-center justify-center w-10 h-10 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 text-white hover:bg-white/20 transition-all duration-300 ml-4"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                {isAutoPlay ? <Pause size={16} /> : <Play size={16} />}
              </motion.button>
            </div>

            {/* Next Button */}
            <motion.button
              onClick={() => navigate(1)}
              className="flex items-center justify-center w-14 h-14 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 text-white hover:bg-white/20 transition-all duration-300"
              whileHover={{ scale: 1.1, x: 5 }}
              whileTap={{ scale: 0.95 }}
            >
              <ChevronRight size={24} />
            </motion.button>
          </div>

          {/* Progress Bar */}
          <div className="mt-8">
            <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-purple-400 to-pink-400"
                initial={{ width: "0%" }}
                animate={{ width: `${((currentIndex + 1) / testimonials.length) * 100}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <motion.div
          className="mt-20 text-center"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto">
            {[
              { number: "500+", label: "Happy Clients" },
              { number: "98%", label: "Satisfaction Rate" },
              { number: "24/7", label: "Support" },
            ].map((stat, index) => (
              <motion.div
                key={index}
                className="text-center"
                whileHover={{ scale: 1.05 }}
              >
                <div className="text-3xl font-bold text-white mb-2">{stat.number}</div>
                <div className="text-white/60 text-sm">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}