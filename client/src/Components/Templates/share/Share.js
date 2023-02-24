import "./share.css";
import { useState } from "react";
import axios from "axios";

import { useSelector } from "react-redux";

export default function Share() {
  const user = useSelector((state) => state.userdata);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [file, setFile] = useState(null);

  const submitHandler = async (e) => {
    e.preventDefault();
    const newPost = {
      userId: user._id,
    };
    if (file) {
      const data = new FormData();
      const fileName = Date.now() + file.name;
      data.append("name", fileName);
      data.append("file", file);
      newPost.img = fileName;
      console.log(newPost);
      try {
        await axios.post("/upload", data);
      } catch (err) {}
    }
    try {
      await axios.post("/posts", newPost);
      window.location.reload();
    } catch (err) {}
  };

  return (
    <div className="share">
      <div className="shareWrapper">
        <div className="shareTop">
          <img
            className="shareProfileImg"
            src="/api/profilepic"
            alt=""
          />
          <input
            placeholder={"What's in your mind " + user.data.Name + "?"}
            className="shareInput"
          />
        </div>
        <hr className="shareHr" />
        {file && (
          <div className="shareImgContainer">
            <img className="shareImg" src={URL.createObjectURL(file)} alt="" />
            <i className="fa-sharp fa-solid fa-xmark shareCancelImg" onClick={() => setFile(null)}/>
          </div>
        )}
        <form className="shareBottom" onSubmit={submitHandler}>
          <div className="shareOptions">
            <label htmlFor="file" className="shareOption">
            <i htmlColor="tomato" className="shareIcon fa-solid fa-photo-film"/>
              <span className="shareOptionText">Photo or Video</span>
              <input
                style={{ display: "none" }}
                type="file"
                id="file"
                accept=".png,.jpeg,.jpg"
                onChange={(e) => setFile(e.target.files[0])}
              />
            </label>
            <div className="shareOption">
            <i htmlColor="blue" className="shareIcon fa-solid fa-tag"/>
              <span className="shareOptionText">Tag</span>
            </div>
            <div className="shareOption">
            <i chtmlColor="green" className="shareIcon fa-solid fa-location-dot"/>
              <span className="shareOptionText">Location</span>
            </div>
            <div className="shareOption">
            <i htmlColor="goldenrod" className="shareIcon fa-solid fa-face-smile"></i>
              <span className="shareOptionText">Feelings</span>
            </div>
          </div>
          <button className="shareButton" type="submit">
            Share
          </button>
        </form>
      </div>
    </div>
  );
}
