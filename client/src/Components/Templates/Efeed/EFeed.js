import React, { useEffect } from "react";
import Eshare from "../Eshare/Eshare";
import { useSelector, useDispatch } from "react-redux";
import { events_edt } from "../../actions";
import Event from "../Event/Event";
const EFeed = () => {
  const dispatch = useDispatch();
  const Events = useSelector((state) => state.Events);
  const fetch_event = async () => {
    const res = await fetch("/api/event", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    const data = await res.json();
    dispatch(events_edt({ display: true, event: data.data }));
  };
  useEffect(() => {
    fetch_event();
  }, []);
  return (
    <div className="feed">
      <div className="feedWrapper">
        <Eshare />
        {Events.display
          ? Events.event.map((e, i) => <Event key={i} event={e} />)
          : ""}
      </div>
    </div>
  );
};

export default EFeed;
