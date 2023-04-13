import {
  toggle_singup,
  login,
  signup,
  userdata,
  profile,
  post,
  cover,
  notification,
  Option,
  posts,
  Event,
  Events,
  Job,
  Jobs,
  Chat,
} from "./function";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
  toggle_singup,
  login,
  signup,
  userdata,
  profile,
  post,
  cover,
  notification,
  Option,
  posts,
  Event,
  Events,
  Job,
  Jobs,
  Chat,
});
export default rootReducer;
