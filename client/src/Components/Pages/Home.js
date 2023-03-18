import React from "react";
import Topbar from "../Templates/Topbar/Topbar";
import Sidebar from "../Templates/Sidebar/Sidebar";
import Feed from "../Templates/Feed/Feed";
import "./css/home.css"
import Rightbar from "../Templates/Rightbar/Rightbar";
const Home = () => {
  return (
    <>
      <Topbar />
      <div className="homeContainer">
        <Sidebar />
        <Feed/>
        <Rightbar/>
      </div>
    </>
  );
};

export default Home;
