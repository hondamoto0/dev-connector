import {
  REGISTER_FAILED,
  REGISTER_SUCCESS,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_FAILED,
  LOGIN_SUCCESS,
  LOGOUT
} from "../constants/authConstants";
import * as userApi from "../api/user";
import * as authApi from "../api/auth";
import { setAlert } from "./alert";
// LOAD USER

export const loadUser = () => async dispatch => {
  try {
    const res = await authApi.getInfoUser();
    dispatch({ type: USER_LOADED, payload: res.data });
  } catch (err) {
    dispatch({ type: AUTH_ERROR });
  }
};

// REGISTER USER
export const registerUser = ({ name, email, password }) => async dispatch => {
  try {
    const res = await userApi.register({ name, email, password });
    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data
    });
    dispatch(loadUser());
  } catch (err) {
    console.log(err);
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, "danger")));
    }
    dispatch({
      type: REGISTER_FAILED
    });
  }
};

export const login = ({ email, password }) => async dispatch => {
  try {
    const res = await authApi.login({ email, password });
    dispatch({ type: LOGIN_SUCCESS, payload: res.data });
    dispatch(loadUser());
  } catch (err) {
    dispatch({ type: LOGIN_FAILED });
    const errors = err.response.data.errors;
    errors.forEach(err => dispatch(setAlert(err.msg, "danger")));
  }
};

export const logout = () => dispatch => {
  dispatch({ type: LOGOUT });
};
