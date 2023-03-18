import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { hdl_job_data, put_job, jobs_edt } from "../../actions";
import axios from "axios";
const JShare = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.userdata);
  const Jobs = useSelector((state) => state.Jobs);
  const Job = useSelector((state) => state.Job);
  const [display, setdisplay] = useState(false);
  const submitHandler = async (e) => {
    e.preventDefault();
    if (!Job.loading) {
      try {
        let formData = new FormData();
        formData.append("image", Job.image);
        formData.append("data", JSON.stringify({ ...Job, image: "" }));
        dispatch(put_job({ loading: true }));
        const resu = await axios
          .post("/api/share/job", formData)
          .then((res) => {
            return res;
          })
          .catch((err) => {
            throw new Error(err);
          });
        dispatch(
          put_job({
            text: "",
            image: "",
            company: "",
            post: "",
            application: "",
            email: "",
            loading: false,
          })
        );
        setdisplay(false);
        let jobs_edt = Jobs.job;
        jobs_edt.splice(0, 0, resu.data.data);
        dispatch(jobs_edt({ ...Jobs, job: jobs_edt }));
        setdisplay(false);
      } catch (error) {
        console.log(error);
      }
    }
  };
  return (
    <div className="share" style={{ position: "relative" }}>
      {display ? (
        <i
          className="fa-sharp fa-solid fa-xmark shareCancelImg"
          style={{ top: "15px", right: "15px" }}
          onClick={() => {
            setdisplay(false);
            dispatch(
              put_job({
                text: "",
                image: "",
                company: "",
                post: "",
                application: "",
                email: "",
                loading: false,
              })
            );
          }}
        />
      ) : (
        ""
      )}
      <div className="shareWrapper">
        <div className={display ? "shareTop" : "shareTop flex"}>
          <img className="shareProfileImg" src="/api/profilepic" alt="" />
          {display ? (
            <textarea
              placeholder={"Write about job opportunity ?"}
              className="shareInput"
              name="text"
              rows=""
              cols=""
              style={{ resize: "none", height: "200px", width: "100%" }}
              value={Job.text}
              onChange={(e) => {
                dispatch(hdl_job_data(e));
              }}
            />
          ) : (
            <button
              className="shareButton"
              onClick={() => {
                setdisplay(true);
              }}
            >
              Add job
            </button>
          )}
        </div>
        {display ? (
          <>
            <div className="inpt-row">
              <span>Company Name</span>
              <input
                type=""
                name="company"
                value={Job.company}
                onChange={(e) => {
                  dispatch(hdl_job_data(e));
                }}
                className="ev-inpt"
              />
            </div>
            <div className="inpt-row">
              <span>Job Profile</span>
              <input
                type=""
                name="post"
                value={Job.post}
                onChange={(e) => {
                  dispatch(hdl_job_data(e));
                }}
                className="ev-inpt"
              />
            </div>
            <div className="inpt-row">
              <span>Application link</span>
              <input
                type=""
                name="application"
                value={Job.application}
                onChange={(e) => {
                  dispatch(hdl_job_data(e));
                }}
                className="ev-inpt"
              />
            </div>
            <div className="inpt-row">
              <span>Email</span>
              <input
                type=""
                name="email"
                value={Job.email}
                onChange={(e) => {
                  dispatch(hdl_job_data(e));
                }}
                className="ev-inpt"
              />
            </div>
            {Job.image ? (
              <div className="shareImgContainer">
                <img
                  className="shareImg"
                  alt=""
                  src={URL.createObjectURL(Job.image)}
                />
                <i
                  className="fa-sharp fa-solid fa-xmark shareCancelImg"
                  onClick={() => {
                    dispatch(put_job({ image: null }));
                  }}
                />
              </div>
            ) : (
              ""
            )}
            <form className="shareBottom">
              <div className="shareOptions">
                <label htmlFor="file" className="shareOption">
                  <i className="shareIcon fa-solid fa-photo-film" />
                  <span className="shareOptionText">Photo or Video</span>
                  <input
                    style={{ display: "none" }}
                    type="file"
                    name="image"
                    id="file"
                    accept=".png,.jpeg,.jpg"
                    onClick={(e) => {
                      e.target.value = "";
                    }}
                    onChange={(e) => {
                      dispatch(put_job({ image: e.target.files[0] }));
                    }}
                  />
                </label>
              </div>
              <button
                className="shareButton"
                // cancel for red
                type="submit"
                onClick={(e) => {
                  submitHandler(e);
                }}
              >
                {Job.loading ? (
                  <img src="./load.svg" alt="" className="ldn_img" />
                ) : (
                  "Post"
                )}
              </button>
            </form>
          </>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default JShare;
