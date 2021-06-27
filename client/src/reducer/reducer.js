import { combineReducers } from "redux";
import notification from "./notificationReducer";
import auth from "./authReducer";
import user from "./userReducer";
import blog from "./blogReducer";

export default combineReducers({ notification, auth, user, blog });
