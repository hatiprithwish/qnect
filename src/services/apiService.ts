import apiClient from "../api";
import useFlowStore from "../store/flowStore";
import { LoginRequest, RegisterRequest } from "../types/auth.type";

export const get = (url: string, config = {}) => apiClient.get(url, config);
export const post = (url: string, data: { [key: string]: any }, config = {}) =>
  apiClient.post(url, data, config);
export const put = (url: string, data: { [key: string]: any }, config = {}) =>
  apiClient.put(url, data, config);
export const del = (url: string, config = {}) => apiClient.delete(url, config);

export const loginUser = (credentials: LoginRequest) =>
  post("/auth/login", credentials);
export const registerUser = (userData: RegisterRequest) =>
  post("/auth/register", userData);

export const createFlow = async (flowData: { [key: string]: any }) => {
  const response = await post("/flow", flowData);
  if (response.data?.feedback) {
    useFlowStore.getState().setFeedback(response.data.feedback);
  }
  console.log(response.data);
  useFlowStore.getState().setAIFlow(response.data?.data);
};
