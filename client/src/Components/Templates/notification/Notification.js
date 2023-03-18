import React from "react";
import "./notification.css";
import { useSelector } from "react-redux";
const Notification = () => {
  const ntftn = useSelector((state) => state.notification);
  return (
    <>
      <div className="arr"></div>
      <div className="ntfn_tab">
        <div className="ntftn_hd">Friend Request</div>
        {ntftn.freq.map((itm) => {
          return (
            <div className="ntfn_dt">
              <div className="prfl_cn">
                <img src={`/api/profilepic/${itm.from.userid}`} alt="" />
              </div>
              <div className="ntftn_dt">
                <div className="ntftn_txt">
                  <p>{itm.from.fullName}</p>
                  <p>Want's to be you friend??</p>
                </div>
                <div className="ntftn_btn">
                  <button className="ac_btn btn_hv">
                    {" "}
                    <i className="fa-solid fa-check mark" />
                    Accept
                  </button>
                  <button className="de_btn btn_hv">
                    <i className="fa-solid fa-x mark" />
                    Decline
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Notification;
