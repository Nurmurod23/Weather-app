'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { FaSearch, FaTimes } from 'react-icons/fa'

export default function SearchBar() {
  const [input, setInput] = useState('')
  const [isValid, setIsValid] = useState(false)
  const [isTouched, setIsTouched] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const router = useRouter()
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    validateInput(input)
  }, [input])

  const validateInput = (value: string) => {
    const trimmedValue = value.trim()
    if (trimmedValue.length === 0) {
      setIsValid(false)
      setErrorMessage('Please enter a city name')
    } else if (trimmedValue.length < 2) {
      setIsValid(false)
      setErrorMessage('City name must be at least 2 characters long')
    } else if (!/^[a-zA-Z\s-]+$/.test(trimmedValue)) {
      setIsValid(false)
      setErrorMessage('City name can only contain letters, spaces, and hyphens')
    } else {
      setIsValid(true)
      setErrorMessage('')
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (isValid && !isSubmitting) {
      setIsSubmitting(true)
      try {
        await new Promise(resolve => setTimeout(resolve, 100))
        router.push(`/weather/${encodeURIComponent(input.trim())}`)
        setInput('')
        setIsTouched(false)
      } catch (error) {
        setErrorMessage('Failed to search for the city. Please try again.')
      } finally {
        setIsSubmitting(false)
      }
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value)
    if (!isTouched) setIsTouched(true)
  }

  const handleClearInput = () => {
    setInput('')
    setIsTouched(false)
    setErrorMessage('')
    inputRef.current?.focus()
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md mx-auto">
      <div className="relative">
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-blue-300/30 via-blue-400/20 to-blue-500/30 dark:from-blue-400/30 dark:via-blue-500/20 dark:to-blue-600/30 rounded-full blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        />
        <motion.input
          ref={inputRef}
          type="text"
          value={input}
          onChange={handleInputChange}
          onBlur={() => setIsTouched(true)}
          placeholder="Enter city name"
          className={`w-full px-4 py-2 rounded-full bg-blue-200/50 dark:bg-blue-800/50 border-2 ${
            isTouched ? (isValid ? 'border-blue-500 dark:border-blue-400' : 'border-red-400') : 'border-blue-300 dark:border-blue-700'
          } focus:outline-none focus:border-blue-600 dark:focus:border-blue-500 text-blue-800 dark:text-blue-100 placeholder-blue-500 dark:placeholder-blue-300 pr-20 text-sm relative z-10`}
          whileFocus={{ scale: 1.02 }}
          transition={{ type: 'spring', stiffness: 300, damping: 10 }}
        />
        <AnimatePresence>
          {input && (
            <motion.button
              type="button"
              onClick={handleClearInput}
              className="absolute right-12 top-1/2 transform -translate-y-1/2 text-blue-500 dark:text-blue-300 hover:text-blue-700 dark:hover:text-blue-100 transition-colors z-20"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <FaTimes className="w-3 h-3" />
            </motion.button>
          )}
        </AnimatePresence>
        <motion.button
          type="submit"
          disabled={!isValid || isSubmitting}
          className={`absolute right-0 top-0 bottom-0 px-3 rounded-r-full transition-colors ${
            isValid && !isSubmitting ? 'bg-blue-500 dark:bg-blue-600 hover:bg-blue-600 dark:hover:bg-blue-500' : 'bg-blue-400 dark:bg-blue-700 cursor-not-allowed'
          } text-white z-20`}
          whileHover={isValid && !isSubmitting ? { scale: 1.05 } : {}}
          whileTap={isValid && !isSubmitting ? { scale: 0.95 } : {}}
        >
          <FaSearch className="w-4 h-4" />
        </motion.button>
      </div>
      <AnimatePresence>
        {isTouched && errorMessage && (
          <motion.p
            className="text-red-500 dark:text-red-400 mt-2 text-xs"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            {errorMessage}
          </motion.p>
        )}
      </AnimatePresence>
    </form>
  )
}