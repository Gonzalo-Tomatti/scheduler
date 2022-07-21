import React, { useContext } from "react";
import { GlobalContext } from "../context";

const SchedulerActivities = () => {
  const {
    activities,
    activity,
    handleActivity,
    handleDefaultActivitySettings,
    defaultActivitySettings,
    errorFlag,
    errorMsg,
    errorType,
    checkInput,
  } = useContext(GlobalContext);
  return (
    <div>
      <form>
        <h4>Actividades</h4>
        <span>Duración predeterminada para las actividades: </span>
        <div>
          <label className="my-2">Horas</label>
          <input
            className="form-input ps-1"
            onChange={handleDefaultActivitySettings}
            name="hours"
            type="number"
            value={defaultActivitySettings.hours}
          />
          <label className="my-2">Minutos</label>
          <input
            className="form-input ps-1"
            onChange={handleDefaultActivitySettings}
            name="minutes"
            type="number"
            value={defaultActivitySettings.minutes}
          />
        </div>

        {/* ACTIVIDAD */}
        <label className="my-2" htmlFor="activity">
          Nombre
        </label>
        <input
          className="form-input ps-1"
          onChange={handleActivity}
          name="name"
          id="activity"
          type="text"
          value={activity.name}
        />
        <label className="my-2">Horas</label>
        <input
          className="form-input ps-1"
          onChange={handleActivity}
          name="hours"
          type="number"
          value={activity.hours}
        />
        <label className="my-2">Minutos</label>
        <input
          className="form-input ps-1"
          onChange={handleActivity}
          name="minutes"
          type="number"
          value={activity.minutes}
        />
        <button onClick={(e) => checkInput(e, "activity")}>Añadir</button>
        <small>{errorFlag && errorType === "activity" && errorMsg}</small>
      </form>
      <ul>
        {activities.map((a, index) => (
          <li key={index}>
            {a.name}, {a.hours}, {a.minutes}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SchedulerActivities;
