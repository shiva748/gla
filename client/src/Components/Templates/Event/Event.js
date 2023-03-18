import { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import "./Event.css";
import { events_edt } from "../../actions";
import TimeAgo from "javascript-time-ago";
import axios from "axios";
import en from "javascript-time-ago/locale/en";

export default function Event({ event }) {
  TimeAgo.addDefaultLocale(en);

  const timeAgo = new TimeAgo("en-US");
  const dispatch = useDispatch();
  const Events = useSelector((state) => state.Events);
  const [optn, setoptn] = useState({ display: false });
  const user = useSelector((state) => state.userdata);
  return (
    <div className="post">
      <div className="postWrapper">
        <div className="postTop">
          <div className="postTopLeft">
            <Link
              to={
                user.data.userid !== event.userid
                  ? `/profile/${event.userid}`
                  : "/profile"
              }
            >
              <img
                className="postProfileImg"
                src={`/api/profilepic/${event.userid}`}
                alt=""
              />
            </Link>
            <span className="postUsername">{event.fullName}</span>
            <span className="postDate">
              {timeAgo.format(new Date(event.on))}
            </span>
          </div>
          {event.userid === user.data.userid ? (
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
                        setoptn({display:false})
                        try {
                          await axios.post("/api/event/delete", {
                            eveid: event.eveid,
                          });
                          let edt = Events.event.filter(
                            (itm) => event.eveid !== itm.eveid
                          );
                          dispatch(events_edt({ event: edt }));
                        } catch (error) {}
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
                <td>Date</td>
                <td>{new Date(event.date_time).toLocaleDateString()}</td>
              </tr>
              <tr>
                <td>Time</td>
                <td>{new Date(event.date_time).toLocaleTimeString()}</td>
              </tr>
              <tr>
                <td>Location</td>
                <td>{event.location}</td>
              </tr>
              <tr>
                <td>Type</td>
                <td>{event.type}</td>
              </tr>
              {event.registration ? (
                <tr>
                  <td>Registration Link</td>
                  <td>
                    <a
                      href={event.lnk}
                      target="_blank"
                      style={{
                        textDecoration: "none",
                        color: "blue",
                        position: "relative",
                        zIndex: 2,
                      }}
                    >
                      Register
                    </a>
                  </td>
                </tr>
              ) : (
                ""
              )}
            </tbody>
          </table>
          <p className="postText" style={{ textAlign: "center" }}>
            {event.text}
          </p>
          {event.Media
            ? event.Media.map((itm, i) => (
                <img
                  key={i}
                  className="postImg"
                  src={`/api/event/content/${itm.url}`}
                  alt=""
                />
              ))
            : ""}
        </div>
        <div className="postBottom"></div>
      </div>
    </div>
  );
}
