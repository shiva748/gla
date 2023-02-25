export const signup_ope = () => {
  return {
    for: "toggle_singup",
    type: "open",
  };
};

export const signup_clo = () => {
  return {
    for: "toggle_singup",
    type: "close",
  };
};

export const hdl_lgn_data = (e) => {
  return { for: "login", event: e, type: "data" };
};

export const hdl_sgn_data = (e) => {
  return { for: "signup", event: e, type: "edit" };
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
export const process_tog = (of)=>{
  return {
    for: of,
    type: "process"
  };
}

export const validate = (data)=>{
  return {
    for: "userdata",
    type: "validate",
    data:data,
  };
}

export const Profile_tog = ()=>{
  return {
    for:"profile",
    type:"Profileoc"
  }
}

export const Profile_sele = (data)=>{
  return {
    for:"profile",
    type:"select",
    data
  }
}

export const post_edt = (data)=>{
  return {
    for:"post",
    type:"edit",
    data
  }
}