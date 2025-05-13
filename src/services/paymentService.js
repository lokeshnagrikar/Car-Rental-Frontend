import api from "./api"

export const processPayment = async (paymentData) => {
  try {
    const response = await api.post("/payments/process", paymentData)
    return response.data
  } catch (error) {
    throw error
  }
}

export const getPaymentByBookingId = async (bookingId) => {
  try {
    const response = await api.get(`/payments/booking/${bookingId}`)
    return response.data
  } catch (error) {
    throw error
  }
}

export const getAllPayments = async () => {
  try {
    const response = await api.get("/payments")
    return response.data
  } catch (error) {
    throw error
  }
}

export const refundPayment = async (id) => {
  try {
    const response = await api.post(`/payments/${id}/refund`)
    return response.data
  } catch (error) {
    throw error
  }
}
