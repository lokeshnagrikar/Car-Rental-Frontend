import api from "./api"

const AUTH_TOKEN_KEY = "auth_token"
const REFRESH_TOKEN_KEY = "refresh_token"
const USER_KEY = "user_info"

const authService = {
  login: async (email, password, rememberMe = false) => {
    try {
      const response = await api.post("/auth/login", { email, password })
      const { token, refreshToken, id, name, email: userEmail, role } = response.data

      // Store tokens and user info
      if (rememberMe) {
        localStorage.setItem(AUTH_TOKEN_KEY, token)
        localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken)
        localStorage.setItem(USER_KEY, JSON.stringify({ id, name, email: userEmail, role }))
      } else {
        sessionStorage.setItem(AUTH_TOKEN_KEY, token)
        sessionStorage.setItem(REFRESH_TOKEN_KEY, refreshToken)
        sessionStorage.setItem(USER_KEY, JSON.stringify({ id, name, email: userEmail, role }))
      }

      return { id, name, email: userEmail, role }
    } catch (error) {
      console.error("Login error:", error.response?.data || error.message)
      throw error.response?.data || { message: "Login failed. Please try again." }
    }
  },

  register: async (userData) => {
    try {
      const response = await api.post("/auth/signup", userData)
      return response.data
    } catch (error) {
      console.error("Registration error:", error.response?.data || error.message)
      throw error.response?.data || { message: "Registration failed. Please try again." }
    }
  },

  logout: () => {
    localStorage.removeItem(AUTH_TOKEN_KEY)
    localStorage.removeItem(REFRESH_TOKEN_KEY)
    localStorage.removeItem(USER_KEY)
    sessionStorage.removeItem(AUTH_TOKEN_KEY)
    sessionStorage.removeItem(REFRESH_TOKEN_KEY)
    sessionStorage.removeItem(USER_KEY)
  },

  refreshToken: async () => {
    try {
      const refreshToken = localStorage.getItem(REFRESH_TOKEN_KEY) || sessionStorage.getItem(REFRESH_TOKEN_KEY)
      if (!refreshToken) {
        throw new Error("No refresh token available")
      }

      const response = await api.post("/auth/refresh-token", null, {
        params: { refreshToken },
      })

      const { token, refreshToken: newRefreshToken } = response.data

      // Update stored tokens
      if (localStorage.getItem(AUTH_TOKEN_KEY)) {
        localStorage.setItem(AUTH_TOKEN_KEY, token)
        localStorage.setItem(REFRESH_TOKEN_KEY, newRefreshToken)
      } else {
        sessionStorage.setItem(AUTH_TOKEN_KEY, token)
        sessionStorage.setItem(REFRESH_TOKEN_KEY, newRefreshToken)
      }

      return token
    } catch (error) {
      console.error("Token refresh error:", error.response?.data || error.message)
      authService.logout() // Force logout on refresh failure
      throw error
    }
  },

  requestPasswordReset: async (email) => {
    try {
      const response = await api.post("/auth/password-reset-request", { email })
      return response.data
    } catch (error) {
      console.error("Password reset request error:", error.response?.data || error.message)
      throw error.response?.data || { message: "Password reset request failed. Please try again." }
    }
  },

  resetPassword: async (token, password) => {
    try {
      const response = await api.post("/auth/password-reset", { token, password })
      return response.data
    } catch (error) {
      console.error("Password reset error:", error.response?.data || error.message)
      throw error.response?.data || { message: "Password reset failed. Please try again." }
    }
  },

  initializeAdmin: async () => {
    try {
      const response = await api.post("/auth/init")
      return response.data
    } catch (error) {
      console.error("Admin initialization error:", error.response?.data || error.message)
      throw error.response?.data || { message: "Admin initialization failed." }
    }
  },

  getCurrentUser: () => {
    const userStr = localStorage.getItem(USER_KEY) || sessionStorage.getItem(USER_KEY)
    return userStr ? JSON.parse(userStr) : null
  },

  getToken: () => {
    return localStorage.getItem(AUTH_TOKEN_KEY) || sessionStorage.getItem(AUTH_TOKEN_KEY)
  },

  isAuthenticated: () => {
    return !!authService.getToken()
  },

  hasRole: (requiredRole) => {
    const user = authService.getCurrentUser()
    return user && user.role === requiredRole
  },
}

export default authService
