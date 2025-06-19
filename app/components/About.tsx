"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Zap, Target, Users } from "lucide-react";
import { useTheme } from "./ThemeProvider";

export default function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const { theme } = useTheme();

  const features = [
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Lightning Fast",
      description: "Optimized for speed and performance",
    },
    {
      icon: <Target className="w-8 h-8" />,
      title: "Precision Design",
      description: "Every pixel crafted with purpose",
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "User Focused",
      description: "Built with user experience in mind",
    },
  ];

  // Get background color based on theme
  let sectionBg = "bg-black/50";
  let gradientText =
    "bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent";
  let cardGradient = "from-purple-900/20 to-blue-900/20";
  let iconGradient = "from-cyan-500 to-purple-500";

  if (theme === "light") {
    sectionBg = "bg-slate-100";
    gradientText =
      "bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent";
    cardGradient = "from-slate-200 to-slate-100";
    iconGradient = "from-blue-500 to-indigo-500";
  } else if (theme === "forest") {
    gradientText =
      "bg-gradient-to-r from-green-400 to-lime-500 bg-clip-text text-transparent";
    cardGradient = "from-green-900/20 to-lime-900/20";
    iconGradient = "from-green-500 to-lime-500";
  } else if (theme === "sunset") {
    gradientText =
      "bg-gradient-to-r from-orange-400 to-amber-500 bg-clip-text text-transparent";
    cardGradient = "from-orange-900/20 to-amber-900/20";
    iconGradient = "from-orange-500 to-amber-500";
  } else if (theme === "lavender") {
    gradientText =
      "bg-gradient-to-r from-purple-400 to-violet-500 bg-clip-text text-transparent";
    cardGradient = "from-purple-900/20 to-violet-900/20";
    iconGradient = "from-purple-500 to-violet-500";
  } else if (theme === "rose") {
    gradientText =
      "bg-gradient-to-r from-pink-400 to-rose-500 bg-clip-text text-transparent";
    cardGradient = "from-pink-900/20 to-rose-900/20";
    iconGradient = "from-pink-500 to-rose-500";
  } else if (theme === "sky") {
    gradientText =
      "bg-gradient-to-r from-sky-400 to-cyan-500 bg-clip-text text-transparent";
    cardGradient = "from-sky-900/20 to-cyan-900/20";
    iconGradient = "from-sky-500 to-cyan-500";
  } else if (theme === "cyberpunk") {
    gradientText =
      "bg-gradient-to-r from-slate-400 to-rose-500 bg-clip-text text-transparent";
    cardGradient = "from-slate-900/40 to-rose-900/20";
    iconGradient = "from-slate-500 to-rose-500";
  }

  return (
    <section id="about" className={`py-20 ${sectionBg}`} ref={ref}>
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className={`text-5xl font-bold mb-6 ${gradientText}`}>
            About Us
          </h2>
          <p className="text-xl text-white/80 max-w-3xl mx-auto">
            We create extraordinary digital experiences that push the boundaries
            of what's possible on the web.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              className={`text-center p-8 rounded-2xl bg-gradient-to-br ${cardGradient} backdrop-blur-sm border border-white/10`}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              whileHover={{ scale: 1.05, y: -10 }}
            >
              <div
                className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r ${iconGradient} rounded-full mb-6`}
              >
                {feature.icon}
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">
                {feature.title}
              </h3>
              <p className="text-white/70">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
