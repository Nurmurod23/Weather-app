import { Suspense } from 'react'
import SearchBar from './SearchBar'
import WeatherDisplay from './WeatherDisplay'
import ForecastDisplay from './ForecastDispaly'
import WeatherCard from './WeatherCard'
import LoadingSpinner from './LoadingSpinner'
import { getWeather } from '../lib/getWeather'

export default async function WeatherDashboard({ city }: { city?: string }) {
  const { current: weather, hourly, daily } = await getWeather(city)

  return (
    <div className="h-full flex flex-col space-y-4 p-4">
      <SearchBar />
      <Suspense fallback={<LoadingSpinner />}>
        {weather && hourly && daily ? (
          <div className="flex-1 overflow-auto space-y-4 pr-2">
            <WeatherDisplay weather={weather} />
            <ForecastDisplay hourly={hourly} daily={daily} />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <WeatherCard title="Temperature" weather={weather} type="temperature" className="col-span-1 sm:col-span-2 lg:col-span-1" />
              <WeatherCard title="Humidity" weather={weather} type="humidity" />
              <WeatherCard title="Wind" weather={weather} type="wind" />
              <WeatherCard title="Pressure" weather={weather} type="pressure" />
              <WeatherCard title="Visibility" weather={weather} type="visibility" />
              <WeatherCard title="Cloudiness" weather={weather} type="clouds" />
            </div>
          </div>
        ) : (
          <p className="text-center text-blue-700 dark:text-blue-300 bg-blue-200 dark:bg-blue-800 bg-opacity-20 rounded-lg p-4 border border-blue-300 dark:border-blue-500 shadow-lg">No weather data available.</p>
        )}
      </Suspense>
    </div>
  )
}