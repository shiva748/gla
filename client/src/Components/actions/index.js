export const signup_tog = (data) => {
  return {
    for: "toggle_singup",
    type: "edit",
    data,
  };
};

export const hdl_lgn_data = (e) => {
  return { for: "login", event: e, type: "data" };
};

export const hdl_sgn_data = (e) => {
  return { for: "signup", event: e, type: "edit" };
};

export const sgn_edt = (data) => {
  return { for: "signup", type: "edit_1", data: data };
};

export const clean_sgn = () => {
  return { for: "signup", type: "clean" };
};

export const clean_lgn = () => {
  return { for: "login", type: "clean" };
};
export const fll_lgn = (data) => {
  return {
    for: "login",
    type: "fill",
    data: { email: data.email, password: data.password },
  };
};
export const process_tog = (of) => {
  return {
    for: of,
    type: "process",
  };
};

export const validate = (data) => {
  return {
    for: "userdata",
    type: "validate",
    data: data,
  };
};

export const Profile_tog = () => {
  return {
    for: "profile",
    type: "Profileoc",
  };
};

export const Profile_sele = (data) => {
  return {
    for: "profile",
    type: "select",
    data,
  };
};
export const Cover_tog = () => {
  return {
    for: "cover",
    type: "Coveroc",
  };
};

export const Cover_sele = (data) => {
  return {
    for: "cover",
    type: "select",
    data,
  };
};
export const post_edt = (data) => {
  return {
    for: "post",
    type: "edit",
    data,
  };
};

export const ntftn_edt = (data) => {
  return {
    for: "notification",
    type: "edit",
    data,
  };
};

export const optn_edt = (data) => {
  return {
    for: "option",
    type: "edit",
    data,
  };
};

export const posts_edt = (data) => {
  return {
    for: "posts",
    type: "edit",
    data,
  };
};

export const hdl_event_data = (e) => {
  return { for: "event", event: e, type: "edt" };
};

export const put_event = (data) => {
  return { for: "event", type: "put", data: data };
};

export const events_edt = (data) => {
  return {
    for: "events",
    type: "edit",
    data,
  };
};
export const hdl_job_data = (e) => {
  return { for: "job", event: e, type: "edt" };
};
export const put_job = (data) => {
  return { for: "job", type: "put", data: data };
};
export const jobs_edt = (data) => {
  return {
    for: "jobs",
    type: "edit",
    data,
  };
};
