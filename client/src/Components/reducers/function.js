const open = { display: "login" };
export const toggle_singup = (state = open, action) => {
  if (action.for === "toggle_singup") {
    state = { ...state, ...action.data };
    return state;
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

const signupdata = {
  fullName: "",
  email: "",
  password: "",
  confirmpass: "",
  otp: "",
  process: false,
  oprcs: false,
};
export const signup = (state = signupdata, action) => {
  if (action.for === "signup") {
    if (action.type === "clean") {
      state = {
        fullName: "",
        email: "",
        password: "",
        confirmpass: "",
        otp: "",
        process: false,
        oprcs: false,
      };
      return state;
    } else if (action.type === "process") {
      state = { ...state, process: !state.process };
      return state;
    } else if (action.type === "oprcs") {
      state = { ...state, oprcs: !state.oprcs };
      return state;
    } else if (action.type === "edit_1") {
      state = { ...state, ...action.data };
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
const cvr = {
  display: false,
  image: "",
  fileName: "",
  loading: false,
};
export const cover = (state = cvr, action) => {
  if (action.for === "cover") {
    if (action.type === "Coveroc") {
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
const ntftn = {
  display: false,
  freq: [],
  ntftn: "",
};

export const notification = (state = ntftn, action) => {
  if (action.for === "notification") {
    state = { ...state, ...action.data };
    return state;
  } else {
    return state;
  }
};

const optn = {
  display: false,
};

export const Option = (state = ntftn, action) => {
  if (action.for === "option") {
    state = { ...state, ...action.data };
    return state;
  } else {
    return state;
  }
};

const postc = {
  display: false,
  post: [],
};

export const posts = (state = postc, action) => {
  if (action.for === "posts") {
    state = { ...state, ...action.data };
    return state;
  } else {
    return state;
  }
};

const event = {
  text: "",
  image: "",
  date_time: "",
  location: "",
  type: "gathering",
  registration: false,
  lnk: "",
  loading: false,
};
export const Event = (state = event, action) => {
  if (action.for === "event") {
    if (action.type === "edt") {
      const name = action.event.target.name;
      const value = action.event.target.value;
      state = { ...state, [name]: value };
      return state;
    } else {
      state = { ...state, ...action.data };
      return state;
    }
  } else {
    return state;
  }
};

const eventc = {
  display: false,
  event: [],
};

export const Events = (state = eventc, action) => {
  if (action.for === "events") {
    state = { ...state, ...action.data };
    return state;
  } else {
    return state;
  }
};
const job = {
  text: "",
  image: "",
  company: "",
  post: "",
  application: "",
  email: "",
  loading: false,
};
export const Job = (state = job, action) => {
  if (action.for === "job") {
    if (action.type === "edt") {
      const name = action.event.target.name;
      const value = action.event.target.value;
      state = { ...state, [name]: value };
      return state;
    } else {
      state = { ...state, ...action.data };
      return state;
    }
  } else {
    return state;
  }
};

const jobs = {
  display: false,
  job: [],
};

export const Jobs = (state = jobs, action) => {
  if (action.for === "jobs") {
    state = { ...state, ...action.data };
    return state;
  } else {
    return state;
  }
};
const chat = {
  selectedchat: "",
  data: {},
  chats:[],
};
export const Chat = (state = chat, action) => {
  if (action.for === "chat") {
    state = { ...state, ...action.data };
  } else {
    return state;
  }
};
