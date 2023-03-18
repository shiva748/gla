import "./share.css";
import { useState } from "react";
import axios from "axios";
import FormData from "form-data";
import { post_edt, posts_edt } from "../../actions";

import { useSelector, useDispatch } from "react-redux";

export default function Share() {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts);
  const user = useSelector((state) => state.userdata);
  const post = useSelector((state) => state.post);
  const [file, setFile] = useState(null);
  const [input, setinput] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      let formData = new FormData();
      formData.append("file", post.files);
      formData.append("data", JSON.stringify({ ...post, files: "" }));
      dispatch(post_edt({ loading: true }));
      const resu = await axios
        .post("/api/share_post", formData)
        .then((res) => {
          return res;
        })
        .catch((err) => {
          throw new Error(err);
        });
      const edt = posts.post;
      edt.splice(0, 0, resu.data.post);
      dispatch(
        post_edt({ text: "", files: "", visiblity: "public", loading: false })
      );
      dispatch(posts_edt({ post: edt }));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="share">
      <div className="shareWrapper">
        <div className="shareTop">
          <img className="shareProfileImg" src="/api/profilepic" alt="" />
          <input
            placeholder={"What's in your mind " + user.data.Name + "?"}
            className="shareInput"
            value={post.text}
            onChange={(e) => {
              dispatch(post_edt({ text: e.target.value }));
            }}
          />
        </div>
        <hr className="shareHr" />
        {post.files ? (
          <div className="shareImgContainer">
            <img
              className="shareImg"
              src={URL.createObjectURL(post.files)}
              alt=""
            />
            <i
              className="fa-sharp fa-solid fa-xmark shareCancelImg"
              onClick={() => {
                dispatch(post_edt({ files: "" }));
              }}
            />
          </div>
        ) : (
          ""
        )}
        <form className="shareBottom" onSubmit={submitHandler}>
          <div className="shareOptions">
            <label htmlFor="file" className="shareOption">
              <i className="shareIcon fa-solid fa-photo-film" />
              <span className="shareOptionText">Photo or Video</span>
              <input
                style={{ display: "none" }}
                type="file"
                id="file"
                accept=".png,.jpeg,.jpg"
                onClick={(e) => {
                  e.target.value = ""
                }}
                onChange={(e) => {
                  dispatch(post_edt({ files: e.target.files[0] }));
                  e.target.files = null;
                }}
              />
            </label>
            <label htmlFor="visiblity" className="shareOption">
              <i className="fa-solid fa-eye" />
              <span className="shareOptionText" style={{ margin: "0px 5px" }}>
                Visiblity
              </span>
              <select
                id="file"
                onChange={(e) =>
                  dispatch(post_edt({ visiblity: e.target.value }))
                }
              >
                <option value="public">Public</option>
                <option value="friends">Friends</option>
              </select>
            </label>
          </div>
          <button className="shareButton" type="submit">
            {post.loading ? (
              <img src="/load.svg" alt="" className="ldn_img" />
            ) : (
              "Share"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
