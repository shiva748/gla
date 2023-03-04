import "./post.css";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { posts_edt } from "../../actions";
import axios from "axios";

export default function Post({ post }) {
  const dispatch = useDispatch();
  const [optn, setoptn] = useState({ display: false });
  const user = useSelector((state) => state.userdata);
  const posts = useSelector((state) => state.posts);
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
              {new Date(post.on).toLocaleString()}
            </span>
          </div>
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
                    <i class="fa-sharp fa-solid fa-trash" />
                    <p className="Popn_txt">Delete</p>
                  </div>
                </div>
              </>
            ) : (
              ""
            )}
          </div>
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
          <div className="postBottomLeft">
            <img className="likeIcon" src="/assets/like.png" alt="" />
            <img className="likeIcon" src="/assets/heart.png" alt="" />
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
