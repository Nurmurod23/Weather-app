import { Suspense } from 'react'
import WeatherDashboard from '../../components/WeatherDashboard'
import LoadingSpinner from '../../components/LoadingSpinner'

export default function CityWeatherPage({ params }: { params: { city: string } }) {
  return (
    <main className="min-h-screen flex items-center justify-center p-4">
      <Suspense fallback={<LoadingSpinner />}>
        <WeatherDashboard city={params.city} />
      </Suspense>
    </main>
  )
}
