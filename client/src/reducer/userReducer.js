import { ADD_USER, FETCH_USERS, UPDATE_USER } from "../actions/actionType";

export default function user(state = [], action) {
  switch (action.type) {
    case ADD_USER:
      return [action.data.data, ...state];
    case FETCH_USERS:
      return [...action.data];
    case UPDATE_USER:
      return state.map((item) =>
        item._id === action.data.data._id ? action.data.data : item
      );
    default:
      return state;
  }
}
