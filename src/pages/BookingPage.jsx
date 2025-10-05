"use client"
import { useState, useEffect, useCallback } from "react"
import { useParams, useNavigate, Link } from "react-router-dom"
import { getCarById } from "../services/carService"
import { createBooking } from "../services/bookingService"
import { useAuth } from "../contexts/AuthContext"
import { Formik, Form, ErrorMessage } from "formik"
import * as Yup from "yup"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import { format, differenceInDays, addDays } from "date-fns"
import { 
  TruckIcon, 
  ArrowLeftIcon, 
  CalendarIcon, 
  CurrencyDollarIcon, 
  MapPinIcon,
  CheckBadgeIcon,
  SparklesIcon,
  ShieldCheckIcon
} from "@heroicons/react/24/outline"
import toast from "react-hot-toast"

const BookingSchema = Yup.object().shape({
  startDate: Yup.date().required("Start date is required").min(new Date(), "Start date must be in the future"),
  endDate: Yup.date().required("End date is required").min(Yup.ref("startDate"), "End date must be after start date"),
  pickupLocation: Yup.string().required("Pickup location is required"),
  dropOffLocation: Yup.string().required("Drop-off location is required"),
})

const BookingPage = () => {
  const { carId } = useParams()
  const navigate = useNavigate()
  const { isAuthenticated } = useAuth() // This is now used for authentication context
  const [car, setCar] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [totalPrice, setTotalPrice] = useState(0)
  const [bookingDays, setBookingDays] = useState(1)
  const [startDate, setStartDate] = useState(addDays(new Date(), 1))
  const [endDate, setEndDate] = useState(addDays(new Date(), 2))

  // Location options
  const locationOptions = [
    { id: "downtown", name: "Downtown Office", address: "123 Main Street, Automotive City, AC 12345" },
    {
      id: "airport",
      name: "Airport Terminal",
      address: "Terminal 2, International Airport, Automotive City, AC 12346",
    },
    { id: "westside", name: "Westside Branch", address: "456 Ocean Drive, Westside, Automotive City, AC 12347" },
    {
      id: "southside",
      name: "Southside Mall",
      address: "789 Shopping Lane, Southside Mall, Automotive City, AC 12348",
    },
    {
      id: "northbp",
      name: "North Business Park",
      address: "101 Corporate Blvd, North Business Park, Automotive City, AC 12349",
    },
    { id: "eastharbor", name: "East Harbor", address: "202 Harbor View, East Harbor, Automotive City, AC 12350" },
    {
      id: "university",
      name: "University Campus",
      address: "303 College Road, University District, Automotive City, AC 12351",
    },
    {
      id: "convention",
      name: "South Convention Center",
      address: "404 Convention Way, South District, Automotive City, AC 12352",
    },
  ]

  const calculateTotalPrice = useCallback(
    (startDate, endDate) => {
      if (!car || !startDate || !endDate) return 0

      const days = differenceInDays(endDate, startDate) + 1
      setBookingDays(days)
      return (car.pricePerDay * days).toFixed(2)
    },
    [car],
  )

  useEffect(() => {
    if (car) {
      const price = calculateTotalPrice(startDate, endDate)
      setTotalPrice(price)
    }
  }, [startDate, endDate, car, calculateTotalPrice])

  useEffect(() => {
    const fetchCarDetails = async () => {
      try {
        const data = await getCarById(carId)
        if (!data.available) {
          setError("This car is not available for booking.")
          return
        }
        setCar(data)
      } catch (error) {
        console.error("Error fetching car details:", error)
        setError("Failed to load car details. Please try again later.")
      } finally {
        setLoading(false)
      }
    }

    fetchCarDetails()
  }, [carId])

  const handleSubmit = async (values) => {
    setLoading(true)
    setError("")

    try {
      const bookingData = {
        carId: car.id,
        startDate: format(values.startDate, "yyyy-MM-dd"),
        endDate: format(values.endDate, "yyyy-MM-dd"),
        pickupLocation: values.pickupLocation,
        dropOffLocation: values.dropOffLocation,
      }

      const response = await createBooking(bookingData)
      toast.success("Booking created successfully!")
      navigate(`/booking-details/${response.id}`)
    } catch (error) {
      console.error("Booking error:", error)
      setError(error.response?.data?.message || "Failed to create booking. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  if (loading && !car) {
    return (
      <div className="flex justify-center items-center h-96">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading booking details...</p>
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
            <h3 className="text-xl font-semibold text-red-800 mb-2">Booking Error</h3>
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

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Back Button */}
      <div className="mb-8">
        <Link
          to={`/cars/${carId}`}
          className="inline-flex items-center px-6 py-3 text-base font-semibold text-gray-700 bg-white border border-gray-300 rounded-xl shadow-sm hover:shadow-md hover:bg-gray-50 transition-all duration-200"
        >
          <ArrowLeftIcon className="h-5 w-5 mr-2" />
          Back to Car Details
        </Link>
      </div>

      <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
        {/* Header Section */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 px-8 py-6 border-b border-blue-100">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center mb-2">
                <SparklesIcon className="h-6 w-6 text-blue-500 mr-2" />
                <h1 className="text-3xl font-bold text-gray-900">Complete Your Booking</h1>
              </div>
              <p className="text-lg text-gray-600">Finalize your rental details and confirm your reservation</p>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-blue-600">${car.pricePerDay}</p>
              <p className="text-gray-600 font-semibold">per day</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 p-8">
          {/* Car Details & Summary */}
          <div className="space-y-6">
            {/* Car Details Card */}
            <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-6 border border-gray-200">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                <TruckIcon className="h-6 w-6 mr-2 text-blue-600" />
                Vehicle Details
              </h3>
              <div className="flex items-start space-x-6">
                <div className="flex-shrink-0 h-32 w-32 bg-gradient-to-br from-gray-200 to-gray-300 rounded-xl overflow-hidden">
                  {car.imageUrl ? (
                    <img
                      src={`http://localhost:8081/api/files/${car.imageUrl}`}
                      alt={`${car.make} ${car.model}`}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="h-full w-full flex items-center justify-center">
                      <TruckIcon className="h-12 w-12 text-gray-400" />
                    </div>
                  )}
                </div>
                <div className="flex-1">
                  <h4 className="text-lg font-bold text-gray-900">
                    {car.make} {car.model} ({car.year})
                  </h4>
                  <div className="mt-2 flex flex-wrap gap-2">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-800 border border-blue-200">
                      {car.transmission}
                    </span>
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-800 border border-green-200">
                      {car.fuelType}
                    </span>
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-purple-100 text-purple-800 border border-purple-200">
                      {car.seats} seats
                    </span>
                  </div>
                  <div className="mt-4 flex items-center">
                    <CurrencyDollarIcon className="h-6 w-6 text-blue-600 mr-2" />
                    <span className="text-2xl font-bold text-blue-600">${car.pricePerDay}</span>
                    <span className="text-gray-600 ml-2">/ day</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Booking Summary Card */}
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-6 border border-blue-200">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                <CheckBadgeIcon className="h-6 w-6 mr-2 text-blue-600" />
                Booking Summary
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center py-3 border-b border-blue-200">
                  <span className="text-gray-700 font-medium">Daily Rate:</span>
                  <span className="text-lg font-bold text-gray-900">${car.pricePerDay}</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-blue-200">
                  <span className="text-gray-700 font-medium">Number of Days:</span>
                  <span className="text-lg font-bold text-gray-900">{bookingDays}</span>
                </div>
                <div className="flex justify-between items-center py-4 border-t border-blue-300">
                  <span className="text-xl font-bold text-gray-900">Total Price:</span>
                  <span className="text-2xl font-bold text-blue-600">${totalPrice}</span>
                </div>
              </div>
            </div>

            {/* Included Features */}
            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-6 border border-green-200">
              <h4 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                <ShieldCheckIcon className="h-5 w-5 mr-2 text-green-600" />
                What's Included
              </h4>
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
                  Free cancellation up to 24 hours
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                  Unlimited mileage
                </li>
              </ul>
            </div>
          </div>

          {/* Booking Form */}
          <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-6 border border-gray-200">
            <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
              <CalendarIcon className="h-6 w-6 mr-2 text-blue-600" />
              Booking Details
            </h3>

            <Formik
              initialValues={{
                startDate: startDate,
                endDate: endDate,
                pickupLocation: locationOptions[0].address,
                dropOffLocation: locationOptions[0].address,
              }}
              validationSchema={BookingSchema}
              onSubmit={handleSubmit}
            >
              {({ values, setFieldValue, isSubmitting }) => {
                return (
                  <Form className="space-y-6">
                    {/* Date Selection */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="startDate" className="block text-sm font-semibold text-gray-800 mb-2">
                          <CalendarIcon className="h-5 w-5 inline mr-2 text-blue-500" />
                          Start Date
                        </label>
                        <div className="mt-1">
                          <DatePicker
                            selected={values.startDate}
                            onChange={(date) => {
                              setFieldValue("startDate", date)
                              setStartDate(date)
                            }}
                            selectsStart
                            startDate={values.startDate}
                            endDate={values.endDate}
                            minDate={addDays(new Date(), 1)}
                            className="w-full px-4 py-3 text-base border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                          />
                          <ErrorMessage name="startDate" component="div" className="text-red-500 text-sm mt-2 font-medium" />
                        </div>
                      </div>

                      <div>
                        <label htmlFor="endDate" className="block text-sm font-semibold text-gray-800 mb-2">
                          <CalendarIcon className="h-5 w-5 inline mr-2 text-blue-500" />
                          End Date
                        </label>
                        <div className="mt-1">
                          <DatePicker
                            selected={values.endDate}
                            onChange={(date) => {
                              setFieldValue("endDate", date)
                              setEndDate(date)
                            }}
                            selectsEnd
                            startDate={values.startDate}
                            endDate={values.endDate}
                            minDate={values.startDate}
                            className="w-full px-4 py-3 text-base border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                          />
                          <ErrorMessage name="endDate" component="div" className="text-red-500 text-sm mt-2 font-medium" />
                        </div>
                      </div>
                    </div>

                    {/* Location Selection */}
                    <div>
                      <label htmlFor="pickupLocation" className="block text-sm font-semibold text-gray-800 mb-2">
                        <MapPinIcon className="h-5 w-5 inline mr-2 text-blue-500" />
                        Pickup Location
                      </label>
                      <div className="mt-1">
                        <select
                          id="pickupLocation"
                          name="pickupLocation"
                          value={values.pickupLocation}
                          onChange={(e) => setFieldValue("pickupLocation", e.target.value)}
                          className="w-full px-4 py-3 text-base border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                        >
                          {locationOptions.map((location) => (
                            <option key={location.id} value={location.address}>
                              {location.name} - {location.address}
                            </option>
                          ))}
                        </select>
                        <ErrorMessage name="pickupLocation" component="div" className="text-red-500 text-sm mt-2 font-medium" />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="dropOffLocation" className="block text-sm font-semibold text-gray-800 mb-2">
                        <MapPinIcon className="h-5 w-5 inline mr-2 text-blue-500" />
                        Drop-off Location
                      </label>
                      <div className="mt-1">
                        <select
                          id="dropOffLocation"
                          name="dropOffLocation"
                          value={values.dropOffLocation}
                          onChange={(e) => setFieldValue("dropOffLocation", e.target.value)}
                          className="w-full px-4 py-3 text-base border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                        >
                          {locationOptions.map((location) => (
                            <option key={location.id} value={location.address}>
                              {location.name} - {location.address}
                            </option>
                          ))}
                        </select>
                        <ErrorMessage name="dropOffLocation" component="div" className="text-red-500 text-sm mt-2 font-medium" />
                      </div>
                    </div>

                    {/* Submit Button */}
                    <div className="pt-6">
                      <button
                        type="submit"
                        disabled={loading || isSubmitting}
                        className="w-full py-4 px-6 text-lg font-semibold text-white bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 transition-all duration-200"
                      >
                        {loading ? (
                          <span className="flex items-center justify-center">
                            <svg
                              className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
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
                            Processing Booking...
                          </span>
                        ) : (
                          "Confirm & Book Now"
                        )}
                      </button>
                    </div>
                  </Form>
                )
              }}
            </Formik>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BookingPage