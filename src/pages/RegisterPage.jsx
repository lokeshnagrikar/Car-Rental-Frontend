"use client"
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Formik, Form, Field, ErrorMessage } from "formik"
import * as Yup from "yup"
import { useAuth } from "../contexts/AuthContext"
import { EyeIcon, EyeSlashIcon, CheckCircleIcon, UserIcon } from "@heroicons/react/24/outline"

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
          return strength >= 3
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

      const response = await register(userData)

      if (response.success) {
        setRegistrationSuccess(true)
        resetForm()
        setTimeout(() => navigate("/login"), 3000)
      } else {
        setRegisterError(response.message || "Registration failed")
      }
    } catch (error) {
      setRegisterError(error.message || "Registration failed. Please try again.")
    } finally {
      setIsLoading(false)
      setSubmitting(false)
    }
  }

  const togglePasswordVisibility = () => setShowPassword(!showPassword)

  const getPasswordStrength = (password) => {
    if (!password) return 0

    let strength = 0
    if (password.length >= 6) strength++
    if (passwordStrengthRegex.hasLowerCase.test(password)) strength++
    if (passwordStrengthRegex.hasUpperCase.test(password)) strength++
    if (passwordStrengthRegex.hasNumber.test(password)) strength++
    if (passwordStrengthRegex.hasSpecialChar.test(password)) strength++

    return Math.min(strength, 5)
  }

  const getPasswordStrengthText = (strength) => {
    const texts = ["Very Weak", "Weak", "Fair", "Good", "Strong", "Very Strong"]
    return texts[strength] || ""
  }

  const getPasswordStrengthColor = (strength) => {
    const colors = [
      "bg-red-500",    // Very Weak
      "bg-orange-500", // Weak
      "bg-yellow-500", // Fair
      "bg-blue-400",   // Good
      "bg-green-400",  // Strong
      "bg-green-500",  // Very Strong
    ]
    return colors[strength] || ""
  }

  if (registrationSuccess) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8 bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 p-10 text-center">
          <div className="mx-auto h-20 w-20 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center shadow-lg">
            <CheckCircleIcon className="h-10 w-10 text-white" />
          </div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-green-600 dark:from-white dark:to-green-400 bg-clip-text text-transparent">
            Registration Successful!
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400">Your account has been created successfully.</p>
          <p className="text-sm text-gray-500 dark:text-gray-500">You will be redirected to the login page in a few seconds...</p>
          <div className="mt-6">
            <Link
              to="/login"
              className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-semibold rounded-xl text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition-all duration-200 transform hover:-translate-y-0.5"
            >
              Go to Login
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <div className="mx-auto h-16 w-16 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl flex items-center justify-center shadow-lg mb-4">
            <UserIcon className="h-8 w-8 text-white" />
          </div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-purple-600 dark:from-white dark:to-purple-400 bg-clip-text text-transparent">
            Create Account
          </h2>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Join us to start your car rental journey
          </p>
        </div>

        {/* Register Card */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 p-8 transition-all duration-300 hover:shadow-2xl">
          {registerError && (
            <div className="mb-6 p-4 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800">
              <div className="flex items-center">
                <svg className="h-5 w-5 text-red-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="text-sm text-red-700 dark:text-red-300">{registerError}</p>
              </div>
            </div>
          )}

          <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
            {({ isSubmitting, errors, touched, values }) => (
              <Form className="space-y-6">
                {/* Name Field */}
                <div>
                  <label htmlFor="name" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Full Name
                  </label>
                  <div className="relative">
                    <Field
                      id="name"
                      name="name"
                      type="text"
                      autoComplete="name"
                      className={`w-full px-4 py-3 rounded-xl border ${
                        errors.name && touched.name
                          ? "border-red-300 focus:border-red-500 focus:ring-red-500"
                          : "border-gray-300 dark:border-gray-600 focus:border-purple-500 focus:ring-purple-500"
                      } bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 transition-all duration-200`}
                      placeholder="Enter your full name"
                    />
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                      <UserIcon className="h-5 w-5 text-gray-400" />
                    </div>
                  </div>
                  <ErrorMessage name="name" component="div" className="mt-2 text-sm text-red-600 dark:text-red-400" />
                </div>

                {/* Email Field */}
                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Email Address
                  </label>
                  <div className="relative">
                    <Field
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      className={`w-full px-4 py-3 rounded-xl border ${
                        errors.email && touched.email
                          ? "border-red-300 focus:border-red-500 focus:ring-red-500"
                          : "border-gray-300 dark:border-gray-600 focus:border-purple-500 focus:ring-purple-500"
                      } bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 transition-all duration-200`}
                      placeholder="Enter your email"
                    />
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                      <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                  </div>
                  <ErrorMessage name="email" component="div" className="mt-2 text-sm text-red-600 dark:text-red-400" />
                </div>

                {/* Password Field */}
                <div>
                  <label htmlFor="password" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <Field
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      autoComplete="new-password"
                      className={`w-full px-4 py-3 rounded-xl border ${
                        errors.password && touched.password
                          ? "border-red-300 focus:border-red-500 focus:ring-red-500"
                          : "border-gray-300 dark:border-gray-600 focus:border-purple-500 focus:ring-purple-500"
                      } bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 transition-all duration-200 pr-12`}
                      placeholder="Create a password"
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors duration-200"
                      onClick={togglePasswordVisibility}
                    >
                      {showPassword ? (
                        <EyeSlashIcon className="h-5 w-5" />
                      ) : (
                        <EyeIcon className="h-5 w-5" />
                      )}
                    </button>
                  </div>
                  <ErrorMessage name="password" component="div" className="mt-2 text-sm text-red-600 dark:text-red-400" />

                  {/* Password Strength Meter */}
                  {values.password && (
                    <div className="mt-3 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-semibold text-gray-700 dark:text-gray-300">Password Strength</span>
                        <span className={`text-xs font-bold ${
                          getPasswordStrength(values.password) <= 1 ? "text-red-500" :
                          getPasswordStrength(values.password) <= 2 ? "text-orange-500" :
                          getPasswordStrength(values.password) <= 3 ? "text-yellow-500" :
                          getPasswordStrength(values.password) <= 4 ? "text-blue-500" : "text-green-500"
                        }`}>
                          {getPasswordStrengthText(getPasswordStrength(values.password))}
                        </span>
                      </div>
                      <div className="h-2 w-full bg-gray-200 dark:bg-gray-600 rounded-full overflow-hidden mb-3">
                        <div
                          className={`h-full ${getPasswordStrengthColor(getPasswordStrength(values.password))} transition-all duration-500`}
                          style={{ width: `${(getPasswordStrength(values.password) / 5) * 100}%` }}
                        ></div>
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-xs">
                        {[
                          { condition: values.password.length >= 6, text: "6+ characters" },
                          { condition: passwordStrengthRegex.hasUpperCase.test(values.password), text: "Uppercase" },
                          { condition: passwordStrengthRegex.hasLowerCase.test(values.password), text: "Lowercase" },
                          { condition: passwordStrengthRegex.hasNumber.test(values.password), text: "Number" },
                          { condition: passwordStrengthRegex.hasSpecialChar.test(values.password), text: "Special char" },
                        ].map((req, index) => (
                          <div key={index} className={`flex items-center ${req.condition ? "text-green-500" : "text-gray-400"}`}>
                            <div className={`w-1.5 h-1.5 rounded-full mr-2 ${req.condition ? "bg-green-500" : "bg-gray-400"}`}></div>
                            {req.text}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Confirm Password Field */}
                <div>
                  <label htmlFor="confirmPassword" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Confirm Password
                  </label>
                  <Field
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showPassword ? "text" : "password"}
                    autoComplete="new-password"
                    className={`w-full px-4 py-3 rounded-xl border ${
                      errors.confirmPassword && touched.confirmPassword
                        ? "border-red-300 focus:border-red-500 focus:ring-red-500"
                        : "border-gray-300 dark:border-gray-600 focus:border-purple-500 focus:ring-purple-500"
                    } bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 transition-all duration-200`}
                    placeholder="Confirm your password"
                  />
                  <ErrorMessage name="confirmPassword" component="div" className="mt-2 text-sm text-red-600 dark:text-red-400" />
                </div>

                {/* Terms and Conditions */}
                <div className="flex items-start space-x-3">
                  <Field
                    id="agreeToTerms"
                    name="agreeToTerms"
                    type="checkbox"
                    className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 mt-1 transition duration-200"
                  />
                  <label htmlFor="agreeToTerms" className="text-sm text-gray-700 dark:text-gray-300">
                    I agree to the{" "}
                    <Link to="/terms" className="font-semibold text-purple-600 hover:text-purple-500 dark:text-purple-400 dark:hover:text-purple-300 transition-colors duration-200">
                      Terms and Conditions
                    </Link>{" "}
                    and{" "}
                    <Link to="/privacy" className="font-semibold text-purple-600 hover:text-purple-500 dark:text-purple-400 dark:hover:text-purple-300 transition-colors duration-200">
                      Privacy Policy
                    </Link>
                  </label>
                </div>
                <ErrorMessage name="agreeToTerms" component="div" className="text-sm text-red-600 dark:text-red-400" />

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting || isLoading}
                  className="group relative w-full flex justify-center items-center py-3 px-4 border border-transparent text-base font-semibold rounded-xl text-white bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:-translate-y-0.5 hover:shadow-lg"
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
              </Form>
            )}
          </Formik>

          {/* Sign In Link */}
          <div className="mt-8 text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Already have an account?{" "}
              <Link
                to="/login"
                className="font-semibold text-purple-600 hover:text-purple-500 dark:text-purple-400 dark:hover:text-purple-300 transition-colors duration-200"
              >
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RegisterPage