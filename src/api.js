import axios from "axios";

const BASE_URL = `https://appointment-backend.sasheshsingh.com/`;

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "multipart/form-data",
  },
});

export const login = async (email, password) => {
  try {
    const response = await api.post("/api/login", {
      username: email,
      password: password,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const signUp = async (email, password) => {
  try {
    const response = await api.post("/api/signup", {
      username: email,
      email: email,
      password: password,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export default api;
