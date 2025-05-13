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
                <Link to="/my-bookings" className="text-sm font-medium text-red-800 hover:text-red-700">
                  Go back to my bookings
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!booking) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900">Booking not found</h2>
          <p className="mt-2 text-gray-600">The booking you're looking for doesn't exist or has been removed.</p>
          <div className="mt-6">
            <Link
              to="/my-bookings"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
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
      <div className="mb-6">
        <Link
          to="/my-bookings"
          className="inline-flex items-center text-sm font-medium text-primary-600 hover:text-primary-500"
        >
          <ArrowLeftIcon className="h-5 w-5 mr-1" />
          Back to My Bookings
        </Link>
      </div>

      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
          <div>
            <h3 className="text-2xl leading-6 font-bold text-gray-900">Booking Details</h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">Booking #{booking.id}</p>
          </div>
          <div className="flex items-center">
            {getStatusIcon(booking.status)}
            <span
              className={`ml-1 px-3 py-1 inline-flex text-sm leading-5 font-semibold rounded-full ${getStatusClass(
                booking.status,
              )}`}
            >
              {booking.status}
            </span>
          </div>
        </div>

        <div className="border-t border-gray-200">
          <dl>
            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Car</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2 flex items-center">
                <div className="flex-shrink-0 h-10 w-10 overflow-hidden rounded-md mr-3">
                  {booking.car.imageUrl ? (
                    <img
                      src={`http://localhost:8081/api/files/${booking.car.imageUrl}`}
                      alt={`${booking.car.make} ${booking.car.model}`}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="h-full w-full bg-gray-200 flex items-center justify-center">
                      <TruckIcon className="h-6 w-6 text-gray-400" />
                    </div>
                  )}
                </div>
                <span>
                  {booking.car.make} {booking.car.model} ({booking.car.year})
                </span>
              </dd>
            </div>
            <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Booking Period</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                <div className="flex items-center">
                  <CalendarIcon className="h-5 w-5 text-gray-400 mr-2" />
                  {format(new Date(booking.startDate), "MMMM dd, yyyy")} -{" "}
                  {format(new Date(booking.endDate), "MMMM dd, yyyy")}
                </div>
              </dd>
            </div>
            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Total Price</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                <div className="flex items-center">
                  <CurrencyDollarIcon className="h-5 w-5 text-gray-400 mr-2" />
                  <span className="font-semibold">${booking.totalPrice}</span>
                </div>
              </dd>
            </div>
            <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Booking Date</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {format(new Date(booking.createdAt), "MMMM dd, yyyy")}
              </dd>
            </div>
            {payment && (
              <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Payment Status</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  <div className="flex items-center">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        payment.paymentStatus === "COMPLETED"
                          ? "bg-green-100 text-green-800"
                          : payment.paymentStatus === "PENDING"
                            ? "bg-yellow-100 text-yellow-800"
                            : payment.paymentStatus === "FAILED"
                              ? "bg-red-100 text-red-800"
                              : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {payment.paymentStatus}
                    </span>
                    {payment.paymentStatus === "COMPLETED" && (
                      <span className="ml-2 text-gray-500">
                        Paid on {format(new Date(payment.paymentDate), "MMMM dd, yyyy")}
                      </span>
                    )}
                  </div>
                </dd>
              </div>
            )}
          </dl>
        </div>

        <div className="px-4 py-5 sm:px-6 border-t border-gray-200">
          <div className="flex justify-end space-x-3">
            {booking.status === "PENDING" && (
              <>
                <button
                  onClick={handleCancelBooking}
                  disabled={cancelLoading}
                  className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                >
                  {cancelLoading ? (
                    <svg
                      className="animate-spin -ml-1 mr-2 h-4 w-4 text-gray-700"
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
                    <XCircleIcon className="h-5 w-5 mr-2 text-gray-400" />
                  )}
                  Cancel Booking
                </button>

                {!payment && (
                  <button
                    onClick={handleProceedToPayment}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                  >
                    <CreditCardIcon className="h-5 w-5 mr-2" />
                    Proceed to Payment
                  </button>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default BookingDetailsPage
