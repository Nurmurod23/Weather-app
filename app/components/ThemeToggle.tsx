'use client'

import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { FaSun, FaMoon } from 'react-icons/fa'

export default function ThemeToggle() {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <motion.button
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className="fixed bottom-4 right-4 p-2 rounded-full bg-blue-500 dark:bg-blue-700 text-white shadow-lg"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
    >
      {theme === 'dark' ? <FaSun className="w-6 h-6" /> : <FaMoon className="w-6 h-6" />}
    </motion.button>
  )
}