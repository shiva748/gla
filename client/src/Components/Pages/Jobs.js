import React from "react";
import Topbar from "../Templates/Topbar/Topbar";
import Sidebar from "../Templates/Sidebar/Sidebar";
import Jfeed from "../Templates/Jfeed/Jfeed";
import "./css/home.css";
import Rightbar from "../Templates/Rightbar/Rightbar";
const Jobs = () => {
  return (
    <>
      <Topbar />
      <div className="homeContainer">
        <Sidebar />
        <Jfeed />
        <Rightbar />
      </div>
    </>
  );
};

export default Jobs;
