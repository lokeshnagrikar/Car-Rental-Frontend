"use client"
import { createContext, useContext, useState, useEffect } from "react"
import {
  loginUser,
  registerUser,
  logoutUser,
  getCurrentUser,
  updateUserProfile,
  initializeAuth,
} from "../services/authService"

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
        // Check if token exists in localStorage
        const hasToken = initializeAuth()

        if (hasToken) {
          // Fetch current user data
          const response = await getCurrentUser()
          if (response.success) {
            setCurrentUser(response.user)
            setIsAuthenticated(true)
            setIsAdmin(response.user.role === "ADMIN")
          } else {
            // If token is invalid, clear auth state
            setCurrentUser(null)
            setIsAuthenticated(false)
            setIsAdmin(false)
          }
        }
      } catch (err) {
        console.error("Auth initialization error:", err)
        setError("Failed to initialize authentication")
      } finally {
        setLoading(false)
      }
    }

    initAuth()
  }, [])

  // Login function
  const login = async (email, password) => {
    setError(null)
    try {
      const response = await loginUser(email, password)
      if (response.success) {
        setCurrentUser(response.user)
        setIsAuthenticated(true)
        setIsAdmin(response.user.role === "ADMIN")
      }
      return response
    } catch (err) {
      setError("Login failed")
      return { success: false, message: "Login failed" }
    }
  }

  // Register function
  const register = async (name, email, password) => {
    setError(null)
    try {
      const response = await registerUser(name, email, password)
      return response
    } catch (err) {
      setError("Registration failed")
      return { success: false, message: "Registration failed" }
    }
  }

  // Logout function
  const logout = () => {
    logoutUser()
    setCurrentUser(null)
    setIsAuthenticated(false)
    setIsAdmin(false)
  }

  // Update profile function
  const updateProfile = async (userData) => {
    setError(null)
    try {
      const response = await updateUserProfile(userData)
      if (response.success) {
        setCurrentUser(response.user)
      }
      return response
    } catch (err) {
      setError("Profile update failed")
      return { success: false, message: "Profile update failed" }
    }
  }

  // Refresh user data function
  const refreshUserData = async () => {
    try {
      const response = await getCurrentUser()
      if (response.success) {
        setCurrentUser(response.user)
        return true
      }
      return false
    } catch (err) {
      console.error("Error refreshing user data:", err)
      return false
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
    refreshUserData,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export default AuthContext
