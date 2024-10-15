import { WeatherData, ForecastData } from '../types/weather'

const API_KEY = '88d01a976b9aaf3978abcd1e92e8c854'
const BASE_URL = 'https://api.openweathermap.org/data/2.5'

export async function getWeather(city: string = 'London'): Promise<{
  current: WeatherData | null,
  hourly: ForecastData | null,
  daily: ForecastData | null
}> {
  try {
    const [currentRes, forecastRes] = await Promise.all([
      fetch(`${BASE_URL}/weather?q=${city}&units=metric&appid=${API_KEY}`),
      fetch(`${BASE_URL}/forecast?q=${city}&units=metric&appid=${API_KEY}`)
    ])
    
    if (!currentRes.ok || !forecastRes.ok) {
      throw new Error('Failed to fetch weather data')
    }

    const current: WeatherData = await currentRes.json()
    const forecast: ForecastData = await forecastRes.json()

    const hourly = {
      list: forecast.list.slice(0, 24)
    }

    const daily = {
      list: forecast.list.filter((item, index) => index % 8 === 0).slice(0, 5)
    }

    return { current, hourly, daily }
  } catch (error) {
    console.error('Error fetching weather data:', error)
    return { current: null, hourly: null, daily: null }
  }
}