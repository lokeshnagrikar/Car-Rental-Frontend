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

    localStorage.setItem("token", token)
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
export const registerUser = async ({ name, email, password }) => {
  try {
    console.log("Register user payload:", { name, email, password }) // for debugging
    await api.post("/auth/signup", { name, email, password })
    return { success: true, message: "Registration successful. Please login." }
  } catch (error) {
    console.error("Registration error:", error.response?.data || error.message)
    return {
      success: false,
      message: error.response?.data?.message || "Registration failed. Please try again.",
    }
  }
}

// Logout user
export const logoutUser = () => {
  localStorage.removeItem("token")
  delete api.defaults.headers.common["Authorization"]
}

// Get current user
export const getCurrentUser = async () => {
  try {
    const response = await api.get("/users/me")
    return { success: true, user: response.data }
  } catch (error) {
    console.error("Get current user error:", error)
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
    const response = await api.patch(`/users/${userId}`, userData)

    return { success: true, user: response.data }
  } catch (error) {
    console.error("Update profile error:", error)
    return {
      success: false,
      message: error.response?.data?.message || "Failed to update profile. Please try again.",
    }
  }
}

