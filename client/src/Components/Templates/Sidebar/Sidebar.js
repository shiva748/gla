import "./sidebar.css";
import { NavLink } from "react-router-dom";
export default function Sidebar() {
  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <ul className="sidebarList">
          <NavLink to="/" style={{ textDecoration: "none", color: "black" }}>
            <li className="sidebarListItem ovrly-ad">
              <i className="fa-sharp fa-solid fa-rss sidebarIcon" />
              <span className="sidebarListItemText">Feed</span>
            </li>
          </NavLink>
          <li className="sidebarListItem ovrly-ad">
            <i className="fa-solid fa-comment sidebarIcon" />
            <span className="sidebarListItemText">Chats</span>
          </li>
          <NavLink
            to="/jobs"
            style={{ textDecoration: "none", color: "black" }}
          >
            <li className="sidebarListItem ovrly-ad">
              <i className="fa-sharp fa-solid fa-briefcase sidebarIcon" />
              <span className="sidebarListItemText">Jobs</span>
            </li>
          </NavLink>
          <NavLink
            to="/events"
            style={{ textDecoration: "none", color: "black" }}
          >
            <li className="sidebarListItem ovrly-ad">
              <i className="fa-solid fa-calendar-days sidebarIcon" />
              <span className="sidebarListItemText">Events</span>
            </li>
          </NavLink>
        </ul>
        {/* <button className="sidebarButton">Show More</button> */}
        <hr className="sidebarHr" />
        <ul className="sidebarFriendList">
          {/* {Users.map((u) => (
            <CloseFriend key={u.id} user={u} />
          ))} */}
        </ul>
      </div>
    </div>
  );
}
