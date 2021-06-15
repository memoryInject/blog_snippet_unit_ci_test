import axios from 'axios';
import {
  BLOG_CREATE_FAIL,
  BLOG_CREATE_REQUEST,
  BLOG_CREATE_SUCCESS,
  BLOG_DELETE_FAIL,
  BLOG_DELETE_REQUEST,
  BLOG_DELETE_SUCCESS,
  BLOG_DETAILS_FAIL,
  BLOG_DETAILS_REQUEST,
  BLOG_DETAILS_SUCCESS,
  BLOG_LIST_FAIL,
  BLOG_LIST_REQUEST,
  BLOG_LIST_SUCCESS,
  BLOG_UPDATE_FAIL,
  BLOG_UPDATE_REQUEST,
  BLOG_UPDATE_SUCCESS,
  BLOG_USER_FAIL,
  BLOG_USER_REQUEST,
  BLOG_USER_SUCCESS,
} from '../constants/blogConstants';

export const listBlogs =
  (pageNumber = '') =>
  async (dispatch) => {
    try {
      dispatch({ type: BLOG_LIST_REQUEST });

      const { data } = await axios.get(`/api/blogs?pageNumber=${pageNumber}`);

      dispatch({
        type: BLOG_LIST_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: BLOG_LIST_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const listBlogDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: BLOG_DETAILS_REQUEST });

    const { data } = await axios.get(`/api/blogs/${id}`);

    dispatch({
      type: BLOG_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: BLOG_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const listUserBlogs =
  (pageNumber = '') =>
  async (dispatch, getState) => {
    try {
      dispatch({ type: BLOG_USER_REQUEST });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.get(
        `/api/blogs/user?pageNumber=${pageNumber}`,
        config
      );

      dispatch({
        type: BLOG_USER_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: BLOG_USER_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const createBlog = (blog) => async (dispatch, getState) => {
  try {
    dispatch({ type: BLOG_CREATE_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.post('/api/blogs/', blog, config);

    dispatch({
      type: BLOG_CREATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: BLOG_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const updateBlog = (id, updateBlog) => async (dispatch, getState) => {
  try {
    dispatch({ type: BLOG_UPDATE_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.put(`/api/blogs/${id}`, updateBlog, config);

    dispatch({
      type: BLOG_UPDATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: BLOG_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const deleteBlog = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: BLOG_DELETE_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.delete(`/api/blogs/${id}`, config);

    dispatch({
      type: BLOG_DELETE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: BLOG_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
