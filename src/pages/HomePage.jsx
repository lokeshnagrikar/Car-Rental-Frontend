"use client"
import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { getAvailableCars } from "../services/carService"
import { TruckIcon, CalendarIcon, CurrencyDollarIcon } from "@heroicons/react/24/outline"
import TestimonialsSection from "../components/TestimonialsSection"

const HomePage = () => {
  const [featuredCars, setFeaturedCars] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchFeaturedCars = async () => {
      try {
        const cars = await getAvailableCars()
        // Get 3 random cars for featured section
        const randomCars = cars.sort(() => 0.5 - Math.random()).slice(0, 3)
        setFeaturedCars(randomCars)
        setLoading(false)
      } catch (error) {
        console.error("Error fetching featured cars:", error)
        setLoading(false)
      }
    }

    fetchFeaturedCars()
  }, [])

  const features = [
    {
      name: "Wide Selection",
      description: "Choose from a variety of cars to suit your needs and budget.",
      icon: TruckIcon,
    },
    {
      name: "Flexible Booking",
      description: "Easy booking process with flexible dates and durations.",
      icon: CalendarIcon,
    },
    {
      name: "Competitive Pricing",
      description: "Get the best rates with our transparent pricing policy.",
      icon: CurrencyDollarIcon,
    },
  ]

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="relative bg-gray-900">
        <div className="absolute inset-0">
          <img
            className="h-full w-full object-cover"
            src="https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
            alt="Car rental hero"
          />
          <div className="absolute inset-0 bg-gray-900 opacity-75" aria-hidden="true"></div>
        </div>
        <div className="relative max-w-7xl mx-auto py-24 px-4 sm:py-32 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
            Rent Your Perfect Car
          </h1>
          <p className="mt-6 text-xl text-gray-300 max-w-3xl">
            Discover our wide selection of cars for any occasion. From economy to luxury, we have the perfect vehicle
            for your needs.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4">
            <Link
              to="/cars"
              className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
            >
              Browse Cars
            </Link>
            <Link
              to="/register"
              className="inline-flex items-center justify-center px-6 py-3 border border-white text-base font-medium rounded-md shadow-sm text-white bg-transparent hover:bg-white hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white"
            >
              Sign Up Now
            </Link>
          </div>
        </div>
      </div>

      {/* Search Section */}
      <div className="relative -mt-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-xl overflow-hidden">
          <div className="px-6 py-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Find Your Perfect Rental Car</h2>
            <form className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label htmlFor="pickup-location" className="block text-sm font-medium text-gray-700 mb-1">
                  Pickup Location
                </label>
                <select
                  id="pickup-location"
                  name="pickup-location"
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                >
                  <option>Downtown Office</option>
                  <option>Airport Terminal</option>
                  <option>North Branch</option>
                  <option>South Branch</option>
                </select>
              </div>
              <div>
                <label htmlFor="pickup-date" className="block text-sm font-medium text-gray-700 mb-1">
                  Pickup Date
                </label>
                <input
                  type="date"
                  id="pickup-date"
                  name="pickup-date"
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                />
              </div>
              <div>
                <label htmlFor="return-date" className="block text-sm font-medium text-gray-700 mb-1">
                  Return Date
                </label>
                <input
                  type="date"
                  id="return-date"
                  name="return-date"
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                />
              </div>
              <div className="md:col-span-3">
                <Link
                  to="/cars"
                  className="w-full bg-primary-600 border border-transparent rounded-md shadow-sm py-3 px-4 text-base font-medium text-white hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 inline-block text-center"
                >
                  Search Available Cars
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Featured Cars Section */}
      <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">Featured Cars</h2>
          <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
            Check out some of our most popular rental options
          </p>
        </div>

        {loading ? (
          <div className="mt-12 flex justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
          </div>
        ) : (
          <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {featuredCars.map((car) => (
              <div
                key={car.id}
                className="card overflow-hidden rounded-lg shadow-lg transition-transform duration-300 hover:scale-105"
              >
                <div className="h-48 w-full overflow-hidden">
                   {car.imageUrl ? (
                    <Link to={`/cars/${car.id}`}>
                      <img
                        src={`http://localhost:8081/api/files/${car.imageUrl}`}
                        alt={`${car.make} ${car.model}`}
                        className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                      />
                    </Link>
                  ) : (
                    <div className="h-full w-full bg-gray-200 flex items-center justify-center">
                      <TruckIcon className="h-20 w-20 text-gray-400" />
                    </div>
                  )}
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {car.make} {car.model} ({car.year})
                  </h3>
                  <div className="mt-2 flex items-center text-sm text-gray-500">
                    <span className="inline-block bg-primary-100 text-primary-800 px-2 py-1 rounded-full text-xs font-semibold">
                      ${car.pricePerDay}/day
                    </span>
                    {car.transmission && (
                      <span className="ml-2 inline-block bg-gray-100 text-gray-800 px-2 py-1 rounded-full text-xs font-semibold">
                        {car.transmission}
                      </span>
                    )}
                    {car.fuelType && (
                      <span className="ml-2 inline-block bg-gray-100 text-gray-800 px-2 py-1 rounded-full text-xs font-semibold">
                        {car.fuelType}
                      </span>
                    )}
                  </div>
                  <div className="mt-4">
                    <Link
                      to={`/cars/${car.id}`}
                      className="text-primary-600 hover:text-primary-700 font-medium flex items-center"
                    >
                      View Details
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 ml-1"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="mt-10 text-center">
          <Link
            to="/cars"
            className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
          >
            View All Cars
          </Link>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-gray-50">
        <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">Why Choose Us</h2>
            <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
              We offer the best car rental experience with our premium services
            </p>
          </div>

          <div className="mt-12">
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {features.map((feature) => (
                <div key={feature.name} className="pt-6">
                  <div className="flow-root bg-white rounded-lg px-6 pb-8 h-full">
                    <div className="-mt-6">
                      <div>
                        <span className="inline-flex items-center justify-center p-3 bg-primary-500 rounded-md shadow-lg">
                          <feature.icon className="h-6 w-6 text-white" aria-hidden="true" />
                        </span>
                      </div>
                      <h3 className="mt-8 text-lg font-medium text-gray-900 tracking-tight">{feature.name}</h3>
                      <p className="mt-5 text-base text-gray-500">{feature.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <TestimonialsSection />

      {/* How It Works Section */}
      <div className="bg-white py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">How It Works</h2>
            <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
              Renting a car with us is quick and easy
            </p>
          </div>

          <div className="mt-12">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              <div className="text-center">
                <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-primary-100 text-primary-600 text-2xl font-bold">
                  1
                </div>
                <h3 className="mt-6 text-lg font-medium text-gray-900">Choose Your Car</h3>
                <p className="mt-2 text-base text-gray-500">
                  Browse our extensive fleet and select the perfect vehicle for your needs.
                </p>
              </div>

              <div className="text-center">
                <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-primary-100 text-primary-600 text-2xl font-bold">
                  2
                </div>
                <h3 className="mt-6 text-lg font-medium text-gray-900">Make a Reservation</h3>
                <p className="mt-2 text-base text-gray-500">
                  Book your car online or by phone with our simple reservation system.
                </p>
              </div>

              <div className="text-center">
                <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-primary-100 text-primary-600 text-2xl font-bold">
                  3
                </div>
                <h3 className="mt-6 text-lg font-medium text-gray-900">Enjoy Your Ride</h3>
                <p className="mt-2 text-base text-gray-500">
                  Pick up your car and enjoy your journey with our 24/7 roadside assistance.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-primary-700">
        <div className="max-w-2xl mx-auto text-center py-16 px-4 sm:py-20 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
            <span className="block">Ready to get started?</span>
            <span className="block">Book your car today.</span>
          </h2>
          <p className="mt-4 text-lg leading-6 text-primary-200">
            Experience the freedom of the open road with our premium rental cars.
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <Link
              to="/cars"
              className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-primary-600 bg-white hover:bg-primary-50 sm:w-auto"
            >
              Browse Available Cars
            </Link>
            <Link
              to="/register"
              className="inline-flex items-center justify-center px-5 py-3 border border-white text-base font-medium rounded-md text-white bg-transparent hover:bg-primary-800 sm:w-auto"
            >
              Create Account
            </Link>
          </div>
        </div>
      </div>

      {/* Footer is now imported as a component */}
    </div>
  )
}

export default HomePage
