import { toggle_singup, login, signup, userdata,profile, post } from "./function";
import { combineReducers } from "redux";

const rootReducer = combineReducers({toggle_singup, login, signup, userdata, profile, post})
export default rootReducer;