import "./topbar.css";
import { NavLink } from "react-router-dom";

const Topbar = () => {
  const user = {
    id:1,
    profilePicture: "person/1.jpeg",
    username: "Safak Kocaoglu",
  };
  const PF = "hi"
  return (
    <div className="topbarContainer">
      <div className="topbarLeft">
        <NavLink to="#" style={{ textDecoration: "none" }}>
          <span className="logo"><img src="/sblogo.png" alt=""/></span>
        </NavLink>
      </div>
      <div className="topbarCenter">
        <div className="searchbar">
        <i className="searchIcon fa-solid fa-magnifying-glass"/>
          <input
            placeholder="Search for friend, post or video"
            className="searchInput"
          />
        </div>
      </div>
      <div className="topbarRight">
        <div className="topbarLinks">
          <span className="topbarLink">Homepage</span>
          <span className="topbarLink">Timeline</span>
        </div>
        <div className="topbarIcons">
          <div className="topbarIconItem">
          <i className="fa-solid fa-person"/>
            <span className="topbarIconBadge">1</span>
          </div>
          <div className="topbarIconItem">
          <i className="fa-regular fa-message"/>
            <span className="topbarIconBadge">2</span>
          </div>
          <div className="topbarIconItem">
          <i className="fa-solid fa-comments"/>
            <span className="topbarIconBadge">1</span>
          </div>
        </div>
        <NavLink to="/profile">
          <img
            src="/api/profilepic"
            alt=""
            className="topbarImg"
          />
        </NavLink>
      </div>
    </div>
  );
};
export default Topbar;
