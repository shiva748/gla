import { useEffect } from "react";
const open = false;
export const toggle_singup = (state = open, action) => {
  if (action.for === "toggle_singup") {
    switch (action.type) {
      case "open":
        return (state = true);
      case "close":
        return (state = false);
      default:
        return state;
    }
  } else {
    return state;
  }
};

let logindata = { email: "", password: "", process: false };
export const login = (state = logindata, action) => {
  if (action.for === "login") {
    if (action.type === "fill") {
      state = action.data;
      return state;
    } else if (action.type === "clean") {
      state = { email: "", password: "" };
      return state;
    } else if (action.type === "process") {
      state = { ...state, process: !state.process };
      return state;
    } else {
      const name = action.event.target.name;
      const value = action.event.target.value;
      state = { ...state, [name]: value };
      return state;
    }
  } else {
    return state;
  }
};

const signupdata = { fullName: "", email: "", password: "", confirmpass: "" };
export const signup = (state = signupdata, action) => {
  if (action.for === "signup") {
    if (action.type === "clean") {
      state = { fullName: "", email: "", password: "", confirmpass: "" };
      return state;
    } else if (action.type === "process") {
      state = { ...state, process: !state.process };
      return state;
    } else {
      const name = action.event.target.name;
      const value = action.event.target.value;
      state = { ...state, [name]: value };
      return state;
    }
  } else {
    return state;
  }
};

let ldata = {
  data: null,
  loading: true,
  result: false,
  required: true,
};
export const userdata = (state = ldata, action) => {
  if (action.for === "userdata") {
    if (action.type === "validate") {
      state = action.data;
      return state;
    } else {
      return state;
    }
  } else {
    return state;
  }
};

const prfl = {
  display: false,
  image: "",
  fileName: "",
  loading: false,
};
export const profile = (state = prfl, action) => {
  if (action.for === "profile") {
    if (action.type === "Profileoc") {
      state = { ...state, display: !state.display };
      return state;
    } else if (action.type === "select") {
      state = { ...state, ...action.data };
      return state;
    } else {
      return state;
    }
  } else {
    return state;
  }
};

const pst = {
  text: "",
  files: "",
  visiblity: "public",
  loading: false,
};

export const post = (state = pst, action) => {
  if (action.for === "post") {
    state = { ...state, ...action.data };
    return state;
  } else {
    return state;
  }
};
