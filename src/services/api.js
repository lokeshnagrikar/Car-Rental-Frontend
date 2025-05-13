import axios from "axios"
import authService from "./authService"

const api = axios.create({
  baseURL: "http://localhost:8081/api",
  headers: {
    "Content-Type": "application/json",
  },
})

// Request interceptor for API calls
api.interceptors.request.use(
  (config) => {
    const token = authService.getToken()
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

// Response interceptor for API calls
api.interceptors.response.use(
  (response) => {
    return response
  },
  async (error) => {
    const originalRequest = error.config

    // If the error is 401 and we haven't already tried to refresh the token
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true

      try {
        // Try to refresh the token
        const newToken = await authService.refreshToken()

        // If we got a new token, retry the original request
        if (newToken) {
          originalRequest.headers["Authorization"] = `Bearer ${newToken}`
          return api(originalRequest)
        }
      } catch (refreshError) {
        // If refresh token fails, redirect to login
        console.error("Token refresh failed:", refreshError)
        authService.logout()
        window.location.href = "/login"
        return Promise.reject(error)
      }
    }

    // Handle other errors
    return Promise.reject(error)
  },
)

export default api
