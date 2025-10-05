"use client"
import { useState, useEffect } from "react"
import { getAllUsers, deleteUser, createAdmin } from "../../services/userService"
import { Formik, Form, Field, ErrorMessage } from "formik"
import * as Yup from "yup"
import {
  UserIcon,
  UsersIcon,
  TrashIcon,
  PlusIcon,
  MagnifyingGlassIcon,
  XMarkIcon,
  ShieldCheckIcon,
  EnvelopeIcon,
  PhoneIcon,
  CalendarIcon,
  ExclamationTriangleIcon,
} from "@heroicons/react/24/outline"
import toast from "react-hot-toast"

const AdminSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  email: Yup.string().email("Invalid email address").required("Email is required"),
  password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
})

const UsersPage = () => {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [searchTerm, setSearchTerm] = useState("")
  const [deleteLoading, setDeleteLoading] = useState(null)
  const [showAddAdmin, setShowAddAdmin] = useState(false)
  const [addingAdmin, setAddingAdmin] = useState(false)
  const [roleFilter, setRoleFilter] = useState("ALL")
  const [selectedUser, setSelectedUser] = useState(null)

  useEffect(() => {
    fetchUsers()
  }, [])

  const fetchUsers = async () => {
    setLoading(true)
    try {
      const data = await getAllUsers()
      setUsers(data)
    } catch (error) {
      console.error("Error fetching users:", error)
      setError("Failed to load users. Please try again later.")
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteUser = async (id, name) => {
    if (!window.confirm(`Are you sure you want to delete user "${name}"? This action cannot be undone.`)) {
      return
    }

    setDeleteLoading(id)
    try {
      await deleteUser(id)
      toast.success("User deleted successfully")
      setUsers(users.filter((user) => user.id !== id))
    } catch (error) {
      console.error("Error deleting user:", error)
      toast.error("Failed to delete user. Please try again.")
    } finally {
      setDeleteLoading(null)
    }
  }

  const handleAddAdmin = async (values, { resetForm }) => {
    setAddingAdmin(true)
    try {
      const newAdmin = await createAdmin(values)
      toast.success("Admin user created successfully")
      setUsers([...users, newAdmin])
      resetForm()
      setShowAddAdmin(false)
    } catch (error) {
      console.error("Error creating admin:", error)
      toast.error(error.response?.data?.message || "Failed to create admin. Please try again.")
    } finally {
      setAddingAdmin(false)
    }
  }

  const filteredUsers = users.filter((user) => {
    const matchesSearch = 
      user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.phone?.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesRole = roleFilter === "ALL" || user.role === roleFilter
    
    return matchesSearch && matchesRole
  })

  const stats = {
    total: users.length,
    admins: users.filter(user => user.role === "ADMIN").length,
    users: users.filter(user => user.role === "USER").length,
    active: users.filter(user => user.status === "ACTIVE").length
  }

  if (loading && users.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center items-center h-96">
            <div className="text-center">
              <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary-600 mx-auto mb-4"></div>
              <p className="text-gray-600 dark:text-gray-400">Loading users...</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 p-8 text-center">
            <div className="flex flex-col items-center">
              <div className="rounded-full bg-red-100 dark:bg-red-900/30 p-4 mb-4">
                <ExclamationTriangleIcon className="h-8 w-8 text-red-600 dark:text-red-400" />
              </div>
              <h3 className="text-xl font-semibold text-red-800 dark:text-red-300 mb-2">Failed to load users</h3>
              <p className="text-red-600 dark:text-red-400">{error}</p>
              <button
                onClick={fetchUsers}
                className="mt-4 px-6 py-2 text-sm font-semibold text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors duration-200"
              >
                Try Again
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-8">
          <div className="text-center lg:text-left">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-primary-600 dark:from-white dark:to-primary-400 bg-clip-text text-transparent">
              User Management
            </h1>
            <p className="mt-2 text-lg text-gray-600 dark:text-gray-400">
              Manage users and administrator accounts efficiently
            </p>
          </div>
          <button
            onClick={() => setShowAddAdmin(!showAddAdmin)}
            className="group inline-flex items-center justify-center px-8 py-4 text-base font-semibold text-white bg-gradient-to-r from-primary-600 to-primary-700 rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-all duration-200"
          >
            {showAddAdmin ? (
              <>
                <XMarkIcon className="h-5 w-5 mr-2 group-hover:rotate-90 transition-transform duration-200" />
                Cancel
              </>
            ) : (
              <>
                <PlusIcon className="h-5 w-5 mr-2 group-hover:rotate-90 transition-transform duration-200" />
                Add Admin User
              </>
            )}
          </button>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {[
            { label: "Total Users", value: stats.total, color: "from-blue-500 to-blue-600", icon: UsersIcon },
            { label: "Administrators", value: stats.admins, color: "from-purple-500 to-purple-600", icon: ShieldCheckIcon },
            { label: "Regular Users", value: stats.users, color: "from-green-500 to-green-600", icon: UserIcon },
            { label: "Active Users", value: stats.active, color: "from-orange-500 to-orange-600", icon: CalendarIcon },
          ].map((stat, index) => (
            <div key={index} className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="flex items-center">
                <div className={`p-3 rounded-xl bg-gradient-to-r ${stat.color} shadow-lg mr-4`}>
                  <stat.icon className="h-6 w-6 text-white" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{stat.label}</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Add Admin Form */}
        {showAddAdmin && (
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 p-8 mb-8 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
            <div className="flex items-center mb-6">
              <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl p-3 mr-4 shadow-lg">
                <ShieldCheckIcon className="h-8 w-8 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Create Admin User</h2>
                <p className="text-gray-600 dark:text-gray-400 mt-1">Add a new administrator to the system</p>
              </div>
            </div>
            
            <Formik
              initialValues={{ name: "", email: "", password: "" }}
              validationSchema={AdminSchema}
              onSubmit={handleAddAdmin}
            >
              {({ isSubmitting, errors, touched }) => (
                <Form className="space-y-6">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-semibold text-gray-800 dark:text-gray-200 mb-2">
                        Full Name *
                      </label>
                      <Field
                        type="text"
                        name="name"
                        id="name"
                        className={`w-full px-4 py-3 text-base border rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200 ${
                          errors.name && touched.name
                            ? "border-red-300 dark:border-red-500 bg-red-50 dark:bg-red-900/20"
                            : "border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700"
                        } text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400`}
                        placeholder="Enter full name"
                      />
                      <ErrorMessage name="name" component="div" className="text-red-500 dark:text-red-400 text-sm mt-2 font-medium" />
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-sm font-semibold text-gray-800 dark:text-gray-200 mb-2">
                        Email Address *
                      </label>
                      <Field
                        type="email"
                        name="email"
                        id="email"
                        className={`w-full px-4 py-3 text-base border rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200 ${
                          errors.email && touched.email
                            ? "border-red-300 dark:border-red-500 bg-red-50 dark:bg-red-900/20"
                            : "border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700"
                        } text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400`}
                        placeholder="Enter email address"
                      />
                      <ErrorMessage name="email" component="div" className="text-red-500 dark:text-red-400 text-sm mt-2 font-medium" />
                    </div>

                    <div className="lg:col-span-2">
                      <label htmlFor="password" className="block text-sm font-semibold text-gray-800 dark:text-gray-200 mb-2">
                        Password *
                      </label>
                      <Field
                        type="password"
                        name="password"
                        id="password"
                        className={`w-full px-4 py-3 text-base border rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200 ${
                          errors.password && touched.password
                            ? "border-red-300 dark:border-red-500 bg-red-50 dark:bg-red-900/20"
                            : "border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700"
                        } text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400`}
                        placeholder="Enter password (min. 6 characters)"
                      />
                      <ErrorMessage name="password" component="div" className="text-red-500 dark:text-red-400 text-sm mt-2 font-medium" />
                    </div>
                  </div>

                  <div className="flex justify-end pt-4">
                    <button
                      type="submit"
                      disabled={addingAdmin || isSubmitting}
                      className="group inline-flex items-center justify-center px-8 py-4 text-base font-semibold text-white bg-gradient-to-r from-primary-600 to-primary-700 rounded-2xl shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-105 disabled:hover:scale-100"
                    >
                      {addingAdmin ? (
                        <span className="flex items-center gap-2">
                          <svg
                            className="animate-spin h-5 w-5 text-white"
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
                          Creating Admin...
                        </span>
                      ) : (
                        <>
                          <ShieldCheckIcon className="h-5 w-5 mr-2 group-hover:scale-110 transition-transform duration-200" />
                          Create Admin User
                        </>
                      )}
                    </button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        )}

        {/* Search and Filter Section */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search Input */}
            <div className="flex-1 relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="block w-full pl-12 pr-12 py-3 text-base border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200"
                placeholder="Search users by name, email, or phone..."
              />
              {searchTerm && (
                <div className="absolute inset-y-0 right-0 pr-4 flex items-center">
                  <button
                    type="button"
                    onClick={() => setSearchTerm("")}
                    className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 focus:outline-none transition-colors duration-200"
                  >
                    <XMarkIcon className="h-5 w-5" />
                  </button>
                </div>
              )}
            </div>

            {/* Role Filter */}
            <div className="w-full lg:w-48">
              <select
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value)}
                className="w-full px-4 py-3 text-base border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200"
              >
                <option value="ALL">All Roles</option>
                <option value="ADMIN">Administrators</option>
                <option value="USER">Regular Users</option>
              </select>
            </div>
          </div>
        </div>

        {/* Users Grid */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-2xl transition-all duration-300">
          {/* Header */}
          <div className="px-8 py-6 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-800 border-b border-gray-200 dark:border-gray-600">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="bg-gradient-to-r from-primary-600 to-primary-700 rounded-xl p-3 mr-4 shadow-lg">
                  <UsersIcon className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">User Accounts</h3>
                  <p className="text-gray-600 dark:text-gray-400 mt-1">
                    {filteredUsers.length} user{filteredUsers.length !== 1 ? 's' : ''} found
                    {searchTerm && ` for "${searchTerm}"`}
                    {roleFilter !== "ALL" && ` with role "${roleFilter}"`}
                  </p>
                </div>
              </div>
              <button
                onClick={fetchUsers}
                className="px-4 py-2 text-sm font-semibold text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/20 rounded-lg hover:bg-primary-100 dark:hover:bg-primary-900/30 transition-colors duration-200"
              >
                Refresh
              </button>
            </div>
          </div>

          {/* Users List */}
          <div className="divide-y divide-gray-100 dark:divide-gray-700">
            {filteredUsers.length === 0 ? (
              <div className="text-center py-16">
                <UsersIcon className="mx-auto h-20 w-20 text-gray-400 dark:text-gray-600 mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">No users found</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-md mx-auto">
                  {searchTerm || roleFilter !== "ALL" 
                    ? "Try adjusting your search criteria or filters to find what you're looking for."
                    : "No users are currently registered in the system."}
                </p>
                {(searchTerm || roleFilter !== "ALL") && (
                  <button
                    onClick={() => {
                      setSearchTerm("")
                      setRoleFilter("ALL")
                    }}
                    className="px-6 py-3 text-base font-semibold text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/20 rounded-xl hover:bg-primary-100 dark:hover:bg-primary-900/30 transition-colors duration-200"
                  >
                    Clear All Filters
                  </button>
                )}
              </div>
            ) : (
              filteredUsers.map((user) => (
                <div 
                  key={user.id} 
                  className="px-8 py-6 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-all duration-200 group cursor-pointer"
                  onClick={() => setSelectedUser(user)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className={`rounded-xl p-4 shadow-lg group-hover:scale-105 transition-transform duration-200 ${
                        user.role === "ADMIN" 
                          ? "bg-gradient-to-r from-purple-500 to-purple-600 text-white" 
                          : "bg-gradient-to-r from-blue-500 to-blue-600 text-white"
                      }`}>
                        <UserIcon className="h-6 w-6" />
                      </div>
                      <div>
                        <div className="flex items-center space-x-3 mb-2">
                          <h4 className="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors duration-200">
                            {user.name}
                          </h4>
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-semibold border ${
                              user.role === "ADMIN" 
                                ? "bg-purple-100 text-purple-800 border-purple-200 dark:bg-purple-900/30 dark:text-purple-300 dark:border-purple-800" 
                                : "bg-green-100 text-green-800 border-green-200 dark:bg-green-900/30 dark:text-green-300 dark:border-green-800"
                            }`}
                          >
                            {user.role === "ADMIN" && <ShieldCheckIcon className="h-3 w-3 inline mr-1" />}
                            {user.role}
                          </span>
                        </div>
                        <div className="flex flex-col sm:flex-row sm:items-center space-y-1 sm:space-y-0 sm:space-x-4 text-sm text-gray-600 dark:text-gray-400">
                          <div className="flex items-center">
                            <EnvelopeIcon className="h-4 w-4 mr-2" />
                            <span>{user.email}</span>
                          </div>
                          {user.phone && (
                            <div className="flex items-center">
                              <PhoneIcon className="h-4 w-4 mr-2" />
                              <span>{user.phone}</span>
                            </div>
                          )}
                          {user.createdAt && (
                            <div className="flex items-center">
                              <CalendarIcon className="h-4 w-4 mr-2" />
                              <span>{new Date(user.createdAt).toLocaleDateString()}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          handleDeleteUser(user.id, user.name)
                        }}
                        disabled={deleteLoading === user.id}
                        className="inline-flex items-center px-4 py-2 text-sm font-semibold text-red-700 dark:text-red-400 bg-red-50 dark:bg-red-900/20 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/30 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-105"
                      >
                        {deleteLoading === user.id ? (
                          <>
                            <svg
                              className="animate-spin -ml-1 mr-2 h-4 w-4 text-red-700 dark:text-red-400"
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
                            Deleting...
                          </>
                        ) : (
                          <>
                            <TrashIcon className="h-4 w-4 mr-2" />
                            Delete
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default UsersPage