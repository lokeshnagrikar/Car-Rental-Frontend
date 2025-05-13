"use client"
import { useState, useEffect } from "react"
import { getAllBookings, updateBookingStatus } from "../../services/bookingService"
import { format } from "date-fns"
import {
  TruckIcon,
  CalendarIcon,
  CurrencyDollarIcon,
  CheckCircleIcon,
  XCircleIcon,
  ClockIcon,
  UsersIcon,
  MagnifyingGlassIcon,
  XMarkIcon,
  AdjustmentsHorizontalIcon,
} from "@heroicons/react/24/outline"
import toast from "react-hot-toast"

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

const BookingsPage = () => {
  const [bookings, setBookings] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("")
  const [showFilters, setShowFilters] = useState(false)
  const [updateLoading, setUpdateLoading] = useState(null)

  useEffect(() => {
    fetchBookings()
  }, [])

  const fetchBookings = async () => {
    setLoading(true)
    try {
      const data = await getAllBookings()
      setBookings(data)
    } catch (error) {
      console.error("Error fetching bookings:", error)
      setError("Failed to load bookings. Please try again later.")
    } finally {
      setLoading(false)
    }
  }

  const handleUpdateStatus = async (id, status) => {
    setUpdateLoading(id)
    try {
      await updateBookingStatus(id, status)
      toast.success(`Booking status updated to ${status}`)

      // Update the booking in the state
      setBookings(bookings.map((booking) => (booking.id === id ? { ...booking, status } : booking)))
    } catch (error) {
      console.error("Error updating booking status:", error)
      toast.error("Failed to update booking status. Please try again.")
    } finally {
      setUpdateLoading(null)
    }
  }

  const filteredBookings = bookings.filter((booking) => {
    const matchesSearch =
      booking.car.make.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.car.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.user.email.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter ? booking.status === statusFilter : true

    return matchesSearch && matchesStatus
  })

  if (loading && bookings.length === 0) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="rounded-md bg-red-50 p-4">
        <div className="flex">
          <div className="ml-3">
            <h3 className="text-sm font-medium text-red-800">{error}</h3>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">Bookings</h1>
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
        >
          <AdjustmentsHorizontalIcon className="h-5 w-5 mr-2" />
          {showFilters ? "Hide Filters" : "Show Filters"}
        </button>
      </div>

      {showFilters && (
        <div className="bg-white shadow-md rounded-lg p-6 mb-6">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
              <label htmlFor="search" className="block text-sm font-medium text-gray-700">
                Search
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                </div>
                <input
                  type="text"
                  id="search"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
                  placeholder="Search by car, customer name or email"
                />
                {searchTerm && (
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                    <button
                      type="button"
                      onClick={() => setSearchTerm("")}
                      className="text-gray-400 hover:text-gray-500 focus:outline-none"
                    >
                      <XMarkIcon className="h-5 w-5" aria-hidden="true" />
                    </button>
                  </div>
                )}
              </div>
            </div>

            <div>
              <label htmlFor="statusFilter" className="block text-sm font-medium text-gray-700">
                Status Filter
              </label>
              <select
                id="statusFilter"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-md"
              >
                <option value="">All Statuses</option>
                <option value="PENDING">Pending</option>
                <option value="CONFIRMED">Confirmed</option>
                <option value="CANCELLED">Cancelled</option>
                <option value="COMPLETED">Completed</option>
              </select>
            </div>
          </div>

          <div className="mt-4 flex justify-end">
            <button
              type="button"
              onClick={() => {
                setSearchTerm("")
                setStatusFilter("")
              }}
              className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
            >
              <XMarkIcon className="h-5 w-5 mr-2" />
              Reset Filters
            </button>
          </div>
        </div>
      )}

      <div className="bg-white shadow overflow-hidden sm:rounded-md">
        <ul className="divide-y divide-gray-200">
          {filteredBookings.length === 0 ? (
            <li className="px-6 py-4 text-center text-gray-500">No bookings found</li>
          ) : (
            filteredBookings.map((booking) => (
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
                        <div className="text-sm font-medium text-gray-900">
                          {booking.car.make} {booking.car.model} ({booking.car.year})
                        </div>
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
                  <div className="mt-4 sm:flex sm:justify-between">
                    <div className="sm:flex">
                      <div className="flex items-center text-sm text-gray-500">
                        <UsersIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" />
                        <p>
                          {booking.user.name} ({booking.user.email})
                        </p>
                      </div>
                    </div>
                    <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                      <p>Booking #{booking.id}</p>
                      <p className="ml-4">Created: {format(new Date(booking.createdAt), "MMM dd, yyyy")}</p>
                    </div>
                  </div>
                  <div className="mt-4 flex justify-end space-x-3">
                    {booking.status === "PENDING" && (
                      <>
                        <button
                          onClick={() => handleUpdateStatus(booking.id, "CONFIRMED")}
                          disabled={updateLoading === booking.id}
                          className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                        >
                          {updateLoading === booking.id ? (
                            <svg
                              className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
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
                          ) : (
                            <CheckCircleIcon className="h-4 w-4 mr-1" />
                          )}
                          Confirm
                        </button>
                        <button
                          onClick={() => handleUpdateStatus(booking.id, "CANCELLED")}
                          disabled={updateLoading === booking.id}
                          className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                        >
                          <XCircleIcon className="h-4 w-4 mr-1" />
                          Cancel
                        </button>
                      </>
                    )}
                    {booking.status === "CONFIRMED" && (
                      <button
                        onClick={() => handleUpdateStatus(booking.id, "COMPLETED")}
                        disabled={updateLoading === booking.id}
                        className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                      >
                        <CheckCircleIcon className="h-4 w-4 mr-1" />
                        Complete
                      </button>
                    )}
                  </div>
                </div>
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  )
}

export default BookingsPage
