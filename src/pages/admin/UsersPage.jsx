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

  const handleDeleteUser = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) {
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

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  if (loading && users.length === 0) {
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
              <UsersIcon className="h-8 w-8 text-red-600" />
            </div>
            <h3 className="text-xl font-semibold text-red-800 mb-2">Failed to load users</h3>
            <p className="text-red-600">{error}</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">User Management</h1>
          <p className="mt-2 text-lg text-gray-600">Manage users and administrator accounts</p>
        </div>
        <button
          onClick={() => setShowAddAdmin(!showAddAdmin)}
          className="inline-flex items-center justify-center px-6 py-3 text-base font-semibold text-white bg-gradient-to-r from-primary-600 to-primary-700 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
        >
          {showAddAdmin ? (
            <>
              <XMarkIcon className="h-5 w-5 mr-2" />
              Cancel
            </>
          ) : (
            <>
              <PlusIcon className="h-5 w-5 mr-2" />
              Add Admin
            </>
          )}
        </button>
      </div>

      {/* Add Admin Form */}
      {showAddAdmin && (
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 mb-8 hover:shadow-xl transition-all duration-300">
          <div className="flex items-center mb-6">
            <div className="bg-primary-100 rounded-xl p-3 mr-4">
              <ShieldCheckIcon className="h-8 w-8 text-primary-600" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Create Admin User</h2>
              <p className="text-gray-600 mt-1">Add a new administrator to the system</p>
            </div>
          </div>
          
          <Formik
            initialValues={{ name: "", email: "", password: "" }}
            validationSchema={AdminSchema}
            onSubmit={handleAddAdmin}
          >
            {({ isSubmitting }) => (
              <Form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-semibold text-gray-800 mb-2">
                      Full Name *
                    </label>
                    <Field
                      type="text"
                      name="name"
                      id="name"
                      className="w-full px-4 py-3 text-base border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200"
                      placeholder="Enter full name"
                    />
                    <ErrorMessage name="name" component="div" className="text-red-500 text-sm mt-2 font-medium" />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-semibold text-gray-800 mb-2">
                      Email Address *
                    </label>
                    <Field
                      type="email"
                      name="email"
                      id="email"
                      className="w-full px-4 py-3 text-base border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200"
                      placeholder="Enter email address"
                    />
                    <ErrorMessage name="email" component="div" className="text-red-500 text-sm mt-2 font-medium" />
                  </div>

                  <div className="md:col-span-2">
                    <label htmlFor="password" className="block text-sm font-semibold text-gray-800 mb-2">
                      Password *
                    </label>
                    <Field
                      type="password"
                      name="password"
                      id="password"
                      className="w-full px-4 py-3 text-base border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200"
                      placeholder="Enter password (min. 6 characters)"
                    />
                    <ErrorMessage name="password" component="div" className="text-red-500 text-sm mt-2 font-medium" />
                  </div>
                </div>

                <div className="flex justify-end pt-4">
                  <button
                    type="submit"
                    disabled={addingAdmin || isSubmitting}
                    className="inline-flex items-center justify-center px-8 py-3 text-base font-semibold text-white bg-gradient-to-r from-primary-600 to-primary-700 rounded-xl shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-105 disabled:hover:scale-100"
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
                      "Create Admin User"
                    )}
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      )}

      {/* Search Section */}
      <div className="mb-8">
        <div className="relative rounded-xl shadow-sm">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
          </div>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="block w-full pl-12 pr-12 py-4 text-base border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200"
            placeholder="Search users by name or email..."
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

      {/* Users Grid */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300">
        {/* Header */}
        <div className="px-8 py-6 bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200">
          <div className="flex items-center">
            <div className="bg-primary-600 rounded-xl p-3 mr-4">
              <UsersIcon className="h-6 w-6 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900">User Accounts</h3>
              <p className="text-gray-600 mt-1">
                {filteredUsers.length} user{filteredUsers.length !== 1 ? 's' : ''} found
                {searchTerm && ` for "${searchTerm}"`}
              </p>
            </div>
          </div>
        </div>

        {/* Users List */}
        <div className="divide-y divide-gray-100">
          {filteredUsers.length === 0 ? (
            <div className="text-center py-12">
              <UsersIcon className="mx-auto h-16 w-16 text-gray-400 mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No users found</h3>
              <p className="text-gray-600 mb-6">Try adjusting your search criteria</p>
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm("")}
                  className="px-6 py-3 text-base font-semibold text-primary-600 bg-primary-50 rounded-lg hover:bg-primary-100 transition-colors duration-200"
                >
                  Clear Search
                </button>
              )}
            </div>
          ) : (
            filteredUsers.map((user) => (
              <div key={user.id} className="px-8 py-6 hover:bg-gray-50 transition-colors duration-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className={`rounded-xl p-4 ${
                      user.role === "ADMIN" 
                        ? "bg-purple-100 text-purple-600" 
                        : "bg-blue-100 text-blue-600"
                    }`}>
                      <UserIcon className="h-6 w-6" />
                    </div>
                    <div>
                      <div className="flex items-center space-x-3">
                        <h4 className="text-lg font-semibold text-gray-900">{user.name}</h4>
                        <span
                          className={`px-3 py-1 rounded-full text-sm font-semibold ${
                            user.role === "ADMIN" 
                              ? "bg-purple-100 text-purple-800 border border-purple-200" 
                              : "bg-green-100 text-green-800 border border-green-200"
                          }`}
                        >
                          {user.role === "ADMIN" && <ShieldCheckIcon className="h-3 w-3 inline mr-1" />}
                          {user.role}
                        </span>
                      </div>
                      <div className="flex items-center text-gray-600 mt-1">
                        <EnvelopeIcon className="h-4 w-4 mr-2" />
                        <span className="text-sm">{user.email}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <button
                      onClick={() => handleDeleteUser(user.id)}
                      disabled={deleteLoading === user.id}
                      className="inline-flex items-center px-4 py-2 text-sm font-semibold text-red-700 bg-red-50 rounded-lg hover:bg-red-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                    >
                      {deleteLoading === user.id ? (
                        <>
                          <svg
                            className="animate-spin -ml-1 mr-2 h-4 w-4 text-red-700"
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
  )
}

export default UsersPage