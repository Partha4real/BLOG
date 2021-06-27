import { FETCH_BLOGS, CREATE_BLOG, UPDATE_BLOG } from "../actions/actionType";

export default function user(state = [], action) {
  switch (action.type) {
    case CREATE_BLOG:
      return [action.data.data, ...state];
    case FETCH_BLOGS:
      return [...action.data];
    case UPDATE_BLOG:
      return state.map((item) =>
        item._id === action.data.data._id ? action.data.data : item
      );
    default:
      return state;
  }
}
