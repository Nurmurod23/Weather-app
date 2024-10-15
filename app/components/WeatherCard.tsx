"use client"

import { motion } from 'framer-motion'
import { WeatherData } from '../types/weather'
import { FaThermometerHalf, FaTint, FaWind, FaCompress, FaEye, FaCloud } from 'react-icons/fa'

type WeatherCardProps = {
  title: string
  weather: WeatherData
  type: 'temperature' | 'humidity' | 'wind' | 'pressure' | 'visibility' | 'clouds'
  className?: string
}

export default function WeatherCard({ title, weather, type, className = "" }: WeatherCardProps) {
  const getIcon = () => {
    const iconClasses = "text-3xl text-blue-600 dark:text-blue-300"
    switch (type) {
      case 'temperature': return <FaThermometerHalf className={iconClasses} />
      case 'humidity': return <FaTint className={iconClasses} />
      case 'wind': return <FaWind className={iconClasses} />
      case 'pressure': return <FaCompress className={iconClasses} />
      case 'visibility': return <FaEye className={iconClasses} />
      case 'clouds': return <FaCloud className={iconClasses} />
    }
  }

  const getValue = () => {
    switch (type) {
      case 'temperature': return `${Math.round(weather.main.temp)}°C`
      case 'humidity': return `${weather.main.humidity}%`
      case 'wind': return `${weather.wind.speed} m/s`
      case 'pressure': return `${weather.main.pressure} hPa`
      case 'visibility': return `${weather.visibility / 1000} km`
      case 'clouds': return `${weather.clouds.all}%`
    }
  }

  return (
    <motion.div
      className={`relative overflow-hidden rounded-3xl shadow-2xl ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-blue-200 to-blue-300 dark:from-blue-800 dark:to-blue-900"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      />
      <motion.div
        className="absolute inset-0 bg-blue-300/20 dark:bg-blue-700/20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      />
      <div className="absolute inset-0 border border-blue-300/20 dark:border-blue-400/20 rounded-3xl"></div>
      <div className="absolute inset-0 border-2 border-blue-200/10 dark:border-blue-300/10 rounded-3xl blur-sm"></div>
      <div className="relative p-4 z-10">
        <motion.h3
          className="text-lg font-bold mb-2 text-blue-800 dark:text-blue-100"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          {title}
        </motion.h3>
        <div className="flex items-center justify-between">
          <motion.div
            className="bg-blue-300/50 dark:bg-blue-700/50 backdrop-blur-md rounded-full p-3 relative overflow-hidden"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-blue-400/20 via-blue-300/10  to-blue-200/20 dark:from-blue-500/20 dark:via-blue-400/10 dark:to-blue-300/20"></div>
            <div className="relative z-10">
              {getIcon()}
            </div>
          </motion.div>
          <motion.p
            className="text-2xl font-bold text-blue-800 dark:text-blue-100"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            {getValue()}
          </motion.p>
        </div>
      </div>
    </motion.div>
  )
}