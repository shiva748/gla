import "./post.css";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Post({ post }) {
  return (
    <div className="post">
      <div className="postWrapper">
        <div className="postTop">
          <div className="postTopLeft">
            <Link to={`/profile/${post.userid}`}>
              <img
                className="postProfileImg"
                src={`/api/profilepic/${post.userid}`}
                alt=""
              />
            </Link>
            <span className="postUsername">{post.fullName}</span>
            <span className="postDate">{new Date(post.on).toLocaleString()}</span>
          </div>
          <div className="postTopRight">
          <i className="fa-solid fa-ellipsis-vertical"/>
          </div>
        </div>
        <div className="postCenter">
          <span className="postText">{post?.text}</span>
          {
            post.Media.map((itm,i)=> <img key={i}className="postImg" src={`/api/content/${post.userid}/${itm.url}`} alt="" />)
          }
        </div>
        <div className="postBottom">
          <div className="postBottomLeft">
            <img
              className="likeIcon"
              src="/assets/like.png"
              alt=""
            />
            <img
              className="likeIcon"
              src="/assets/heart.png"
              alt=""
            />
            <span className="postLikeCounter">{post.stats.likes} people like it</span>
          </div>
          <div className="postBottomRight">
            <span className="postCommentText">{post.stats.comments} comments</span>
          </div>
        </div>
      </div>
    </div>
  );
}
