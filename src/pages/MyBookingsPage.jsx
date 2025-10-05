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
  MapPinIcon,
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
      return "bg-green-100 text-green-800 border-green-200"
    case "CANCELLED":
      return "bg-red-100 text-red-800 border-red-200"
    case "PENDING":
      return "bg-yellow-100 text-yellow-800 border-yellow-200"
    case "COMPLETED":
      return "bg-blue-100 text-blue-800 border-blue-200"
    default:
      return "bg-gray-100 text-gray-800 border-gray-200"
  }
}

const MyBookingsPage = () => {
  const [bookings, setBookings] = useState([])
  const [filteredBookings, setFilteredBookings] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [statusFilter, setStatusFilter] = useState("ALL")

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const data = await getMyBookings()
        setBookings(data)
        setFilteredBookings(data)
      } catch (error) {
        console.error("Error fetching bookings:", error)
        setError("Failed to load your bookings. Please try again later.")
      } finally {
        setLoading(false)
      }
    }

    fetchBookings()
  }, [])

  // Filter bookings based on selected status
  useEffect(() => {
    if (statusFilter === "ALL") {
      setFilteredBookings(bookings)
    } else {
      const filtered = bookings.filter(booking => 
        booking.status.toUpperCase() === statusFilter.toUpperCase()
      )
      setFilteredBookings(filtered)
    }
  }, [statusFilter, bookings])

  const handleStatusFilterChange = (event) => {
    setStatusFilter(event.target.value)
  }

  // Calculate statistics based on filtered bookings
  const totalBookings = filteredBookings.length
  const confirmedBookings = filteredBookings.filter(b => b.status === "CONFIRMED").length
  const upcomingBookings = filteredBookings.filter(b => ["CONFIRMED", "PENDING"].includes(b.status)).length

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center items-center h-64">
            <div className="text-center">
              <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary-600 mx-auto mb-4"></div>
              <p className="text-gray-600 dark:text-gray-300">Loading your bookings...</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 p-6">
            <div className="flex items-center">
              <XCircleIcon className="h-6 w-6 text-red-400 mr-3" />
              <div>
                <h3 className="text-sm font-medium text-red-800 dark:text-red-300">{error}</h3>
                <p className="mt-2 text-sm text-red-700 dark:text-red-400">
                  Please refresh the page or try again later.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            My Bookings
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Manage your car rentals and track your upcoming trips
          </p>
        </div>

        {/* Stats Cards - Now based on filtered results */}
        {bookings.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
              <div className="flex items-center">
                <div className="p-3 rounded-lg bg-blue-100 dark:bg-blue-900/30 mr-4">
                  <TruckIcon className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    {statusFilter === "ALL" ? "Total Bookings" : "Filtered Bookings"}
                  </p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">{totalBookings}</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
              <div className="flex items-center">
                <div className="p-3 rounded-lg bg-green-100 dark:bg-green-900/30 mr-4">
                  <CheckCircleIcon className="h-6 w-6 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Confirmed</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">{confirmedBookings}</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
              <div className="flex items-center">
                <div className="p-3 rounded-lg bg-purple-100 dark:bg-purple-900/30 mr-4">
                  <CalendarIcon className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Upcoming</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">{upcomingBookings}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Action Bar with Working Filter */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <select 
                value={statusFilter}
                onChange={handleStatusFilterChange}
                className="appearance-none bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
              >
                <option value="ALL">All Status</option>
                <option value="CONFIRMED">Confirmed</option>
                <option value="PENDING">Pending</option>
                <option value="COMPLETED">Completed</option>
                <option value="CANCELLED">Cancelled</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-400">
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
            
            {/* Filter Status Badge */}
            {statusFilter !== "ALL" && (
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-500 dark:text-gray-400">Showing:</span>
                <span className={`px-3 py-1 text-xs font-semibold rounded-full border ${getStatusClass(statusFilter)}`}>
                  {statusFilter}
                </span>
                <button
                  onClick={() => setStatusFilter("ALL")}
                  className="text-sm text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300"
                >
                  Clear
                </button>
              </div>
            )}
          </div>
          
          <Link
            to="/cars"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-xl shadow-lg text-white bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-all duration-200 transform hover:-translate-y-0.5"
          >
            <TruckIcon className="h-5 w-5 mr-2" />
            Book New Car
          </Link>
        </div>

        {/* Bookings List - Now using filteredBookings */}
        {filteredBookings.length === 0 ? (
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 p-12 text-center">
            <div className="max-w-md mx-auto">
              <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-r from-primary-100 to-primary-200 dark:from-primary-900/20 dark:to-primary-800/20 flex items-center justify-center">
                <TruckIcon className="h-10 w-10 text-primary-600 dark:text-primary-400" />
              </div>
              
              {statusFilter === "ALL" ? (
                <>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                    No bookings yet
                  </h3>
                  <p className="text-gray-500 dark:text-gray-400 mb-8">
                    Start your journey by booking your first car. Explore our wide range of vehicles and find the perfect one for your needs.
                  </p>
                </>
              ) : (
                <>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                    No {statusFilter.toLowerCase()} bookings
                  </h3>
                  <p className="text-gray-500 dark:text-gray-400 mb-8">
                    You don't have any bookings with {statusFilter.toLowerCase()} status.
                    {statusFilter === "CANCELLED" || statusFilter === "COMPLETED" 
                      ? " Try checking other status filters." 
                      : " Start by booking a new car!"}
                  </p>
                </>
              )}
              
              <Link
                to="/cars"
                className="inline-flex items-center px-8 py-3 border border-transparent text-base font-medium rounded-xl shadow-lg text-white bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-all duration-200 transform hover:-translate-y-0.5"
              >
                Browse Available Cars
                <ArrowRightIcon className="ml-2 h-5 w-5" />
              </Link>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {filteredBookings.map((booking) => (
              <div
                key={booking.id}
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className="p-6">
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                    {/* Car Image and Basic Info */}
                    <div className="flex items-start space-x-4 mb-4 lg:mb-0">
                      <div className="flex-shrink-0 h-20 w-20 rounded-xl overflow-hidden shadow-md">
                        {booking.car.imageUrl ? (
                          <img
                            src={`http://localhost:8081/api/files/${booking.car.imageUrl}`}
                            alt={`${booking.car.make} ${booking.car.model}`}
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <div className="h-full w-full bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-600 flex items-center justify-center">
                            <TruckIcon className="h-8 w-8 text-gray-400" />
                          </div>
                        )}
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                          {booking.car.make} {booking.car.model}
                        </h3>
                        <p className="text-gray-500 dark:text-gray-400">{booking.car.year}</p>
                        <div className="flex items-center mt-2 space-x-4">
                          <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                            <CalendarIcon className="h-4 w-4 mr-1" />
                            {format(new Date(booking.startDate), "MMM dd")} - {format(new Date(booking.endDate), "MMM dd, yyyy")}
                          </div>
                          <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                            <MapPinIcon className="h-4 w-4 mr-1" />
                            {booking.pickupLocation || "Main Office"}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Status and Price */}
                    <div className="flex flex-col sm:flex-row lg:flex-col items-start sm:items-center lg:items-end space-y-2 sm:space-y-0 sm:space-x-4 lg:space-x-0 lg:space-y-2">
                      <div className="flex items-center">
                        {getStatusIcon(booking.status)}
                        <span
                          className={`ml-2 px-3 py-1 text-xs font-semibold rounded-full border ${getStatusClass(
                            booking.status,
                          )}`}
                        >
                          {booking.status}
                        </span>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center text-lg font-bold text-gray-900 dark:text-white">
                          <CurrencyDollarIcon className="h-5 w-5 mr-1 text-gray-400" />
                          {booking.totalPrice}
                        </div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Total amount</p>
                      </div>
                    </div>
                  </div>

                  {/* Action Button */}
                  <div className="mt-6 flex justify-end">
                    <Link
                      to={`/booking-details/${booking.id}`}
                      className="inline-flex items-center px-6 py-2 border border-gray-300 dark:border-gray-600 text-sm font-medium rounded-lg text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-all duration-200"
                    >
                      View Details
                      <ArrowRightIcon className="ml-2 h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default MyBookingsPage