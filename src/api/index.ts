import axios, { AxiosInstance } from "axios";
import toast from "react-hot-toast";
import useAuthStore from "../store/authStore";
import { auth } from "../config/firebase";

const apiClient: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_SERVER_URL,
});

apiClient.interceptors.request.use(
  async (config) => {
    useAuthStore.getState().setIsLoading(true);
    const token = await auth.currentUser?.getIdToken();

    if (token) {
      useAuthStore.getState().setToken(token);
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    useAuthStore.getState().setIsLoading(false);
    return Promise.reject(error);
  }
);

apiClient.interceptors.response.use(
  (response) => {
    useAuthStore.getState().setIsLoading(false); // Response received, stop loading
    toast.success(response?.data?.message || "Success");
    return response;
  },
  (error) => {
    useAuthStore.getState().setIsLoading(false);
    toast.error(error?.response?.data?.message || "Something went wrong");
    return Promise.reject(error);
  }
);

export default apiClient;
