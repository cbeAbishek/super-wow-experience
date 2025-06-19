"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { ExternalLink, Github } from "lucide-react"

export default function Projects() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  const projects = [
    {
      title: "Neural Interface",
      description: "AI-powered user interface with machine learning capabilities",
      image: "/placeholder.svg?height=300&width=400",
      tags: ["AI", "React", "Python"],
    },
    {
      title: "Quantum Dashboard",
      description: "Real-time data visualization with quantum computing integration",
      image: "/placeholder.svg?height=300&width=400",
      tags: ["Quantum", "D3.js", "WebGL"],
    },
    {
      title: "Holographic Display",
      description: "3D holographic interface using advanced WebXR technologies",
      image: "/placeholder.svg?height=300&width=400",
      tags: ["WebXR", "Three.js", "AR/VR"],
    },
  ]

  return (
    <section id="projects" className="py-20 bg-gradient-to-br from-indigo-900 to-purple-900" ref={ref}>
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-5xl font-bold mb-6 text-white">Our Projects</h2>
          <p className="text-xl text-white/80 max-w-3xl mx-auto">
            Showcasing our latest innovations and breakthrough technologies
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              className="group relative overflow-hidden rounded-2xl bg-black/30 backdrop-blur-sm border border-white/10"
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              whileHover={{ y: -10 }}
            >
              <div className="aspect-video overflow-hidden">
                <img
                  src={project.image || "/placeholder.svg"}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>

              <div className="p-6">
                <h3 className="text-2xl font-bold text-white mb-3">{project.title}</h3>
                <p className="text-white/70 mb-4">{project.description}</p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 text-cyan-300 text-sm rounded-full border border-cyan-500/30"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex gap-4">
                  <button
                    className="flex items-center gap-2 text-white/80 hover:text-white transition-colors"
                    data-interactive
                  >
                    <ExternalLink size={16} />
                    Live Demo
                  </button>
                  <button
                    className="flex items-center gap-2 text-white/80 hover:text-white transition-colors"
                    data-interactive
                  >
                    <Github size={16} />
                    Code
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
