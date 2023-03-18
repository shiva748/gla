import React, { useState, useEffect } from "react";
import JShare from "../Jshare/Jshare";
import { useDispatch, useSelector } from "react-redux";
import { jobs_edt } from "../../actions";
import Jobsc from "../Jobs/Jobs";

const Jfeed = () => {
  const dispatch = useDispatch();
  const Jobs = useSelector((state) => state.Jobs);
  const [loading, setloading] = useState(true);
  const fetch_jobs = async () => {
    const res = await fetch("/api/jobs", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    const data = await res.json();
    dispatch(jobs_edt({ display: true, job: data.job }));
    setloading(false);
  };
  useEffect(() => {
    fetch_jobs();
  }, []);
  return (
    <div className="feed">
      <div className="feedWrapper">
        <JShare />
        {Jobs.display ? Jobs.job.map((e, i) => <Jobsc key={i} job={e} />) : ""}
      </div>
    </div>
  );
};

export default Jfeed;
