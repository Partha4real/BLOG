import {
  FETCH_BLOGS,
  CREATE_BLOG,
  UPDATE_BLOG,
  SHOW_SUCCESS,
  SHOW_FAILURE,
} from "./actionType";
import * as api from "../api/api";
import { removeNotification } from "../helper/helper";

export const getBlogs = () => async (dispatch) => {
  try {
    const { data } = await api.getBlogs(); // from reaponse we extract data
    dispatch(fetchSuccess(data));
  } catch (error) {
    console.log(error);
  }
};

export function fetchSuccess(data) {
  return {
    type: FETCH_BLOGS,
    data,
  };
}

export const addBlog = (formData) => async (dispatch) => {
  try {
    const { data } = await api.addBlog(formData); // from reaponse we extract data
    dispatch(addSuccess(data));
    dispatch({
      type: SHOW_SUCCESS,
      message: data.message,
    });
    removeNotification(dispatch);
  } catch (error) {
    dispatch({
      type: SHOW_FAILURE,
      message: error.response?.data.message,
    });
    removeNotification(dispatch);
    console.log(error);
  }
};

export function addSuccess(data) {
  return {
    type: CREATE_BLOG,
    data,
  };
}

export const updateBlog = (id, updatedBlog) => async (dispatch) => {
  try {
    const { data } = await api.updateBlog(id, updatedBlog);

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
      message: error.response?.data.message,
    });
    removeNotification(dispatch);
  }
};

export function updateSuccess(data) {
  return {
    type: UPDATE_BLOG,
    data,
  };
}
