"use client"
import { useState, useEffect } from "react"
import { getAllPayments, refundPayment } from "../../services/paymentService"
import { format } from "date-fns"
import {
  CurrencyDollarIcon,
  CheckCircleIcon,
  XCircleIcon,
  ClockIcon,
  MagnifyingGlassIcon,
  XMarkIcon,
  ArrowPathIcon,
} from "@heroicons/react/24/outline"
import toast from "react-hot-toast"

const getStatusIcon = (status) => {
  switch (status) {
    case "COMPLETED":
      return <CheckCircleIcon className="h-5 w-5 text-green-500" />
    case "PENDING":
      return <ClockIcon className="h-5 w-5 text-yellow-500" />
    case "FAILED":
      return <XCircleIcon className="h-5 w-5 text-red-500" />
    case "REFUNDED":
      return <ArrowPathIcon className="h-5 w-5 text-blue-500" />
    default:
      return <ClockIcon className="h-5 w-5 text-gray-500" />
  }
}

const getStatusClass = (status) => {
  switch (status) {
    case "COMPLETED":
      return "bg-green-100 text-green-800"
    case "PENDING":
      return "bg-yellow-100 text-yellow-800"
    case "FAILED":
      return "bg-red-100 text-red-800"
    case "REFUNDED":
      return "bg-blue-100 text-blue-800"
    default:
      return "bg-gray-100 text-gray-800"
  }
}

const PaymentsPage = () => {
  const [payments, setPayments] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("")
  const [refundLoading, setRefundLoading] = useState(null)

  useEffect(() => {
    fetchPayments()
  }, [])

  const fetchPayments = async () => {
    setLoading(true)
    try {
      const data = await getAllPayments()
      setPayments(data)
    } catch (error) {
      console.error("Error fetching payments:", error)
      setError("Failed to load payments. Please try again later.")
    } finally {
      setLoading(false)
    }
  }

  const handleRefund = async (id) => {
    if (!window.confirm("Are you sure you want to refund this payment?")) {
      return
    }

    setRefundLoading(id)
    try {
      await refundPayment(id)
      toast.success("Payment refunded successfully")
      // Refresh payment data
      fetchPayments()
    } catch (error) {
      console.error("Error refunding payment:", error)
      toast.error("Failed to refund payment. Please try again.")
    } finally {
      setRefundLoading(null)
    }
  }

  const filteredPayments = payments.filter((payment) => {
    const matchesSearch = payment.transactionId?.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter ? payment.paymentStatus === statusFilter : true
    return matchesSearch && matchesStatus
  })

  if (loading && payments.length === 0) {
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
        <h1 className="text-2xl font-semibold text-gray-900">Payments</h1>
      </div>

      <div className="mb-6 grid grid-cols-1 gap-6 md:grid-cols-2">
        <div>
          <label htmlFor="search" className="block text-sm font-medium text-gray-700">
            Search by Transaction ID
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
              placeholder="Search by transaction ID"
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
            <option value="COMPLETED">Completed</option>
            <option value="FAILED">Failed</option>
            <option value="REFUNDED">Refunded</option>
          </select>
        </div>
      </div>

      <div className="bg-white shadow overflow-hidden sm:rounded-md">
        <ul className="divide-y divide-gray-200">
          {filteredPayments.length === 0 ? (
            <li className="px-6 py-4 text-center text-gray-500">No payments found</li>
          ) : (
            filteredPayments.map((payment) => (
              <li key={payment.id}>
                <div className="px-4 py-4 sm:px-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-sm font-medium text-gray-900">Booking #{payment.bookingId}</div>
                      <div className="mt-1 text-sm text-gray-500">Transaction ID: {payment.transactionId}</div>
                    </div>
                    <div className="flex flex-col items-end">
                      <div className="text-sm font-medium text-gray-900">${payment.amount}</div>
                      <div className="mt-2 flex items-center">
                        {getStatusIcon(payment.paymentStatus)}
                        <span
                          className={`ml-1 px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusClass(
                            payment.paymentStatus,
                          )}`}
                        >
                          {payment.paymentStatus}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 sm:flex sm:justify-between">
                    <div className="sm:flex">
                      <div className="flex items-center text-sm text-gray-500">
                        <CurrencyDollarIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" />
                        <p>{payment.paymentMethod}</p>
                      </div>
                    </div>
                    <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                      <p>
                        {payment.paymentDate
                          ? format(new Date(payment.paymentDate), "MMM dd, yyyy HH:mm")
                          : "Not processed yet"}
                      </p>
                    </div>
                  </div>
                  {payment.paymentStatus === "COMPLETED" && (
                    <div className="mt-4 flex justify-end">
                      <button
                        onClick={() => handleRefund(payment.id)}
                        disabled={refundLoading === payment.id}
                        className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                      >
                        {refundLoading === payment.id ? (
                          <svg
                            className="animate-spin -ml-1 mr-2 h-4 w-4 text-blue-700"
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
                          <ArrowPathIcon className="h-4 w-4 mr-1" />
                        )}
                        Refund
                      </button>
                    </div>
                  )}
                </div>
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  )
}

export default PaymentsPage
