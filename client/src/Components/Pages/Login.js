import React, {useEffect} from "react";
import "./css/login.css";
import { useSelector, useDispatch } from "react-redux";
import {
  signup_ope,
  signup_clo,
  hdl_lgn_data,
  hdl_sgn_data,
  clean_sgn,
  fll_lgn,
  clean_lgn,
  process_tog,
  validate
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
      alert("successfully logged in");
      dispatch(process_tog("login"));
      dispatch(clean_lgn());
      dispatch(validate(res))
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
      dispatch(signup_clo());
      dispatch(fll_lgn({ email, password }));
      dispatch(clean_sgn());
    }
  };
  
  return (
    <>
      <section>
        <div className={right ? "container active" : "container"}>
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
                      dispatch(signup_ope());
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
                      dispatch(signup_clo());
                    }}
                  >
                    Sign in.
                  </a>
                </p>
              </form>
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
