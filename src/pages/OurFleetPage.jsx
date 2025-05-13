"use client"

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { getAllCars } from "../services/carService"
import { TruckIcon, AdjustmentsHorizontalIcon } from "@heroicons/react/24/outline"

const OurFleetPage = () => {
  const [cars, setCars] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [filters, setFilters] = useState({
    type: "",
    transmission: "",
    seats: "",
    priceRange: [0, 1000],
  })
  const [filteredCars, setFilteredCars] = useState([])
  const [showFilters, setShowFilters] = useState(false)

  // Car types for filtering
  const carTypes = ["Sedan", "SUV", "Luxury", "Compact", "Van", "Convertible"]
  const transmissionTypes = ["Automatic", "Manual"]
  const seatOptions = ["2", "4", "5", "7", "8+"]

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const data = await getAllCars()
        setCars(data)
        setFilteredCars(data)
      } catch (err) {
        setError("Failed to load cars. Please try again later.")
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchCars()
  }, [])

  useEffect(() => {
    // Apply filters
    let result = [...cars]

    if (filters.type) {
      result = result.filter((car) => car.type === filters.type)
    }

    if (filters.transmission) {
      result = result.filter((car) => car.transmission === filters.transmission)
    }

    if (filters.seats) {
      result = result.filter((car) => car.seats.toString() === filters.seats)
    }

    result = result.filter((car) => car.dailyRate >= filters.priceRange[0] && car.dailyRate <= filters.priceRange[1])

    setFilteredCars(result)
  }, [filters, cars])

  const handleFilterChange = (filterType, value) => {
    setFilters((prev) => ({
      ...prev,
      [filterType]: value,
    }))
  }

  const resetFilters = () => {
    setFilters({
      type: "",
      transmission: "",
      seats: "",
      priceRange: [0, 1000],
    })
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-red-50 p-4 rounded-md">
          <div className="flex">
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800">{error}</h3>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white">
      {/* Hero section */}
      <div className="relative bg-gradient-to-r from-primary-600 to-primary-800 pb-32">
        <div className="absolute inset-0">
          <img
            className="w-full h-full object-cover opacity-30"
            src="/placeholder.svg?height=600&width=1200"
            alt="Fleet of cars"
          />
          <div className="absolute inset-0 bg-primary-600 mix-blend-multiply" aria-hidden="true"></div>
        </div>
        <div className="relative max-w-7xl mx-auto py-24 px-4 sm:py-32 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-extrabold tracking-tight text-white md:text-5xl lg:text-6xl">Our Fleet</h1>
          <p className="mt-6 max-w-3xl text-xl text-primary-100">
            Discover our extensive range of vehicles to suit every need and budget. From compact cars for city
            adventures to luxury vehicles for special occasions.
          </p>
        </div>
      </div>

      {/* Overlapping cards */}
      <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-32 pb-12">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Browse Our Vehicles</h2>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
            >
              <AdjustmentsHorizontalIcon className="h-5 w-5 mr-2" />
              {showFilters ? "Hide Filters" : "Show Filters"}
            </button>
          </div>

          {/* Filters */}
          {showFilters && (
            <div className="bg-gray-50 p-4 rounded-lg mb-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {/* Car Type Filter */}
                <div>
                  <label htmlFor="car-type" className="block text-sm font-medium text-gray-700 mb-1">
                    Car Type
                  </label>
                  <select
                    id="car-type"
                    name="car-type"
                    value={filters.type}
                    onChange={(e) => handleFilterChange("type", e.target.value)}
                    className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-md"
                  >
                    <option value="">All Types</option>
                    {carTypes.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Transmission Filter */}
                <div>
                  <label htmlFor="transmission" className="block text-sm font-medium text-gray-700 mb-1">
                    Transmission
                  </label>
                  <select
                    id="transmission"
                    name="transmission"
                    value={filters.transmission}
                    onChange={(e) => handleFilterChange("transmission", e.target.value)}
                    className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-md"
                  >
                    <option value="">All Transmissions</option>
                    {transmissionTypes.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Seats Filter */}
                <div>
                  <label htmlFor="seats" className="block text-sm font-medium text-gray-700 mb-1">
                    Seats
                  </label>
                  <select
                    id="seats"
                    name="seats"
                    value={filters.seats}
                    onChange={(e) => handleFilterChange("seats", e.target.value)}
                    className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-md"
                  >
                    <option value="">All Seat Options</option>
                    {seatOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Price Range */}
                <div>
                  <label htmlFor="price-range" className="block text-sm font-medium text-gray-700 mb-1">
                    Price Range (${filters.priceRange[0]} - ${filters.priceRange[1]})
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="1000"
                    step="50"
                    value={filters.priceRange[1]}
                    onChange={(e) =>
                      handleFilterChange("priceRange", [filters.priceRange[0], Number.parseInt(e.target.value)])
                    }
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  />
                </div>
              </div>

              <div className="mt-4 flex justify-end">
                <button
                  onClick={resetFilters}
                  className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                >
                  Reset Filters
                </button>
              </div>
            </div>
          )}

          {filteredCars.length === 0 ? (
            <div className="text-center py-10">
              <TruckIcon className="h-12 w-12 text-gray-400 mx-auto mb-3" />
              <h3 className="text-sm font-medium text-gray-900">No cars match your filters</h3>
              <p className="mt-1 text-sm text-gray-500">Try adjusting your search filters or browse all cars.</p>
              <button
                onClick={resetFilters}
                className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filteredCars.map((car) => (
                <div
                  key={car.id}
                  className="group relative bg-white border border-gray-200 rounded-lg flex flex-col overflow-hidden hover:shadow-lg transition-shadow duration-300"
                >
                  <div className="aspect-w-16 aspect-h-9 bg-gray-200 group-hover:opacity-75">
                    {car.imageUrl ? (
                      <img
                        src={`http://localhost:8081/api/files/${car.imageUrl}`}
                        alt={`${car.make} ${car.model}`}
                        className="w-full h-48 object-cover"
                      />
                    ) : (
                      <div className="flex items-center justify-center h-48">
                        <TruckIcon className="h-12 w-12 text-gray-400" />
                      </div>
                    )}
                  </div>
                  <div className="flex-1 p-6 flex flex-col">
                    <div className="flex-1">
                      <div className="flex justify-between items-center">
                        <h3 className="text-xl font-semibold text-gray-900">
                          {car.make} {car.model}
                        </h3>
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-800">
                          {car.type}
                        </span>
                      </div>
                      <p className="mt-3 text-base text-gray-500">{car.description}</p>
                      <div className="mt-4 grid grid-cols-2 gap-4">
                        <div className="flex items-center text-sm text-gray-500">
                          <svg
                            className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            aria-hidden="true"
                          >
                            <path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
                            <path d="M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H10a1 1 0 001-1v-5h2.05a2.5 2.5 0 014.9 0H19a1 1 0 001-1v-5a1 1 0 00-1-1h-8a1 1 0 00-.8.4l-4 5a1 1 0 00-.2.6v4.05A2.5 2.5 0 014.05 16H3a1 1 0 01-1-1V5a1 1 0 011-1h3.05a2.5 2.5 0 014.9 0H13a1 1 0 011 1v1h4a1 1 0 011 1v3a1 1 0 01-1 1h-.05a2.5 2.5 0 01-4.9 0H9a1 1 0 01-1-1v-1.05a2.5 2.5 0 00-4.9 0H3a1 1 0 01-1-1V5a1 1 0 011-1z" />
                          </svg>
                          {car.transmission}
                        </div>
                        <div className="flex items-center text-sm text-gray-500">
                          <svg
                            className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            aria-hidden="true"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                              clipRule="evenodd"
                            />
                          </svg>
                          {car.seats} Seats
                        </div>
                      </div>
                    </div>
                    <div className="mt-6 flex items-center justify-between">
                      <div className="flex items-center">
                        <h4 className="text-lg font-bold text-primary-600">${car.dailyRate}</h4>
                        <span className="text-sm text-gray-500 ml-1">/day</span>
                      </div>
                      <Link
                        to={`/cars/${car.id}`}
                        className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                      >
                        View Details
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Why choose us section */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">Why Choose Our Fleet</h2>
            <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
              We offer a premium selection of well-maintained vehicles with exceptional service.
            </p>
          </div>
          <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <div className="bg-white rounded-lg shadow px-5 py-6 sm:px-6 transform transition-all hover:-translate-y-1 hover:shadow-lg">
              <div className="text-center">
                <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-md bg-primary-600 text-white">
                  <svg
                    className="h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                </div>
                <h3 className="mt-5 text-lg leading-6 font-medium text-gray-900">Diverse Selection</h3>
                <p className="mt-2 text-base text-gray-500">
                  From economy to luxury, our diverse fleet ensures we have the perfect vehicle for every occasion.
                </p>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow px-5 py-6 sm:px-6 transform transition-all hover:-translate-y-1 hover:shadow-lg">
              <div className="text-center">
                <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-md bg-primary-600 text-white">
                  <svg
                    className="h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="mt-5 text-lg leading-6 font-medium text-gray-900">Regularly Maintained</h3>
                <p className="mt-2 text-base text-gray-500">
                  All our vehicles undergo rigorous maintenance checks to ensure safety and reliability.
                </p>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow px-5 py-6 sm:px-6 transform transition-all hover:-translate-y-1 hover:shadow-lg">
              <div className="text-center">
                <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-md bg-primary-600 text-white">
                  <svg
                    className="h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h3 className="mt-5 text-lg leading-6 font-medium text-gray-900">Transparent Pricing</h3>
                <p className="mt-2 text-base text-gray-500">
                  No hidden fees or surprises. Our competitive rates include insurance and roadside assistance.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary-700">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
          <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            <span className="block">Ready to hit the road?</span>
            <span className="block text-primary-200">Book your ideal car today.</span>
          </h2>
          <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
            <div className="inline-flex rounded-md shadow">
              <Link
                to="/cars"
                className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-primary-700 bg-white hover:bg-primary-50"
              >
                Browse All Cars
              </Link>
            </div>
            <div className="ml-3 inline-flex rounded-md shadow">
              <Link
                to="/contact"
                className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default OurFleetPage
