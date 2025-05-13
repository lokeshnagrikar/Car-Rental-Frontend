"use client"
import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { getMyBookings } from "../services/bookingService"
import { format } from "date-fns"
import {
  TruckIcon,
  CalendarIcon,
  CurrencyDollarIcon,
  CheckCircleIcon,
  XCircleIcon,
  ClockIcon,
  ArrowRightIcon,
} from "@heroicons/react/24/outline"

const getStatusIcon = (status) => {
  switch (status) {
    case "CONFIRMED":
      return <CheckCircleIcon className="h-5 w-5 text-green-500" />
    case "CANCELLED":
      return <XCircleIcon className="h-5 w-5 text-red-500" />
    case "PENDING":
      return <ClockIcon className="h-5 w-5 text-yellow-500" />
    case "COMPLETED":
      return <CheckCircleIcon className="h-5 w-5 text-blue-500" />
    default:
      return <ClockIcon className="h-5 w-5 text-gray-500" />
  }
}

const getStatusClass = (status) => {
  switch (status) {
    case "CONFIRMED":
      return "bg-green-100 text-green-800"
    case "CANCELLED":
      return "bg-red-100 text-red-800"
    case "PENDING":
      return "bg-yellow-100 text-yellow-800"
    case "COMPLETED":
      return "bg-blue-100 text-blue-800"
    default:
      return "bg-gray-100 text-gray-800"
  }
}

const MyBookingsPage = () => {
  const [bookings, setBookings] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const data = await getMyBookings()
        setBookings(data)
      } catch (error) {
        console.error("Error fetching bookings:", error)
        setError("Failed to load your bookings. Please try again later.")
      } finally {
        setLoading(false)
      }
    }

    fetchBookings()
  }, [])

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
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900">My Bookings</h1>
        <Link
          to="/cars"
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
        >
          Book a Car
        </Link>
      </div>

      {bookings.length === 0 ? (
        <div className="bg-white shadow-md rounded-lg p-6 text-center">
          <TruckIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900">No bookings found</h3>
          <p className="mt-2 text-gray-500">You haven't made any bookings yet.</p>
          <div className="mt-6">
            <Link
              to="/cars"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
            >
              Browse Cars
            </Link>
          </div>
        </div>
      ) : (
        <div className="bg-white shadow overflow-hidden sm:rounded-md">
          <ul className="divide-y divide-gray-200">
            {bookings.map((booking) => (
              <li key={booking.id}>
                <div className="px-4 py-4 sm:px-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-16 w-16 overflow-hidden rounded-md">
                        {booking.car.imageUrl ? (
                          <img
                            src={`http://localhost:8081/api/files/${booking.car.imageUrl}`}
                            alt={`${booking.car.make} ${booking.car.model}`}
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <div className="h-full w-full bg-gray-200 flex items-center justify-center">
                            <TruckIcon className="h-8 w-8 text-gray-400" />
                          </div>
                        )}
                      </div>
                      <div className="ml-4">
                        <h4 className="text-lg font-medium text-gray-900">
                          {booking.car.make} {booking.car.model} ({booking.car.year})
                        </h4>
                        <div className="mt-1 flex items-center">
                          <CalendarIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" />
                          <p className="text-sm text-gray-500">
                            {format(new Date(booking.startDate), "MMM dd, yyyy")} -{" "}
                            {format(new Date(booking.endDate), "MMM dd, yyyy")}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col items-end">
                      <div className="flex items-center">
                        <CurrencyDollarIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" />
                        <p className="text-sm font-medium text-gray-900">${booking.totalPrice}</p>
                      </div>
                      <div className="mt-2 flex items-center">
                        {getStatusIcon(booking.status)}
                        <span
                          className={`ml-1 px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusClass(
                            booking.status,
                          )}`}
                        >
                          {booking.status}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 flex justify-end">
                    <Link
                      to={`/booking-details/${booking.id}`}
                      className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-primary-700 bg-primary-100 hover:bg-primary-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                    >
                      View Details
                      <ArrowRightIcon className="ml-1 h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

export default MyBookingsPage
