import React from "react";
import "./Option.css";
import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { optn_edt, posts_edt } from "../../actions";
import axios from "axios";
const Option = () => {
  const dispatch = useDispatch();
  const right = useSelector((state) => state.userdata);
  return (
    <>
      <div className="arr_opt"></div>
      <div className="Optn_tab">
        <NavLink
          onClick={() => {
            dispatch(optn_edt({ display: false }));
          }}
          to="/profile"
          style={{ textDecoration: "None" }}
        >
          <div className="Optn_dt ovrly-ad" style={{ margin: "4px 0px" }}>
            <img src="/api/profilepic" alt="" className="topbarImg" />
            <p className="Optn_txt">{right.data.Name}</p>
          </div>
        </NavLink>
        <hr />
        <div
          onClick={() => {
            axios.get("/api/logout");
            dispatch(optn_edt({ display: false }));
            window.location.replace("/");
          }}
          className="Optn_dt ovrly-ad"
          style={{ margin: "4px 0px" }}
        >
          <i className="fa-solid fa-right-from-bracket" />
          <p className="Optn_txt">Logout</p>
        </div>
      </div>
    </>
  );
};

export default Option;
