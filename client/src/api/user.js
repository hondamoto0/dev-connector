import axiosService from "../axios/axiosService";
import { API_ENDPOINT } from "../constants/url";
import { loadUser } from "../actions";
const url = "api/users";

export const register = body => dispatch => {
  dispatch(loadUser());
  return axiosService.post(`${API_ENDPOINT}/${url}`, body);
};
