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

const AuthContext = createContext()

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) throw new Error("useAuth must be used within an AuthProvider")
  return context
}

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isAdmin, setIsAdmin] = useState(false)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const initAuth = async () => {
      setLoading(true)
      try {
        const hasToken = initializeAuth()
        if (hasToken) {
          const response = await getCurrentUser()
          if (response.success) {
            setCurrentUser(response.user)
            setIsAuthenticated(true)
            setIsAdmin(response.user.role === "ADMIN")
          } else {
            setCurrentUser(null)
            setIsAuthenticated(false)
            setIsAdmin(false)
          }
        } else {
          setCurrentUser(null)
          setIsAuthenticated(false)
          setIsAdmin(false)
        }
      } catch (err) {
        console.error("Auth initialization error:", err)
        setError("Failed to initialize authentication")
        setCurrentUser(null)
        setIsAuthenticated(false)
        setIsAdmin(false)
      } finally {
        setLoading(false)
      }
    }
    initAuth()
  }, [])

  const login = async (email, password) => {
    setError(null)
    setLoading(true)
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
    } finally {
      setLoading(false)
    }
  }

  const register = async (userData) => {
    setError(null)
    try {
      const response = await registerUser(userData)
      if (!response.success) setError(response.message)
      return response
    } catch (err) {
      setError("Registration failed")
      return { success: false, message: "Registration failed" }
    }
  }

  const logout = () => {
    logoutUser()
    setCurrentUser(null)
    setIsAuthenticated(false)
    setIsAdmin(false)
  }

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
