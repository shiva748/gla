import { toggle_singup, login, signup, userdata,profile, post, cover, notification } from "./function";
import { combineReducers } from "redux";

const rootReducer = combineReducers({toggle_singup, login, signup, userdata, profile, post, cover, notification})
export default rootReducer;