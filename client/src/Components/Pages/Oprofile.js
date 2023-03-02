import "./css/profile.css";
import Topbar from "../Templates/Topbar/Topbar";
import Sidebar from "../Templates/Sidebar/Sidebar";
import Feed from "../Templates/Feed/Feed";
import Rightbar from "../Templates/Rightbar/Rightbar";
import { useParams } from "react-router";
import Popup from "../Templates/Profile/Profile";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";

import React from "react";

const Oprofile = () => {
  const dispatch = useDispatch();
  const { userid } = useParams();
  const user = useSelector((state) => state.userdata);
  const profile = useSelector((state) => state.profile);

  return (
    <>
      {profile.display ? <Popup /> : ""}
      <Topbar />
      <div className="profile">
        <Sidebar />
        <div className="profileRight">
          <div className="profileRightTop">
            <div className="profileCover">
              <div
                class="button my-anchor-element"
                style={{ backgroundColor: "lightgreen" }}
              >
                <i
                  class="fa-sharp fa-solid fa-plus"
                  onClick={() => {
                    const postData = {
                      userid,
                    };

                    axios
                      .post("/api/usr/frq", postData)
                      .then((response) => {
                        console.log(response.data);
                        alert("Friend request sent");
                      })
                      .catch((error) => {
                        console.error(error);
                      });
                  }}
                />
              </div>
              <img
                className="profileCoverImg"
                src={`/api/cover/${userid}`}
                alt=""
              />
              <div className="prfl">
                <img
                  className="profileUserImg"
                  src={`/api/profilepic/${userid}`}
                  alt=""
                />
              </div>
            </div>
            <div className="profileInfo">
              <h4 className="profileInfoName">{user.fullName}</h4>
              <span className="profileInfoDesc">hi there</span>
            </div>
          </div>
          <div className="profileRightBottom">
            {/* username={username} */}
            <Feed userid={userid} />
            {/* user={user} */}
            <Rightbar />
          </div>
        </div>
      </div>
    </>
  );
};

export default Oprofile;
