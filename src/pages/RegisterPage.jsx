"use client"

import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Formik, Form, Field, ErrorMessage } from "formik"
import * as Yup from "yup"
import { useAuth } from "../contexts/AuthContext"
import { EyeIcon, EyeSlashIcon, CheckCircleIcon } from "@heroicons/react/24/outline"

const RegisterPage = () => {
  const { register } = useAuth()
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false)
  const [registerError, setRegisterError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [registrationSuccess, setRegistrationSuccess] = useState(false)

  const initialValues = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    agreeToTerms: false,
  }

  const passwordStrengthRegex = {
    hasLowerCase: /[a-z]/,
    hasUpperCase: /[A-Z]/,
    hasNumber: /\d/,
    hasSpecialChar: /[!@#$%^&*(),.?":{}|<>]/,
  }

  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required").min(3, "Name must be at least 3 characters"),
    email: Yup.string().email("Invalid email address").required("Email is required"),
    password: Yup.string()
      .required("Password is required")
      .min(6, "Password must be at least 6 characters")
      .test(
        "password-strength",
        "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
        (value) => {
          if (!value) return false
          let strength = 0
          if (passwordStrengthRegex.hasLowerCase.test(value)) strength++
          if (passwordStrengthRegex.hasUpperCase.test(value)) strength++
          if (passwordStrengthRegex.hasNumber.test(value)) strength++
          if (passwordStrengthRegex.hasSpecialChar.test(value)) strength++
          return strength >= 3 // Require at least 3 of the 4 criteria
        },
      ),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Confirm password is required"),
    agreeToTerms: Yup.boolean().oneOf([true], "You must accept the terms and conditions"),
  })

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    setRegisterError("")
    setIsLoading(true)

    try {
      const userData = {
        name: values.name,
        email: values.email,
        password: values.password,
      }

      await register(userData)
      setRegistrationSuccess(true)
      resetForm()

      // Redirect to login after 3 seconds
      setTimeout(() => {
        navigate("/login")
      }, 3000)
    } catch (error) {
      setRegisterError(error.message || "Registration failed. Please try again.")
    } finally {
      setIsLoading(false)
      setSubmitting(false)
    }
  }

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  const getPasswordStrength = (password) => {
    if (!password) return 0

    let strength = 0
    if (password.length >= 6) strength++
    if (passwordStrengthRegex.hasLowerCase.test(password)) strength++
    if (passwordStrengthRegex.hasUpperCase.test(password)) strength++
    if (passwordStrengthRegex.hasNumber.test(password)) strength++
    if (passwordStrengthRegex.hasSpecialChar.test(password)) strength++

    return Math.min(strength, 5) // Max strength is 5
  }

  const getPasswordStrengthText = (strength) => {
    const texts = ["Very Weak", "Weak", "Fair", "Good", "Strong", "Very Strong"]
    return texts[strength] || ""
  }

  const getPasswordStrengthColor = (strength) => {
    const colors = [
      "bg-red-500", // Very Weak
      "bg-red-400", // Weak
      "bg-yellow-500", // Fair
      "bg-yellow-400", // Good
      "bg-green-400", // Strong
      "bg-green-500", // Very Strong
    ]
    return colors[strength] || ""
  }

  if (registrationSuccess) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-lg text-center">
          <CheckCircleIcon className="mx-auto h-16 w-16 text-green-500" />
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">Registration Successful!</h2>
          <p className="mt-2 text-lg text-gray-600">Your account has been created successfully.</p>
          <p className="text-sm text-gray-500">You will be redirected to the login page in a few seconds...</p>
          <div className="mt-6">
            <Link
              to="/login"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Go to Login
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-lg">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">Create an Account</h2>
          <p className="mt-2 text-sm text-gray-600">Join us to start renting cars today</p>
        </div>

        {registerError && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-4">
            <div className="flex">
              <div className="ml-3">
                <p className="text-sm text-red-700">{registerError}</p>
              </div>
            </div>
          </div>
        )}

        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
          {({ isSubmitting, errors, touched, values }) => (
            <Form className="mt-8 space-y-6">
              <div className="rounded-md shadow-sm -space-y-px">
                <div className="mb-4">
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name
                  </label>
                  <Field
                    id="name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    className={`appearance-none relative block w-full px-3 py-2 border ${
                      errors.name && touched.name ? "border-red-300" : "border-gray-300"
                    } placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm`}
                    placeholder="Full name"
                  />
                  <ErrorMessage name="name" component="div" className="mt-1 text-sm text-red-600" />
                </div>

                <div className="mb-4">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address
                  </label>
                  <Field
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    className={`appearance-none relative block w-full px-3 py-2 border ${
                      errors.email && touched.email ? "border-red-300" : "border-gray-300"
                    } placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm`}
                    placeholder="Email address"
                  />
                  <ErrorMessage name="email" component="div" className="mt-1 text-sm text-red-600" />
                </div>

                <div className="mb-4">
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                    Password
                  </label>
                  <div className="relative">
                    <Field
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      autoComplete="new-password"
                      className={`appearance-none relative block w-full px-3 py-2 border ${
                        errors.password && touched.password ? "border-red-300" : "border-gray-300"
                      } placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm`}
                      placeholder="Password"
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
                  <ErrorMessage name="password" component="div" className="mt-1 text-sm text-red-600" />

                  {values.password && (
                    <div className="mt-2">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-medium text-gray-700">Password Strength:</span>
                        <span
                          className={`text-xs font-medium ${
                            getPasswordStrength(values.password) <= 1
                              ? "text-red-500"
                              : getPasswordStrength(values.password) <= 3
                                ? "text-yellow-500"
                                : "text-green-500"
                          }`}
                        >
                          {getPasswordStrengthText(getPasswordStrength(values.password))}
                        </span>
                      </div>
                      <div className="h-1.5 w-full bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className={`h-full ${getPasswordStrengthColor(getPasswordStrength(values.password))}`}
                          style={{ width: `${(getPasswordStrength(values.password) / 5) * 100}%` }}
                        ></div>
                      </div>
                      <ul className="mt-2 text-xs text-gray-500 space-y-1">
                        <li className={`flex items-center ${values.password.length >= 6 ? "text-green-500" : ""}`}>
                          <span className={`mr-1 ${values.password.length >= 6 ? "text-green-500" : ""}`}>•</span>
                          At least 6 characters
                        </li>
                        <li
                          className={`flex items-center ${passwordStrengthRegex.hasUpperCase.test(values.password) ? "text-green-500" : ""}`}
                        >
                          <span
                            className={`mr-1 ${passwordStrengthRegex.hasUpperCase.test(values.password) ? "text-green-500" : ""}`}
                          >
                            •
                          </span>
                          One uppercase letter
                        </li>
                        <li
                          className={`flex items-center ${passwordStrengthRegex.hasLowerCase.test(values.password) ? "text-green-500" : ""}`}
                        >
                          <span
                            className={`mr-1 ${passwordStrengthRegex.hasLowerCase.test(values.password) ? "text-green-500" : ""}`}
                          >
                            •
                          </span>
                          One lowercase letter
                        </li>
                        <li
                          className={`flex items-center ${passwordStrengthRegex.hasNumber.test(values.password) ? "text-green-500" : ""}`}
                        >
                          <span
                            className={`mr-1 ${passwordStrengthRegex.hasNumber.test(values.password) ? "text-green-500" : ""}`}
                          >
                            •
                          </span>
                          One number
                        </li>
                        <li
                          className={`flex items-center ${passwordStrengthRegex.hasSpecialChar.test(values.password) ? "text-green-500" : ""}`}
                        >
                          <span
                            className={`mr-1 ${passwordStrengthRegex.hasSpecialChar.test(values.password) ? "text-green-500" : ""}`}
                          >
                            •
                          </span>
                          One special character
                        </li>
                      </ul>
                    </div>
                  )}
                </div>

                <div className="mb-4">
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                    Confirm Password
                  </label>
                  <Field
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showPassword ? "text" : "password"}
                    autoComplete="new-password"
                    className={`appearance-none relative block w-full px-3 py-2 border ${
                      errors.confirmPassword && touched.confirmPassword ? "border-red-300" : "border-gray-300"
                    } placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm`}
                    placeholder="Confirm password"
                  />
                  <ErrorMessage name="confirmPassword" component="div" className="mt-1 text-sm text-red-600" />
                </div>
              </div>

              <div className="flex items-center">
                <Field
                  id="agreeToTerms"
                  name="agreeToTerms"
                  type="checkbox"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="agreeToTerms" className="ml-2 block text-sm text-gray-900">
                  I agree to the{" "}
                  <Link to="/terms" className="font-medium text-blue-600 hover:text-blue-500 ms-1">
                    Terms and Conditions
                  </Link>{" "}
                  and{" "}
                  <Link to="/privacy" className="font-medium text-blue-600 hover:text-blue-500 ms-1">
                    Privacy Policy
                  </Link>
                </label>
              </div>
              <ErrorMessage name="agreeToTerms" component="div" className="mt-1 text-sm text-red-600" />

              <div>
                <button
                  type="submit"
                  disabled={isSubmitting || isLoading}
                  className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <span className="flex items-center">
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
                      Creating account...
                    </span>
                  ) : (
                    "Create Account"
                  )}
                </button>
              </div>
            </Form>
          )}
        </Formik>

        <div className="text-center mt-4">
          <p className="text-sm text-gray-600">
            Already have an account?{" "}
            <Link to="/login" className="font-medium text-blue-600 hover:text-blue-500 ms-1">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default RegisterPage
