import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Profile_tog, Profile_sele } from "../../actions";
import FormData from "form-data";
import axios from "axios";
import "./Profile.css";
var base64 = require("base-64");

const Profile = () => {
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.profile);
  const Upload = async (e) => {
    e.preventDefault();
    try {
      let formdata = new FormData();
      formdata.append("profile", profile.image);
      dispatch(Profile_sele({ loading: true }));
      await axios
        .post("/api/profilepic", formdata)
        .then((res) => {
          return res;
        })
        .catch((err) => {
          throw new Error(err);
        });
        window.location.reload()
      dispatch(
        Profile_sele({
          fileName: "",
          image: "",
          display: false,
          loading: false,
        })
      );
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <div>
          <div className="container">
            <button
              className="close-button"
              onClick={() => {
                dispatch(Profile_tog());
                dispatch(Profile_sele({ fileName: "", image: "" }));
              }}
            >
              X
            </button>
            <div className="card">
              <h3>Upload Files</h3>
              <div className="drop_box">
                {profile.fileName ? (
                  <form action="" method="post">
                    <div className="form">
                      <div className="fileName">{profile.fileName}</div>
                      <button className="btn" onClick={Upload}>
                        {profile.loading ? (
                          <img src="/load.svg" alt="" className="ldn_img" />
                        ) : (
                          "Upload"
                        )}
                      </button>
                    </div>
                  </form>
                ) : (
                  <>
                    <header>
                      <h4>Select Profile here</h4>
                    </header>
                    <input
                      type="file"
                      hidden
                      accept="image/*"
                      id="fileID"
                      style={{ display: "none" }}
                      onChange={(e) => {
                        dispatch(
                          Profile_sele({
                            fileName: e.target.files[0].name,
                            image: e.target.files[0],
                          })
                        );
                      }}
                    />
                    <label className="btnn" htmlFor="fileID">
                      Choose File
                    </label>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
