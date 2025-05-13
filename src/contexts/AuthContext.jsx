"use client"
import { createContext, useContext, useState, useEffect } from "react"
import authService from "../services/authService"

// Create the context
const AuthContext = createContext()

// Custom hook to use the auth context
export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

// Auth provider component
export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isAdmin, setIsAdmin] = useState(false)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Initialize auth state on component mount
  useEffect(() => {
    const initAuth = async () => {
      setLoading(true)
      try {
        // Check if token exists
        const user = authService.getCurrentUser()

        if (user) {
          setCurrentUser(user)
          setIsAuthenticated(true)
          setIsAdmin(user.role === "ADMIN")
        } else {
          // Try refreshing token if user is not available
          await authService.refreshToken()
          const refreshedUser = authService.getCurrentUser()
          if (refreshedUser) {
            setCurrentUser(refreshedUser)
            setIsAuthenticated(true)
            setIsAdmin(refreshedUser.role === "ADMIN")
          }
        }
      } catch (err) {
        console.error("Auth initialization error:", err)
        setError("Failed to initialize authentication")
        authService.logout()
      } finally {
        setLoading(false)
      }
    }

    initAuth()
  }, [])

  // Login function
  const login = async (email, password, rememberMe = false) => {
    setError(null)
    try {
      const user = await authService.login(email, password, rememberMe)
      setCurrentUser(user)
      setIsAuthenticated(true)
      setIsAdmin(user.role === "ADMIN")
      return { success: true, user }
    } catch (err) {
      setError("Login failed")
      return { success: false, message: "Login failed" }
    }
  }

  // Register function
  const register = async (userData) => {
    setError(null)
    try {
      const response = await authService.register(userData)
      return { success: true, data: response }
    } catch (err) {
      setError("Registration failed")
      return { success: false, message: "Registration failed" }
    }
  }

  // Logout function
  const logout = () => {
    authService.logout()
    setCurrentUser(null)
    setIsAuthenticated(false)
    setIsAdmin(false)
  }

  // Update profile function
  const updateProfile = async (userData) => {
    setError(null)
    try {
      const response = await authService.updateUserProfile(userData)
      if (response.success) {
        setCurrentUser(response.user)
      }
      return response
    } catch (err) {
      setError("Profile update failed")
      return { success: false, message: "Profile update failed" }
    }
  }

  // Context value
  const value = {
    currentUser,
    isAuthenticated,
    isAdmin,
    loading,
    error,
    login,
    register,
    logout,
    updateProfile,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export default AuthContext
