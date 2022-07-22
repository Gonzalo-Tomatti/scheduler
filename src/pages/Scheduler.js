import React, { useContext } from "react";
import { GlobalContext } from "../context";
import SchedulerDays from "../components/SchedulerDays";
import SchedulerActivities from "../components/SchedulerActivities";
import SchedulerGroups from "../components/SchedulerGroups";
import Schedule from "../components/Schedule";

const Scheduler = () => {
  const { logOut, errorFlag, errorMsg, errorType } = useContext(GlobalContext);

  return (
    <div className="section bg-dark text-light">
      <button onClick={logOut} className="btn btn-success">
        Cerrar sesión
      </button>
      <SchedulerGroups />
      <SchedulerActivities />
      <SchedulerDays />
      {errorFlag && errorType === "remainingActivities" && (
        <p className="text-danger">{errorMsg}</p>
      )}
      <Schedule />
    </div>
  );
};

export default Scheduler;
