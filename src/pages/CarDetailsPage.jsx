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
  ArrowLeftIcon,
  CogIcon,
  PaintBrushIcon,
  CheckBadgeIcon,
  ShieldCheckIcon,
  SparklesIcon,
  FireIcon, // Using FireIcon instead of FuelIcon
} from "@heroicons/react/24/outline"

const CarDetailsPage = () => {
  const { id } = useParams()
  const { isAuthenticated } = useAuth()
  const navigate = useNavigate()
  const [car, setCar] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [activeImage, setActiveImage] = useState(0)

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
      <div className="flex justify-center items-center h-96">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading car details...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="rounded-2xl bg-red-50 border border-red-200 p-8 text-center">
          <div className="flex flex-col items-center">
            <div className="rounded-full bg-red-100 p-4 mb-4">
              <TruckIcon className="h-8 w-8 text-red-600" />
            </div>
            <h3 className="text-xl font-semibold text-red-800 mb-2">Failed to load car details</h3>
            <p className="text-red-600 mb-6">{error}</p>
            <Link
              to="/cars"
              className="inline-flex items-center px-6 py-3 text-base font-semibold text-white bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
            >
              <ArrowLeftIcon className="h-5 w-5 mr-2" />
              Back to Cars
            </Link>
          </div>
        </div>
      </div>
    )
  }

  if (!car) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <div className="bg-gradient-to-r from-gray-100 to-gray-200 rounded-2xl p-12 max-w-2xl mx-auto">
            <TruckIcon className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Car Not Found</h2>
            <p className="text-gray-600 text-lg mb-6">The car you're looking for doesn't exist or has been removed.</p>
            <Link
              to="/cars"
              className="inline-flex items-center px-8 py-3 text-base font-semibold text-white bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
            >
              <ArrowLeftIcon className="h-5 w-5 mr-2" />
              Explore Available Cars
            </Link>
          </div>
        </div>
      </div>
    )
  }

  // Mock multiple images for demonstration
  const carImages = car.imageUrl 
    ? [
        `http://localhost:8081/api/files/${car.imageUrl}`,
        `http://localhost:8081/api/files/${car.imageUrl}`,
        `http://localhost:8081/api/files/${car.imageUrl}`,
      ]
    : []

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Back Button */}
      <div className="mb-8">
        <Link
          to="/cars"
          className="inline-flex items-center px-6 py-3 text-base font-semibold text-gray-700 bg-white border border-gray-300 rounded-xl shadow-sm hover:shadow-md hover:bg-gray-50 transition-all duration-200"
        >
          <ArrowLeftIcon className="h-5 w-5 mr-2" />
          Back to Cars
        </Link>
      </div>

      <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
        {/* Header Section */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 px-8 py-6 border-b border-blue-100">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
            <div>
              <div className="flex items-center mb-2">
                <SparklesIcon className="h-6 w-6 text-blue-500 mr-2" />
                <h1 className="text-3xl font-bold text-gray-900">
                  {car.make} {car.model} <span className="text-blue-600">({car.year})</span>
                </h1>
              </div>
              <p className="text-lg text-gray-600">
                {car.available ? (
                  <span className="inline-flex items-center text-green-600 font-semibold">
                    <CheckBadgeIcon className="h-5 w-5 mr-1" />
                    Available for Rent
                  </span>
                ) : (
                  <span className="inline-flex items-center text-red-600 font-semibold">
                    Currently Unavailable
                  </span>
                )}
              </p>
            </div>
            <div className="mt-4 lg:mt-0 text-center lg:text-right">
              <p className="text-4xl font-bold text-blue-600">${car.pricePerDay}</p>
              <p className="text-gray-600 font-semibold">per day</p>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 p-8">
          {/* Image Gallery */}
          <div className="space-y-4">
            <div className="h-96 bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl overflow-hidden shadow-lg">
              {carImages.length > 0 ? (
                <img
                  src={carImages[activeImage]}
                  alt={`${car.make} ${car.model}`}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                />
              ) : (
                <div className="h-full w-full flex items-center justify-center">
                  <TruckIcon className="h-24 w-24 text-gray-400" />
                </div>
              )}
            </div>
            
            {/* Thumbnail Gallery */}
            {carImages.length > 1 && (
              <div className="grid grid-cols-3 gap-4">
                {carImages.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveImage(index)}
                    className={`h-24 bg-gray-200 rounded-xl overflow-hidden border-2 transition-all duration-200 ${
                      activeImage === index ? 'border-blue-500 shadow-md' : 'border-transparent hover:border-gray-300'
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${car.make} ${car.model} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Car Details */}
          <div className="space-y-8">
            {/* Quick Features */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4 text-center border border-blue-200">
                <CogIcon className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                <p className="text-sm font-semibold text-gray-800">{car.transmission || "Automatic"}</p>
                <p className="text-xs text-gray-600">Transmission</p>
              </div>
              <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-4 text-center border border-green-200">
                <FireIcon className="h-8 w-8 text-green-600 mx-auto mb-2" />
                <p className="text-sm font-semibold text-gray-800">{car.fuelType || "Gasoline"}</p>
                <p className="text-xs text-gray-600">Fuel Type</p>
              </div>
              <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-4 text-center border border-purple-200">
                <UserIcon className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                <p className="text-sm font-semibold text-gray-800">{car.seats || "5"} Seats</p>
                <p className="text-xs text-gray-600">Capacity</p>
              </div>
              <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-4 text-center border border-orange-200">
                <PaintBrushIcon className="h-8 w-8 text-orange-600 mx-auto mb-2" />
                <p className="text-sm font-semibold text-gray-800">{car.color || "Various"}</p>
                <p className="text-xs text-gray-600">Color</p>
              </div>
            </div>

            {/* Detailed Specifications */}
            <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-6 border border-gray-200">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                <ShieldCheckIcon className="h-6 w-6 mr-2 text-blue-600" />
                Vehicle Specifications
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div className="flex justify-between items-center py-3 border-b border-gray-200">
                    <span className="text-sm font-semibold text-gray-600">Make & Model</span>
                    <span className="text-sm font-medium text-gray-900">{car.make} {car.model}</span>
                  </div>
                  <div className="flex justify-between items-center py-3 border-b border-gray-200">
                    <span className="text-sm font-semibold text-gray-600">Year</span>
                    <span className="text-sm font-medium text-gray-900">{car.year}</span>
                  </div>
                  <div className="flex justify-between items-center py-3 border-b border-gray-200">
                    <span className="text-sm font-semibold text-gray-600">License Plate</span>
                    <span className="text-sm font-medium text-gray-900">{car.licensePlate || "N/A"}</span>
                  </div>
                  <div className="flex justify-between items-center py-3 border-b border-gray-200">
                    <span className="text-sm font-semibold text-gray-600">Transmission</span>
                    <span className="text-sm font-medium text-gray-900">{car.transmission || "N/A"}</span>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between items-center py-3 border-b border-gray-200">
                    <span className="text-sm font-semibold text-gray-600">Fuel Type</span>
                    <span className="text-sm font-medium text-gray-900">{car.fuelType || "N/A"}</span>
                  </div>
                  <div className="flex justify-between items-center py-3 border-b border-gray-200">
                    <span className="text-sm font-semibold text-gray-600">Seating Capacity</span>
                    <span className="text-sm font-medium text-gray-900">{car.seats || "N/A"} seats</span>
                  </div>
                  <div className="flex justify-between items-center py-3 border-b border-gray-200">
                    <span className="text-sm font-semibold text-gray-600">Color</span>
                    <span className="text-sm font-medium text-gray-900">{car.color || "N/A"}</span>
                  </div>
                  <div className="flex justify-between items-center py-3 border-b border-gray-200">
                    <span className="text-sm font-semibold text-gray-600">Daily Rate</span>
                    <span className="text-sm font-medium text-blue-600 font-bold">${car.pricePerDay}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Booking Action */}
            <div className="bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl p-6 text-white shadow-lg">
              <div className="text-center">
                <h4 className="text-xl font-bold mb-2">Ready to Drive This Beauty?</h4>
                <p className="text-blue-100 mb-4">Book now and experience premium comfort</p>
                <button
                  onClick={handleBookNow}
                  disabled={!car.available}
                  className={`w-full py-4 px-6 text-lg font-semibold rounded-xl transition-all duration-200 ${
                    car.available
                      ? "bg-white text-blue-600 hover:bg-gray-100 transform hover:scale-105 hover:shadow-xl"
                      : "bg-gray-400 text-gray-200 cursor-not-allowed"
                  }`}
                >
                  {car.available ? (
                    <span className="flex items-center justify-center">
                      <CalendarIcon className="h-6 w-6 mr-2" />
                      Book This Car Now
                    </span>
                  ) : (
                    "Currently Unavailable"
                  )}
                </button>
                {!isAuthenticated && car.available && (
                  <p className="text-sm text-blue-200 mt-3">You'll need to login to complete your booking</p>
                )}
              </div>
            </div>

            {/* Additional Info */}
            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-6 border border-green-200">
              <h5 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                <CheckBadgeIcon className="h-5 w-5 mr-2 text-green-600" />
                What's Included
              </h5>
              <ul className="text-sm text-gray-700 space-y-2">
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                  Comprehensive insurance coverage
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                  24/7 roadside assistance
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                  Free cancellation up to 24 hours before
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                  Unlimited mileage
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                  Clean and sanitized vehicle
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Features Highlight */}
      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 text-center">
          <div className="bg-blue-100 rounded-full p-3 w-12 h-12 mx-auto mb-4">
            <ShieldCheckIcon className="h-6 w-6 text-blue-600 mx-auto" />
          </div>
          <h4 className="font-semibold text-gray-900 mb-2">Fully Insured</h4>
          <p className="text-sm text-gray-600">Comprehensive coverage for peace of mind</p>
        </div>
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 text-center">
          <div className="bg-green-100 rounded-full p-3 w-12 h-12 mx-auto mb-4">
            <TruckIcon className="h-6 w-6 text-green-600 mx-auto" />
          </div>
          <h4 className="font-semibold text-gray-900 mb-2">Well Maintained</h4>
          <p className="text-sm text-gray-600">Regularly serviced and cleaned vehicles</p>
        </div>
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 text-center">
          <div className="bg-purple-100 rounded-full p-3 w-12 h-12 mx-auto mb-4">
            <CurrencyDollarIcon className="h-6 w-6 text-purple-600 mx-auto" />
          </div>
          <h4 className="font-semibold text-gray-900 mb-2">Best Prices</h4>
          <p className="text-sm text-gray-600">Competitive rates with no hidden fees</p>
        </div>
      </div>
    </div>
  )
}

export default CarDetailsPage