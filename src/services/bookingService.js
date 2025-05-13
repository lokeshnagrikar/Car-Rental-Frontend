import api from "./api"

export const createBooking = async (bookingData) => {
  try {
    const response = await api.post("/bookings", bookingData)
    return response.data
  } catch (error) {
    console.error("Error creating booking:", error)
    throw error
  }
}

export const getMyBookings = async () => {
  try {
    const response = await api.get("/bookings/my-bookings")
    return response.data
  } catch (error) {
    console.error("Error fetching my bookings:", error)
    throw error
  }
}

export const getBookingById = async (id) => {
  try {
    const response = await api.get(`/bookings/${id}`)
    return response.data
  } catch (error) {
    console.error(`Error fetching booking with id ${id}:`, error)
    throw error
  }
}

export const updateBookingStatus = async (id, status) => {
  try {
    const response = await api.patch(`/bookings/${id}/status?status=${status}`)
    return response.data
  } catch (error) {
    console.error(`Error updating booking status for id ${id}:`, error)
    throw error
  }
}

export const getAllBookings = async () => {
  try {
    const response = await api.get("/bookings")
    return response.data
  } catch (error) {
    console.error("Error fetching all bookings:", error)
    throw error
  }
}

export const getBookingsByCar = async (carId) => {
  try {
    const response = await api.get(`/bookings/car/${carId}`)
    return response.data
  } catch (error) {
    console.error(`Error fetching bookings for car id ${carId}:`, error)
    throw error
  }
}

export const deleteBooking = async (id) => {
  try {
    await api.delete(`/bookings/${id}`)
    return true
  } catch (error) {
    console.error(`Error deleting booking with id ${id}:`, error)
    throw error
  }
}
