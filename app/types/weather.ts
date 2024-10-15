export interface WeatherData {
  name: string
  main: {
    temp: number
    feels_like: number
    humidity: number
    pressure: number
  }
  weather: Array<{
    description: string
    icon: string
  }>
  wind: {
    speed: number
  }
  sys: {
    country: string
  }
  visibility: number
  clouds: {
    all: number
  }
}

export interface ForecastData {
  list: Array<{
    dt: number
    main: {
      temp: number
      feels_like: number
      humidity: number
      pressure: number
    }
    weather: Array<{
      description: string
      icon: string
    }>
    wind: {
      speed: number
    }
    clouds: {
      all: number
    }
    visibility: number
  }>
}