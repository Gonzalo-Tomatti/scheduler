import React, { useContext } from "react";
import { GlobalContext } from "../context";
import SchedulerDays from "../components/SchedulerDays";
import SchedulerActivities from "../components/SchedulerActivities";
import SchedulerGroups from "../components/SchedulerGroups";
import Schedule from "../components/Schedule";

const Scheduler = () => {
  const { logOut } = useContext(GlobalContext);

  return (
    <div className="section bg-dark text-light">
      <button onClick={logOut} className="btn btn-success">
        Cerrar sesión
      </button>
      <SchedulerGroups />
      <SchedulerActivities />
      <SchedulerDays />
      <Schedule />
    </div>
  );
};

export default Scheduler;
