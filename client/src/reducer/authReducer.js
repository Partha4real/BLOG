import { SIGNIN, LOGOUT } from "../actions/actionType";

export default function user(state = { authUser: null }, action) {
  switch (action.type) {
    case SIGNIN:
      localStorage.setItem("profile", JSON.stringify({ ...action.data }));
      return { ...state, authUser: action.data.result };
    case LOGOUT:
      return { ...state, authUser: null };
    default:
      return state;
  }
}
