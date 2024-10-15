'use client'

import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Line } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  TooltipItem
} from 'chart.js'
import { ForecastData } from '../types/weather'
import Image from 'next/image'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

type ForecastType = 'hourly' | 'daily'

export default function ForecastDisplay({ hourly, daily }: { hourly?: ForecastData; daily?: ForecastData }) {
  const [forecastType, setForecastType] = useState<ForecastType>('hourly')

  const forecastData = useMemo(() => {
    if (forecastType === 'hourly' && hourly?.list) {
      return hourly.list;
    } else if (forecastType === 'daily' && daily?.list) {
      return daily.list;
    }
    return [];
  }, [forecastType, hourly, daily]);

  const chartData = useMemo(() => ({
    labels: forecastData.map(item => 
      forecastType === 'hourly'
        ? new Date(item.dt * 1000).toLocaleTimeString('en-US', { hour: 'numeric', hour12: true })
        : new Date(item.dt * 1000).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })
    ),
    datasets: [{
      label: 'Temperature (°C)',
      data: forecastData.map(item => item.main.temp),
      borderColor: 'rgba(59, 130, 246, 1)',
      backgroundColor: 'rgba(59, 130, 246, 0.2)',
      fill: true,
      tension: 0.4,
    }]
  }), [forecastData, forecastType])

  const chartOptions = useMemo(() => ({
    responsive: true,
    scales: {
      y: {
        beginAtZero: false,
        ticks: {
          callback: function (tickValue: string | number) {
            return `${tickValue}°C`; 
          },
          color: 'rgba(147, 197, 253, 1)',
        },
        grid: {
          color: 'rgba(30, 58, 138, 0.2)',
        },
      },
      x: {
        ticks: {
          color: 'rgba(147, 197, 253, 1)',
        },
        grid: {
          color: 'rgba(30, 58, 138, 0.2)',
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: 'rgba(30, 58, 138, 0.8)',
        titleColor: 'rgba(191, 219, 254, 1)',
        bodyColor: 'rgba(191, 219, 254, 1)',
        borderColor: 'rgba(59, 130, 246, 0.2)',
        borderWidth: 1,
        callbacks: {
          label: (context: TooltipItem<'line'>) => `${context.parsed.y}°C`,
        },
      },
    },
  }), []);

  if (!hourly?.list && !daily?.list) {
    return (
      <div className="w-full max-w-5xl mx-auto bg-gradient-to-br from-blue-900 to-blue-800 backdrop-blur-lg border border-blue-700 rounded-3xl shadow-2xl overflow-hidden p-6 md:p-10 text-center text-blue-200">
        <p>No forecast data available.</p>
      </div>
    )
  }

  return (
    <div className="w-full max-w-5xl mx-auto bg-gradient-to-br from-blue-900 to-blue-800 backdrop-blur-lg border border-blue-700 rounded-3xl shadow-2xl overflow-hidden">
      <div className="p-6 md:p-10">
        <motion.h2
          className="text-3xl md:text-4xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-blue-100 mb-6 md:mb-8"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          Weather Forecast
        </motion.h2>

        <div className="flex justify-center mb-6">
          {(['hourly', 'daily'] as ForecastType[]).map((type) => (
            <button
              key={type}
              onClick={() => setForecastType(type)}
              disabled={type === 'hourly' ? !hourly?.list : !daily?.list}
              className={`mx-2 px-4 py-2 text-sm md:text-base rounded-full transition-all duration-300 ${
                forecastType === type
                  ? 'bg-blue-600 text-blue-100 shadow-lg'
                  : 'bg-blue-800 text-blue-300 hover:bg-blue-700'
              } ${type === 'hourly' ? !hourly?.list : !daily?.list ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </button>
          ))}
        </div>

        {forecastData.length > 0 && (
          <div className="relative max-w-4xl mx-auto">
            <Line data={chartData} options={chartOptions} />
          </div>
        )}

        <AnimatePresence>
          {forecastData.length > 0 && (
            <motion.div
              key={forecastType}
              className="mt-6 md:mt-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {forecastData.slice(0, 12).map((item, index) => (
                <motion.div
                  key={index}
                  className="bg-blue-700 bg-opacity-60 rounded-lg p-4 flex flex-col items-center shadow-lg"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <p className="text-blue-100 text-sm md:text-base">
                    {forecastType === 'hourly'
                      ? new Date(item.dt * 1000).toLocaleTimeString('en-US', { hour: 'numeric', hour12: true })
                      : new Date(item.dt * 1000).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
                  </p>
                  <Image
                    src={`http://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}
                    alt={item.weather[0].description}
                    width={64}
                    height={64}
                    className="object-cover"
                  />
                  <p className="text-blue-100 text-lg font-medium">
                    {Math.round(item.main.temp)}°C
                  </p>
                  <p className="text-blue-300 text-xs md:text-sm text-center">
                    {item.weather[0].description}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
