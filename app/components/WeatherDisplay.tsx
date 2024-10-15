"use client"

import { motion } from 'framer-motion'
import { FaThermometerHalf, FaWind, FaTint, FaCompress } from 'react-icons/fa'
import { WeatherData } from '../types/weather'

export default function WeatherDisplay({ weather }: { weather: WeatherData }) {
  return (
    <div className="bg-blue-200 dark:bg-blue-800/30 backdrop-blur-lg rounded-3xl shadow-2xl p-4 w-full relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-300/10 via-blue-400/5 to-blue-500/10 dark:from-blue-400/10 dark:via-blue-500/5 dark:to-blue-600/10 z-0"></div>
      <div className="absolute inset-0 border border-blue-300/20 dark:border-blue-400/20 rounded-3xl z-10"></div>
      <div className="absolute inset-0 border-4 border-blue-200/10 dark:border-blue-300/10 rounded-3xl blur-sm z-20"></div>
      <div className="relative z-30">
        <motion.h2
          className="text-2xl sm:text-3xl font-bold text-center text-blue-800 dark:text-blue-100 mb-4"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {weather.name}, {weather.sys.country}
        </motion.h2>
        <div className="flex flex-col sm:flex-row items-center justify-center mb-4 overflow-hidden">
          <motion.div
            className="relative mb-4 sm:mb-0"
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: 'spring', stiffness: 260, damping: 20 }}
          >
            <img
              src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
              alt={weather.weather[0].description}
              className="w-24 h-24 sm:w-32 sm:h-32 object-cover z-10 relative"
            />
            <div className="absolute inset-0 bg-blue-300/20 dark:bg-blue-400/20 rounded-full blur-xl" />
          </motion.div>
          <motion.p
            className="text-4xl sm:text-5xl font-extrabold sm:ml-4 text-blue-800 dark:text-blue-100"
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            {Math.round(weather.main.temp)}°C
          </motion.p>
        </div>
        <motion.p
          className="text-lg sm:text-xl text-center capitalize text-blue-700 dark:text-blue-200 mb-4"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          {weather.weather[0].description}
        </motion.p>
        <div className="grid grid-cols-2 gap-3 overflow-hidden">
          <WeatherInfo icon={<FaThermometerHalf className="text-blue-600 dark:text-blue-300" />} label="Feels Like" value={`${Math.round(weather.main.feels_like)}°C`} delay={0.5} />
          <WeatherInfo icon={<FaTint className="text-blue-600 dark:text-blue-300" />} label="Humidity" value={`${weather.main.humidity}%`} delay={0.6} />
          <WeatherInfo icon={<FaWind className="text-blue-600 dark:text-blue-300" />} label="Wind Speed" value={`${weather.wind.speed} m/s`} delay={0.7} />
          <WeatherInfo icon={<FaCompress className="text-blue-600 dark:text-blue-300" />} label="Pressure" value={`${weather.main.pressure} hPa`} delay={0.8} />
        </div>
      </div>
    </div>
  )
}

function WeatherInfo({ icon, label, value, delay }: { icon: React.ReactNode, label: string, value: string, delay: number }) {
  return (
    <motion.div
      className="bg-blue-300/30 dark:bg-blue-700/30 backdrop-blur-md p-3 rounded-xl flex items-center shadow-lg relative overflow-hidden"
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-blue-400/10 via-blue-300/5 to-blue-200/10 dark:from-blue-500/10 dark:via-blue-400/5 dark:to-blue-300/10"></div>
      <div className="absolute inset-0 border border-blue-300/20 dark:border-blue-400/20 rounded-xl"></div>
      <div className="relative z-10 flex items-center">
        <div className="mr-3 text-2xl">{icon}</div>
        <div>
          <p className="text-xs text-blue-600 dark:text-blue-300">{label}</p>
          <p className="font-semibold text-sm text-blue-800 dark:text-blue-100">{value}</p>
        </div>
      </div>
    </motion.div>
  )
}