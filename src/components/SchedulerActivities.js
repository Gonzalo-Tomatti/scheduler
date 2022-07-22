import React, { useContext } from "react";
import { GlobalContext } from "../context";
import { FaTrashAlt } from "react-icons/fa";
import { FaRegEdit } from "react-icons/fa";

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
    editActivity,
    deleteActivity,
    editActivityFlag,
  } = useContext(GlobalContext);
  return (
    <div>
      <form>
        <h5 className="ms-2">Actividades</h5>
        <span>Duración predeterminada para las actividades: </span>
        <div>
          <label className="my-2">Horas</label>
          <input
            className="short-form-input ps-1"
            onChange={handleDefaultActivitySettings}
            name="hours"
            type="number"
            value={defaultActivitySettings.hours}
          />
          <label className="my-2">Minutos</label>
          <input
            className="short-form-input ps-1"
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
          className="short-form-input ps-1"
          onChange={handleActivity}
          name="hours"
          type="number"
          value={activity.hours}
        />
        <label className="my-2">Minutos</label>
        <input
          className="short-form-input ps-1"
          onChange={handleActivity}
          name="minutes"
          type="number"
          value={activity.minutes}
        />

        {editActivityFlag ? (
          <button
            className="btn btn-success btn-sm"
            onClick={(e) => checkInput(e, "editActivity")}
          >
            Editar
          </button>
        ) : (
          <button
            className="btn btn-success btn-sm"
            onClick={(e) => checkInput(e, "activity")}
          >
            Añadir
          </button>
        )}
        <div>
          <small className="text-danger">
            {errorFlag &&
              (errorType === "activity" || errorType === "editActivity") &&
              errorMsg}
          </small>
        </div>
      </form>
      <ul>
        {activities.map((a, index) => (
          <li key={index} className="d-flex li">
            {a.name}, {a.hours}, {a.minutes}
            <div className="btn-container ms-auto">
              {/*edit Activity*/}

              <FaRegEdit
                className="mx-2 edit-trash"
                onClick={() => editActivity(a, index)}
              />
              {/*delete Activity*/}

              <FaTrashAlt
                className="mx-2 edit-trash"
                onClick={() => deleteActivity(a.name)}
              />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SchedulerActivities;
