import "./post.css";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { posts_edt } from "../../actions";
import axios from "axios";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";

export default function Post({ post, keys }) {
  TimeAgo.addLocale(en);

  const timeAgo = new TimeAgo("en-US");
  const dispatch = useDispatch();
  const [optn, setoptn] = useState({ display: false });
  const user = useSelector((state) => state.userdata);
  const posts = useSelector((state) => state.posts);
  const [sta, setsta] = useState(true);
  return (
    <div className="post">
      <div className="postWrapper">
        <div className="postTop">
          <div className="postTopLeft">
            <Link
              to={
                user.data.userid !== post.userid
                  ? `/profile/${post.userid}`
                  : "/profile"
              }
            >
              <img
                className="postProfileImg"
                src={`/api/profilepic/${post.userid}`}
                alt=""
              />
            </Link>
            <span className="postUsername">{post.fullName}</span>
            <span className="postDate">
              {timeAgo.format(new Date(post.on))}
            </span>
          </div>
          {post.userid === user.data.userid ? (
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
                          await axios.post("/api/post/delete", {
                            postid: post.postid,
                          });
                          let edt = posts.post.filter(
                            (itm) => post.postid !== itm.postid
                          );
                          dispatch(posts_edt({ post: edt }));
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
          <span className="postText">{post?.text}</span>
          {post.Media
            ? post.Media.map((itm, i) => (
                <img
                  key={i}
                  className="postImg"
                  src={`/api/content/${post.userid}/${itm.url}`}
                  alt=""
                />
              ))
            : ""}
        </div>
        <div className="postBottom">
          <div
            className="postBottomLeft"
            onClick={async () => {
              if (sta) {
                setsta(false);
                let [edt] = posts.post.filter(
                  (itm) => post.postid === itm.postid
                );
                if (!edt.likes.some((itm) => itm.userid === user.data.userid)) {
                  edt.stats.likes = edt.stats.likes + 1;
                  edt.likes.push({ userid: user.data.userid });
                  // let pst = posts.post.filter(
                  //   (itm) => post.postid !== itm.postid
                  // );
                  // pst.push(edt);
                  let pst = posts.post;
                  pst[keys] = edt;
                  dispatch(posts_edt({ post: pst }));
                } else {
                  edt.stats.likes = edt.stats.likes - 1;
                  edt.likes = edt.likes.filter(
                    (itm) => itm.userid === user.userid
                  );
                  // let pst = posts.post.filter(
                  //   (itm) => post.postid !== itm.postid
                  // );
                  // pst.push(edt);
                  let pst = posts.post;
                  pst[keys] = edt;
                  dispatch(posts_edt({ post: pst }));
                }
                const res = await axios.post("/api/post/like", {
                  postid: post.postid,
                });
                setsta(true);
              }
            }}
          >
            <img className="likeIcon" src="/assets/like.png" alt="" />
            <span className="postLikeCounter">
              {post.stats.likes} people like it
            </span>
          </div>
          <div className="postBottomRight">
            <span className="postCommentText">
              {post.stats.comments} comments
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
