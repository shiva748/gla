import { toggle_singup, login, signup, userdata,profile, post, cover, notification, Option, posts } from "./function";
import { combineReducers } from "redux";

const rootReducer = combineReducers({toggle_singup, login, signup, userdata, profile, post, cover, notification, Option, posts})
export default rootReducer;