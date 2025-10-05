"use client"
import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { getAllCars, deleteCar } from "../../services/carService"
import { TruckIcon, PlusIcon, PencilIcon, TrashIcon, MagnifyingGlassIcon, XMarkIcon } from "@heroicons/react/24/outline"
import toast from "react-hot-toast"

const CarsPage = () => {
  const [cars, setCars] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [searchTerm, setSearchTerm] = useState("")
  const [deleteLoading, setDeleteLoading] = useState(null)

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

  const handleDeleteCar = async (id) => {
    if (!window.confirm("Are you sure you want to delete this car?")) {
      return
    }

    setDeleteLoading(id)
    try {
      await deleteCar(id)
      toast.success("Car deleted successfully")
      setCars(cars.filter((car) => car.id !== id))
    } catch (error) {
      console.error("Error deleting car:", error)
      toast.error("Failed to delete car. Please try again.")
    } finally {
      setDeleteLoading(null)
    }
  }

  const filteredCars = cars.filter(
    (car) =>
      car.make.toLowerCase().includes(searchTerm.toLowerCase()) ||
      car.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
      car.year.toString().includes(searchTerm),
  )

  if (loading && cars.length === 0) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="rounded-xl bg-red-50 border border-red-200 p-6">
          <div className="flex">
            <div className="ml-3">
              <h3 className="text-lg font-semibold text-red-800">{error}</h3>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Car Management</h1>
          <p className="mt-2 text-lg text-gray-600">Manage your rental fleet</p>
        </div>
        <Link
          to="/admin/cars/add"
          className="inline-flex items-center justify-center px-6 py-3 text-base font-semibold text-white bg-gradient-to-r from-primary-600 to-primary-700 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
        >
          <PlusIcon className="h-5 w-5 mr-2" />
          Add New Car
        </Link>
      </div>

      {/* Search Section */}
      <div className="mb-8">
        <div className="relative rounded-xl shadow-sm">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
          </div>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="block w-full pl-12 pr-12 py-4 text-base border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200"
            placeholder="Search cars by make, model, or year..."
          />
          {searchTerm && (
            <div className="absolute inset-y-0 right-0 pr-4 flex items-center">
              <button
                type="button"
                onClick={() => setSearchTerm("")}
                className="text-gray-400 hover:text-gray-600 focus:outline-none transition-colors duration-200"
              >
                <XMarkIcon className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Cars Grid */}
      {filteredCars.length === 0 ? (
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-12 text-center">
          <TruckIcon className="mx-auto h-16 w-16 text-gray-400 mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No cars found</h3>
          <p className="text-gray-600 mb-6">Try adjusting your search or add a new car to your fleet.</p>
          <Link
            to="/admin/cars/add"
            className="inline-flex items-center px-6 py-3 text-base font-semibold text-white bg-primary-600 rounded-lg hover:bg-primary-700 transition-colors duration-200"
          >
            <PlusIcon className="h-5 w-5 mr-2" />
            Add Your First Car
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCars.map((car) => (
            <div
              key={car.id}
              className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              {/* Car Image */}
              <div className="h-48 bg-gray-200 relative overflow-hidden">
                {car.imageUrl ? (
                  <img
                    src={`http://localhost:8081/api/files/${car.imageUrl}`}
                    alt={`${car.make} ${car.model}`}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                    <TruckIcon className="h-16 w-16 text-gray-400" />
                  </div>
                )}
                <div className="absolute top-4 right-4">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-semibold ${
                      car.available
                        ? "bg-green-100 text-green-800 border border-green-200"
                        : "bg-red-100 text-red-800 border border-red-200"
                    }`}
                  >
                    {car.available ? "Available" : "Not Available"}
                  </span>
                </div>
              </div>

              {/* Car Details */}
              <div className="p-6">
                <div className="mb-4">
                  <h3 className="text-xl font-bold text-gray-900 mb-1">
                    {car.make} {car.model}
                  </h3>
                  <p className="text-lg text-primary-600 font-semibold mb-3">${car.pricePerDay}/day</p>
                  <div className="flex items-center text-sm text-gray-600 mb-2">
                    <span className="font-medium">Year:</span>
                    <span className="ml-2">{car.year}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600 mb-2">
                    <span className="font-medium">Transmission:</span>
                    <span className="ml-2">{car.transmission || "N/A"}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600 mb-2">
                    <span className="font-medium">Fuel:</span>
                    <span className="ml-2">{car.fuelType || "N/A"}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <span className="font-medium">Seats:</span>
                    <span className="ml-2">{car.seats || "N/A"}</span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex justify-between items-center pt-4 border-t border-gray-200">
                  <Link
                    to={`/admin/cars/edit/${car.id}`}
                    className="inline-flex items-center px-4 py-2 text-sm font-semibold text-primary-700 bg-primary-50 rounded-lg hover:bg-primary-100 transition-colors duration-200"
                  >
                    <PencilIcon className="h-4 w-4 mr-2" />
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDeleteCar(car.id)}
                    disabled={deleteLoading === car.id}
                    className="inline-flex items-center px-4 py-2 text-sm font-semibold text-red-700 bg-red-50 rounded-lg hover:bg-red-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                  >
                    {deleteLoading === car.id ? (
                      <>
                        <svg
                          className="animate-spin -ml-1 mr-2 h-4 w-4 text-red-700"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        Deleting...
                      </>
                    ) : (
                      <>
                        <TrashIcon className="h-4 w-4 mr-2" />
                        Delete
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Results Count */}
      {filteredCars.length > 0 && (
        <div className="mt-8 text-center">
          <p className="text-gray-600">
            Showing <span className="font-semibold">{filteredCars.length}</span> car{filteredCars.length !== 1 ? 's' : ''}
            {searchTerm && (
              <span> for "<span className="font-semibold">{searchTerm}</span>"</span>
            )}
          </p>
        </div>
      )}
    </div>
  )
}

export default CarsPage