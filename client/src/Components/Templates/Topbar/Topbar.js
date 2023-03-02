import "./topbar.css";
import { NavLink } from "react-router-dom";
import Notification from "../notification/Notification";
import { useSelector, useDispatch } from "react-redux";
import { ntftn_edt } from "../../actions";

const Topbar = () => {
  const dispatch = useDispatch();
  const notification = useSelector((state) => state.notification);
  const user = {
    id: 1,
    profilePicture: "person/1.jpeg",
    username: "Safak Kocaoglu",
  };
  const PF = "hi";
  return (
    <div className="topbarContainer">
      <div className="topbarLeft">
        <NavLink to="/" style={{ textDecoration: "none" }}>
          <span className="logo">
            <img src="/sblogo.png" alt="" />
          </span>
        </NavLink>
      </div>
      <div className="topbarCenter">
        <div className="searchbar">
          <i className="searchIcon fa-solid fa-magnifying-glass" />
          <input placeholder="Search for friend" className="searchInput" />
        </div>
      </div>
      <div className="topbarRight">
        <div className="topbarLinks">
          <span className="topbarLink">Homepage</span>
          <span className="topbarLink">Timeline</span>
        </div>
        <div style={{ position: "relative" }}>
          <div
            className="topbarIcons"
            onClick={() => {
              dispatch(
                ntftn_edt({ display: notification.display ? false : true })
              );
            }}
          >
            <div className="topbarIconItem">
              <i class="fa-solid fa-bell ovrly" />
              <span className="topbarIconBadge">2</span>
            </div>
          </div>
          {notification.display ? <Notification /> : ""}
        </div>
        <NavLink to="/profile">
          <img src="/api/profilepic" alt="" className="topbarImg" />
        </NavLink>
      </div>
    </div>
  );
};
export default Topbar;
