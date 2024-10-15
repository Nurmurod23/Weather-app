"use client"

import { motion } from 'framer-motion'

export default function LoadingSpinner() {
  return (
    <div className="flex justify-center items-center h-64">
      <motion.div
        className="h-16 w-16 border-t-4 border-b-4 border-blue-500 rounded-full"
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      />
    </div>
  )
}