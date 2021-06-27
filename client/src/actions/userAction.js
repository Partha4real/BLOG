import {
  SIGNIN,
  ADD_USER,
  FETCH_USERS,
  UPDATE_USER,
  SHOW_SUCCESS,
  SHOW_FAILURE,
  LOGOUT,
} from "./actionType";
import * as api from "../api/api";
import { removeNotification } from "../helper/helper";

export const signin = (formData) => async (dispatch) => {
  try {
    const { data } = await api.signIn(formData);

    dispatch(signinSuccess(data));
    dispatch({
      type: SHOW_SUCCESS,
      message: data.message,
    });
    removeNotification(dispatch);
  } catch (error) {
    console.log(error);
    dispatch({
      type: SHOW_FAILURE,
      message: error.response?.data.message,
    });
    removeNotification(dispatch);
  }
};

export function signinSuccess(data) {
  return {
    type: SIGNIN,
    data,
  };
}

export const addUser = (formData) => async (dispatch) => {
  try {
    const { data } = await api.addUser(formData);

    dispatch(signupSuccess(data));
    dispatch({
      type: SHOW_SUCCESS,
      message: data.message,
    });
    removeNotification(dispatch);
  } catch (error) {
    console.log(error);
    dispatch({
      type: SHOW_FAILURE,
      message: error.response?.data.message,
    });
    removeNotification(dispatch);
  }
};

export function signupSuccess(data) {
  return {
    type: ADD_USER,
    data,
  };
}

export const getUsers = () => async (dispatch) => {
  try {
    const { data } = await api.getUsers(); // from reaponse we extract data
    dispatch(fetchSuccess(data));
  } catch (error) {
    console.log(error);
  }
};

export function fetchSuccess(data) {
  return {
    type: FETCH_USERS,
    data,
  };
}

export const updateUser = (id, updatedUser) => async (dispatch) => {
  try {
    const { data } = await api.updateUser(id, updatedUser);

    dispatch(updateSuccess(data));
    dispatch({
      type: SHOW_SUCCESS,
      message: data.message,
    });
    removeNotification(dispatch);
  } catch (error) {
    console.log(error);
    dispatch({
      type: SHOW_FAILURE,
      message: error.response.data.message,
    });
    removeNotification(dispatch);
  }
};

export function updateSuccess(data) {
  return {
    type: UPDATE_USER,
    data,
  };
}

export function logout() {
  localStorage.clear();
  return {
    type: LOGOUT,
    data: {},
  };
}
