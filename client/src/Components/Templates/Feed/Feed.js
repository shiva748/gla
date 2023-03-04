import { useEffect, useState } from "react";
import Post from "../post/Post";
import Share from "../share/Share";
import "./feed.css";
import { posts_edt } from "../../actions";
import { useSelector, useDispatch } from "react-redux";

export default function Feed(dataa) {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.userdata);
  const posts = useSelector((state) => state.posts);
  const fetch_posts = async () => {
    const res = await fetch(dataa.userid?`/api/posts/${dataa.userid}`:`/api/posts`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      credentials: "include"
    });
    const data = await res.json();
    dispatch(posts_edt({display:true, post:data.post}))
  };
  useEffect(() => {
    fetch_posts();
  }, []);
  return (
    <div className="feed">
      <div className="feedWrapper">
        {!dataa.userid?<Share/>:dataa.userid !== user.data.userid?"":<Share/>}
        {posts.display?posts.post.map((p,i) => (
          <Post key={i} post={p} />
        )):""}
      </div>
    </div>
  );
}
