import WeatherDashboard from './components/WeatherDashboard'

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-900 to-blue-950 text-blue-100">
      <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-10 py-8 sm:py-12 md:py-16 lg:py-20">
        <div className="text-center mb-8 sm:mb-12 md:mb-16">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold mb-4 sm:mb-6 md:mb-8 bg-clip-text text-transparent bg-gradient-to-r from-blue-300 to-blue-100">
            Weather Insights
          </h1>
          <p className="text-blue-300 text-base sm:text-lg md:text-xl lg:text-2xl max-w-4xl mx-auto">
            Your personalized weather dashboard with up-to-date information, tailored to your location or preferred cities.
          </p>
        </div>
        <div className="w-full">
          <WeatherDashboard />
        </div>
      </div>
    </main>
  )
}