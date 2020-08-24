import axiosService from "../axios/axiosService";
import { API_ENDPOINT } from "../constants/url";

const url = "api/auth";
export const getInfoUser = () => {
  return axiosService.get(`${API_ENDPOINT}/${url}`);
};

export const login = ({ email, password }) => {
  return axiosService.post(`${API_ENDPOINT}/${url}`, { email, password });
};
