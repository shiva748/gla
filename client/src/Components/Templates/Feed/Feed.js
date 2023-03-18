import { useEffect, useState } from "react";
import Post from "../post/Post";
import Share from "../share/Share";
import "./feed.css";
import { posts_edt } from "../../actions";
import { useSelector, useDispatch } from "react-redux";
import Subload from "../subloading/subload";

export default function Feed(dataa) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.userdata);
  const posts = useSelector((state) => state.posts);
  const [loading, setloading] = useState(true);
  const fetch_posts = async () => {
    let ignore = [];
    posts.post.forEach((element) => {
      ignore.push(element.postid);
    });
    const res = await fetch(
      dataa.userid ? `/api/posts/${dataa.userid}` : `/api/posts`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({}),
        credentials: "include",
      }
    );
    const data = await res.json();
    if (dataa.userid) {
      dispatch(posts_edt({ display: true, post: data.post }));
    } else {
      let post = posts.post;
      post = [...post, ...data.post];
      dispatch(posts_edt({ display: true, post: post }));
    }
    setloading(false);
  };
  // const handleinfinityscroll = () => {
  //   const data = {
  //     scrollHeight: document.documentElement.scrollHeight,
  //     innerHeight: window.innerHeight,
  //     scrollTop: document.documentElement.scrollTop,
  //   };
  //   if (data.innerHeight + data.scrollTop >= data.scrollHeight && load) {
  //     console.log("hello");
  //     fetch_posts();
  //   }
  // };
  useEffect(() => {
    fetch_posts();
    // window.addEventListener("scroll", handleinfinityscroll);
  }, []);
  return (
    <div className="feed">
      {loading ? (
        <Subload />
      ) : (
        <div className="feedWrapper">
          {!dataa.userid ? (
            <Share />
          ) : dataa.userid !== user.data.userid ? (
            ""
          ) : (
            <Share />
          )}

          {posts.display
            ? posts.post.map((p, i) => <Post key={i} keys={i} post={p} />)
            : ""}
        </div>
      )}
    </div>
  );
}
