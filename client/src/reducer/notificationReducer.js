import { SHOW_SUCCESS, SHOW_FAILURE, REMOVE_NOTI } from "../actions/actionType";

export default function notification(state = {}, action) {
  switch (action.type) {
    case SHOW_SUCCESS:
      return { message: action.message, messageType: "success" };
    case SHOW_FAILURE:
      return { message: action.message, messageType: "error" };
    case REMOVE_NOTI:
      return { message: "", messageType: "info" };
    default:
      return state;
  }
}
