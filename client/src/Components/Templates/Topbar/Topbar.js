import { useEffect } from "react";
import "./topbar.css";
import Notification from "../notification/Notification";
import { useSelector, useDispatch } from "react-redux";
import { ntftn_edt, optn_edt } from "../../actions";
import axios from "axios";
import Option from "../Options/Options";
const Topbar = () => {
  const dispatch = useDispatch();
  // const getfrq = async () => {
  //   const frq = await axios.get("/api/usr/gtfrq");
  //   dispatch(ntftn_edt({ freq: frq.data.data }));
  // };
  // useEffect(() => {
  //   getfrq();
  // }, []);
  const notification = useSelector((state) => state.notification);
  const Opt = useSelector((state) => state.Option);
  const user = {
    id: 1,
    profilePicture: "person/1.jpeg",
    username: "Safak Kocaoglu",
  };
  const PF = "hi";
  return (
    <div className="topbarContainer">
      <div className="topbarLeft">
        <span className="logo">
          <img src="/sblogo.png" alt="" />
        </span>
      </div>
      <div className="topbarCenter">
        <div className="searchbar">
          <i className="searchIcon fa-solid fa-magnifying-glass" />
          <input placeholder="Search for friend" className="searchInput" />
        </div>
      </div>
      <div className="topbarRight">
        <div className="topbarLinks" style={{ visibility: "hidden" }}>
          <span className="topbarLink">Homepage</span>
          <span className="topbarLink">Timeline</span>
        </div>
        <div style={{ position: "relative", visibility:"hidden" }}>
          <div
            className="topbarIcons"
            onClick={() => {
              dispatch(
                ntftn_edt({ display: notification.display ? false : true })
              );
            }}
          >
            <div className="topbarIconItem">
              <i className="fa-solid fa-bell ovrly" />
              {notification.freq.length > 0 ? (
                <span className="topbarIconBadge">
                  {notification.freq.length}
                </span>
              ) : (
                ""
              )}
            </div>
          </div>
          {notification.display ? <Notification /> : ""}
        </div>
        <a
          onClick={() => {
            dispatch(optn_edt({ display: !Opt.display }));
          }}
        >
          <img src="/api/profilepic" alt="" className="topbarImg" />
        </a>
        {Opt.display ? <Option /> : ""}
      </div>
    </div>
  );
};
export default Topbar;
