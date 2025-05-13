import api from "./api"

export const getAllCars = async () => {
  try {
    const response = await api.get("/cars")
    return response.data
  } catch (error) {
    throw error
  }
}

export const getAvailableCars = async () => {
  try {
    const response = await api.get("/cars/available")
    return response.data
  } catch (error) {
    throw error
  }
}

export const getCarById = async (id) => {
  try {
    const response = await api.get(`/cars/${id}`)
    return response.data
  } catch (error) {
    throw error
  }
}

export const searchCars = async (params) => {
  try {
    const response = await api.get("/cars/search", { params })
    return response.data
  } catch (error) {
    throw error
  }
}

export const createCar = async (carData) => {
  try {
    const response = await api.post("/cars", carData)
    return response.data
  } catch (error) {
    throw error
  }
}

export const updateCar = async (id, carData) => {
  try {
    const response = await api.put(`/cars/${id}`, carData)
    return response.data
  } catch (error) {
    throw error
  }
}

export const deleteCar = async (id) => {
  try {
    await api.delete(`/cars/${id}`)
    return true
  } catch (error) {
    throw error
  }
}

export const uploadCarImage = async (id, file) => {
  try {
    const formData = new FormData()
    formData.append("file", file)

    const response = await api.post(`/cars/${id}/image`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })

    return response.data
  } catch (error) {
    throw error
  }
}
