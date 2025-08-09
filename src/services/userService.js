import api from "./api";

export const getCurrentUser = async () => {
  try {
    const response = await api.get("/users/me");
    return response.data;
  } catch (error) {
    throw error;
  }
};

// export const updateUser = async (id, userData) => {
//   try {
//     const response = await api.put(`/users/${id}`, userData);
//     return response.data;
//   } catch (error) {
//     throw error;
//   }
// };

export const updateUser = async (id, updates) => {
  try {
    const response = await api.patch(`/users/${id}`, updates);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getAllUsers = async () => {
  try {
    const response = await api.get("/users");
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getUserById = async (id) => {
  try {
    const response = await api.get(`/users/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const createAdmin = async (userData) => {
  try {
    const response = await api.post("/users/admin", userData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteUser = async (id) => {
  try {
    await api.delete(`/users/${id}`);
    return true;
  } catch (error) {
    throw error;
  }
};

export const uploadProfilePicture = async (userId, formData) => {
  try {
    const response = await api.post(`/users/${userId}/profile-picture`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error uploading profile picture:", error);
    throw error;
  }
};
