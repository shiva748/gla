import "./css/profile.css";
import Topbar from "../Templates/Topbar/Topbar";
import Sidebar from "../Templates/Sidebar/Sidebar";
import Feed from "../Templates/Feed/Feed";
import Rightbar from "../Templates/Rightbar/Rightbar";
import { useParams } from "react-router";
import Popup from "../Templates/Profile/Profile";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";

import React, { useState, useEffect } from "react";

const Oprofile = () => {
  const dispatch = useDispatch();
  const { userid } = useParams();
  const user = useSelector((state) => state.userdata);
  const profile = useSelector((state) => state.profile);
  const [load, setload] = useState(true);
  const [prfl, setprfl] = useState({});
  const getpro = async () => {
    try {
      const response = await fetch(`/api/profile/${userid}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userid }),
      })
        .then((res) => res)
        .catch((err) => {
          throw new Error(err);
        });
      const data = await response.json();
      if (response) {
        setprfl(data.data);
        setload(false);
      } else {
        throw new Error("some error occured");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getpro();
  }, []);
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
                className="button my-anchor-element"
                style={{ backgroundColor: "lightgreen" }}
              >
                <i
                  className={
                    load
                      ? "fa-solid fa-hourglass-half"
                      : prfl.followers.some(
                          (itm) => itm.userid === user.data.userid
                        )
                      ? "fa-solid fa-check"
                      : "fa-sharp fa-solid fa-plus"
                  }
                  onClick={async () => {
                    if (!load) {
                      const postData = {
                        userid,
                      };
                      setload(true);
                      await axios
                        .post("/api/usr/frq", postData)
                        .then((response) => {
                          alert(response.data.message);
                          let flwrs = prfl.followers;
                          let stats = prfl.stats;
                          if (response.data.message === "followed") {
                            flwrs.push({
                              userid: user.data.userid,
                              fullName: user.data.fullName,
                            });
                            stats = { ...stats, follower: stats.follower + 1 };
                            setprfl({
                              ...prfl,
                              followers: flwrs,
                              stats: stats,
                            });
                          } else {
                            flwrs = flwrs.filter(
                              (itm) => itm.userid !== user.data.userid
                            );
                            stats = { ...stats, follower: stats.follower - 1 };
                            setprfl({
                              ...prfl,
                              followers: flwrs,
                              stats: stats,
                            });
                          }
                        })
                        .catch((error) => {
                          console.error(error);
                        });
                      setload(false);
                    }
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
