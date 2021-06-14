import {
  BLOG_CREATE_CLEAR,
  BLOG_CREATE_FAIL,
  BLOG_CREATE_REQUEST,
  BLOG_CREATE_SUCCESS,
  BLOG_DELETE_CLEAR,
  BLOG_DELETE_FAIL,
  BLOG_DELETE_REQUEST,
  BLOG_DELETE_SUCCESS,
  BLOG_DETAILS_FAIL,
  BLOG_DETAILS_REQUEST,
  BLOG_DETAILS_SUCCESS,
  BLOG_LIST_FAIL,
  BLOG_LIST_REQUEST,
  BLOG_LIST_SUCCESS,
  BLOG_UPDATE_CLEAR,
  BLOG_UPDATE_FAIL,
  BLOG_UPDATE_REQUEST,
  BLOG_UPDATE_SUCCESS,
  BLOG_USER_CLEAR,
  BLOG_USER_FAIL,
  BLOG_USER_REQUEST,
  BLOG_USER_SUCCESS,
} from '../constants/blogConstants';

export const blogListReducer = (state = { blogs: [] }, action) => {
  switch (action.type) {
    case BLOG_LIST_REQUEST:
      return { loading: true, blogs: [] };
    case BLOG_LIST_SUCCESS:
      return { loading: false, blogs: action.payload };
    case BLOG_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const blogDetailsReducer = (state = { blog: {} }, action) => {
  switch (action.type) {
    case BLOG_DETAILS_REQUEST:
      return { loading: true, blog: {} };
    case BLOG_DETAILS_SUCCESS:
      return { loading: false, blog: action.payload };
    case BLOG_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const blogUserReducer = (state = { blogs: [] }, action) => {
  switch (action.type) {
    case BLOG_USER_REQUEST:
      return { loading: true, blogs: [] };
    case BLOG_USER_SUCCESS:
      return { loading: false, blogs: action.payload };
    case BLOG_USER_FAIL:
      return { loading: false, error: action.payload };
    case BLOG_USER_CLEAR:
      return { blogs: [] };
    default:
      return state;
  }
};

export const blogCreateReducer = (state = { success: null }, action) => {
  switch (action.type) {
    case BLOG_CREATE_REQUEST:
      return { loading: true, success: null };
    case BLOG_CREATE_SUCCESS:
      return { loading: false, success: true, newBlog: action.payload };
    case BLOG_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case BLOG_CREATE_CLEAR:
      return { success: null };
    default:
      return state;
  }
};

export const blogUpdateReducer = (state = { success: null }, action) => {
  switch (action.type) {
    case BLOG_UPDATE_REQUEST:
      return { loading: true, success: null };
    case BLOG_UPDATE_SUCCESS:
      return { loading: false, success: true };
    case BLOG_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    case BLOG_UPDATE_CLEAR:
      return { success: null };
    default:
      return state;
  }
};

export const blogDeleteReducer = (state = { success: null }, action) => {
  switch (action.type) {
    case BLOG_DELETE_REQUEST:
      return { loading: true, success: null };
    case BLOG_DELETE_SUCCESS:
      return { loading: false, success: true };
    case BLOG_DELETE_FAIL:
      return { loading: false, error: action.payload };
    case BLOG_DELETE_CLEAR:
      return { success: null };
    default:
      return state;
  }
};
