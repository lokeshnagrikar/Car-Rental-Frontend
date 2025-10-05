"use client"
import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { getAvailableCars } from "../services/carService"
import { 
  TruckIcon, 
  CalendarIcon, 
  CurrencyDollarIcon,
  StarIcon,
  HeartIcon,
  ShieldCheckIcon,
  UsersIcon,
  ArrowRightIcon
} from "@heroicons/react/24/outline"
import { StarIcon as SolidStarIcon } from "@heroicons/react/24/solid"
import TestimonialsSection from "../components/TestimonialsSection"
import { useTheme } from "../contexts/ThemeContext"

const HomePage = () => {
  const [featuredCars, setFeaturedCars] = useState([])
  const [loading, setLoading] = useState(true)
  const [favorites, setFavorites] = useState(new Set())
  const { isDarkMode } = useTheme()

  useEffect(() => {
    const fetchFeaturedCars = async () => {
      try {
        const cars = await getAvailableCars()
        // Get 6 random cars for featured section with ratings
        const randomCars = cars.sort(() => 0.5 - Math.random()).slice(0, 6).map(car => ({
          ...car,
          rating: (Math.random() * 2 + 3).toFixed(1), // Random rating between 3.0 and 5.0
          reviews: Math.floor(Math.random() * 100) + 10 // Random reviews between 10-110
        }))
        setFeaturedCars(randomCars)
        setLoading(false)
      } catch (error) {
        console.error("Error fetching featured cars:", error)
        setLoading(false)
      }
    }

    fetchFeaturedCars()
  }, [])

  const toggleFavorite = (carId) => {
    setFavorites(prev => {
      const newFavorites = new Set(prev)
      if (newFavorites.has(carId)) {
        newFavorites.delete(carId)
      } else {
        newFavorites.add(carId)
      }
      return newFavorites
    })
  }

  const features = [
    {
      name: "Wide Selection",
      description: "Choose from a variety of cars to suit your needs and budget.",
      icon: TruckIcon,
      color: "from-blue-500 to-blue-600"
    },
    {
      name: "Flexible Booking",
      description: "Easy booking process with flexible dates and durations.",
      icon: CalendarIcon,
      color: "from-green-500 to-green-600"
    },
    {
      name: "Competitive Pricing",
      description: "Get the best rates with our transparent pricing policy.",
      icon: CurrencyDollarIcon,
      color: "from-purple-500 to-purple-600"
    },
    {
      name: "24/7 Support",
      description: "Round-the-clock customer support for all your needs.",
      icon: UsersIcon,
      color: "from-orange-500 to-orange-600"
    },
    {
      name: "Full Insurance",
      description: "Comprehensive insurance coverage for peace of mind.",
      icon: ShieldCheckIcon,
      color: "from-red-500 to-red-600"
    },
    {
      name: "Premium Quality",
      description: "Well-maintained vehicles with regular quality checks.",
      icon: StarIcon,
      color: "from-indigo-500 to-indigo-600"
    }
  ]

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => {
      const starNumber = index + 1
      return (
        <SolidStarIcon
          key={index}
          className={`h-4 w-4 ${
            starNumber <= Math.floor(rating)
              ? "text-yellow-400"
              : starNumber === Math.ceil(rating) && !Number.isInteger(rating)
              ? "text-yellow-400"
              : "text-gray-300"
          }`}
        />
      )
    })
  }

  return (
    <div className={`${isDarkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900"} transition-colors duration-200`}>
      {/* Hero Section */}
      <div className="relative bg-gray-900 overflow-hidden">
        <div className="absolute inset-0">
          <img
            className="h-full w-full object-cover transform scale-105"
            src="https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
            alt="Car rental hero"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-gray-900/90 to-gray-900/70" aria-hidden="true"></div>
        </div>
        <div className="relative max-w-7xl mx-auto py-24 px-4 sm:py-32 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-6xl lg:text-7xl bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Rent Your Perfect Car
            </h1>
            <p className="mt-6 text-xl text-gray-300 max-w-2xl leading-8">
              Discover our wide selection of premium cars for any occasion. From economy to luxury, 
              find the perfect vehicle for your journey with unbeatable prices and exceptional service.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4">
              <Link
                to="/cars"
                className="inline-flex items-center justify-center px-8 py-4 border border-transparent text-lg font-semibold rounded-xl shadow-lg text-white bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-all duration-200 transform hover:-translate-y-1 hover:shadow-xl"
              >
                Browse All Cars
              </Link>
              <Link
                to="/register"
                className="inline-flex items-center justify-center px-8 py-4 border-2 border-white text-lg font-semibold rounded-xl shadow-sm text-white bg-transparent hover:bg-white hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white transition-all duration-200 transform hover:-translate-y-1"
              >
                Sign Up Now
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Search Section */}
      <div className="relative -mt-16 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`${isDarkMode ? "bg-gray-800" : "bg-white"} rounded-2xl shadow-2xl overflow-hidden border ${isDarkMode ? "border-gray-700" : "border-gray-200"} transition-all duration-300`}>
          <div className="px-8 py-8">
            <h2 className={`text-3xl font-bold ${isDarkMode ? "text-white" : "text-gray-900"} mb-8 text-center transition-colors duration-200`}>
              Find Your Perfect Rental Car
            </h2>
            <form className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div>
                <label htmlFor="pickup-location" className={`block text-sm font-semibold ${isDarkMode ? "text-gray-300" : "text-gray-700"} mb-2 transition-colors duration-200`}>
                  Pickup Location
                </label>
                <select
                  id="pickup-location"
                  name="pickup-location"
                  className={`block w-full rounded-xl ${isDarkMode ? "bg-gray-700 border-gray-600 text-white" : "bg-white border-gray-300 text-gray-900"} shadow-sm focus:border-primary-500 focus:ring-primary-500 transition-colors duration-200 py-3 px-4`}
                >
                  <option>Downtown Office</option>
                  <option>Airport Terminal</option>
                  <option>North Branch</option>
                  <option>South Branch</option>
                </select>
              </div>
              <div>
                <label htmlFor="pickup-date" className={`block text-sm font-semibold ${isDarkMode ? "text-gray-300" : "text-gray-700"} mb-2 transition-colors duration-200`}>
                  Pickup Date
                </label>
                <input
                  type="date"
                  id="pickup-date"
                  name="pickup-date"
                  className={`block w-full rounded-xl ${isDarkMode ? "bg-gray-700 border-gray-600 text-white" : "bg-white border-gray-300 text-gray-900"} shadow-sm focus:border-primary-500 focus:ring-primary-500 transition-colors duration-200 py-3 px-4`}
                />
              </div>
              <div>
                <label htmlFor="return-date" className={`block text-sm font-semibold ${isDarkMode ? "text-gray-300" : "text-gray-700"} mb-2 transition-colors duration-200`}>
                  Return Date
                </label>
                <input
                  type="date"
                  id="return-date"
                  name="return-date"
                  className={`block w-full rounded-xl ${isDarkMode ? "bg-gray-700 border-gray-600 text-white" : "bg-white border-gray-300 text-gray-900"} shadow-sm focus:border-primary-500 focus:ring-primary-500 transition-colors duration-200 py-3 px-4`}
                />
              </div>
              <div className="flex items-end">
                <button
                  type="submit"
                  className={`w-full ${isDarkMode ? "bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700" : "bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800"} border border-transparent rounded-xl shadow-lg py-3 px-6 text-base font-semibold text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-all duration-200 transform hover:-translate-y-0.5`}
                >
                  Search Cars
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      

      {/* Enhanced Featured Cars Section */}
      <div className="max-w-7xl mx-auto py-20 px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className={`text-4xl font-bold ${isDarkMode ? "text-white" : "text-gray-900"} sm:text-5xl transition-colors duration-200`}>
            Featured Cars
          </h2>
          <p className={`mt-4 text-xl ${isDarkMode ? "text-gray-300" : "text-gray-600"} max-w-3xl mx-auto transition-colors duration-200`}>
            Discover our most popular and highly-rated rental vehicles
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="text-center">
              <div className={`animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 ${isDarkMode ? "border-white" : "border-primary-600"} mx-auto mb-4 transition-colors duration-200`}></div>
              <p className={`text-lg ${isDarkMode ? "text-gray-300" : "text-gray-600"} transition-colors duration-200`}>Loading featured cars...</p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredCars.map((car) => (
              <div
                key={car.id}
                className={`group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 ${isDarkMode ? "bg-gray-800" : "bg-white"} border ${isDarkMode ? "border-gray-700" : "border-gray-200"}`}
              >
                {/* Favorite Button */}
                <button
                  onClick={() => toggleFavorite(car.id)}
                  className={`absolute top-4 right-4 z-10 p-2 rounded-full backdrop-blur-sm transition-all duration-300 ${
                    favorites.has(car.id)
                      ? "bg-red-500/90 text-white"
                      : "bg-white/90 text-gray-400 hover:bg-white hover:text-red-500"
                  }`}
                >
                  <HeartIcon className={`h-5 w-5 ${favorites.has(car.id) ? "fill-current" : ""}`} />
                </button>

                {/* Car Image */}
                <div className="relative h-56 w-full overflow-hidden">
                  {car.imageUrl ? (
                    <img
                      src={`http://localhost:8081/api/files/${car.imageUrl}`}
                      alt={`${car.make} ${car.model}`}
                      className="h-full w-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                    />
                  ) : (
                    <div className={`h-full w-full ${isDarkMode ? "bg-gray-700" : "bg-gray-200"} flex items-center justify-center transition-colors duration-200`}>
                      <TruckIcon className={`h-16 w-16 ${isDarkMode ? "text-gray-500" : "text-gray-400"} transition-colors duration-200`} />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>

                {/* Car Details */}
                <div className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className={`text-xl font-bold ${isDarkMode ? "text-white" : "text-gray-900"} transition-colors duration-200`}>
                        {car.make} {car.model}
                      </h3>
                      <p className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-500"} transition-colors duration-200`}>
                        {car.year} • {car.category}
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-primary-600">${car.pricePerDay}</div>
                      <div className="text-sm text-gray-500">per day</div>
                    </div>
                  </div>

                  {/* Rating */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-1">
                      {renderStars(car.rating)}
                      <span className={`ml-2 text-sm font-medium ${isDarkMode ? "text-gray-300" : "text-gray-700"} transition-colors duration-200`}>
                        {car.rating}
                      </span>
                      <span className={`text-sm ${isDarkMode ? "text-gray-500" : "text-gray-400"} transition-colors duration-200`}>
                        ({car.reviews} reviews)
                      </span>
                    </div>
                  </div>

                  {/* Features */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {car.transmission && (
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        isDarkMode 
                          ? "bg-gray-700 text-gray-300" 
                          : "bg-gray-100 text-gray-700"
                      } transition-colors duration-200`}>
                        {car.transmission}
                      </span>
                    )}
                    {car.fuelType && (
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        isDarkMode 
                          ? "bg-gray-700 text-gray-300" 
                          : "bg-gray-100 text-gray-700"
                      } transition-colors duration-200`}>
                        {car.fuelType}
                      </span>
                    )}
                    {car.seats && (
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        isDarkMode 
                          ? "bg-gray-700 text-gray-300" 
                          : "bg-gray-100 text-gray-700"
                      } transition-colors duration-200`}>
                        {car.seats} Seats
                      </span>
                    )}
                  </div>

                  {/* Action Button */}
                  <div className="flex space-x-3">
                    <Link
                      to={`/cars/${car.id}`}
                      className="flex-1 inline-flex items-center justify-center px-4 py-3 border border-transparent text-sm font-semibold rounded-xl text-white bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-all duration-200 transform hover:-translate-y-0.5"
                    >
                      View Details
                    </Link>
                    <button className="px-4 py-3 border border-gray-300 dark:border-gray-600 text-sm font-semibold rounded-xl text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 transition-all duration-200">
                      <HeartIcon className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="text-center mt-12">
          <Link
            to="/cars"
            className="inline-flex items-center px-8 py-4 border border-transparent text-lg font-semibold rounded-xl shadow-lg text-white bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-all duration-200 transform hover:-translate-y-1 hover:shadow-xl"
          >
            View All Cars
            <ArrowRightIcon className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </div>

      {/* Enhanced Features Section */}
      <div className={`${isDarkMode ? "bg-gray-900" : "bg-gray-50"} py-20 transition-colors duration-200`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className={`text-4xl font-bold ${isDarkMode ? "text-white" : "text-gray-900"} sm:text-5xl transition-colors duration-200`}>
              Why Choose Us
            </h2>
            <p className={`mt-4 text-xl ${isDarkMode ? "text-gray-300" : "text-gray-600"} max-w-3xl mx-auto transition-colors duration-200`}>
              Experience the difference with our premium car rental services designed for your comfort and convenience
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div 
                key={feature.name} 
                className={`group p-8 rounded-2xl ${isDarkMode ? "bg-gray-800 hover:bg-gray-750" : "bg-white hover:bg-gray-50"} border ${isDarkMode ? "border-gray-700" : "border-gray-200"} shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2`}
              >
                <div className={`inline-flex items-center justify-center p-3 rounded-xl bg-gradient-to-r ${feature.color} shadow-lg transform group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className={`mt-6 text-xl font-bold ${isDarkMode ? "text-white" : "text-gray-900"} transition-colors duration-200`}>
                  {feature.name}
                </h3>
                <p className={`mt-3 ${isDarkMode ? "text-gray-300" : "text-gray-600"} transition-colors duration-200`}>
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>


      {/* Rest of the components remain the same */}
      <TestimonialsSection />

      {/* How It Works Section */}
      <div className={`${isDarkMode ? "bg-gray-900" : "bg-white"} py-20 px-4 sm:px-6 lg:px-8 transition-colors duration-200`}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className={`text-4xl font-bold ${isDarkMode ? "text-white" : "text-gray-900"} sm:text-5xl transition-colors duration-200`}>
              How It Works
            </h2>
            <p className={`mt-4 text-xl ${isDarkMode ? "text-gray-300" : "text-gray-600"} max-w-3xl mx-auto transition-colors duration-200`}>
              Renting a car with us is quick and easy in just 3 simple steps
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { step: 1, title: "Choose Your Car", description: "Browse our extensive fleet and select the perfect vehicle for your needs." },
              { step: 2, title: "Make a Reservation", description: "Book your car online or by phone with our simple reservation system." },
              { step: 3, title: "Enjoy Your Ride", description: "Pick up your car and enjoy your journey with our 24/7 roadside assistance." }
            ].map((item) => (
              <div key={item.step} className="text-center group">
                <div className={`relative mx-auto flex items-center justify-center h-24 w-24 rounded-full ${isDarkMode ? "bg-primary-900 text-primary-300" : "bg-primary-100 text-primary-600"} text-3xl font-bold transition-all duration-300 transform group-hover:scale-110 group-hover:shadow-lg`}>
                  {item.step}
                  <div className="absolute inset-0 rounded-full border-2 border-primary-500 opacity-0 group-hover:opacity-100 animate-ping"></div>
                </div>
                <h3 className={`mt-8 text-2xl font-bold ${isDarkMode ? "text-white" : "text-gray-900"} transition-colors duration-200`}>
                  {item.title}
                </h3>
                <p className={`mt-4 text-lg ${isDarkMode ? "text-gray-300" : "text-gray-600"} transition-colors duration-200`}>
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-primary-600 to-primary-800">
        <div className="max-w-4xl mx-auto text-center py-20 px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-extrabold text-white sm:text-5xl">
            <span className="block">Ready to get started?</span>
            <span className="block mt-2 bg-gradient-to-r from-white to-primary-200 bg-clip-text text-transparent">
              Book your car today.
            </span>
          </h2>
          <p className="mt-6 text-xl leading-8 text-primary-100 max-w-2xl mx-auto">
            Experience the freedom of the open road with our premium rental cars and exceptional service.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
            <Link
              to="/cars"
              className="inline-flex items-center justify-center px-8 py-4 border border-transparent text-lg font-semibold rounded-xl shadow-lg text-primary-600 bg-white hover:bg-primary-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white transition-all duration-200 transform hover:-translate-y-1"
            >
              Browse Available Cars
            </Link>
            <Link
              to="/register"
              className="inline-flex items-center justify-center px-8 py-4 border-2 border-white text-lg font-semibold rounded-xl text-white bg-transparent hover:bg-white hover:text-primary-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white transition-all duration-200 transform hover:-translate-y-1"
            >
              Create Account
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomePage