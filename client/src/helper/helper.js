import { REMOVE_NOTI } from "../actions/actionType";

export function removeNotification(dispatch) {
  setTimeout(() => {
    dispatch({ type: REMOVE_NOTI });
  }, 3000);
}
