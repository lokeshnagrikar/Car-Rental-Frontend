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
  ShieldCheckIcon,
  BellIcon,
  GlobeAltIcon,
  CurrencyDollarIcon
} from "@heroicons/react/24/outline"
import { motion } from "framer-motion"
import { uploadProfilePicture } from "../services/userService"
import api from "../services/api"
import { useTheme } from "../contexts/ThemeContext"

const ProfileSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  email: Yup.string().email("Invalid email address").required("Email is required"),
  password: Yup.string().min(6, "Password must be at least 6 characters"),
  confirmPassword: Yup.string().oneOf([Yup.ref("password"), null], "Passwords must match"),
  phone: Yup.string()
    .matches(/^(\+91)?[0-9]{10}$/, "Phone number must be 10 digits, optionally prefixed with +91")
    .nullable(),
  address: Yup.string(),
  dateOfBirth: Yup.date().nullable(),
  drivingLicense: Yup.string(),
})

const ProfilePage = () => {
  const { currentUser, updateProfile, refreshUserData } = useAuth()
  const { isDarkMode } = useTheme()
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [activeTab, setActiveTab] = useState("personal")
  const [profileImage, setProfileImage] = useState("/placeholder.svg?height=150&width=150")
  const [uploadingImage, setUploadingImage] = useState(false)
  const [apiBaseUrl, setApiBaseUrl] = useState("")

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
    // Get API base URL from the api service
    const baseUrl = api.defaults.baseURL || ""
    setApiBaseUrl(baseUrl)

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

      // Set profile image if available
      if (currentUser.profilePicture) {
        setProfileImage(`${baseUrl}/files/${currentUser.profilePicture}`)
      }
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

  const handleImageChange = async (e) => {
    const file = e.target.files[0]
    if (!file) return

    // Check if file is an image
    if (!file.type.startsWith("image/")) {
      setError("Please select an image file")
      return
    }

    // Preview the image
    const reader = new FileReader()
    reader.onloadend = () => {
      setProfileImage(reader.result)
    }
    reader.readAsDataURL(file)

    // Upload the image
    setUploadingImage(true)
    setError("")
    setSuccess("")

    try {
      const formData = new FormData()
      formData.append("file", file)

      await uploadProfilePicture(currentUser.id, formData)
      setSuccess("Profile picture updated successfully")

      // Refresh user data to get the updated profile picture URL
      await refreshUserData()
    } catch (error) {
      setError("Failed to upload profile picture. Please try again.")
      console.error("Profile picture upload error:", error)

      // Reset profile image to the current one
      if (currentUser.profilePicture) {
        setProfileImage(`${apiBaseUrl}/files/${currentUser.profilePicture}`)
      } else {
        setProfileImage("/placeholder.svg?height=150&width=150")
      }
    } finally {
      setUploadingImage(false)
    }
  }

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  }

  const tabVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.3 } },
  }

  return (
    <div className={`${isDarkMode ? "bg-gray-900" : "bg-gray-50"} min-h-screen py-8 transition-colors duration-200`}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          className="text-center mb-12"
        >
          <h1 className={`text-4xl font-bold ${isDarkMode ? "text-white" : "text-gray-900"} mb-4 transition-colors duration-200`}>
            Profile Settings
          </h1>
          <p className={`text-xl ${isDarkMode ? "text-gray-300" : "text-gray-600"} max-w-2xl mx-auto transition-colors duration-200`}>
            Manage your personal information and account preferences
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            className="lg:col-span-1"
          >
            <div className={`rounded-2xl shadow-lg border ${isDarkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"} p-6 transition-colors duration-200`}>
              {/* Profile Card */}
              <div className="text-center">
                <div className="relative inline-block">
                  <div className={`h-32 w-32 rounded-full overflow-hidden ${isDarkMode ? "bg-gray-700" : "bg-gray-100"} border-4 ${isDarkMode ? "border-gray-700" : "border-white"} shadow-lg mx-auto transition-colors duration-200`}>
                    <img src={profileImage || "/placeholder.svg"} alt="Profile" className="h-full w-full object-cover" />
                    {uploadingImage && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-full">
                        <svg
                          className="animate-spin h-8 w-8 text-white"
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
                      </div>
                    )}
                  </div>
                  <label
                    htmlFor="profile-image"
                    className="absolute bottom-2 right-2 bg-gradient-to-r from-primary-500 to-primary-600 rounded-full p-2 cursor-pointer shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
                  >
                    <CameraIcon className="h-4 w-4 text-white" />
                    <input
                      type="file"
                      id="profile-image"
                      className="hidden"
                      accept="image/*"
                      onChange={handleImageChange}
                      disabled={uploadingImage}
                    />
                  </label>
                </div>
                
                <h2 className={`text-2xl font-bold mt-4 ${isDarkMode ? "text-white" : "text-gray-900"} transition-colors duration-200`}>
                  {userData.name}
                </h2>
                <p className={`text-sm ${isDarkMode ? "text-gray-300" : "text-gray-500"} mt-1 transition-colors duration-200`}>
                  {userData.email}
                </p>
                <div className={`mt-3 inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${isDarkMode ? "bg-green-900/20 text-green-400 border border-green-800" : "bg-green-100 text-green-800 border border-green-200"} transition-colors duration-200`}>
                  <ShieldCheckIcon className="h-3 w-3 mr-1" />
                  Verified Account
                </div>
              </div>

              {/* Navigation */}
              <nav className="mt-8 space-y-2">
                {[
                  { id: "personal", label: "Personal Info", icon: UserIcon },
                  { id: "security", label: "Security", icon: LockClosedIcon },
                  { id: "preferences", label: "Preferences", icon: BellIcon },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center px-4 py-3 text-base font-medium rounded-xl transition-all duration-200 ${
                      activeTab === tab.id
                        ? "bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-lg"
                        : isDarkMode
                        ? "text-gray-300 hover:bg-gray-700 hover:text-white"
                        : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                    }`}
                  >
                    <tab.icon className="h-5 w-5 mr-3" />
                    {tab.label}
                  </button>
                ))}
              </nav>
            </div>

            {/* Stats Card */}
            <div className={`mt-6 rounded-2xl shadow-lg border ${isDarkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"} p-6 transition-colors duration-200`}>
              <h3 className={`text-lg font-semibold ${isDarkMode ? "text-white" : "text-gray-900"} mb-4 transition-colors duration-200`}>
                Account Stats
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-500"} transition-colors duration-200`}>Member since</span>
                  <span className={`text-sm font-medium ${isDarkMode ? "text-white" : "text-gray-900"} transition-colors duration-200`}>
                    {new Date().getFullYear()}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-500"} transition-colors duration-200`}>Bookings</span>
                  <span className={`text-sm font-medium ${isDarkMode ? "text-white" : "text-gray-900"} transition-colors duration-200`}>12</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-500"} transition-colors duration-200`}>Status</span>
                  <span className={`px-2 py-1 text-xs font-semibold rounded-full ${isDarkMode ? "bg-green-900/20 text-green-400 border border-green-800" : "bg-green-100 text-green-800 border border-green-200"} transition-colors duration-200`}>
                    Active
                  </span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Main Content */}
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            className="lg:col-span-3"
          >
            <div className={`rounded-2xl shadow-lg border ${isDarkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"} transition-colors duration-200`}>
              <div className="px-8 py-6 border-b border-gray-200 dark:border-gray-700">
                <h2 className={`text-2xl font-bold ${isDarkMode ? "text-white" : "text-gray-900"} transition-colors duration-200`}>
                  {activeTab === "personal" && "Personal Information"}
                  {activeTab === "security" && "Security Settings"}
                  {activeTab === "preferences" && "Preferences"}
                </h2>
                <p className={`mt-2 ${isDarkMode ? "text-gray-300" : "text-gray-600"} transition-colors duration-200`}>
                  {activeTab === "personal" && "Update your personal details and contact information"}
                  {activeTab === "security" && "Manage your password and security preferences"}
                  {activeTab === "preferences" && "Customize your notification and language settings"}
                </p>
              </div>

              <div className="p-8">
                {error && (
                  <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={fadeIn}
                    className={`mb-6 rounded-xl ${isDarkMode ? "bg-red-900/20 border border-red-800" : "bg-red-50 border border-red-200"} p-4 transition-colors duration-200`}
                  >
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <svg className="h-5 w-5 text-red-400" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div className="ml-3">
                        <h3 className={`text-sm font-medium ${isDarkMode ? "text-red-400" : "text-red-800"} transition-colors duration-200`}>
                          {error}
                        </h3>
                      </div>
                    </div>
                  </motion.div>
                )}

                {success && (
                  <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={fadeIn}
                    className={`mb-6 rounded-xl ${isDarkMode ? "bg-green-900/20 border border-green-800" : "bg-green-50 border border-green-200"} p-4 transition-colors duration-200`}
                  >
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <svg className="h-5 w-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div className="ml-3">
                        <h3 className={`text-sm font-medium ${isDarkMode ? "text-green-400" : "text-green-800"} transition-colors duration-200`}>
                          {success}
                        </h3>
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
                      <motion.div
                        key={activeTab}
                        initial="hidden"
                        animate="visible"
                        variants={tabVariants}
                        className="space-y-6"
                      >
                        {activeTab === "personal" && (
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                              <label htmlFor="name" className={`block text-sm font-semibold ${isDarkMode ? "text-gray-300" : "text-gray-800"} mb-2 transition-colors duration-200`}>
                                Full Name
                              </label>
                              <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                  <UserIcon className={`h-5 w-5 ${isDarkMode ? "text-gray-500" : "text-gray-400"} transition-colors duration-200`} />
                                </div>
                                <Field
                                  id="name"
                                  name="name"
                                  type="text"
                                  className={`w-full pl-10 pr-4 py-3 text-base border ${isDarkMode ? "bg-gray-700 border-gray-600 text-white" : "bg-white border-gray-300 text-gray-900"} rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200`}
                                  placeholder="Enter your full name"
                                />
                              </div>
                              <ErrorMessage name="name" component="div" className="mt-2 text-red-500 text-sm font-medium" />
                            </div>

                            <div>
                              <label htmlFor="email" className={`block text-sm font-semibold ${isDarkMode ? "text-gray-300" : "text-gray-800"} mb-2 transition-colors duration-200`}>
                                Email Address
                              </label>
                              <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                  <EnvelopeIcon className={`h-5 w-5 ${isDarkMode ? "text-gray-500" : "text-gray-400"} transition-colors duration-200`} />
                                </div>
                                <Field
                                  id="email"
                                  name="email"
                                  type="email"
                                  className={`w-full pl-10 pr-4 py-3 text-base border ${isDarkMode ? "bg-gray-700 border-gray-600 text-white" : "bg-white border-gray-300 text-gray-900"} rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200`}
                                  placeholder="Enter your email"
                                />
                              </div>
                              <ErrorMessage name="email" component="div" className="mt-2 text-red-500 text-sm font-medium" />
                            </div>

                            <div>
                              <label htmlFor="phone" className={`block text-sm font-semibold ${isDarkMode ? "text-gray-300" : "text-gray-800"} mb-2 transition-colors duration-200`}>
                                Phone Number
                              </label>
                              <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                  <PhoneIcon className={`h-5 w-5 ${isDarkMode ? "text-gray-500" : "text-gray-400"} transition-colors duration-200`} />
                                </div>
                                <Field
                                  id="phone"
                                  name="phone"
                                  type="text"
                                  className={`w-full pl-10 pr-4 py-3 text-base border ${isDarkMode ? "bg-gray-700 border-gray-600 text-white" : "bg-white border-gray-300 text-gray-900"} rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200`}
                                  placeholder="+91 9876543210"
                                />
                              </div>
                              <ErrorMessage name="phone" component="div" className="mt-2 text-red-500 text-sm font-medium" />
                            </div>

                            <div>
                              <label htmlFor="dateOfBirth" className={`block text-sm font-semibold ${isDarkMode ? "text-gray-300" : "text-gray-800"} mb-2 transition-colors duration-200`}>
                                Date of Birth
                              </label>
                              <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                  <CalendarIcon className={`h-5 w-5 ${isDarkMode ? "text-gray-500" : "text-gray-400"} transition-colors duration-200`} />
                                </div>
                                <Field
                                  id="dateOfBirth"
                                  name="dateOfBirth"
                                  type="date"
                                  className={`w-full pl-10 pr-4 py-3 text-base border ${isDarkMode ? "bg-gray-700 border-gray-600 text-white" : "bg-white border-gray-300 text-gray-900"} rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200`}
                                />
                              </div>
                              <ErrorMessage name="dateOfBirth" component="div" className="mt-2 text-red-500 text-sm font-medium" />
                            </div>

                            <div className="md:col-span-2">
                              <label htmlFor="address" className={`block text-sm font-semibold ${isDarkMode ? "text-gray-300" : "text-gray-800"} mb-2 transition-colors duration-200`}>
                                Address
                              </label>
                              <div className="relative">
                                <div className="absolute top-3 left-3 flex items-start pointer-events-none">
                                  <MapPinIcon className={`h-5 w-5 ${isDarkMode ? "text-gray-500" : "text-gray-400"} transition-colors duration-200`} />
                                </div>
                                <Field
                                  as="textarea"
                                  id="address"
                                  name="address"
                                  rows={3}
                                  className={`w-full pl-10 pr-4 py-3 text-base border ${isDarkMode ? "bg-gray-700 border-gray-600 text-white" : "bg-white border-gray-300 text-gray-900"} rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200`}
                                  placeholder="Enter your complete address"
                                />
                              </div>
                              <ErrorMessage name="address" component="div" className="mt-2 text-red-500 text-sm font-medium" />
                            </div>

                            <div className="md:col-span-2">
                              <label htmlFor="drivingLicense" className={`block text-sm font-semibold ${isDarkMode ? "text-gray-300" : "text-gray-800"} mb-2 transition-colors duration-200`}>
                                Driving License Number
                              </label>
                              <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                  <IdentificationIcon className={`h-5 w-5 ${isDarkMode ? "text-gray-500" : "text-gray-400"} transition-colors duration-200`} />
                                </div>
                                <Field
                                  id="drivingLicense"
                                  name="drivingLicense"
                                  type="text"
                                  className={`w-full pl-10 pr-4 py-3 text-base border ${isDarkMode ? "bg-gray-700 border-gray-600 text-white" : "bg-white border-gray-300 text-gray-900"} rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200`}
                                  placeholder="Enter your driving license number"
                                />
                              </div>
                              <ErrorMessage name="drivingLicense" component="div" className="mt-2 text-red-500 text-sm font-medium" />
                            </div>
                          </div>
                        )}

                        {activeTab === "security" && (
                          <div className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                              <div>
                                <label htmlFor="password" className={`block text-sm font-semibold ${isDarkMode ? "text-gray-300" : "text-gray-800"} mb-2 transition-colors duration-200`}>
                                  New Password
                                </label>
                                <div className="relative">
                                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <LockClosedIcon className={`h-5 w-5 ${isDarkMode ? "text-gray-500" : "text-gray-400"} transition-colors duration-200`} />
                                  </div>
                                  <Field
                                    id="password"
                                    name="password"
                                    type={showPassword ? "text" : "password"}
                                    className={`w-full pl-10 pr-12 py-3 text-base border ${isDarkMode ? "bg-gray-700 border-gray-600 text-white" : "bg-white border-gray-300 text-gray-900"} rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200`}
                                    placeholder="Enter new password"
                                  />
                                  <button
                                    type="button"
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                    onClick={togglePasswordVisibility}
                                  >
                                    {showPassword ? (
                                      <EyeSlashIcon className={`h-5 w-5 ${isDarkMode ? "text-gray-500" : "text-gray-400"} transition-colors duration-200`} />
                                    ) : (
                                      <EyeIcon className={`h-5 w-5 ${isDarkMode ? "text-gray-500" : "text-gray-400"} transition-colors duration-200`} />
                                    )}
                                  </button>
                                </div>
                                <ErrorMessage name="password" component="div" className="mt-2 text-red-500 text-sm font-medium" />
                              </div>

                              <div>
                                <label htmlFor="confirmPassword" className={`block text-sm font-semibold ${isDarkMode ? "text-gray-300" : "text-gray-800"} mb-2 transition-colors duration-200`}>
                                  Confirm Password
                                </label>
                                <div className="relative">
                                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <LockClosedIcon className={`h-5 w-5 ${isDarkMode ? "text-gray-500" : "text-gray-400"} transition-colors duration-200`} />
                                  </div>
                                  <Field
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    type={showPassword ? "text" : "password"}
                                    className={`w-full pl-10 pr-4 py-3 text-base border ${isDarkMode ? "bg-gray-700 border-gray-600 text-white" : "bg-white border-gray-300 text-gray-900"} rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200`}
                                    placeholder="Confirm new password"
                                  />
                                </div>
                                <ErrorMessage name="confirmPassword" component="div" className="mt-2 text-red-500 text-sm font-medium" />
                              </div>
                            </div>

                            <div className={`p-4 rounded-xl ${isDarkMode ? "bg-gray-700/50" : "bg-gray-50"} transition-colors duration-200`}>
                              <h4 className={`text-sm font-semibold ${isDarkMode ? "text-white" : "text-gray-900"} mb-2 transition-colors duration-200`}>
                                Password Requirements
                              </h4>
                              <ul className={`text-xs ${isDarkMode ? "text-gray-300" : "text-gray-600"} space-y-1 transition-colors duration-200`}>
                                <li className="flex items-center">
                                  <div className={`w-2 h-2 rounded-full mr-2 ${values.password?.length >= 6 ? 'bg-green-500' : 'bg-gray-400'} transition-colors duration-200`}></div>
                                  Minimum 6 characters
                                </li>
                                <li className="flex items-center">
                                  <div className={`w-2 h-2 rounded-full mr-2 ${/[A-Z]/.test(values.password) ? 'bg-green-500' : 'bg-gray-400'} transition-colors duration-200`}></div>
                                  At least one uppercase letter
                                </li>
                                <li className="flex items-center">
                                  <div className={`w-2 h-2 rounded-full mr-2 ${/\d/.test(values.password) ? 'bg-green-500' : 'bg-gray-400'} transition-colors duration-200`}></div>
                                  At least one number
                                </li>
                                <li className="flex items-center">
                                  <div className={`w-2 h-2 rounded-full mr-2 ${/[!@#$%^&*]/.test(values.password) ? 'bg-green-500' : 'bg-gray-400'} transition-colors duration-200`}></div>
                                  At least one special character
                                </li>
                              </ul>
                            </div>
                          </div>
                        )}

                        {activeTab === "preferences" && (
                          <div className="space-y-8">
                            <div>
                              <h3 className={`text-lg font-semibold ${isDarkMode ? "text-white" : "text-gray-900"} mb-4 transition-colors duration-200`}>
                                Notification Preferences
                              </h3>
                              <div className="space-y-4">
                                {[
                                  { id: "emailNotifications", label: "Email Notifications", description: "Get notified about booking updates, promotions, and special offers" },
                                  { id: "smsNotifications", label: "SMS Notifications", description: "Receive text messages for important updates about your bookings" },
                                  { id: "marketingEmails", label: "Marketing Emails", description: "Receive emails about new services, discounts, and promotions" },
                                ].map((pref) => (
                                  <div key={pref.id} className="flex items-start space-x-3 p-4 rounded-xl border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors duration-200">
                                    <Field
                                      id={pref.id}
                                      name={pref.id}
                                      type="checkbox"
                                      className={`mt-1 focus:ring-primary-500 h-4 w-4 text-primary-600 ${isDarkMode ? "bg-gray-700 border-gray-600" : "bg-white border-gray-300"} rounded transition-colors duration-200`}
                                    />
                                    <div className="flex-1">
                                      <label htmlFor={pref.id} className={`block text-sm font-medium ${isDarkMode ? "text-white" : "text-gray-900"} transition-colors duration-200`}>
                                        {pref.label}
                                      </label>
                                      <p className={`text-sm ${isDarkMode ? "text-gray-300" : "text-gray-500"} mt-1 transition-colors duration-200`}>
                                        {pref.description}
                                      </p>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>

                            <div>
                              <h3 className={`text-lg font-semibold ${isDarkMode ? "text-white" : "text-gray-900"} mb-4 transition-colors duration-200`}>
                                Language & Region
                              </h3>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                  <label htmlFor="language" className={`block text-sm font-semibold ${isDarkMode ? "text-gray-300" : "text-gray-800"} mb-2 transition-colors duration-200`}>
                                    Language
                                  </label>
                                  <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                      <GlobeAltIcon className={`h-5 w-5 ${isDarkMode ? "text-gray-500" : "text-gray-400"} transition-colors duration-200`} />
                                    </div>
                                    <Field
                                      as="select"
                                      id="language"
                                      name="language"
                                      className={`w-full pl-10 pr-4 py-3 text-base border ${isDarkMode ? "bg-gray-700 border-gray-600 text-white" : "bg-white border-gray-300 text-gray-900"} rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200`}
                                    >
                                      <option value="en">English</option>
                                      <option value="hi">Hindi</option>
                                      <option value="mr">Marathi</option>
                                      <option value="es">Spanish</option>
                                      <option value="fr">French</option>
                                    </Field>
                                  </div>
                                </div>

                                <div>
                                  <label htmlFor="currency" className={`block text-sm font-semibold ${isDarkMode ? "text-gray-300" : "text-gray-800"} mb-2 transition-colors duration-200`}>
                                    Currency
                                  </label>
                                  <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                      <CurrencyDollarIcon className={`h-5 w-5 ${isDarkMode ? "text-gray-500" : "text-gray-400"} transition-colors duration-200`} />
                                    </div>
                                    <Field
                                      as="select"
                                      id="currency"
                                      name="currency"
                                      className={`w-full pl-10 pr-4 py-3 text-base border ${isDarkMode ? "bg-gray-700 border-gray-600 text-white" : "bg-white border-gray-300 text-gray-900"} rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200`}
                                    >
                                      <option value="usd">USD ($)</option>
                                      <option value="inr">INR (₹)</option>
                                      <option value="eur">EUR (€)</option>
                                      <option value="gbp">GBP (£)</option>
                                    </Field>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                      </motion.div>

                      <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200 dark:border-gray-700">
                        <button
                          type="button"
                          className={`px-6 py-3 text-base font-semibold ${isDarkMode ? "bg-gray-700 text-gray-300 hover:bg-gray-600" : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"} rounded-xl transition-all duration-200`}
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          disabled={loading || isSubmitting}
                          className="px-8 py-3 text-base font-semibold text-white bg-gradient-to-r from-primary-500 to-primary-600 rounded-xl shadow-lg hover:from-primary-600 hover:to-primary-700 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 transition-all duration-200"
                        >
                          {loading ? (
                            <span className="flex items-center">
                              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                              </svg>
                              Saving Changes...
                            </span>
                          ) : (
                            "Save Changes"
                          )}
                        </button>
                      </div>
                    </Form>
                  )}
                </Formik>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default ProfilePage