"use client"
import { useState, useEffect } from "react"
import { useParams, Link, useNavigate } from "react-router-dom"
import { getBookingById, updateBookingStatus } from "../services/bookingService"
import { getPaymentByBookingId } from "../services/paymentService"
import { format } from "date-fns"
import {
  TruckIcon,
  CalendarIcon,
  CurrencyDollarIcon,
  CheckCircleIcon,
  XCircleIcon,
  ClockIcon,
  ArrowLeftIcon,
  CreditCardIcon,
  MapPinIcon,
  UserIcon,
  ShieldCheckIcon,
  SparklesIcon,
} from "@heroicons/react/24/outline"
import toast from "react-hot-toast"

const getStatusIcon = (status) => {
  switch (status) {
    case "CONFIRMED":
      return <CheckCircleIcon className="h-6 w-6 text-green-500" />
    case "CANCELLED":
      return <XCircleIcon className="h-6 w-6 text-red-500" />
    case "PENDING":
      return <ClockIcon className="h-6 w-6 text-yellow-500" />
    case "COMPLETED":
      return <CheckCircleIcon className="h-6 w-6 text-blue-500" />
    default:
      return <ClockIcon className="h-6 w-6 text-gray-500" />
  }
}

const getStatusClass = (status) => {
  switch (status) {
    case "CONFIRMED":
      return "bg-green-100 text-green-800 border border-green-200"
    case "CANCELLED":
      return "bg-red-100 text-red-800 border border-red-200"
    case "PENDING":
      return "bg-yellow-100 text-yellow-800 border border-yellow-200"
    case "COMPLETED":
      return "bg-blue-100 text-blue-800 border border-blue-200"
    default:
      return "bg-gray-100 text-gray-800 border border-gray-200"
  }
}

