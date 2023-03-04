import "./sidebar.css";
import { NavLink } from "react-router-dom";
export default function Sidebar() {
  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <ul className="sidebarList">
          <NavLink to="/" style={{ textDecoration: "none", color: "black" }}>
            <li className="sidebarListItem">
              <i className="fa-sharp fa-solid fa-rss sidebarIcon" />
              <span className="sidebarListItemText">Feed</span>
            </li>
          </NavLink>
          <li className="sidebarListItem">
            <i className="fa-solid fa-comment sidebarIcon" />
            <span className="sidebarListItemText">Chats</span>
          </li>
          <li className="sidebarListItem">
            <i className="fa-solid fa-circle-play sidebarIcon" />
            <span className="sidebarListItemText">Videos</span>
          </li>
          <li className="sidebarListItem">
            <i className="sidebarIcon fa-solid fa-user-group" />
            <span className="sidebarListItemText">Groups</span>
          </li>
          <li className="sidebarListItem">
            <i className="fa-solid fa-bookmark sidebarIcon" />
            <span className="sidebarListItemText">Bookmarks</span>
          </li>
          <li className="sidebarListItem">
            <i className="fa-sharp fa-solid fa-handshake-angle sidebarIcon" />
            <span className="sidebarListItemText">Questions</span>
          </li>
          <li className="sidebarListItem">
            <i className="fa-sharp fa-solid fa-briefcase sidebarIcon" />
            <span className="sidebarListItemText">Jobs</span>
          </li>
          <li className="sidebarListItem">
            <i className="fa-solid fa-calendar-days sidebarIcon" />
            <span className="sidebarListItemText">Events</span>
          </li>
          <li className="sidebarListItem">
            <i className="fa-solid fa-school sidebarIcon" />
            <span className="sidebarListItemText">Courses</span>
          </li>
        </ul>
        <button className="sidebarButton">Show More</button>
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
