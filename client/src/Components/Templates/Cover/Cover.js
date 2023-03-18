import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Cover_tog, Cover_sele } from "../../actions";
import FormData from "form-data";
import axios from "axios";
import "./Cover.css";

const Cover = () => {
  const dispatch = useDispatch();
  const cover = useSelector((state) => state.cover);
  const Upload = async (e) => {
    e.preventDefault();
    try {
      let formdata = new FormData();
      formdata.append("cover", cover.image);
      dispatch(Cover_sele({ loading: true }));
      await axios
        .post("/api/cover", formdata)
        .then((res) => {
          return res;
        })
        .catch((err) => {
          throw new Error(err);
        });
        window.location.reload()
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
                dispatch(Cover_tog());
                dispatch(Cover_sele({ fileName: "", image: "" }));
              }}
            >
              X
            </button>
            <div className="card">
              <h3>Upload Files</h3>
              <div className="drop_box">
                {cover.fileName ? (
                  <form action="" method="post">
                    <div className="form">
                      <div className="fileName">{cover.fileName}</div>
                      <button className="btn" onClick={Upload}>
                        {cover.loading ? (
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
                      <h4>Select Cover here</h4>
                    </header>
                    <input
                      type="file"
                      hidden
                      accept="image/*"
                      id="fileID"
                      style={{ display: "none" }}
                      onChange={(e) => {
                        dispatch(
                          Cover_sele({
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

export default Cover;
