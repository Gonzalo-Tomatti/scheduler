import React, { useContext } from "react";
import { GlobalContext } from "../context";
import SchedulerDays from "../components/SchedulerDays";
import SchedulerActivities from "../components/SchedulerActivities";
import SchedulerGroups from "../components/SchedulerGroups";
import Schedule from "../components/Schedule";
import Navbar from "../components/Navbar";

const Scheduler = () => {
  const { errorFlag, errorMsg, errorType } = useContext(GlobalContext);

  return (
    <div className="section container pb-5">
      <Navbar />

      <h2 className="text-center my-2">¡Genera horarios automáticamente!</h2>
      <p className="mt-4 ">
        Ingresa los siguientes datos para generar un horario para cada
        grupo/persona en el que no pueden realizar la misma actividad al mismo
        tiempo:
      </p>
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
