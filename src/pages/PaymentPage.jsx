"use client"
import { useState, useEffect } from "react"
import { useParams, useNavigate, Link } from "react-router-dom"
import { getBookingById } from "../services/bookingService"
import { processPayment } from "../services/paymentService"
import { Formik, Form, Field, ErrorMessage } from "formik"
import * as Yup from "yup"
import {
  ArrowLeftIcon,
  CreditCardIcon,
  CalendarIcon,
  LockClosedIcon,
  ExclamationCircleIcon,
} from "@heroicons/react/24/outline"
import toast from "react-hot-toast"

const PaymentSchema = Yup.object().shape({
  cardNumber: Yup.string()
    .required("Card number is required")
    .matches(/^\d{16}$/, "Card number must be 16 digits"),
  cardExpiry: Yup.string()
    .required("Expiry date is required")
    .matches(/^(0[1-9]|1[0-2])\/\d{2}$/, "Expiry date must be in MM/YY format"),
  cardCvv: Yup.string()
    .required("CVV is required")
    .matches(/^\d{3,4}$/, "CVV must be 3 or 4 digits"),
  paymentMethod: Yup.string().required("Payment method is required"),
})

const PaymentPage = () => {
  const { bookingId } = useParams()
  const navigate = useNavigate()
  const [booking, setBooking] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [processingPayment, setProcessingPayment] = useState(false)

  useEffect(() => {
    const fetchBookingDetails = async () => {
      try {
        const data = await getBookingById(bookingId)
        if (data.status !== "PENDING") {
          setError("This booking is not available for payment.")
          return
        }
        setBooking(data)
      } catch (error) {
        console.error("Error fetching booking details:", error)
        setError("Failed to load booking details. Please try again later.")
      } finally {
        setLoading(false)
      }
    }

    fetchBookingDetails()
  }, [bookingId])

  const handleSubmit = async (values) => {
    setProcessingPayment(true)
    setError("")

    try {
      const paymentData = {
        bookingId: booking.id,
        paymentMethod: values.paymentMethod,
        cardNumber: values.cardNumber,
        cardExpiry: values.cardExpiry,
        cardCvv: values.cardCvv,
      }

      await processPayment(paymentData)
      toast.success("Payment processed successfully!")
      navigate(`/booking-details/${booking.id}`)
    } catch (error) {
      console.error("Payment error:", error)
      setError(error.response?.data?.message || "Failed to process payment. Please try again.")
    } finally {
      setProcessingPayment(false)
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
            <div className="flex-shrink-0">
              <ExclamationCircleIcon className="h-5 w-5 text-red-400" aria-hidden="true" />
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800">{error}</h3>
              <div className="mt-4">
                <Link
                  to={`/booking-details/${bookingId}`}
                  className="text-sm font-medium text-red-800 hover:text-red-700"
                >
                  Go back to booking details
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
          to={`/booking-details/${bookingId}`}
          className="inline-flex items-center text-sm font-medium text-primary-600 hover:text-primary-500"
        >
          <ArrowLeftIcon className="h-5 w-5 mr-1" />
          Back to Booking Details
        </Link>
      </div>

      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-2xl leading-6 font-bold text-gray-900">Payment</h3>
          <p className="mt-1 max-w-2xl text-sm text-gray-500">Complete your payment for booking #{booking.id}</p>
        </div>

        <div className="border-t border-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="text-lg font-medium text-gray-900 mb-4">Booking Summary</h4>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Car:</span>
                    <span className="font-medium">
                      {booking.car.make} {booking.car.model} ({booking.car.year})
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Booking Period:</span>
                    <span className="font-medium">
                      {new Date(booking.startDate).toLocaleDateString()} -{" "}
                      {new Date(booking.endDate).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="border-t border-gray-200 pt-3 flex justify-between">
                    <span className="text-gray-700 font-medium">Total Amount:</span>
                    <span className="text-primary-600 font-bold">${booking.totalPrice}</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 bg-yellow-50 p-4 rounded-lg">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <LockClosedIcon className="h-5 w-5 text-yellow-400" aria-hidden="true" />
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-yellow-800">Secure Payment</h3>
                    <div className="mt-2 text-sm text-yellow-700">
                      <p>
                        This is a demo application. No real payment will be processed. You can use any valid-format
                        credit card information.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-4">
              <Formik
                initialValues={{
                  cardNumber: "",
                  cardExpiry: "",
                  cardCvv: "",
                  paymentMethod: "CREDIT_CARD",
                }}
                validationSchema={PaymentSchema}
                onSubmit={handleSubmit}
              >
                {({ isSubmitting }) => (
                  <Form className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Payment Method</label>
                      <div className="mt-1">
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center">
                            <Field
                              type="radio"
                              name="paymentMethod"
                              value="CREDIT_CARD"
                              id="credit-card"
                              className="focus:ring-primary-500 h-4 w-4 text-primary-600 border-gray-300"
                            />
                            <label htmlFor="credit-card" className="ml-2 block text-sm text-gray-700">
                              Credit Card
                            </label>
                          </div>
                          <div className="flex items-center">
                            <Field
                              type="radio"
                              name="paymentMethod"
                              value="DEBIT_CARD"
                              id="debit-card"
                              className="focus:ring-primary-500 h-4 w-4 text-primary-600 border-gray-300"
                            />
                            <label htmlFor="debit-card" className="ml-2 block text-sm text-gray-700">
                              Debit Card
                            </label>
                          </div>
                        </div>
                        <ErrorMessage name="paymentMethod" component="div" className="text-red-500 text-xs mt-1" />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700">
                        <CreditCardIcon className="h-5 w-5 inline mr-2 text-gray-400" />
                        Card Number
                      </label>
                      <div className="mt-1">
                        <Field
                          id="cardNumber"
                          name="cardNumber"
                          type="text"
                          placeholder="1234 5678 9012 3456"
                          className="shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-gray-300 rounded-md"
                        />
                        <ErrorMessage name="cardNumber" component="div" className="text-red-500 text-xs mt-1" />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="cardExpiry" className="block text-sm font-medium text-gray-700">
                          <CalendarIcon className="h-5 w-5 inline mr-2 text-gray-400" />
                          Expiry Date
                        </label>
                        <div className="mt-1">
                          <Field
                            id="cardExpiry"
                            name="cardExpiry"
                            type="text"
                            placeholder="MM/YY"
                            className="shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-gray-300 rounded-md"
                          />
                          <ErrorMessage name="cardExpiry" component="div" className="text-red-500 text-xs mt-1" />
                        </div>
                      </div>

                      <div>
                        <label htmlFor="cardCvv" className="block text-sm font-medium text-gray-700">
                          <LockClosedIcon className="h-5 w-5 inline mr-2 text-gray-400" />
                          CVV
                        </label>
                        <div className="mt-1">
                          <Field
                            id="cardCvv"
                            name="cardCvv"
                            type="text"
                            placeholder="123"
                            className="shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-gray-300 rounded-md"
                          />
                          <ErrorMessage name="cardCvv" component="div" className="text-red-500 text-xs mt-1" />
                        </div>
                      </div>
                    </div>

                    <div className="pt-4">
                      <button
                        type="submit"
                        disabled={processingPayment || isSubmitting}
                        className="w-full inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {processingPayment ? (
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
                        ) : (
                          <CreditCardIcon className="h-5 w-5 mr-2" />
                        )}
                        Pay ${booking.totalPrice}
                      </button>
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PaymentPage
