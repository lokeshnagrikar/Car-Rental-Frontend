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
import { TruckIcon, ArrowLeftIcon, CalendarIcon, CurrencyDollarIcon, MapPinIcon } from "@heroicons/react/24/outline"
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
  const { isAuthenticated } = useAuth()
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
          to={`/cars/${carId}`}
          className="inline-flex items-center text-sm font-medium text-primary-600 hover:text-primary-500"
        >
          <ArrowLeftIcon className="h-5 w-5 mr-1" />
          Back to Car Details
        </Link>
      </div>

      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-2xl leading-6 font-bold text-gray-900">Book Your Car</h3>
          <p className="mt-1 max-w-2xl text-sm text-gray-500">Please fill in the details to complete your booking.</p>
        </div>

        <div className="border-t border-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="text-lg font-medium text-gray-900 mb-4">Car Details</h4>
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 h-24 w-24 overflow-hidden rounded-md">
                    {car.imageUrl ? (
                      <img
                        src={`http://localhost:8081/api/files/${car.imageUrl}`}
                        alt={`${car.make} ${car.model}`}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="h-full w-full bg-gray-200 flex items-center justify-center">
                        <TruckIcon className="h-10 w-10 text-gray-400" />
                      </div>
                    )}
                  </div>
                  <div>
                    <h5 className="text-md font-semibold text-gray-900">
                      {car.make} {car.model} ({car.year})
                    </h5>
                    <p className="text-sm text-gray-500">
                      {car.transmission} · {car.fuelType} · {car.seats} seats
                    </p>
                    <div className="mt-2 flex items-center">
                      <CurrencyDollarIcon className="h-5 w-5 text-gray-400 mr-1" />
                      <span className="text-primary-600 font-semibold">${car.pricePerDay}/day</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 bg-gray-50 p-4 rounded-lg">
                <h4 className="text-lg font-medium text-gray-900 mb-4">Booking Summary</h4>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Daily Rate:</span>
                    <span className="font-medium">${car.pricePerDay}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Number of Days:</span>
                    <span className="font-medium">{bookingDays}</span>
                  </div>
                  <div className="border-t border-gray-200 pt-3 flex justify-between">
                    <span className="text-gray-700 font-medium">Total Price:</span>
                    <span className="text-primary-600 font-bold">${totalPrice}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-4">
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
                      <div>
                        <label htmlFor="startDate" className="block text-sm font-medium text-gray-700">
                          <CalendarIcon className="h-5 w-5 inline mr-2 text-gray-400" />
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
                            className="shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-gray-300 rounded-md"
                          />
                          <ErrorMessage name="startDate" component="div" className="text-red-500 text-xs mt-1" />
                        </div>
                      </div>

                      <div>
                        <label htmlFor="endDate" className="block text-sm font-medium text-gray-700">
                          <CalendarIcon className="h-5 w-5 inline mr-2 text-gray-400" />
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
                            className="shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-gray-300 rounded-md"
                          />
                          <ErrorMessage name="endDate" component="div" className="text-red-500 text-xs mt-1" />
                        </div>
                      </div>

                      <div>
                        <label htmlFor="pickupLocation" className="block text-sm font-medium text-gray-700">
                          <MapPinIcon className="h-5 w-5 inline mr-2 text-gray-400" />
                          Pickup Location
                        </label>
                        <div className="mt-1">
                          <select
                            id="pickupLocation"
                            name="pickupLocation"
                            value={values.pickupLocation}
                            onChange={(e) => setFieldValue("pickupLocation", e.target.value)}
                            className="shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-gray-300 rounded-md"
                          >
                            {locationOptions.map((location) => (
                              <option key={location.id} value={location.address}>
                                {location.name} - {location.address}
                              </option>
                            ))}
                          </select>
                          <ErrorMessage name="pickupLocation" component="div" className="text-red-500 text-xs mt-1" />
                        </div>
                      </div>

                      <div>
                        <label htmlFor="dropOffLocation" className="block text-sm font-medium text-gray-700">
                          <MapPinIcon className="h-5 w-5 inline mr-2 text-gray-400" />
                          Drop-off Location
                        </label>
                        <div className="mt-1">
                          <select
                            id="dropOffLocation"
                            name="dropOffLocation"
                            value={values.dropOffLocation}
                            onChange={(e) => setFieldValue("dropOffLocation", e.target.value)}
                            className="shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-gray-300 rounded-md"
                          >
                            {locationOptions.map((location) => (
                              <option key={location.id} value={location.address}>
                                {location.name} - {location.address}
                              </option>
                            ))}
                          </select>
                          <ErrorMessage name="dropOffLocation" component="div" className="text-red-500 text-xs mt-1" />
                        </div>
                      </div>

                      <div className="pt-4">
                        <button
                          type="submit"
                          disabled={loading || isSubmitting}
                          className="w-full inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {loading ? (
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
                          ) : null}
                          Confirm Booking
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
    </div>
  )
}

export default BookingPage
