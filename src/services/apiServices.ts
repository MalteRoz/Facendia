import axios from "axios";

const BASE_URL = "http://localhost:3000/tasks";

const apiServices = {
  get: async (endpoint: string, params?: Record<string, any>) => {
    const response = await axios.get(`${BASE_URL}${endpoint}`, { params });
    return response.data;
  },
  post: async (endpoint: string, data: any) => {
    const response = await axios.post(`${BASE_URL}${endpoint}`, data);
    return response.data;
  },
  put: async (endpoint: string, data: any) => {
    const response = await axios.put(`${BASE_URL}${endpoint}`, data);
    return response.data;
  },
  delete: async (endpoint: string, params: Record<string, any>) => {
    const response = await axios.delete(`${BASE_URL}${endpoint}`, { params });
    return response.data;
  },
};

export default apiServices;
