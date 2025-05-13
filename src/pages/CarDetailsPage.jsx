"use client"
import { useState, useEffect } from "react"
import { useParams, Link, useNavigate } from "react-router-dom"
import { getCarById } from "../services/carService"
import { useAuth } from "../contexts/AuthContext"
import {
  TruckIcon,
  CalendarIcon,
  CurrencyDollarIcon,
  UserIcon,
  TagIcon,
  ArrowLeftIcon,
} from "@heroicons/react/24/outline"

const CarDetailsPage = () => {
  const { id } = useParams()
  const { isAuthenticated } = useAuth()
  const navigate = useNavigate()
  const [car, setCar] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    const fetchCarDetails = async () => {
      try {
        const data = await getCarById(id)
        setCar(data)
      } catch (error) {
        console.error("Error fetching car details:", error)
        setError("Failed to load car details. Please try again later.")
      } finally {
        setLoading(false)
      }
    }

    fetchCarDetails()
  }, [id])

  const handleBookNow = () => {
    if (isAuthenticated) {
      navigate(`/booking/${id}`)
    } else {
      navigate("/login", { state: { from: `/booking/${id}` } })
    }
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="rounded-md bg-red-50 p-4">
          <div className="flex">
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800">{error}</h3>
              <div className="mt-4">
                <Link to="/cars" className="text-sm font-medium text-red-800 hover:text-red-700">
                  Go back to cars
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!car) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900">Car not found</h2>
          <p className="mt-2 text-gray-600">The car you're looking for doesn't exist or has been removed.</p>
          <div className="mt-6">
            <Link
              to="/cars"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
            >
              <ArrowLeftIcon className="h-5 w-5 mr-2" />
              Back to Cars
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-6">
        <Link
          to="/cars"
          className="inline-flex items-center text-sm font-medium text-primary-600 hover:text-primary-500"
        >
          <ArrowLeftIcon className="h-5 w-5 mr-1" />
          Back to Cars
        </Link>
      </div>

      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
          <div>
            <h3 className="text-2xl leading-6 font-bold text-gray-900">
              {car.make} {car.model} ({car.year})
            </h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">
              {car.available ? "Available for rent" : "Currently unavailable"}
            </p>
          </div>
          <div className="text-right">
            <p className="text-3xl font-bold text-primary-600">${car.pricePerDay}</p>
            <p className="text-sm text-gray-500">per day</p>
          </div>
        </div>

        <div className="border-t border-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4">
              <div className="h-64 w-full overflow-hidden rounded-lg">
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
            </div>

            <div className="p-4">
              <h4 className="text-lg font-medium text-gray-900 mb-4">Car Specifications</h4>
              <dl className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2">
                <div className="sm:col-span-1">
                  <dt className="text-sm font-medium text-gray-500 flex items-center">
                    <TruckIcon className="h-5 w-5 mr-2 text-gray-400" />
                    Make & Model
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900">
                    {car.make} {car.model}
                  </dd>
                </div>
                <div className="sm:col-span-1">
                  <dt className="text-sm font-medium text-gray-500 flex items-center">
                    <CalendarIcon className="h-5 w-5 mr-2 text-gray-400" />
                    Year
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900">{car.year}</dd>
                </div>
                <div className="sm:col-span-1">
                  <dt className="text-sm font-medium text-gray-500 flex items-center">
                    <CurrencyDollarIcon className="h-5 w-5 mr-2 text-gray-400" />
                    Price Per Day
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900">${car.pricePerDay}</dd>
                </div>
                <div className="sm:col-span-1">
                  <dt className="text-sm font-medium text-gray-500 flex items-center">
                    <TagIcon className="h-5 w-5 mr-2 text-gray-400" />
                    License Plate
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900">{car.licensePlate || "N/A"}</dd>
                </div>
                <div className="sm:col-span-1">
                  <dt className="text-sm font-medium text-gray-500 flex items-center">
                    <TruckIcon className="h-5 w-5 mr-2 text-gray-400" />
                    Transmission
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900">{car.transmission || "N/A"}</dd>
                </div>
                <div className="sm:col-span-1">
                  <dt className="text-sm font-medium text-gray-500 flex items-center">
                    <UserIcon className="h-5 w-5 mr-2 text-gray-400" />
                    Seats
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900">{car.seats || "N/A"}</dd>
                </div>
                <div className="sm:col-span-1">
                  <dt className="text-sm font-medium text-gray-500">Fuel Type</dt>
                  <dd className="mt-1 text-sm text-gray-900">{car.fuelType || "N/A"}</dd>
                </div>
                <div className="sm:col-span-1">
                  <dt className="text-sm font-medium text-gray-500">Color</dt>
                  <dd className="mt-1 text-sm text-gray-900">{car.color || "N/A"}</dd>
                </div>
              </dl>

              <div className="mt-6">
                <button
                  onClick={handleBookNow}
                  disabled={!car.available}
                  className={`w-full inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white ${
                    car.available
                      ? "bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                      : "bg-gray-400 cursor-not-allowed"
                  }`}
                >
                  {car.available ? "Book Now" : "Not Available"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CarDetailsPage
