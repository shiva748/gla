import React from "react";
import Topbar from "../Templates/Topbar/Topbar";
import Sidebar from "../Templates/Sidebar/Sidebar";
import EFeed from "../Templates/Efeed/EFeed";
import "./css/home.css";
import Rightbar from "../Templates/Rightbar/Rightbar";
const Events = () => {
  return (
    <>
      <Topbar />
      <div className="homeContainer">
        <Sidebar />
        <EFeed />
        <Rightbar />
      </div>
    </>
  );
};

export default Events;
