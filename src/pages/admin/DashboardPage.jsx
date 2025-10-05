"use client"
import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { getAllCars } from "../../services/carService"
import { getAllBookings } from "../../services/bookingService"
import { getAllUsers } from "../../services/userService"
import { getAllPayments } from "../../services/paymentService"
import { UsersIcon, CurrencyDollarIcon, ShoppingBagIcon, TruckIcon, CalendarIcon } from "@heroicons/react/24/outline"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js"
import { Line, Bar, Pie } from "react-chartjs-2"

// Register ChartJS components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, ArcElement, Title, Tooltip, Legend)

const DashboardPage = () => {
  const [stats, setStats] = useState({
    totalCars: 0,
    availableCars: 0,
    totalBookings: 0,
    pendingBookings: 0,
    totalUsers: 0,
    totalRevenue: 0,
  })
  const [recentBookings, setRecentBookings] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [chartData, setChartData] = useState({
    monthly: null,
    carTypes: null,
    bookingStatus: null,
    revenue: null,
  })

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // Fetch all required data
        const [cars, bookings, users, payments] = await Promise.all([
          getAllCars(),
          getAllBookings(),
          getAllUsers(),
          getAllPayments(),
        ])

        // Calculate stats
        const availableCars = cars.filter((car) => car.available).length
        const pendingBookings = bookings.filter((booking) => booking.status === "PENDING").length
        const completedPayments = payments.filter((payment) => payment.paymentStatus === "COMPLETED")
        const totalRevenue = completedPayments.reduce((sum, payment) => sum + payment.amount, 0)

        // Set stats
        setStats({
          totalCars: cars.length,
          availableCars,
          totalBookings: bookings.length,
          pendingBookings,
          totalUsers: users.length,
          totalRevenue,
        })

        // Get recent bookings (last 5)
        const sortedBookings = [...bookings].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 5)
        setRecentBookings(sortedBookings)

        // Prepare chart data
        prepareChartData(bookings, cars, payments)
      } catch (error) {
        console.error("Error fetching dashboard data:", error)
        setError("Failed to load dashboard data. Please try again later.")
      } finally {
        setLoading(false)
      }
    }

    fetchDashboardData()
  }, [])

  const prepareChartData = (bookings, cars, payments) => {
    // Monthly Bookings Chart
    const last6Months = Array.from({ length: 6 }, (_, i) => {
      const date = new Date()
      date.setMonth(date.getMonth() - i)
      return date.toLocaleString("default", { month: "short" })
    }).reverse()

    const monthlyBookingCounts = last6Months.map((month) => {
      return bookings.filter((booking) => {
        const bookingMonth = new Date(booking.createdAt).toLocaleString("default", { month: "short" })
        return bookingMonth === month
      }).length
    })

    // Car Types Chart
    const carTypes = {}
    cars.forEach((car) => {
      carTypes[car.type] = (carTypes[car.type] || 0) + 1
    })

    // Booking Status Chart
    const bookingStatusCounts = {
      PENDING: bookings.filter((booking) => booking.status === "PENDING").length,
      CONFIRMED: bookings.filter((booking) => booking.status === "CONFIRMED").length,
      COMPLETED: bookings.filter((booking) => booking.status === "COMPLETED").length,
      CANCELLED: bookings.filter((booking) => booking.status === "CANCELLED").length,
    }

    // Monthly Revenue Chart
    const monthlyRevenue = last6Months.map((month) => {
      return payments
        .filter((payment) => {
          const paymentMonth = new Date(payment.createdAt).toLocaleString("default", { month: "short" })
          return paymentMonth === month && payment.paymentStatus === "COMPLETED"
        })
        .reduce((sum, payment) => sum + payment.amount, 0)
    })

    setChartData({
      monthly: {
        labels: last6Months,
        datasets: [
          {
            label: "Monthly Bookings",
            data: monthlyBookingCounts,
            borderColor: "rgb(99, 102, 241)",
            backgroundColor: "rgba(99, 102, 241, 0.1)",
            borderWidth: 3,
            tension: 0.4,
            fill: true,
          },
        ],
      },
      carTypes: {
        labels: Object.keys(carTypes),
        datasets: [
          {
            label: "Car Types",
            data: Object.values(carTypes),
            backgroundColor: [
              "rgba(99, 102, 241, 0.8)",
              "rgba(59, 130, 246, 0.8)",
              "rgba(16, 185, 129, 0.8)",
              "rgba(245, 158, 11, 0.8)",
              "rgba(139, 92, 246, 0.8)",
            ],
            borderColor: [
              "rgba(99, 102, 241, 1)",
              "rgba(59, 130, 246, 1)",
              "rgba(16, 185, 129, 1)",
              "rgba(245, 158, 11, 1)",
              "rgba(139, 92, 246, 1)",
            ],
            borderWidth: 2,
          },
        ],
      },
      bookingStatus: {
        labels: Object.keys(bookingStatusCounts),
        datasets: [
          {
            data: Object.values(bookingStatusCounts),
            backgroundColor: [
              "rgba(245, 158, 11, 0.8)", // Pending - Yellow
              "rgba(59, 130, 246, 0.8)", // Confirmed - Blue
              "rgba(16, 185, 129, 0.8)", // Completed - Green
              "rgba(239, 68, 68, 0.8)", // Cancelled - Red
            ],
            borderColor: [
              "rgba(245, 158, 11, 1)",
              "rgba(59, 130, 246, 1)",
              "rgba(16, 185, 129, 1)",
              "rgba(239, 68, 68, 1)",
            ],
            borderWidth: 2,
          },
        ],
      },
      revenue: {
        labels: last6Months,
        datasets: [
          {
            label: "Monthly Revenue ($)",
            data: monthlyRevenue,
            backgroundColor: "rgba(16, 185, 129, 0.8)",
            borderColor: "rgba(16, 185, 129, 1)",
            borderWidth: 2,
            borderRadius: 6,
          },
        ],
      },
    })
  }

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
        labels: {
          font: {
            size: 12,
            family: "'Inter', sans-serif",
          },
          padding: 20,
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: "rgba(0, 0, 0, 0.05)",
        },
      },
      x: {
        grid: {
          color: "rgba(0, 0, 0, 0.05)",
        },
      },
    },
  }

  if (loading) {
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
              <ShoppingBagIcon className="h-8 w-8 text-red-600" />
            </div>
            <h3 className="text-xl font-semibold text-red-800 mb-2">Failed to load dashboard</h3>
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
        <h1 className="text-4xl font-bold text-gray-900">Dashboard Overview</h1>
        <p className="mt-3 text-lg text-gray-600">Welcome to your car rental management dashboard</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
        {/* Cars Stats */}
        <div className="bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl shadow-xl text-white p-6 transform hover:scale-105 transition-all duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-primary-100 text-sm font-semibold">Total Cars</p>
              <p className="text-3xl font-bold mt-2">{stats.totalCars}</p>
              <p className="text-primary-200 text-sm mt-1">{stats.availableCars} available</p>
            </div>
            <div className="bg-white bg-opacity-20 rounded-xl p-4">
              <TruckIcon className="h-8 w-8" />
            </div>
          </div>
          <Link to="/admin/cars" className="inline-flex items-center mt-4 text-sm text-primary-100 hover:text-white font-medium">
            Manage fleet →
          </Link>
        </div>

        {/* Bookings Stats */}
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl shadow-xl text-white p-6 transform hover:scale-105 transition-all duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100 text-sm font-semibold">Total Bookings</p>
              <p className="text-3xl font-bold mt-2">{stats.totalBookings}</p>
              <p className="text-blue-200 text-sm mt-1">{stats.pendingBookings} pending</p>
            </div>
            <div className="bg-white bg-opacity-20 rounded-xl p-4">
              <ShoppingBagIcon className="h-8 w-8" />
            </div>
          </div>
          <Link to="/admin/bookings" className="inline-flex items-center mt-4 text-sm text-blue-100 hover:text-white font-medium">
            View bookings →
          </Link>
        </div>

        {/* Users Stats */}
        <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl shadow-xl text-white p-6 transform hover:scale-105 transition-all duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-100 text-sm font-semibold">Total Users</p>
              <p className="text-3xl font-bold mt-2">{stats.totalUsers}</p>
              <p className="text-purple-200 text-sm mt-1">Registered customers</p>
            </div>
            <div className="bg-white bg-opacity-20 rounded-xl p-4">
              <UsersIcon className="h-8 w-8" />
            </div>
          </div>
          <Link to="/admin/users" className="inline-flex items-center mt-4 text-sm text-purple-100 hover:text-white font-medium">
            Manage users →
          </Link>
        </div>

        {/* Revenue Stats */}
        <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-2xl shadow-xl text-white p-6 transform hover:scale-105 transition-all duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100 text-sm font-semibold">Total Revenue</p>
              <p className="text-3xl font-bold mt-2">${stats.totalRevenue.toFixed(2)}</p>
              <p className="text-green-200 text-sm mt-1">All time earnings</p>
            </div>
            <div className="bg-white bg-opacity-20 rounded-xl p-4">
              <CurrencyDollarIcon className="h-8 w-8" />
            </div>
          </div>
          <Link to="/admin/payments" className="inline-flex items-center mt-4 text-sm text-green-100 hover:text-white font-medium">
            View payments →
          </Link>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 mb-8">
        {/* Monthly Bookings Chart */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-all duration-300">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">Monthly Bookings Trend</h2>
            <CalendarIcon className="h-6 w-6 text-primary-600" />
          </div>
          <div className="h-80">
            {chartData.monthly && <Line data={chartData.monthly} options={chartOptions} />}
          </div>
        </div>

        {/* Monthly Revenue Chart */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-all duration-300">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">Revenue Overview</h2>
            <CurrencyDollarIcon className="h-6 w-6 text-green-600" />
          </div>
          <div className="h-80">
            {chartData.revenue && <Bar data={chartData.revenue} options={chartOptions} />}
          </div>
        </div>

        {/* Car Types Chart */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-all duration-300">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">Fleet Distribution</h2>
            <TruckIcon className="h-6 w-6 text-blue-600" />
          </div>
          <div className="h-80">
            {chartData.carTypes && <Pie data={chartData.carTypes} options={chartOptions} />}
          </div>
        </div>

        {/* Booking Status Chart */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-all duration-300">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">Booking Status</h2>
            <ShoppingBagIcon className="h-6 w-6 text-purple-600" />
          </div>
          <div className="h-80">
            {chartData.bookingStatus && <Pie data={chartData.bookingStatus} options={chartOptions} />}
          </div>
        </div>
      </div>

      {/* Recent Bookings */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-all duration-300">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900">Recent Bookings</h2>
          <Link 
            to="/admin/bookings" 
            className="text-primary-600 hover:text-primary-700 font-semibold text-sm"
          >
            View All →
          </Link>
        </div>
        
        <div className="space-y-4">
          {recentBookings.length === 0 ? (
            <div className="text-center py-8">
              <ShoppingBagIcon className="mx-auto h-12 w-12 text-gray-400 mb-4" />
              <p className="text-gray-500 text-lg">No recent bookings found</p>
            </div>
          ) : (
            recentBookings.map((booking) => (
              <div 
                key={booking.id} 
                className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors duration-200"
              >
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0 h-12 w-12 bg-white rounded-lg overflow-hidden border border-gray-200">
                    {booking.car.imageUrl ? (
                      <img
                        src={`http://localhost:8081/api/files/${booking.car.imageUrl}`}
                        alt={`${booking.car.make} ${booking.car.model}`}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="h-full w-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                        <TruckIcon className="h-6 w-6 text-gray-400" />
                      </div>
                    )}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      {booking.car.make} {booking.car.model}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {new Date(booking.startDate).toLocaleDateString()} - {new Date(booking.endDate).toLocaleDateString()}
                    </p>
                    <p className="text-sm text-gray-500 flex items-center mt-1">
                      <UsersIcon className="h-4 w-4 mr-1" />
                      {booking.user.name}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <p className="text-lg font-bold text-gray-900">${booking.totalPrice.toFixed(2)}</p>
                    <span
                      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${
                        booking.status === "CONFIRMED"
                          ? "bg-green-100 text-green-800"
                          : booking.status === "CANCELLED"
                            ? "bg-red-100 text-red-800"
                            : booking.status === "PENDING"
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-blue-100 text-blue-800"
                      }`}
                    >
                      {booking.status}
                    </span>
                  </div>
                  <Link
                    to={`/booking-details/${booking.id}`}
                    className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors duration-200 font-semibold text-sm"
                  >
                    View
                  </Link>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}

export default DashboardPage