const BookingDetailsPage = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [booking, setBooking] = useState(null)
  const [payment, setPayment] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [cancelLoading, setCancelLoading] = useState(false)

  useEffect(() => {
    const fetchBookingDetails = async () => {
      try {
        const bookingData = await getBookingById(id)
        setBooking(bookingData)

        // Try to fetch payment if it exists
        try {
          const paymentData = await getPaymentByBookingId(id)
          setPayment(paymentData)
        } catch (paymentError) {
          // Payment might not exist yet, which is fine
          console.log("No payment found for this booking")
        }
      } catch (error) {
        console.error("Error fetching booking details:", error)
        setError("Failed to load booking details. Please try again later.")
      } finally {
        setLoading(false)
      }
    }

    fetchBookingDetails()
  }, [id])

  const handleCancelBooking = async () => {
    if (!window.confirm("Are you sure you want to cancel this booking?")) {
      return
    }

    setCancelLoading(true)
    try {
      await updateBookingStatus(id, "CANCELLED")
      toast.success("Booking cancelled successfully")
      // Refresh booking data
      const updatedBooking = await getBookingById(id)
      setBooking(updatedBooking)
    } catch (error) {
      console.error("Error cancelling booking:", error)
      toast.error("Failed to cancel booking. Please try again.")
    } finally {
      setCancelLoading(false)
    }
  }

  const handleProceedToPayment = () => {
    navigate(`/payment/${id}`)
  }

  if (loading) {
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
            <h3 className="text-xl font-semibold text-red-800 mb-2">Failed to load booking</h3>
            <p className="text-red-600 mb-6">{error}</p>
            <Link
              to="/my-bookings"
              className="inline-flex items-center px-6 py-3 text-base font-semibold text-white bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
            >
              <ArrowLeftIcon className="h-5 w-5 mr-2" />
              Back to My Bookings
            </Link>
          </div>
        </div>
      </div>
    )
  }

  if (!booking) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <div className="bg-gradient-to-r from-gray-100 to-gray-200 rounded-2xl p-12 max-w-2xl mx-auto">
            <TruckIcon className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Booking Not Found</h2>
            <p className="text-gray-600 text-lg mb-6">The booking you're looking for doesn't exist or has been removed.</p>
            <Link
              to="/my-bookings"
              className="inline-flex items-center px-8 py-3 text-base font-semibold text-white bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
            >
              <ArrowLeftIcon className="h-5 w-5 mr-2" />
              Back to My Bookings
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
          to="/my-bookings"
          className="inline-flex items-center px-6 py-3 text-base font-semibold text-gray-700 bg-white border border-gray-300 rounded-xl shadow-sm hover:shadow-md hover:bg-gray-50 transition-all duration-200"
        >
          <ArrowLeftIcon className="h-5 w-5 mr-2" />
          Back to My Bookings
        </Link>
      </div>

      <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
        {/* Header Section */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 px-8 py-6 border-b border-blue-100">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
            <div>
              <div className="flex items-center mb-2">
                <SparklesIcon className="h-6 w-6 text-blue-500 mr-2" />
                <h1 className="text-3xl font-bold text-gray-900">Booking Details</h1>
              </div>
              <p className="text-lg text-gray-600">Booking #{booking.id}</p>
            </div>
            <div className="mt-4 lg:mt-0 flex items-center space-x-4">
              <div className="text-right">
                <p className="text-2xl font-bold text-blue-600">${booking.totalPrice}</p>
                <p className="text-gray-600 font-semibold">Total Amount</p>
              </div>
              <div className={`px-4 py-2 rounded-full text-sm font-semibold ${getStatusClass(booking.status)}`}>
                <div className="flex items-center">
                  {getStatusIcon(booking.status)}
                  <span className="ml-2">{booking.status}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 p-8">
          {/* Left Column - Booking Information */}
          <div className="space-y-6">
            {/* Car Details Card */}
            <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-6 border border-gray-200">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                <TruckIcon className="h-6 w-6 mr-2 text-blue-600" />
                Vehicle Information
              </h3>
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 h-24 w-24 bg-gradient-to-br from-gray-200 to-gray-300 rounded-xl overflow-hidden">
                  {booking.car.imageUrl ? (
                    <img
                      src={`http://localhost:8081/api/files/${booking.car.imageUrl}`}
                      alt={`${booking.car.make} ${booking.car.model}`}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="h-full w-full flex items-center justify-center">
                      <TruckIcon className="h-10 w-10 text-gray-400" />
                    </div>
                  )}
                </div>
                <div className="flex-1">
                  <h4 className="text-lg font-bold text-gray-900">
                    {booking.car.make} {booking.car.model} ({booking.car.year})
                  </h4>
                  <div className="mt-2 flex flex-wrap gap-2">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-800 border border-blue-200">
                      {booking.car.transmission}
                    </span>
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-800 border border-green-200">
                      {booking.car.fuelType}
                    </span>
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-purple-100 text-purple-800 border border-purple-200">
                      {booking.car.seats} seats
                    </span>
                  </div>
                  <div className="mt-3 flex items-center">
                    <CurrencyDollarIcon className="h-5 w-5 text-blue-600 mr-2" />
                    <span className="text-lg font-bold text-blue-600">${booking.car.pricePerDay}</span>
                    <span className="text-gray-600 ml-2">/ day</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Booking Period Card */}
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-6 border border-blue-200">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                <CalendarIcon className="h-6 w-6 mr-2 text-blue-600" />
                Rental Period
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center py-3 border-b border-blue-200">
                  <span className="text-gray-700 font-medium">Start Date</span>
                  <span className="text-lg font-bold text-gray-900">
                    {format(new Date(booking.startDate), "MMMM dd, yyyy")}
                  </span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-blue-200">
                  <span className="text-gray-700 font-medium">End Date</span>
                  <span className="text-lg font-bold text-gray-900">
                    {format(new Date(booking.endDate), "MMMM dd, yyyy")}
                  </span>
                </div>
                <div className="flex justify-between items-center py-3">
                  <span className="text-gray-700 font-medium">Booking Created</span>
                  <span className="text-sm font-medium text-gray-900">
                    {format(new Date(booking.createdAt), "MMMM dd, yyyy")}
                  </span>
                </div>
              </div>
            </div>

            {/* Location Details */}
            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-6 border border-green-200">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                <MapPinIcon className="h-6 w-6 mr-2 text-green-600" />
                Location Details
              </h3>
              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-semibold text-gray-700 mb-2">Pickup Location</h4>
                  <p className="text-gray-900">{booking.pickupLocation}</p>
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-gray-700 mb-2">Drop-off Location</h4>
                  <p className="text-gray-900">{booking.dropOffLocation}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Payment & Actions */}
          <div className="space-y-6">
            {/* Payment Information Card */}
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl p-6 border border-purple-200">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                <CreditCardIcon className="h-6 w-6 mr-2 text-purple-600" />
                Payment Information
              </h3>
              {payment ? (
                <div className="space-y-4">
                  <div className="flex justify-between items-center py-3 border-b border-purple-200">
                    <span className="text-gray-700 font-medium">Payment Status</span>
                    <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                      payment.paymentStatus === "COMPLETED"
                        ? "bg-green-100 text-green-800 border border-green-200"
                        : payment.paymentStatus === "PENDING"
                          ? "bg-yellow-100 text-yellow-800 border border-yellow-200"
                          : payment.paymentStatus === "FAILED"
                            ? "bg-red-100 text-red-800 border border-red-200"
                            : "bg-gray-100 text-gray-800 border border-gray-200"
                    }`}>
                      {payment.paymentStatus}
                    </span>
                  </div>
                  {payment.paymentStatus === "COMPLETED" && (
                    <div className="flex justify-between items-center py-3 border-b border-purple-200">
                      <span className="text-gray-700 font-medium">Paid On</span>
                      <span className="text-sm font-medium text-gray-900">
                        {format(new Date(payment.paymentDate), "MMMM dd, yyyy")}
                      </span>
                    </div>
                  )}
                  <div className="flex justify-between items-center py-3">
                    <span className="text-gray-700 font-medium">Transaction ID</span>
                    <span className="text-sm font-medium text-gray-900 truncate max-w-[150px]">
                      {payment.transactionId || "N/A"}
                    </span>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8">
                  <CreditCardIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600 mb-4">No payment information available</p>
                  {booking.status === "PENDING" && (
                    <button
                      onClick={handleProceedToPayment}
                      className="inline-flex items-center px-6 py-3 text-base font-semibold text-white bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
                    >
                      <CreditCardIcon className="h-5 w-5 mr-2" />
                      Proceed to Payment
                    </button>
                  )}
                </div>
              )}
            </div>

            {/* Booking Summary Card */}
            <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-2xl p-6 border border-orange-200">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                <CurrencyDollarIcon className="h-6 w-6 mr-2 text-orange-600" />
                Booking Summary
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center py-3 border-b border-orange-200">
                  <span className="text-gray-700 font-medium">Daily Rate</span>
                  <span className="text-lg font-bold text-gray-900">${booking.car.pricePerDay}</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-orange-200">
                  <span className="text-gray-700 font-medium">Number of Days</span>
                  <span className="text-lg font-bold text-gray-900">
                    {Math.ceil((new Date(booking.endDate) - new Date(booking.startDate)) / (1000 * 60 * 60 * 24)) + 1}
                  </span>
                </div>
                <div className="flex justify-between items-center py-4 border-t border-orange-300">
                  <span className="text-xl font-bold text-gray-900">Total Amount</span>
                  <span className="text-2xl font-bold text-blue-600">${booking.totalPrice}</span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            {booking.status === "PENDING" && (
              <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-2xl p-6 border border-red-200">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                  <ShieldCheckIcon className="h-6 w-6 mr-2 text-red-600" />
                  Booking Actions
                </h3>
                <div className="space-y-4">
                  {!payment && (
                    <button
                      onClick={handleProceedToPayment}
                      className="w-full inline-flex items-center justify-center px-6 py-3 text-base font-semibold text-white bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
                    >
                      <CreditCardIcon className="h-5 w-5 mr-2" />
                      Complete Payment
                    </button>
                  )}
                  <button
                    onClick={handleCancelBooking}
                    disabled={cancelLoading}
                    className="w-full inline-flex items-center justify-center px-6 py-3 text-base font-semibold text-white bg-gradient-to-r from-red-600 to-red-700 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 transition-all duration-200"
                  >
                    {cancelLoading ? (
                      <span className="flex items-center">
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
                        Cancelling...
                      </span>
                    ) : (
                      <span className="flex items-center">
                        <XCircleIcon className="h-5 w-5 mr-2" />
                        Cancel Booking
                      </span>
                    )}
                  </button>
                </div>
              </div>
            )}

            {/* Support Information */}
            <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-6 border border-gray-200">
              <h4 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                <UserIcon className="h-5 w-5 mr-2 text-gray-600" />
                Need Help?
              </h4>
              <p className="text-sm text-gray-600 mb-4">
                Our support team is available 24/7 to assist you with any questions about your booking.
              </p>
              <div className="space-y-2 text-sm text-gray-700">
                <div className="flex justify-between">
                  <span>Support Email:</span>
                  <span className="font-semibold">support@carrental.com</span>
                </div>
                <div className="flex justify-between">
                  <span>Support Phone:</span>
                  <span className="font-semibold">+1 (555) 123-4567</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BookingDetailsPage