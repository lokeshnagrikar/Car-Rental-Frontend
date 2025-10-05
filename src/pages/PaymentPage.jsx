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
  ShieldCheckIcon,
  SparklesIcon,
  TruckIcon,
  CheckBadgeIcon,
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
      <div className="flex justify-center items-center h-96">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading payment details...</p>
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
              <ExclamationCircleIcon className="h-8 w-8 text-red-600" />
            </div>
            <h3 className="text-xl font-semibold text-red-800 mb-2">Payment Error</h3>
            <p className="text-red-600 mb-6">{error}</p>
            <Link
              to={`/booking-details/${bookingId}`}
              className="inline-flex items-center px-6 py-3 text-base font-semibold text-white bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
            >
              <ArrowLeftIcon className="h-5 w-5 mr-2" />
              Back to Booking Details
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
            <CreditCardIcon className="h-16 w-16 text-gray-400 mx-auto mb-4" />
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
          to={`/booking-details/${bookingId}`}
          className="inline-flex items-center px-6 py-3 text-base font-semibold text-gray-700 bg-white border border-gray-300 rounded-xl shadow-sm hover:shadow-md hover:bg-gray-50 transition-all duration-200"
        >
          <ArrowLeftIcon className="h-5 w-5 mr-2" />
          Back to Booking Details
        </Link>
      </div>

      <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
        {/* Header Section */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 px-8 py-6 border-b border-blue-100">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
            <div>
              <div className="flex items-center mb-2">
                <SparklesIcon className="h-6 w-6 text-blue-500 mr-2" />
                <h1 className="text-3xl font-bold text-gray-900">Complete Payment</h1>
              </div>
              <p className="text-lg text-gray-600">Secure payment for booking #{booking.id}</p>
            </div>
            <div className="mt-4 lg:mt-0 text-center lg:text-right">
              <p className="text-4xl font-bold text-blue-600">${booking.totalPrice}</p>
              <p className="text-gray-600 font-semibold">Total Amount</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 p-8">
          {/* Left Column - Booking Summary */}
          <div className="space-y-6">
            {/* Booking Summary Card */}
            <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-6 border border-gray-200">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                <TruckIcon className="h-6 w-6 mr-2 text-blue-600" />
                Booking Summary
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center py-3 border-b border-gray-200">
                  <span className="text-gray-700 font-medium">Vehicle</span>
                  <span className="text-sm font-medium text-gray-900 text-right">
                    {booking.car.make} {booking.car.model} ({booking.car.year})
                  </span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-gray-200">
                  <span className="text-gray-700 font-medium">Rental Period</span>
                  <span className="text-sm font-medium text-gray-900 text-right">
                    {new Date(booking.startDate).toLocaleDateString()} - {new Date(booking.endDate).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-gray-200">
                  <span className="text-gray-700 font-medium">Daily Rate</span>
                  <span className="text-sm font-bold text-gray-900">${booking.car.pricePerDay}</span>
                </div>
                <div className="flex justify-between items-center py-4 border-t border-gray-300">
                  <span className="text-xl font-bold text-gray-900">Total Amount</span>
                  <span className="text-2xl font-bold text-blue-600">${booking.totalPrice}</span>
                </div>
              </div>
            </div>

            {/* Security Notice Card */}
            <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-2xl p-6 border border-yellow-200">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <ShieldCheckIcon className="h-8 w-8 text-yellow-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-yellow-800 mb-2">Demo Payment System</h3>
                  <div className="text-sm text-yellow-700 space-y-2">
                    <p>This is a demo application for testing purposes only.</p>
                    <p>No real payment will be processed. You can use any valid-format credit card information.</p>
                    <div className="mt-3 p-3 bg-yellow-200 rounded-lg">
                      <p className="text-xs font-semibold text-yellow-900">
                        Test Card: 4242 4242 4242 4242 | Exp: 12/28 | CVV: 123
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Features Included */}
            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-6 border border-green-200">
              <h4 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                <CheckBadgeIcon className="h-5 w-5 mr-2 text-green-600" />
                What You Get
              </h4>
              <ul className="text-sm text-gray-700 space-y-2">
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                  Full insurance coverage
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

          {/* Right Column - Payment Form */}
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-6 border border-blue-200">
            <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
              <CreditCardIcon className="h-6 w-6 mr-2 text-blue-600" />
              Payment Details
            </h3>

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
                  {/* Payment Method */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-800 mb-3">Payment Method</label>
                    <div className="grid grid-cols-2 gap-4">
                      <div className={`border-2 rounded-xl p-4 cursor-pointer transition-all duration-200`}>
                        <div className="flex items-center">
                          <Field
                            type="radio"
                            name="paymentMethod"
                            value="CREDIT_CARD"
                            id="credit-card"
                            className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300"
                          />
                          <label htmlFor="credit-card" className="ml-3 block text-sm font-medium text-gray-700">
                            Credit Card
                          </label>
                        </div>
                      </div>
                      <div className={`border-2 rounded-xl p-4 cursor-pointer transition-all duration-200`}>
                        <div className="flex items-center">
                          <Field
                            type="radio"
                            name="paymentMethod"
                            value="DEBIT_CARD"
                            id="debit-card"
                            className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300"
                          />
                          <label htmlFor="debit-card" className="ml-3 block text-sm font-medium text-gray-700">
                            Debit Card
                          </label>
                        </div>
                      </div>
                    </div>
                    <ErrorMessage name="paymentMethod" component="div" className="text-red-500 text-sm mt-2 font-medium" />
                  </div>

                  {/* Card Number */}
                  <div>
                    <label htmlFor="cardNumber" className="block text-sm font-semibold text-gray-800 mb-2">
                      <CreditCardIcon className="h-5 w-5 inline mr-2 text-blue-500" />
                      Card Number
                    </label>
                    <div className="mt-1">
                      <Field
                        id="cardNumber"
                        name="cardNumber"
                        type="text"
                        placeholder="4242 4242 4242 4242"
                        className="w-full px-4 py-3 text-base border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                      />
                      <ErrorMessage name="cardNumber" component="div" className="text-red-500 text-sm mt-2 font-medium" />
                    </div>
                  </div>

                  {/* Expiry & CVV */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="cardExpiry" className="block text-sm font-semibold text-gray-800 mb-2">
                        <CalendarIcon className="h-5 w-5 inline mr-2 text-blue-500" />
                        Expiry Date
                      </label>
                      <div className="mt-1">
                        <Field
                          id="cardExpiry"
                          name="cardExpiry"
                          type="text"
                          placeholder="MM/YY"
                          className="w-full px-4 py-3 text-base border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                        />
                        <ErrorMessage name="cardExpiry" component="div" className="text-red-500 text-sm mt-2 font-medium" />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="cardCvv" className="block text-sm font-semibold text-gray-800 mb-2">
                        <LockClosedIcon className="h-5 w-5 inline mr-2 text-blue-500" />
                        CVV
                      </label>
                      <div className="mt-1">
                        <Field
                          id="cardCvv"
                          name="cardCvv"
                          type="text"
                          placeholder="123"
                          className="w-full px-4 py-3 text-base border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                        />
                        <ErrorMessage name="cardCvv" component="div" className="text-red-500 text-sm mt-2 font-medium" />
                      </div>
                    </div>
                  </div>

                  {/* Security Badges */}
                  <div className="flex justify-center space-x-6 py-4">
                    <div className="text-center">
                      <div className="bg-gray-100 rounded-lg p-2 w-12 h-8 mx-auto mb-2 flex items-center justify-center">
                        <LockClosedIcon className="h-4 w-4 text-green-600" />
                      </div>
                      <span className="text-xs text-gray-600">SSL Secure</span>
                    </div>
                    <div className="text-center">
                      <div className="bg-gray-100 rounded-lg p-2 w-12 h-8 mx-auto mb-2 flex items-center justify-center">
                        <ShieldCheckIcon className="h-4 w-4 text-blue-600" />
                      </div>
                      <span className="text-xs text-gray-600">PCI Compliant</span>
                    </div>
                    <div className="text-center">
                      <div className="bg-gray-100 rounded-lg p-2 w-12 h-8 mx-auto mb-2 flex items-center justify-center">
                        <CreditCardIcon className="h-4 w-4 text-purple-600" />
                      </div>
                      <span className="text-xs text-gray-600">256-bit</span>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="pt-4">
                    <button
                      type="submit"
                      disabled={processingPayment || isSubmitting}
                      className="w-full py-4 px-6 text-lg font-semibold text-white bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 transition-all duration-200"
                    >
                      {processingPayment ? (
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
                          Processing Payment...
                        </span>
                      ) : (
                        <span className="flex items-center justify-center">
                          <CreditCardIcon className="h-5 w-5 mr-2" />
                          Pay ${booking.totalPrice}
                        </span>
                      )}
                    </button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PaymentPage