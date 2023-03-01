import React from "react";
import "./notification.css";
const Notification = () => {
  return <>
  <div className="arr">
    
  </div>
  <div className="ntfn_tab">
    <div className="ntftn_hd">
      Friend Request
    </div>
    <div className="ntfn_dt">
       <div className="prfl_cn">
        <img src="/api/profilepic" alt=""/>
       </div>
       <div className="ntftn_dt">
        <div className="ntftn_txt">
          <p>Shiva Gautam</p>
          <p>Want's to be you friend??</p>
        </div>
        <div className="ntftn_btn">
          <button className="ac_btn btn_hv"> <i class="fa-solid fa-check mark"/>Accept</button>
          <button className="de_btn btn_hv"><i class="fa-solid fa-x mark"/>Decline</button>
        </div>
       </div>
    </div>
  </div>
  </>
};

export default Notification;
