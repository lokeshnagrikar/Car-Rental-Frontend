"use client"
import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { getAllCars, searchCars } from "../services/carService"
import { TruckIcon, AdjustmentsHorizontalIcon, XMarkIcon } from "@heroicons/react/24/outline"

const CarsPage = () => {
  const [cars, setCars] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [showFilters, setShowFilters] = useState(false)
  const [filters, setFilters] = useState({
    make: "",
    model: "",
    minPrice: "",
    maxPrice: "",
    available: true,
  })

  useEffect(() => {
    fetchCars()
  }, [])

  const fetchCars = async () => {
    setLoading(true)
    try {
      const data = await getAllCars()
      setCars(data)
    } catch (error) {
      console.error("Error fetching cars:", error)
      setError("Failed to load cars. Please try again later.")
    } finally {
      setLoading(false)
    }
  }

  const handleFilterChange = (e) => {
    const { name, value, type, checked } = e.target
    setFilters({
      ...filters,
      [name]: type === "checkbox" ? checked : value,
    })
  }

  const applyFilters = async () => {
    setLoading(true)
    try {
      // Remove empty filters
      const filterParams = Object.fromEntries(Object.entries(filters).filter(([_, value]) => value !== ""))

      const data = await searchCars(filterParams)
      setCars(data)
    } catch (error) {
      console.error("Error searching cars:", error)
      setError("Failed to apply filters. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const resetFilters = () => {
    setFilters({
      make: "",
      model: "",
      minPrice: "",
      maxPrice: "",
      available: true,
    })
    fetchCars()
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight sm:text-5xl">Available Cars</h1>
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="inline-flex items-center px-6 py-3 border border-transparent text-lg font-medium rounded-md shadow-md text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:bg-gradient-to-r hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
        >
          <AdjustmentsHorizontalIcon className="h-6 w-6 mr-2" />
          {showFilters ? "Hide Filters" : "Show Filters"}
        </button>
      </div>

      {error && (
        <div className="rounded-md bg-red-50 p-4 mb-6 shadow-lg">
          <div className="flex">
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800">{error}</h3>
            </div>
          </div>
        </div>
      )}

      {showFilters && (
        <div className="bg-white shadow-xl rounded-lg p-6 mb-6 border-t-4 border-indigo-500">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <label htmlFor="make" className="block text-sm font-medium text-gray-700">Make</label>
              <input
                type="text"
                name="make"
                id="make"
                value={filters.make}
                onChange={handleFilterChange}
                className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>

            <div>
              <label htmlFor="model" className="block text-sm font-medium text-gray-700">Model</label>
              <input
                type="text"
                name="model"
                id="model"
                value={filters.model}
                onChange={handleFilterChange}
                className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>

            <div>
              <label htmlFor="minPrice" className="block text-sm font-medium text-gray-700">Min Price ($/day)</label>
              <input
                type="number"
                name="minPrice"
                id="minPrice"
                value={filters.minPrice}
                onChange={handleFilterChange}
                className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>

            <div>
              <label htmlFor="maxPrice" className="block text-sm font-medium text-gray-700">Max Price ($/day)</label>
              <input
                type="number"
                name="maxPrice"
                id="maxPrice"
                value={filters.maxPrice}
                onChange={handleFilterChange}
                className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
          </div>

          <div className="mt-4 flex items-center">
            <input
              id="available"
              name="available"
              type="checkbox"
              checked={filters.available}
              onChange={handleFilterChange}
              className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
            />
            <label htmlFor="available" className="ml-2 block text-sm text-gray-700">Show only available cars</label>
          </div>

          <div className="mt-6 flex justify-end space-x-4">
            <button
              type="button"
              onClick={resetFilters}
              className="inline-flex items-center px-6 py-3 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <XMarkIcon className="h-5 w-5 mr-2" />
              Reset
            </button>
            <button
              type="button"
              onClick={applyFilters}
              className="inline-flex items-center px-6 py-3 border border-transparent text-sm font-medium rounded-md shadow-md text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:bg-gradient-to-r hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Apply Filters
            </button>
          </div>
        </div>
      )}

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
        </div>
      ) : cars.length === 0 ? (
        <div className="bg-white shadow-md rounded-lg p-6 text-center">
          <p className="text-gray-500 text-lg">No cars found matching your criteria.</p>
          <button
            onClick={resetFilters}
            className="mt-4 inline-flex items-center px-6 py-3 border border-transparent text-sm font-medium rounded-md shadow-md text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:bg-gradient-to-r hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {cars.map((car) => (
            <div key={car.id} className="bg-white overflow-hidden shadow-xl rounded-lg transition-transform transform hover:scale-105">
              <div className="h-48 w-full overflow-hidden">
                {car.imageUrl ? (
                  <img
                    src={`http://localhost:8081/api/files/${car.imageUrl}`}
                    alt={`${car.make} ${car.model}`}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="h-full w-full bg-gray-200 flex items-center justify-center">
                    <TruckIcon className="h-20 w-20 text-gray-400" />
                  </div>
                )}
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">{car.make} {car.model}</h3>
                    <p className="text-sm text-gray-500">{car.year}</p>
                  </div>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    ${car.pricePerDay}/day
                  </span>
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  {car.transmission && (
                    <span className="inline-block bg-gray-100 text-gray-800 px-2 py-1 rounded-full text-xs font-semibold">
                      {car.transmission}
                    </span>
                  )}
                  {car.fuelType && (
                    <span className="inline-block bg-gray-100 text-gray-800 px-2 py-1 rounded-full text-xs font-semibold">
                      {car.fuelType}
                    </span>
                  )}
                  {car.seats && (
                    <span className="inline-block bg-gray-100 text-gray-800 px-2 py-1 rounded-full text-xs font-semibold">
                      {car.seats} seats
                    </span>
                  )}
                </div>
                <div className="mt-6 flex justify-between items-center">
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      car.available ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                    }`}
                  >
                    {car.available ? "Available" : "Not Available"}
                  </span>
                  <Link
                    to={`/cars/${car.id}`}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:bg-gradient-to-r hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
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
  )
}

export default CarsPage
