import React, { useEffect } from "react";
import "./css/login.css";
import { useSelector, useDispatch } from "react-redux";
import {
  signup_tog,
  hdl_lgn_data,
  hdl_sgn_data,
  clean_sgn,
  sgn_edt,
  clean_lgn,
  process_tog,
  validate,
} from "../actions/index";
const validator = require("validator");

const Login = () => {
  const right = useSelector((state) => state.toggle_singup);
  const data = useSelector((state) => state.login);
  const signupdata = useSelector((state) => state.signup);
  const dispatch = useDispatch();
  const login = async (e) => {
    e.preventDefault();
    const { email, password } = data;
    if (!validator.isEmail(email)) {
      return alert("Please enter a valide email");
    } else if (!validator.isStrongPassword(password)) {
      return alert("Please enter a strong password");
    }
    dispatch(process_tog("login"));
    const response = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    let res = await response.json();
    if (response.status === 200) {
      if (res.vrftn_req) {
        dispatch(process_tog("login"));
        dispatch(signup_tog({ display: "otp" }));
        dispatch(sgn_edt({ email }));
      } else {
        dispatch(process_tog("login"));
        dispatch(clean_lgn());
        dispatch(validate(res));
      }
    }
  };

  const signUp = async (e) => {
    e.preventDefault();
    const { email, password, confirmpass } = signupdata;
    if (!validator.isEmail(email)) {
      return alert("Please enter a valide email");
    } else if (password !== confirmpass) {
      return alert(
        "Please ensure that the password and confirm password fields are identical"
      );
    } else if (!validator.isStrongPassword(password)) {
      return alert("Please enter a strong password");
    }
    dispatch(process_tog("signup"));
    const response = await fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(signupdata),
    });
    let res = await response.json();
    if (response.status === 201) {
      alert(res.message);
      dispatch(process_tog("signup"));
      dispatch(signup_tog({ display: "otp" }));
    }
  };

  const verify_otp = async (e) => {
    e.preventDefault();
    const { email, otp } = signupdata;
    if (!validator.isEmail(email)) {
      return alert("Please enter a valide email");
    }
    const response = await fetch("/api/register/verify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, otp }),
    });
    let res = await response.json();
    console.log(res);
    if (response.status === 200) {
      dispatch(signup_tog({ display: "login" }));
      dispatch(clean_sgn());
      alert(res.message);
      dispatch(validate(res));
    }
  };
  return (
    <>
      <section>
        <div
          className={
            right.display == "singup" || right.display == "otp"
              ? "container active"
              : "container"
          }
        >
          <div className="user signinBx">
            <div className="imgBx">
              <img src="/logo.png" alt="" />
            </div>
            <div className="formBx">
              <form action="" onSubmit="return false;">
                <h2>Sign In</h2>
                <input
                  type="email"
                  placeholder="Email"
                  name="email"
                  value={data.email}
                  onChange={(e) => dispatch(hdl_lgn_data(e))}
                />

                <input
                  type="password"
                  placeholder="Password"
                  name="password"
                  onChange={(e) => dispatch(hdl_lgn_data(e))}
                  value={data.password}
                />

                <button onClick={login} className="btn">
                  {data.process ? (
                    <img src="/load.svg" alt="" className="ldn_img" />
                  ) : (
                    "Sign in"
                  )}
                </button>
                <p className="signup">
                  Don't have an account ?
                  <a
                    href="#"
                    onClick={() => {
                      dispatch(signup_tog({ display: "singup" }));
                    }}
                  >
                    Sign Up.
                  </a>
                </p>
              </form>
            </div>
          </div>
          <div className="user signupBx">
            <div className="formBx">
              {right.display == "otp" ? (
                <form action="" onSubmit="return false;">
                  <h2>Verification</h2>
                  <input
                    type="password"
                    placeholder="Enter Otp"
                    name="otp"
                    onChange={(e) => dispatch(hdl_sgn_data(e))}
                    value={signupdata.otp}
                  />
                  <button onClick={verify_otp} className="btn">
                    <span>
                      {signupdata.oprcs ? (
                        <img src="/load.svg" alt="" className="ldn_img" />
                      ) : (
                        "Verify"
                      )}
                    </span>
                  </button>
                  <p className="signup">
                    Already have an account ?
                    <a
                      href="#"
                      onClick={() => {
                        dispatch(signup_tog({ display: "login" }));
                      }}
                    >
                      Sign in.
                    </a>
                  </p>
                </form>
              ) : (
                <form action="" onSubmit="return false;">
                  <h2>Create an account</h2>

                  <input
                    type="text"
                    placeholder="Name"
                    name="fullName"
                    onChange={(e) => dispatch(hdl_sgn_data(e))}
                    value={signupdata.fullName}
                  />

                  <input
                    type="email"
                    placeholder="Email"
                    name="email"
                    onChange={(e) => dispatch(hdl_sgn_data(e))}
                    value={signupdata.email}
                  />

                  <input
                    type="password"
                    placeholder="Password"
                    name="password"
                    onChange={(e) => dispatch(hdl_sgn_data(e))}
                    value={signupdata.password}
                  />

                  <input
                    type="password"
                    placeholder="Confirm Password"
                    name="confirmpass"
                    onChange={(e) => dispatch(hdl_sgn_data(e))}
                    value={signupdata.confirmpass}
                  />
                  <button onClick={signUp} className="btn">
                    <span>
                      {signupdata.process ? (
                        <img src="/load.svg" alt="" className="ldn_img" />
                      ) : (
                        "Sign Up"
                      )}
                    </span>
                  </button>
                  <p className="signup">
                    Already have an account ?
                    <a
                      href="#"
                      onClick={() => {
                        dispatch(signup_tog({ display: "login" }));
                      }}
                    >
                      Sign in.
                    </a>
                  </p>
                </form>
              )}
            </div>
            <div className="imgBx">
              <img src="/logo.png" alt="" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Login;
