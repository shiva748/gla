import React, {useState} from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import timeAgo from "javascript-time-ago";
import axios from "axios";
import en from "javascript-time-ago/locale/en";

const Jobsc = ({ job }) => {
    const [optn, setoptn] = useState(false);
  const user = useSelector((state) => state.userdata);
  return (
    <div className="post">
      <div className="postWrapper">
        <div className="postTop">
          <div className="postTopLeft">
            <NavLink
              to={
                user.data.userid !== job.userid
                  ? `/profile/${job.userid}`
                  : "/profile"
              }
            >
              <img
                className="postProfileImg"
                src={`/api/profilepic/${job.userid}`}
                alt=""
              />
            </NavLink>
            <span className="postUsername">{job.fullName}</span>
            <span className="postDate">
              {/* {timeAgo.format(new Date(job.on))} */}
            </span>
          </div>
          {job.userid === user.data.userid ? (
            <div className="postTopRight" style={{ position: "relative" }}>
              <i
                className="fa-solid fa-ellipsis-vertical"
                onClick={() => {
                  setoptn({ display: !optn.display });
                }}
              />
              {optn.display ? (
                <>
                  <div className="arr_popt"></div>
                  <div className="Popn_tab">
                    <div
                      onClick={async () => {
                        setoptn({ display: false });
                        // try {
                        //   await axios.post("/api/event/delete", {
                        //     eveid: event.eveid,
                        //   });
                        //   let edt = Events.event.filter(
                        //     (itm) => event.eveid !== itm.eveid
                        //   );
                        //   dispatch(events_edt({ event: edt }));
                        // } catch (error) {}
                      }}
                      className="Popn_dt ovrly-ad"
                      style={{ margin: "4px 0px" }}
                    >
                      <i className="fa-sharp fa-solid fa-trash" />
                      <p className="Popn_txt">Delete</p>
                    </div>
                  </div>
                </>
              ) : (
                ""
              )}
            </div>
          ) : (
            ""
          )}
        </div>
        <div className="postCenter ovrly-ad">
          <table class="my-table">
            <tbody>
              <tr>
                <td>Company</td>
                <td>{job.company}</td>
              </tr>
              <tr>
                <td>Application</td>
                <td><a href={job.application} style={{textDecoration:"none"}}>Apply</a></td>
              </tr>
            </tbody>
          </table>
          <p className="postText" style={{ textAlign: "center" }}>
            {job.text}
          </p>
          {job.Media
            ? job.Media.map((itm, i) => (
                <img
                  key={i}
                  className="postImg"
                  src={`/api/jobs/content/${itm.url}`}
                  alt=""
                />
              ))
            : ""}
        </div>
        <div className="postBottom"></div>
      </div>
    </div>
  );
};

export default Jobsc;
