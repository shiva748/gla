import React, {useEffect} from "react";
import "./css/loading.css";
import { useDispatch } from "react-redux";
import { validate } from "../actions";

const Loading = () => {
  const dispatch = useDispatch()
  let called = false;
  const userlog = async () => {
    if (!called) {
      called = true;
      const res = await fetch("/api/checkls", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include",
      })
        .then((res) => {
          return res;
        })
        .catch((error) => {
          return alert("some error occured");
        });
      const data = await res.json();
      if (res.status !== 200 || !data.result) {
        dispatch(validate({ result: false, data: {} }));
      } else {
        dispatch(validate(data));
      }
    }
  };
  useEffect(()=>{
    userlog()
  }, []);
  return (
    <div className="load-con">
      <div className="boxes">
        <div className="box">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
        <div className="box">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
        <div className="box">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
        <div className="box">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    </div>
  );
};

export default Loading;
