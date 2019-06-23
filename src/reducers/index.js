import { combineReducers } from "redux";
import authReducer from "./authReducer";
import gmailReducer from "./gmailReducer";

export default combineReducers({
  auth: authReducer,
  mail: gmailReducer
});
