import { useContext, useEffect, useState } from "react";
import Post from "../post/Post";
import Share from "../share/Share";
import "./feed.css";
import axios from "axios";

export default function Feed(dataa) {
  const [posts, setPosts] = useState([]);
  const fetch_posts = async () => {
    const res = await fetch(`/api/posts/${dataa.userid}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      credentials: "include"
    });
    const data = await res.json();
    setPosts(data.post);
  };
  useEffect(() => {
    fetch_posts();
  }, []);
  return (
    <div className="feed">
      <div className="feedWrapper">
        <Share />
        {posts.map((p) => (
          <Post key={p._id} post={p} />
        ))}
      </div>
    </div>
  );
}
