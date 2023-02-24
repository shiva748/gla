import { toggle_singup, login, signup, userdata } from "./function";
import { combineReducers } from "redux";

const rootReducer = combineReducers({toggle_singup, login, signup, userdata})
export default rootReducer;