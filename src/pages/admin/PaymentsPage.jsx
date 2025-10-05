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
  ReceiptRefundIcon,
} from "@heroicons/react/24/outline"
import toast from "react-hot-toast"

const getStatusIcon = (status) => {
  switch (status) {
    case "COMPLETED":
      return <CheckCircleIcon className="h-6 w-6 text-green-500" />
    case "PENDING":
      return <ClockIcon className="h-6 w-6 text-yellow-500" />
    case "FAILED":
      return <XCircleIcon className="h-6 w-6 text-red-500" />
    case "REFUNDED":
      return <ArrowPathIcon className="h-6 w-6 text-blue-500" />
    default:
      return <ClockIcon className="h-6 w-6 text-gray-500" />
  }
}

const getStatusClass = (status) => {
  switch (status) {
    case "COMPLETED":
      return "bg-green-100 text-green-800 border border-green-200"
    case "PENDING":
      return "bg-yellow-100 text-yellow-800 border border-yellow-200"
    case "FAILED":
      return "bg-red-100 text-red-800 border border-red-200"
    case "REFUNDED":
      return "bg-blue-100 text-blue-800 border border-blue-200"
    default:
      return "bg-gray-100 text-gray-800 border border-gray-200"
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
      <div className="flex justify-center items-center h-96">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary-600"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto">
        <div className="rounded-2xl bg-red-50 border border-red-200 p-8 text-center">
          <div className="flex flex-col items-center">
            <div className="rounded-full bg-red-100 p-4 mb-4">
              <CurrencyDollarIcon className="h-8 w-8 text-red-600" />
            </div>
            <h3 className="text-xl font-semibold text-red-800 mb-2">Failed to load payments</h3>
            <p className="text-red-600">{error}</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Payment Management</h1>
        <p className="mt-2 text-lg text-gray-600">View and manage all payment transactions</p>
      </div>

      {/* Filters Section */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 mb-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Search Input */}
          <div>
            <label htmlFor="search" className="block text-sm font-semibold text-gray-800 mb-2">
              Search Transactions
            </label>
            <div className="relative rounded-xl shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
              </div>
              <input
                type="text"
                id="search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="block w-full pl-12 pr-12 py-3 text-base border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200"
                placeholder="Search by transaction ID..."
              />
              {searchTerm && (
                <div className="absolute inset-y-0 right-0 pr-4 flex items-center">
                  <button
                    type="button"
                    onClick={() => setSearchTerm("")}
                    className="text-gray-400 hover:text-gray-600 focus:outline-none transition-colors duration-200"
                  >
                    <XMarkIcon className="h-5 w-5" aria-hidden="true" />
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Status Filter */}
          <div>
            <label htmlFor="statusFilter" className="block text-sm font-semibold text-gray-800 mb-2">
              Filter by Status
            </label>
            <select
              id="statusFilter"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="block w-full pl-4 pr-10 py-3 text-base border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200"
            >
              <option value="">All Statuses</option>
              <option value="PENDING">Pending</option>
              <option value="COMPLETED">Completed</option>
              <option value="FAILED">Failed</option>
              <option value="REFUNDED">Refunded</option>
            </select>
          </div>
        </div>
      </div>

      {/* Payments Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {filteredPayments.length === 0 ? (
          <div className="col-span-2">
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-12 text-center">
              <CurrencyDollarIcon className="mx-auto h-16 w-16 text-gray-400 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No payments found</h3>
              <p className="text-gray-600 mb-6">
                {searchTerm || statusFilter
                  ? "Try adjusting your search or filter criteria"
                  : "No payment transactions available"}
              </p>
              {(searchTerm || statusFilter) && (
                <button
                  onClick={() => {
                    setSearchTerm("")
                    setStatusFilter("")
                  }}
                  className="px-6 py-3 text-base font-semibold text-primary-600 bg-primary-50 rounded-lg hover:bg-primary-100 transition-colors duration-200"
                >
                  Clear Filters
                </button>
              )}
            </div>
          </div>
        ) : (
          filteredPayments.map((payment) => (
            <div
              key={payment.id}
              className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              {/* Payment Header */}
              <div className="bg-gradient-to-r from-gray-50 to-gray-100 px-6 py-4 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    {getStatusIcon(payment.paymentStatus)}
                    <div>
                      <h3 className="text-lg font-bold text-gray-900">Booking #{payment.bookingId}</h3>
                      <p className="text-sm text-gray-600">Transaction: {payment.transactionId}</p>
                    </div>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusClass(payment.paymentStatus)}`}
                  >
                    {payment.paymentStatus}
                  </span>
                </div>
              </div>

              {/* Payment Details */}
              <div className="p-6">
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <p className="text-sm font-semibold text-gray-600">Amount</p>
                    <p className="text-2xl font-bold text-gray-900">${payment.amount}</p>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-600">Payment Method</p>
                    <p className="text-lg font-medium text-gray-900">{payment.paymentMethod}</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="text-sm text-gray-600">Payment Date</span>
                    <span className="text-sm font-medium text-gray-900">
                      {payment.paymentDate
                        ? format(new Date(payment.paymentDate), "MMM dd, yyyy 'at' HH:mm")
                        : "Not processed"}
                    </span>
                  </div>
                  
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="text-sm text-gray-600">Transaction ID</span>
                    <span className="text-sm font-medium text-gray-900 truncate max-w-[200px]">
                      {payment.transactionId}
                    </span>
                  </div>
                </div>

                {/* Refund Button */}
                {payment.paymentStatus === "COMPLETED" && (
                  <div className="mt-6 pt-4 border-t border-gray-200">
                    <button
                      onClick={() => handleRefund(payment.id)}
                      disabled={refundLoading === payment.id}
                      className="w-full inline-flex items-center justify-center px-4 py-3 text-sm font-semibold text-white bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl hover:from-blue-700 hover:to-blue-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-105 disabled:hover:scale-100"
                    >
                      {refundLoading === payment.id ? (
                        <>
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
                          Processing Refund...
                        </>
                      ) : (
                        <>
                          <ReceiptRefundIcon className="h-5 w-5 mr-2" />
                          Process Refund
                        </>
                      )}
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Results Count */}
      {filteredPayments.length > 0 && (
        <div className="mt-8 text-center">
          <p className="text-gray-600">
            Showing <span className="font-semibold">{filteredPayments.length}</span> payment{filteredPayments.length !== 1 ? 's' : ''}
            {searchTerm && (
              <span> for "<span className="font-semibold">{searchTerm}</span>"</span>
            )}
            {statusFilter && (
              <span> with status "<span className="font-semibold">{statusFilter}</span>"</span>
            )}
          </p>
        </div>
      )}
    </div>
  )
}

export default PaymentsPage