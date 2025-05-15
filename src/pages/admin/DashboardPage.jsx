"use client"
import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { getAllCars } from "../../services/carService"
import { getAllBookings } from "../../services/bookingService"
import { getAllUsers } from "../../services/userService"
import { getAllPayments } from "../../services/paymentService"
import { UsersIcon, CurrencyDollarIcon, ShoppingBagIcon, TruckIcon } from "@heroicons/react/24/outline"
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
            backgroundColor: "rgba(99, 102, 241, 0.5)",
            tension: 0.3,
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
              "rgba(255, 99, 132, 0.6)",
              "rgba(54, 162, 235, 0.6)",
              "rgba(255, 206, 86, 0.6)",
              "rgba(75, 192, 192, 0.6)",
              "rgba(153, 102, 255, 0.6)",
            ],
            borderColor: [
              "rgba(255, 99, 132, 1)",
              "rgba(54, 162, 235, 1)",
              "rgba(255, 206, 86, 1)",
              "rgba(75, 192, 192, 1)",
              "rgba(153, 102, 255, 1)",
            ],
            borderWidth: 1,
          },
        ],
      },
      bookingStatus: {
        labels: Object.keys(bookingStatusCounts),
        datasets: [
          {
            data: Object.values(bookingStatusCounts),
            backgroundColor: [
              "rgba(255, 206, 86, 0.6)", // Pending - Yellow
              "rgba(54, 162, 235, 0.6)", // Confirmed - Blue
              "rgba(75, 192, 192, 0.6)", // Completed - Green
              "rgba(255, 99, 132, 0.6)", // Cancelled - Red
            ],
            borderColor: [
              "rgba(255, 206, 86, 1)",
              "rgba(54, 162, 235, 1)",
              "rgba(75, 192, 192, 1)",
              "rgba(255, 99, 132, 1)",
            ],
            borderWidth: 1,
          },
        ],
      },
      revenue: {
        labels: last6Months,
        datasets: [
          {
            label: "Monthly Revenue ($)",
            data: monthlyRevenue,
            backgroundColor: "rgba(75, 192, 192, 0.6)",
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
      },
    },
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
      <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
      <p className="mt-2 text-sm text-gray-700">An overview of your car rental business</p>

      {/* Stats */}
      <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {/* Cars Stats */}
        <div className="bg-white overflow-hidden shadow rounded-lg hover:shadow-md transition-shadow duration-300">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-indigo-100 rounded-full p-3">
                <TruckIcon className="h-6 w-6 text-indigo-600" aria-hidden="true" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Total Cars</dt>
                  <dd>
                    <div className="text-lg font-semibold text-gray-900">{stats.totalCars}</div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-5 py-3">
            <div className="text-sm">
              <Link to="/admin/cars" className="font-medium text-primary-700 hover:text-primary-900">
                View all cars
              </Link>
            </div>
          </div>
        </div>

        {/* Bookings Stats */}
        <div className="bg-white overflow-hidden shadow rounded-lg hover:shadow-md transition-shadow duration-300">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-blue-100 rounded-full p-3">
                <ShoppingBagIcon className="h-6 w-6 text-blue-600" aria-hidden="true" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Total Bookings</dt>
                  <dd>
                    <div className="text-lg font-semibold text-gray-900">{stats.totalBookings}</div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-5 py-3">
            <div className="text-sm">
              <Link to="/admin/bookings" className="font-medium text-primary-700 hover:text-primary-900">
                View all bookings
              </Link>
            </div>
          </div>
        </div>

        {/* Users Stats */}
        <div className="bg-white overflow-hidden shadow rounded-lg hover:shadow-md transition-shadow duration-300">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-purple-100 rounded-full p-3">
                <UsersIcon className="h-6 w-6 text-purple-600" aria-hidden="true" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Total Users</dt>
                  <dd>
                    <div className="text-lg font-semibold text-gray-900">{stats.totalUsers}</div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-5 py-3">
            <div className="text-sm">
              <Link to="/admin/users" className="font-medium text-primary-700 hover:text-primary-900">
                View all users
              </Link>
            </div>
          </div>
        </div>

        {/* Revenue Stats */}
        <div className="bg-white overflow-hidden shadow rounded-lg hover:shadow-md transition-shadow duration-300">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-green-100 rounded-full p-3">
                <CurrencyDollarIcon className="h-6 w-6 text-green-600" aria-hidden="true" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Total Revenue</dt>
                  <dd>
                    <div className="text-lg font-semibold text-gray-900">${stats.totalRevenue.toFixed(2)}</div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-5 py-3">
            <div className="text-sm">
              <Link to="/admin/payments" className="font-medium text-primary-700 hover:text-primary-900">
                View all payments
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Monthly Bookings Chart */}
        <div className="bg-white rounded-lg shadow p-6 hover:shadow-md transition-shadow duration-300">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Monthly Bookings</h2>
          <div className="h-80">{chartData.monthly && <Line options={chartOptions} data={chartData.monthly} />}</div>
        </div>

        {/* Monthly Revenue Chart */}
        <div className="bg-white rounded-lg shadow p-6 hover:shadow-md transition-shadow duration-300">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Monthly Revenue</h2>
          <div className="h-80">{chartData.revenue && <Bar options={chartOptions} data={chartData.revenue} />}</div>
        </div>

        {/* Car Types Chart */}
        <div className="bg-white rounded-lg shadow p-6 hover:shadow-md transition-shadow duration-300">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Car Types Distribution</h2>
          <div className="h-80">{chartData.carTypes && <Pie options={chartOptions} data={chartData.carTypes} />}</div>
        </div>

        {/* Booking Status Chart */}
        <div className="bg-white rounded-lg shadow p-6 hover:shadow-md transition-shadow duration-300">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Booking Status</h2>
          <div className="h-80">
            {chartData.bookingStatus && <Pie options={chartOptions} data={chartData.bookingStatus} />}
          </div>
        </div>
      </div>

      {/* Recent Bookings */}
      <div className="mt-8">
        <h2 className="text-lg font-medium text-gray-900">Recent Bookings</h2>
        <div className="mt-4 bg-white shadow overflow-hidden sm:rounded-md">
          <ul className="divide-y divide-gray-200">
            {recentBookings.length === 0 ? (
              <li className="px-6 py-4 text-center text-gray-500">No recent bookings found</li>
            ) : (
              recentBookings.map((booking) => (
                <li key={booking.id} className="hover:bg-gray-50 transition-colors duration-200">
                  <div className="px-4 py-4 sm:px-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 overflow-hidden rounded-md">
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
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {booking.car.make} {booking.car.model}
                          </div>
                          <div className="text-sm text-gray-500">
                            {new Date(booking.startDate).toLocaleDateString()} -{" "}
                            {new Date(booking.endDate).toLocaleDateString()}
                          </div>
                        </div>
                      </div>
                      <div className="ml-2 flex-shrink-0 flex">
                        <Link
                          to={`/admin/bookings/${booking.id}`}
                          className="px-2.5 py-1.5 border border-transparent text-xs font-medium rounded text-primary-700 bg-primary-100 hover:bg-primary-200 mr-2"
                        >
                          View
                        </Link>
                        <span
                          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
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
                    </div>
                    <div className="mt-2 sm:flex sm:justify-between">
                      <div className="sm:flex">
                        <div className="flex items-center text-sm text-gray-500">
                          <UsersIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" />
                          {booking.user.name}
                        </div>
                      </div>
                      <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                        <CurrencyDollarIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" />
                        <p>${booking.totalPrice.toFixed(2)}</p>
                      </div>
                    </div>
                  </div>
                </li>
              ))
            )}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default DashboardPage
