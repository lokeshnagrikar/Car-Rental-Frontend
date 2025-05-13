"use client"
import { useState } from "react"
import { Outlet, Link, useNavigate, useLocation } from "react-router-dom"
import { useAuth } from "../contexts/AuthContext"
import {
  Bars3Icon,
  XMarkIcon,
  UserCircleIcon,
  ChartBarIcon,
  UsersIcon,
  CreditCardIcon,
  ShoppingBagIcon,
  PowerIcon,
  TruckIcon,
} from "@heroicons/react/24/outline"

const AdminLayout = () => {
  const { currentUser, logout } = useAuth()
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()

  const handleLogout = () => {
    logout()
    navigate("/")
  }

  const navigation = [
    { name: "Dashboard", href: "/admin", icon: ChartBarIcon },
    { name: "Cars", href: "/admin/cars", icon: TruckIcon },
    { name: "Bookings", href: "/admin/bookings", icon: ShoppingBagIcon },
    { name: "Users", href: "/admin/users", icon: UsersIcon },
    { name: "Payments", href: "/admin/payments", icon: CreditCardIcon },
  ]

  const isActive = (path) => {
    return location.pathname === path
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Sidebar for desktop */}
      <div className="hidden md:fixed md:inset-y-0 md:flex md:w-64 md:flex-col">
        <div className="flex min-h-0 flex-1 flex-col border-r border-gray-200 bg-white">
          <div className="flex flex-1 flex-col overflow-y-auto pt-5 pb-4">
            <div className="flex flex-shrink-0 items-center px-4">
              <Link to="/" className="text-xl font-bold text-primary-600">
                CarRental Admin
              </Link>
            </div>
            <nav className="mt-5 flex-1 space-y-1 bg-white px-2">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`${
                    isActive(item.href)
                      ? "bg-primary-50 text-primary-600"
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  } group flex items-center px-2 py-2 text-sm font-medium rounded-md`}
                >
                  <item.icon
                    className={`${
                      isActive(item.href) ? "text-primary-500" : "text-gray-400 group-hover:text-gray-500"
                    } mr-3 h-6 w-6 flex-shrink-0`}
                    aria-hidden="true"
                  />
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>
          <div className="flex flex-shrink-0 border-t border-gray-200 p-4">
            <div className="flex items-center">
              <div>
                <UserCircleIcon className="h-9 w-9 text-gray-400" />
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-700">{currentUser?.name}</p>
                <p className="text-xs font-medium text-gray-500">{currentUser?.email}</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="ml-auto flex flex-shrink-0 items-center text-sm text-gray-500 hover:text-gray-700"
            >
              <PowerIcon className="h-5 w-5 mr-1" />
              <span className="sr-only">Logout</span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className="md:pl-64 flex flex-col flex-1">
        <div className="sticky top-0 z-10 bg-white pl-1 pt-1 sm:pl-3 sm:pt-3 md:hidden">
          <button
            type="button"
            className="-ml-0.5 -mt-0.5 inline-flex h-12 w-12 items-center justify-center rounded-md text-gray-500 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500"
            onClick={() => setIsSidebarOpen(true)}
          >
            <span className="sr-only">Open sidebar</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>

        {/* Mobile sidebar */}
        {isSidebarOpen && (
          <div className="fixed inset-0 z-40 flex md:hidden">
            <div className="fixed inset-0 bg-gray-600 bg-opacity-75" onClick={() => setIsSidebarOpen(false)}></div>
            <div className="relative flex w-full max-w-xs flex-1 flex-col bg-white">
              <div className="absolute top-0 right-0 -mr-12 pt-2">
                <button
                  type="button"
                  className="ml-1 flex h-10 w-10 items-center justify-center rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                  onClick={() => setIsSidebarOpen(false)}
                >
                  <span className="sr-only">Close sidebar</span>
                  <XMarkIcon className="h-6 w-6 text-white" aria-hidden="true" />
                </button>
              </div>
              <div className="h-0 flex-1 overflow-y-auto pt-5 pb-4">
                <div className="flex flex-shrink-0 items-center px-4">
                  <Link to="/" className="text-xl font-bold text-primary-600">
                    CarRental Admin
                  </Link>
                </div>
                <nav className="mt-5 space-y-1 px-2">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      to={item.href}
                      className={`${
                        isActive(item.href)
                          ? "bg-primary-50 text-primary-600"
                          : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                      } group flex items-center px-2 py-2 text-base font-medium rounded-md`}
                      onClick={() => setIsSidebarOpen(false)}
                    >
                      <item.icon
                        className={`${
                          isActive(item.href) ? "text-primary-500" : "text-gray-400 group-hover:text-gray-500"
                        } mr-4 h-6 w-6 flex-shrink-0`}
                        aria-hidden="true"
                      />
                      {item.name}
                    </Link>
                  ))}
                </nav>
              </div>
              <div className="flex flex-shrink-0 border-t border-gray-200 p-4">
                <div className="flex items-center">
                  <div>
                    <UserCircleIcon className="h-9 w-9 text-gray-400" />
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-700">{currentUser?.name}</p>
                    <p className="text-xs font-medium text-gray-500">{currentUser?.email}</p>
                  </div>
                </div>
                <button
                  onClick={handleLogout}
                  className="ml-auto flex flex-shrink-0 items-center text-sm text-gray-500 hover:text-gray-700"
                >
                  <PowerIcon className="h-5 w-5 mr-1" />
                  <span className="sr-only">Logout</span>
                </button>
              </div>
            </div>
            <div className="w-14 flex-shrink-0">{/* Force sidebar to shrink to fit close icon */}</div>
          </div>
        )}

        <main className="flex-1">
          <div className="py-6">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
              <Outlet />
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

export default AdminLayout
