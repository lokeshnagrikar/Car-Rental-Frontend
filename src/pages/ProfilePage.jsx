"use client"

import { useState, useEffect } from "react"
import { useAuth } from "../contexts/AuthContext"
import { Formik, Form, Field, ErrorMessage } from "formik"
import * as Yup from "yup"
import {
  UserIcon,
  EnvelopeIcon,
  LockClosedIcon,
  EyeIcon,
  EyeSlashIcon,
  CameraIcon,
  PhoneIcon,
  MapPinIcon,
  CalendarIcon,
  IdentificationIcon,
} from "@heroicons/react/24/outline"
import { motion } from "framer-motion"

const ProfileSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  email: Yup.string().email("Invalid email address").required("Email is required"),
  password: Yup.string().min(6, "Password must be at least 6 characters"),
  confirmPassword: Yup.string().oneOf([Yup.ref("password"), null], "Passwords must match"),
  phone: Yup.string().matches(/^[0-9]{10}$/, "Phone number must be 10 digits"),
  address: Yup.string(),
  dateOfBirth: Yup.date().nullable(),
  drivingLicense: Yup.string(),
})

const ProfilePage = () => {
  const { currentUser, updateProfile } = useAuth()
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [activeTab, setActiveTab] = useState("personal")
  const [profileImage, setProfileImage] = useState("/placeholder.svg?height=150&width=150")

  // Initialize user data
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    address: "",
    dateOfBirth: "",
    drivingLicense: "",
  })

  useEffect(() => {
    if (currentUser) {
      setUserData((prev) => ({
        ...prev,
        name: currentUser.name || prev.name,
        email: currentUser.email || prev.email,
        phone: currentUser.phone || prev.phone,
        address: currentUser.address || prev.address,
        dateOfBirth: currentUser.dateOfBirth
          ? new Date(currentUser.dateOfBirth).toISOString().split("T")[0]
          : prev.dateOfBirth,
        drivingLicense: currentUser.drivingLicense || prev.drivingLicense,
      }))
    }
  }, [currentUser])

  const handleSubmit = async (values, { resetForm }) => {
    setLoading(true)
    setError("")
    setSuccess("")

    // Prepare data for update
    const updateData = {
      name: values.name,
      email: values.email,
      phone: values.phone,
      address: values.address,
      dateOfBirth: values.dateOfBirth,
      drivingLicense: values.drivingLicense,
    }

    // Only include password if it's provided
    if (values.password) {
      updateData.password = values.password
    }

    try {
      const result = await updateProfile(updateData)
      if (result.success) {
        setSuccess("Profile updated successfully")
        // Reset password fields
        resetForm({
          values: {
            ...values,
            password: "",
            confirmPassword: "",
          },
        })
      } else {
        setError(result.message || "Failed to update profile")
      }
    } catch (error) {
      setError("An unexpected error occurred. Please try again.")
      console.error("Profile update error:", error)
    } finally {
      setLoading(false)
    }
  }

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setProfileImage(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.5 } },
  }

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">Your Profile</h1>
          <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
            Manage your personal information and account preferences
          </p>
        </div>

        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="border-b border-gray-200">
            <div className="flex justify-center sm:justify-start px-4 py-5 sm:px-6">
              <div className="relative">
                <div className="h-32 w-32 rounded-full overflow-hidden bg-gray-100 border-4 border-white shadow-lg">
                  <img src={profileImage || "/placeholder.svg"} alt="Profile" className="h-full w-full object-cover" />
                </div>
                <label
                  htmlFor="profile-image"
                  className="absolute bottom-0 right-0 bg-primary-600 rounded-full p-2 cursor-pointer shadow-lg"
                >
                  <CameraIcon className="h-5 w-5 text-white" />
                  <input
                    type="file"
                    id="profile-image"
                    className="hidden"
                    accept="image/*"
                    onChange={handleImageChange}
                  />
                </label>
              </div>
              <div className="ml-6 pt-1 hidden sm:block">
                <h2 className="text-2xl font-bold text-gray-900">{userData.name}</h2>
                <p className="text-sm font-medium text-gray-500">{userData.email}</p>
                <p className="mt-1 text-sm text-gray-500">Member since {new Date().getFullYear()}</p>
              </div>
            </div>

            {/* Mobile name display */}
            <div className="sm:hidden text-center mt-4">
              <h2 className="text-2xl font-bold text-gray-900">{userData.name}</h2>
              <p className="text-sm font-medium text-gray-500">{userData.email}</p>
              <p className="mt-1 text-sm text-gray-500">Member since {new Date().getFullYear()}</p>
            </div>

            <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
              <div className="flex justify-center sm:justify-start space-x-8">
                <button
                  onClick={() => setActiveTab("personal")}
                  className={`pb-4 border-b-2 font-medium text-sm ${
                    activeTab === "personal"
                      ? "border-primary-500 text-primary-600"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                >
                  Personal Information
                </button>
                <button
                  onClick={() => setActiveTab("security")}
                  className={`pb-4 border-b-2 font-medium text-sm ${
                    activeTab === "security"
                      ? "border-primary-500 text-primary-600"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                >
                  Security
                </button>
                <button
                  onClick={() => setActiveTab("preferences")}
                  className={`pb-4 border-b-2 font-medium text-sm ${
                    activeTab === "preferences"
                      ? "border-primary-500 text-primary-600"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                >
                  Preferences
                </button>
              </div>
            </div>
          </div>

          <div className="px-4 py-5 sm:p-6">
            {error && (
              <motion.div
                initial="hidden"
                animate="visible"
                variants={fadeIn}
                className="mb-6 rounded-md bg-red-50 p-4"
              >
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg
                      className="h-5 w-5 text-red-400"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-red-800">{error}</h3>
                  </div>
                </div>
              </motion.div>
            )}

            {success && (
              <motion.div
                initial="hidden"
                animate="visible"
                variants={fadeIn}
                className="mb-6 rounded-md bg-green-50 p-4"
              >
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg
                      className="h-5 w-5 text-green-400"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-green-800">{success}</h3>
                  </div>
                </div>
              </motion.div>
            )}

            <Formik
              initialValues={userData}
              validationSchema={ProfileSchema}
              onSubmit={handleSubmit}
              enableReinitialize
            >
              {({ isSubmitting, values }) => (
                <Form className="space-y-8">
                  {activeTab === "personal" && (
                    <motion.div initial="hidden" animate="visible" variants={fadeIn} className="space-y-6">
                      <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                        <div className="sm:col-span-3">
                          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                            Full Name
                          </label>
                          <div className="mt-1 relative rounded-md shadow-sm">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                              <UserIcon className="h-5 w-5 text-gray-400" />
                            </div>
                            <Field
                              id="name"
                              name="name"
                              type="text"
                              autoComplete="name"
                              className="pl-10 focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-gray-300 rounded-md"
                            />
                          </div>
                          <ErrorMessage name="name" component="div" className="mt-1 text-red-500 text-xs" />
                        </div>

                        <div className="sm:col-span-3">
                          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                            Email Address
                          </label>
                          <div className="mt-1 relative rounded-md shadow-sm">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                              <EnvelopeIcon className="h-5 w-5 text-gray-400" />
                            </div>
                            <Field
                              id="email"
                              name="email"
                              type="email"
                              autoComplete="email"
                              className="pl-10 focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-gray-300 rounded-md"
                            />
                          </div>
                          <ErrorMessage name="email" component="div" className="mt-1 text-red-500 text-xs" />
                        </div>

                        <div className="sm:col-span-3">
                          <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                            Phone Number
                          </label>
                          <div className="mt-1 relative rounded-md shadow-sm">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                              <PhoneIcon className="h-5 w-5 text-gray-400" />
                            </div>
                            <Field
                              id="phone"
                              name="phone"
                              type="text"
                              className="pl-10 focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-gray-300 rounded-md"
                            />
                          </div>
                          <ErrorMessage name="phone" component="div" className="mt-1 text-red-500 text-xs" />
                        </div>

                        <div className="sm:col-span-3">
                          <label htmlFor="dateOfBirth" className="block text-sm font-medium text-gray-700">
                            Date of Birth
                          </label>
                          <div className="mt-1 relative rounded-md shadow-sm">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                              <CalendarIcon className="h-5 w-5 text-gray-400" />
                            </div>
                            <Field
                              id="dateOfBirth"
                              name="dateOfBirth"
                              type="date"
                              className="pl-10 focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-gray-300 rounded-md"
                            />
                          </div>
                          <ErrorMessage name="dateOfBirth" component="div" className="mt-1 text-red-500 text-xs" />
                        </div>

                        <div className="sm:col-span-6">
                          <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                            Address
                          </label>
                          <div className="mt-1 relative rounded-md shadow-sm">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                              <MapPinIcon className="h-5 w-5 text-gray-400" />
                            </div>
                            <Field
                              id="address"
                              name="address"
                              type="text"
                              className="pl-10 focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-gray-300 rounded-md"
                            />
                          </div>
                          <ErrorMessage name="address" component="div" className="mt-1 text-red-500 text-xs" />
                        </div>

                        <div className="sm:col-span-6">
                          <label htmlFor="drivingLicense" className="block text-sm font-medium text-gray-700">
                            Driving License Number
                          </label>
                          <div className="mt-1 relative rounded-md shadow-sm">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                              <IdentificationIcon className="h-5 w-5 text-gray-400" />
                            </div>
                            <Field
                              id="drivingLicense"
                              name="drivingLicense"
                              type="text"
                              className="pl-10 focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-gray-300 rounded-md"
                            />
                          </div>
                          <ErrorMessage name="drivingLicense" component="div" className="mt-1 text-red-500 text-xs" />
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {activeTab === "security" && (
                    <motion.div initial="hidden" animate="visible" variants={fadeIn} className="space-y-6">
                      <div>
                        <h3 className="text-lg font-medium leading-6 text-gray-900">Change Password</h3>
                        <p className="mt-1 text-sm text-gray-500">Update your password to keep your account secure</p>
                      </div>

                      <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                        <div className="sm:col-span-6">
                          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                            New Password
                          </label>
                          <div className="mt-1 relative rounded-md shadow-sm">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                              <LockClosedIcon className="h-5 w-5 text-gray-400" />
                            </div>
                            <Field
                              id="password"
                              name="password"
                              type={showPassword ? "text" : "password"}
                              autoComplete="new-password"
                              className="pl-10 focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-gray-300 rounded-md"
                            />
                            <button
                              type="button"
                              className="absolute inset-y-0 right-0 pr-3 flex items-center"
                              onClick={togglePasswordVisibility}
                            >
                              {showPassword ? (
                                <EyeSlashIcon className="h-5 w-5 text-gray-400" />
                              ) : (
                                <EyeIcon className="h-5 w-5 text-gray-400" />
                              )}
                            </button>
                          </div>
                          <ErrorMessage name="password" component="div" className="mt-1 text-red-500 text-xs" />
                        </div>

                        <div className="sm:col-span-6">
                          <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                            Confirm New Password
                          </label>
                          <div className="mt-1 relative rounded-md shadow-sm">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                              <LockClosedIcon className="h-5 w-5 text-gray-400" />
                            </div>
                            <Field
                              id="confirmPassword"
                              name="confirmPassword"
                              type={showPassword ? "text" : "password"}
                              autoComplete="new-password"
                              className="pl-10 focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-gray-300 rounded-md"
                            />
                          </div>
                          <ErrorMessage name="confirmPassword" component="div" className="mt-1 text-red-500 text-xs" />
                        </div>
                      </div>

                      <div className="pt-5">
                        <div className="bg-gray-50 p-4 rounded-md">
                          <h4 className="text-sm font-medium text-gray-900">Password Requirements:</h4>
                          <ul className="mt-2 text-xs text-gray-500 list-disc pl-5 space-y-1">
                            <li>Minimum 6 characters</li>
                            <li>Include at least one uppercase letter</li>
                            <li>Include at least one number</li>
                            <li>Include at least one special character</li>
                          </ul>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {activeTab === "preferences" && (
                    <motion.div initial="hidden" animate="visible" variants={fadeIn} className="space-y-6">
                      <div>
                        <h3 className="text-lg font-medium leading-6 text-gray-900">Notification Preferences</h3>
                        <p className="mt-1 text-sm text-gray-500">Decide what notifications you want to receive</p>
                      </div>

                      <div className="space-y-4">
                        <div className="flex items-start">
                          <div className="flex items-center h-5">
                            <Field
                              id="emailNotifications"
                              name="emailNotifications"
                              type="checkbox"
                              className="focus:ring-primary-500 h-4 w-4 text-primary-600 border-gray-300 rounded"
                            />
                          </div>
                          <div className="ml-3 text-sm">
                            <label htmlFor="emailNotifications" className="font-medium text-gray-700">
                              Email Notifications
                            </label>
                            <p className="text-gray-500">
                              Get notified about booking updates, promotions, and special offers
                            </p>
                          </div>
                        </div>

                        <div className="flex items-start">
                          <div className="flex items-center h-5">
                            <Field
                              id="smsNotifications"
                              name="smsNotifications"
                              type="checkbox"
                              className="focus:ring-primary-500 h-4 w-4 text-primary-600 border-gray-300 rounded"
                            />
                          </div>
                          <div className="ml-3 text-sm">
                            <label htmlFor="smsNotifications" className="font-medium text-gray-700">
                              SMS Notifications
                            </label>
                            <p className="text-gray-500">
                              Receive text messages for important updates about your bookings
                            </p>
                          </div>
                        </div>

                        <div className="flex items-start">
                          <div className="flex items-center h-5">
                            <Field
                              id="marketingEmails"
                              name="marketingEmails"
                              type="checkbox"
                              className="focus:ring-primary-500 h-4 w-4 text-primary-600 border-gray-300 rounded"
                            />
                          </div>
                          <div className="ml-3 text-sm">
                            <label htmlFor="marketingEmails" className="font-medium text-gray-700">
                              Marketing Emails
                            </label>
                            <p className="text-gray-500">
                              Receive emails about new services, discounts, and promotions
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="pt-5">
                        <h3 className="text-lg font-medium leading-6 text-gray-900">Language & Region</h3>
                        <div className="mt-4 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                          <div className="sm:col-span-3">
                            <label htmlFor="language" className="block text-sm font-medium text-gray-700">
                              Language
                            </label>
                            <div className="mt-1">
                              <Field
                                as="select"
                                id="language"
                                name="language"
                                className="shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-gray-300 rounded-md"
                              >
                                <option value="en">English</option>
                                <option value="es">Spanish</option>
                                <option value="fr">French</option>
                                <option value="de">German</option>
                              </Field>
                            </div>
                          </div>

                          <div className="sm:col-span-3">
                            <label htmlFor="currency" className="block text-sm font-medium text-gray-700">
                              Currency
                            </label>
                            <div className="mt-1">
                              <Field
                                as="select"
                                id="currency"
                                name="currency"
                                className="shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-gray-300 rounded-md"
                              >
                                <option value="usd">USD ($)</option>
                                <option value="eur">EUR (€)</option>
                                <option value="gbp">GBP (£)</option>
                                <option value="jpy">JPY (¥)</option>
                              </Field>
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  <div className="pt-5 border-t border-gray-200">
                    <div className="flex justify-end">
                      <button
                        type="button"
                        className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        disabled={loading || isSubmitting}
                        className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {loading ? (
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
                        ) : null}
                        Save Changes
                      </button>
                    </div>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>

        {/* Activity Section */}
        <div className="mt-10 bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 sm:px-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900">Recent Activity</h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">Your recent bookings and account activity</p>
          </div>
          <div className="border-t border-gray-200">
            <dl>
              <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Last login</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{new Date().toLocaleString()}</dd>
              </div>
              <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Recent booking</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">Toyota Camry - May 10, 2023</dd>
              </div>
              <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Payment method</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">Visa ending in 4242</dd>
              </div>
              <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Membership status</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                    Active
                  </span>
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfilePage
