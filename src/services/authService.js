import api from "./api"

// Initialize auth from localStorage
export const initializeAuth = () => {
  const token = localStorage.getItem("token")
  if (token) {
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`
    return true
  }
  return false
}

// Login user
export const loginUser = async (email, password) => {
  try {
    const response = await api.post("/auth/login", { email, password })
    const { token, user } = response.data

    // Store token in localStorage
    localStorage.setItem("token", token)

    // Set token in axios default headers
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`

    return { success: true, user }
  } catch (error) {
    console.error("Login error:", error)
    return {
      success: false,
      message: error.response?.data?.message || "Login failed. Please check your credentials.",
    }
  }
}

// Register user
export const registerUser = async (name, email, password) => {
  try {
    await api.post("/auth/register", { name, email, password })
    return { success: true, message: "Registration successful. Please login." }
  } catch (error) {
    console.error("Registration error:", error)
    return {
      success: false,
      message: error.response?.data?.message || "Registration failed. Please try again.",
    }
  }
}

// Logout user
export const logoutUser = () => {
  // Remove token from localStorage
  localStorage.removeItem("token")

  // Remove token from axios default headers
  delete api.defaults.headers.common["Authorization"]
}

// Get current user
export const getCurrentUser = async () => {
  try {
    const response = await api.get("/users/me")
    return { success: true, user: response.data }
  } catch (error) {
    console.error("Get current user error:", error)
    // If token is invalid, logout user
    logoutUser()
    return { success: false, message: "Failed to get user data." }
  }
}

// Update user profile
export const updateUserProfile = async (userData) => {
  try {
    const currentUser = await getCurrentUser()
    if (!currentUser.success) {
      return { success: false, message: "User not authenticated" }
    }

    const userId = currentUser.user.id
    const response = await api.put(`/users/${userId}`, userData)

    return { success: true, user: response.data }
  } catch (error) {
    console.error("Update profile error:", error)
    return {
      success: false,
      message: error.response?.data?.message || "Failed to update profile. Please try again.",
    }
  }
}

// Request password reset
export const requestPasswordReset = async (email) => {
  try {
    await api.post("/auth/password-reset-request", { email })
    return { success: true, message: "Password reset email sent. Please check your inbox." }
  } catch (error) {
    console.error("Password reset request error:", error)
    return {
      success: false,
      message: error.response?.data?.message || "Failed to request password reset. Please try again.",
    }
  }
}

// Reset password with token
export const resetPassword = async (token, password) => {
  try {
    await api.post("/auth/reset-password", { token, password })
    return { success: true, message: "Password reset successful. You can now login with your new password." }
  } catch (error) {
    console.error("Password reset error:", error)
    return {
      success: false,
      message: error.response?.data?.message || "Failed to reset password. Please try again.",
    }
  }
}
// Upload profile picture