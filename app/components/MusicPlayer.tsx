"use client"

import { useState, useRef, useEffect } from "react"
import { motion } from "framer-motion"
import { Volume2, VolumeX } from "lucide-react"

export default function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(true)
  const audioRef = useRef<HTMLAudioElement>(null)

  useEffect(() => {
    if (isPlaying && audioRef.current) {
      audioRef.current.play()
    }
  }, [isPlaying])

  const toggleMusic = () => {
    setIsPlaying((prev) => {
      const next = !prev
      if (audioRef.current) {
        if (next) {
          audioRef.current.play()
        } else {
          audioRef.current.pause()
        }
      }
      return next
    })
  }

  return (
    <>
      <audio ref={audioRef} src="/bg.mp3" loop />
      <motion.button
        className="fixed bottom-6 left-6 w-12 h-12 bg-black/50 backdrop-blur-md rounded-full flex items-center justify-center text-white/70 hover:text-white border border-white/20 hover:border-white/40 transition-all duration-300 z-40"
        onClick={toggleMusic}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        data-interactive
      >
        {isPlaying ? <Volume2 size={20} /> : <VolumeX size={20} />}
      </motion.button>
    </>
  )
}
