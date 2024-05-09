import axios from 'axios';

const BASE_URL = 'http://localhost:8000';

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'multipart/form-data',
  },
});

export const login = async (email, password) => {
  try {
    const response = await api.post('/api/login', {
      username: email,
      password: password
    });
    return response.data.access_token;
  } catch (error) {
    throw error;
  }
};

export default api;