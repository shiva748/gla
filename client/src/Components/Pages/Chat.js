import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import "./css/chat.css";
const ENDPOINT = "http://localhost:3001";
var socket, selectedChatCompare;
const Chat = ({ userid }) => {
  const history = useHistory();
  const [socketconnected, setsocketconnected] = useState(false);
  const user = useSelector((state) => state.userdata);
  const [load, setload] = useState(true);
  useEffect(() => {
    socket = io(ENDPOINT);
    socket.emit("setup", user.data);
    socket.on("connection", () => {
      setsocketconnected(true);
    });
  }, []);
  return (
    <div className="chat_box">
      <div className="chat_sd">
        <div className="chat-sdhd">
          <span style={{ fontFamily: "cursive" }}>Chats</span>
          <button className="send_btn" style={{ float: "right" }} onClick={()=>{
            history.replace("/")
          }}>
            <i class="fa-solid fa-arrow-left" />
          </button>
        </div>

        <div className="chat_prfl">
          <div className="cht_prfl_img">
            <img src="/api/profilepic" alt="" />
          </div>
          <div className="cht_prfl_dtl">
            <div className="dtl_div">
              <span className="dtl_txt">Shiva Gautam</span>
            </div>
            <div className="dtl_div_btm">
              <i class="fa-solid fa-circle online" /> Online
            </div>
          </div>
        </div>
      </div>
      <div className="chat_bx">
        <div className="chat-bxhd">
          <span className="cht_bx_txt">Shiva</span>
          <img src="/api/profilepic" className="topbarImg" alt="" />
        </div>
        <div className="msg_con">
          <div class="message-blue">
            <p class="message-content">This is an awesome message!</p>
            <div class="message-timestamp-left">SMS 13:37</div>
          </div>

          <div class="message-orange">
            <p class="message-content">I agree that your message is awesome!</p>
            <div class="message-timestamp-right">SMS 13:37</div>
          </div>

          <div class="message-blue">
            <p class="message-content">Thanks!</p>
            <div class="message-timestamp-left">SMS 13:37</div>
          </div>
        </div>
        <div className="msg_bx_con">
          <input
            type="text"
            placeholder="Type Message..."
            name="message"
            className="msg_input"
          />
          <button className="send_btn">
            <i class="fa-solid fa-paper-plane" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
