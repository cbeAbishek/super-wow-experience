"use client"

import { motion } from "framer-motion"
import { Calendar, Facebook, Twitter, Instagram, Linkedin } from "lucide-react"

export default function Footer() {
  const footerSections = [
    {
      title: "Products",
      links: ["Web Design", "Mobile Apps", "E-commerce", "Analytics"],
    },
    {
      title: "Solutions",
      links: ["Enterprise", "Startups", "Agencies", "Freelancers"],
    },
    {
      title: "Resources",
      links: ["Documentation", "Tutorials", "Blog", "Community"],
    },
    {
      title: "Services",
      links: ["Consulting", "Development", "Design", "Support"],
    },
  ]

  const socialLinks = [
    { icon: <Facebook size={20} />, href: "#" },
    { icon: <Twitter size={20} />, href: "#" },
    { icon: <Instagram size={20} />, href: "#" },
    { icon: <Linkedin size={20} />, href: "#" },
  ]

  return (
    <footer className="bg-black/80 backdrop-blur-md border-t border-white/10">
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-5 gap-8">
          <div className="md:col-span-1">
            <motion.div
              className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              SuperWow
            </motion.div>
            <p className="text-white/70 mb-6">
              Creating extraordinary digital experiences that push the boundaries of what's possible.
            </p>

            <motion.button
              className="bg-gradient-to-r from-cyan-500 to-purple-500 text-white px-6 py-3 rounded-full font-semibold hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300 flex items-center gap-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              data-interactive
            >
              <Calendar size={18} />
              Book a Meeting
            </motion.button>
          </div>

          {footerSections.map((section, index) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <h3 className="text-white font-semibold mb-4">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link}>
                    <a href="#" className="text-white/70 hover:text-white transition-colors">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        <div className="border-t border-white/10 mt-12 pt-8 flex flex-col md:flex-row items-center justify-between">
          <p className="text-white/70 mb-4 md:mb-0">© 2024 SuperWow. All rights reserved.</p>

          <div className="flex gap-4">
            {socialLinks.map((social, index) => (
              <motion.a
                key={index}
                href={social.href}
                className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center text-white/70 hover:text-white hover:bg-white/20 transition-all duration-300"
                whileHover={{ scale: 1.1, y: -2 }}
                data-interactive
              >
                {social.icon}
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
