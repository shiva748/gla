import "./css/profile.css";
import Topbar from "../Templates/Topbar/Topbar";
import Sidebar from "../Templates/Sidebar/Sidebar";
import Feed from "../Templates/Feed/Feed";
import Rightbar from "../Templates/Rightbar/Rightbar"
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router";
import Popup from  "../Templates/Profile/Profile"
import { useSelector, useDispatch } from "react-redux";
import { Profile_tog } from "../actions";

import React from 'react'

const Profile = () => {
  const dispatch = useDispatch()
  // const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const user = useSelector((state) => state.userdata);
  const profile = useSelector((state)=> state.profile)
  // const username = useParams().username;

  // useEffect(() => {
  //   const fetchUser = async () => {
  //     const res = await axios.get(`/users?username=${username}`);
  //     setUser(res.data);
  //   };
  //   fetchUser();
  // }, [username]);

  return (
    <>
    {profile.display?<Popup/>:""}
      <Topbar />
      <div className="profile">
        <Sidebar />
        <div className="profileRight">
          <div className="profileRightTop">
            <div className="profileCover">
              <img
                className="profileCoverImg"
                src="/api/profilepic"
                alt=""
              />
              <div className="prfl">
                <div className="profile_upload" onClick={()=>{dispatch(Profile_tog())}}>
                </div>
                <img
                className="profileUserImg"
                src="/api/profilepic"
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
            <Feed  userid={user.data.userid}/>
            {/* user={user} */}
            <Rightbar  />
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile
