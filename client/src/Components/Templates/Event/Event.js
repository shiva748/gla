import { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { events_edt } from "../../actions";
import axios from "axios";

export default function Event({ event }) {
  const dispatch = useDispatch();
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
              {new Date(event.on).toLocaleString()}
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
                        try {
                          await axios.post("/api/event/delete", {
                            postid: event.eveid,
                          });
                          // let edt = posts.post.filter(
                          //   (itm) => post.postid !== itm.postid
                          // );
                          // dispatch(posts_edt({ post: edt }));
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
          <span className="postText">{event.text}</span>
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
        <div className="postBottom">
          <table>
            <tbody>
              <tr>
                <td></td>
                <td></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
