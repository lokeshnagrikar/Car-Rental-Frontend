"use client"
import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { getAllCars, searchCars } from "../services/carService"
import { TruckIcon, XMarkIcon, FunnelIcon, SparklesIcon } from "@heroicons/react/24/outline"

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
      {/* Header Section */}
      <div className="text-center mb-12">
        <div className="flex justify-center mb-4">
          <div className="bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full p-4">
            <TruckIcon className="h-8 w-8 text-white" />
          </div>
        </div>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Explore Our Premium Fleet</h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Discover the perfect vehicle for your journey from our carefully curated collection
        </p>
      </div>

      {/* Filters Toggle */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-2xl font-semibold text-gray-900">
            Available Cars <span className="text-blue-600">({cars.length})</span>
          </h2>
          <p className="text-gray-600 mt-1">Find your ideal rental vehicle</p>
        </div>
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="inline-flex items-center px-6 py-3 text-base font-semibold text-white bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
        >
          {showFilters ? (
            <>
              <XMarkIcon className="h-5 w-5 mr-2" />
              Hide Filters
            </>
          ) : (
            <>
              <FunnelIcon className="h-5 w-5 mr-2" />
              Show Filters
            </>
          )}
        </button>
      </div>

      {error && (
        <div className="rounded-2xl bg-red-50 border border-red-200 p-6 mb-8">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <svg className="h-6 w-6 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-lg font-medium text-red-800">{error}</h3>
            </div>
          </div>
        </div>
      )}

      {/* Filters Section */}
      {showFilters && (
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-bold text-gray-900">Filter Cars</h3>
            <SparklesIcon className="h-6 w-6 text-blue-500" />
          </div>
          
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            <div>
              <label htmlFor="make" className="block text-sm font-semibold text-gray-800 mb-2">Make</label>
              <input
                type="text"
                name="make"
                id="make"
                value={filters.make}
                onChange={handleFilterChange}
                className="w-full px-4 py-3 text-base border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                placeholder="e.g., Toyota"
              />
            </div>

            <div>
              <label htmlFor="model" className="block text-sm font-semibold text-gray-800 mb-2">Model</label>
              <input
                type="text"
                name="model"
                id="model"
                value={filters.model}
                onChange={handleFilterChange}
                className="w-full px-4 py-3 text-base border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                placeholder="e.g., Camry"
              />
            </div>

            <div>
              <label htmlFor="minPrice" className="block text-sm font-semibold text-gray-800 mb-2">Min Price ($/day)</label>
              <input
                type="number"
                name="minPrice"
                id="minPrice"
                value={filters.minPrice}
                onChange={handleFilterChange}
                className="w-full px-4 py-3 text-base border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                placeholder="0"
              />
            </div>

            <div>
              <label htmlFor="maxPrice" className="block text-sm font-semibold text-gray-800 mb-2">Max Price ($/day)</label>
              <input
                type="number"
                name="maxPrice"
                id="maxPrice"
                value={filters.maxPrice}
                onChange={handleFilterChange}
                className="w-full px-4 py-3 text-base border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                placeholder="1000"
              />
            </div>
          </div>

          <div className="mt-6 flex items-center p-4 bg-blue-50 rounded-xl">
            <input
              id="available"
              name="available"
              type="checkbox"
              checked={filters.available}
              onChange={handleFilterChange}
              className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label htmlFor="available" className="ml-3 text-sm font-semibold text-gray-800">
              Show only available cars
            </label>
          </div>

          <div className="mt-8 flex justify-end space-x-4">
            <button
              type="button"
              onClick={resetFilters}
              className="px-8 py-3 text-base font-semibold text-gray-700 bg-white border border-gray-300 rounded-xl shadow-sm hover:shadow-md hover:bg-gray-50 transition-all duration-200"
            >
              <XMarkIcon className="h-5 w-5 mr-2 inline" />
              Reset All
            </button>
            <button
              type="button"
              onClick={applyFilters}
              className="px-8 py-3 text-base font-semibold text-white bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
            >
              Apply Filters
            </button>
          </div>
        </div>
      )}

      {/* Loading State */}
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600 text-lg">Loading amazing cars...</p>
          </div>
        </div>
      ) : cars.length === 0 ? (
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-12 text-center">
          <TruckIcon className="mx-auto h-16 w-16 text-gray-400 mb-4" />
          <h3 className="text-2xl font-semibold text-gray-900 mb-2">No cars found</h3>
          <p className="text-gray-600 mb-6 max-w-md mx-auto">
            We couldn't find any cars matching your criteria. Try adjusting your filters or browse our full collection.
          </p>
          <button
            onClick={resetFilters}
            className="inline-flex items-center px-8 py-3 text-base font-semibold text-white bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
          >
            Show All Cars
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {cars.map((car) => (
            <div 
              key={car.id} 
              className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
            >
              {/* Car Image */}
              <div className="h-56 bg-gray-200 relative overflow-hidden">
                {car.imageUrl ? (
                  <img
                    src={`http://localhost:8081/api/files/${car.imageUrl}`}
                    alt={`${car.make} ${car.model}`}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                    <TruckIcon className="h-20 w-20 text-gray-400" />
                  </div>
                )}
                <div className="absolute top-4 right-4">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold bg-white/90 backdrop-blur-sm text-gray-900 shadow-lg">
                    ${car.pricePerDay}/day
                  </span>
                </div>
                {!car.available && (
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                    <span className="text-white text-lg font-semibold bg-red-600 px-4 py-2 rounded-full">
                      Not Available
                    </span>
                  </div>
                )}
              </div>

              {/* Car Details */}
              <div className="p-6">
                <div className="mb-4">
                  <h3 className="text-xl font-bold text-gray-900 mb-1">
                    {car.make} {car.model}
                  </h3>
                  <p className="text-gray-600 mb-3">{car.year} • {car.transmission || "Automatic"}</p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {car.fuelType && (
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-800 border border-blue-200">
                        {car.fuelType}
                      </span>
                    )}
                    {car.seats && (
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-800 border border-green-200">
                        {car.seats} seats
                      </span>
                    )}
                    {car.color && (
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-purple-100 text-purple-800 border border-purple-200">
                        {car.color}
                      </span>
                    )}
                  </div>
                </div>

                {/* Action Button */}
                <div className="flex justify-between items-center pt-4 border-t border-gray-200">
                  <div className="flex items-center">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${
                      car.available 
                        ? "bg-green-100 text-green-800 border border-green-200" 
                        : "bg-red-100 text-red-800 border border-red-200"
                    }`}>
                      {car.available ? "Available" : "Not Available"}
                    </span>
                  </div>
                  <Link
                    to={`/cars/${car.id}`}
                    className="inline-flex items-center px-6 py-2 text-sm font-semibold text-white bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg hover:from-blue-700 hover:to-indigo-700 transform hover:scale-105 transition-all duration-200"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Results Info */}
      {!loading && cars.length > 0 && (
        <div className="mt-12 text-center">
          <p className="text-gray-600">
            Showing <span className="font-semibold text-gray-900">{cars.length}</span> amazing car{cars.length !== 1 ? 's' : ''} 
            ready for your next adventure
          </p>
        </div>
      )}
    </div>
  )
}

export default CarsPage