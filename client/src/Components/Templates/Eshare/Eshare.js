import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import DateTimePicker from "react-datetime-picker";
import "./Eshare.css";
import { hdl_event_data, put_event } from "../../actions";
import axios from "axios";
const Eshare = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.userdata);
  const event = useSelector((state) => state.Event);
  const [date, setdate] = useState(null);
  const [display, setdisplay] = useState(false);
  const tomorrow = new Date(new Date().getTime() + 24 * 60 * 60 * 1000);
  tomorrow.setHours(0, 0, 0, 0);
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      let formData = new FormData();
      formData.append("image", event.image);
      formData.append("data", JSON.stringify({ ...event, files: "" }));
      // dispatch(post_edt({ loading: true }));
      const resu = await axios
        .post("/api/share/event", formData)
        .then((res) => {
          return res;
        })
        .catch((err) => {
          throw new Error(err);
        });
      // const edt = posts.post;
      // edt.splice(0, 0, resu.data.post);
      // dispatch(
      //   post_edt({ text: "", files: "", visiblity: "public", loading: false })
      // );
      // dispatch(posts_edt({ post: edt }));
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="share">
      <div className="shareWrapper">
        <div className={display ? "shareTop" : "shareTop flex"}>
          <img className="shareProfileImg" src="/api/profilepic" alt="" />
          {display ? (
            <textarea
              placeholder={"Write about event?"}
              className="shareInput"
              name="text"
              rows=""
              cols=""
              style={{ resize: "none", height: "200px", width: "100%" }}
              value={event.text}
              onChange={(e) => {
                dispatch(hdl_event_data(e));
              }}
            />
          ) : (
            <button
              className="shareButton"
              onClick={() => {
                setdisplay(true);
              }}
            >
              Add Event
            </button>
          )}
        </div>
        {display ? (
          <>
            <div className="inpt-row">
              <span>Date & Time</span>
              <DateTimePicker
                minDate={tomorrow}
                onChange={(e) => {
                  dispatch(put_event({ date_time: e }));
                }}
                value={event.date_time}
                format={"dd-MM-y h:mm a"}
              />
            </div>
            <div className="inpt-row">
              <span>Location</span>
              <input
                type=""
                name="location"
                value={event.location}
                onChange={(e) => {
                  dispatch(hdl_event_data(e));
                }}
                className="ev-inpt"
              />
            </div>
            <div className="inpt-row">
              <span>Type</span>
              <select
                className="ev-inpt"
                name="type"
                value={event.type}
                onChange={(e) => {
                  dispatch(hdl_event_data(e));
                }}
              >
                <option value="gathering">Gathering</option>
                <option value="competition">Competetion</option>
              </select>
            </div>
            <div className="inpt-row">
              <span>Registration</span>
              <select
                className="ev-inpt"
                name="registration"
                value={event.registration}
                onChange={(e) => {
                  dispatch(
                    put_event({
                      registration: e.target.value === "true" ? true : false,
                    })
                  );
                }}
              >
                <option value={true}>Required</option>
                <option value={false}>Not Required</option>
              </select>
            </div>
            {event.registration ? (
              <div className="inpt-row">
                <span>Registration link</span>
                <input
                  type=""
                  name="lnk"
                  className="ev-inpt"
                  value={event.lnk}
                  onChange={(e) => {
                    dispatch(hdl_event_data(e));
                  }}
                />
              </div>
            ) : (
              ""
            )}
            {event.image ? (
              <div className="shareImgContainer">
                <img
                  className="shareImg"
                  alt=""
                  src={URL.createObjectURL(event.image)}
                />
                <i
                  className="fa-sharp fa-solid fa-xmark shareCancelImg"
                  onClick={() => {
                    dispatch(put_event({ image: null }));
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
                      dispatch(put_event({ image: e.target.files[0] }));
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
                Share
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

export default Eshare;
