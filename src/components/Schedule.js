import React, { useContext } from "react";
import { GlobalContext } from "../context";

const Schedule = () => {
  const {
    schedule,
    errorType,
    errorFlag,
    errorMsg,
    checkInput,
    handleScheduleName,
    scheduleName,
  } = useContext(GlobalContext);

  return (
    <div className="">
      {!schedule.length || errorType === "remainingActivities" ? null : (
        <div className="p-3 text-center">
          {schedule.map((g, index) => (
            <div key={index} className="p-3 text-capitalize">
              <h4 className="text-center">{g.name}</h4>
              <table className="table">
                <thead>
                  <tr>
                    <th className="col-3">Día</th>
                    <div className="col-12">
                      <div className="row">
                        <th className="col-6 col-lg-8">Actividad</th>
                        <th className="col-6 col-lg-4">Hora</th>
                      </div>
                    </div>
                  </tr>
                </thead>
                <tbody>
                  {g.days.map((d, index) => (
                    <tr key={index}>
                      {/*days*/}
                      <td className="text-capitalize  ">{d.day}</td>

                      {/*day activities*/}
                      <td className="text-break li ">
                        {d.dayActivities.map((da, index) => (
                          <div key={index} className="row ">
                            <div className="my-1 col-6 col-lg-8">{da.name}</div>
                            <div className="my-1 col-6 col-lg-4">
                              {da.hoursFrom}:{da.minutesFrom} - {da.hoursTo}:
                              {da.minutesTo}
                            </div>

                            <hr
                              className={
                                index === d.dayActivities.length - 1
                                  ? "d-none"
                                  : ""
                              }
                            ></hr>
                          </div>
                        ))}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ))}

          <form>
            <label className="my-2" htmlFor="scheduleName">
              Nombre de horarios
            </label>
            <input
              className="form-input ps-1"
              onChange={handleScheduleName}
              name="scheduleName"
              id="scheduleName"
              type="text"
              value={scheduleName}
              autoFocus
            />

            <button
              onClick={(e) => checkInput(e, "saveSchedule")}
              className="btn btn-success"
            >
              Guardar
            </button>
          </form>
          <div>
            <small className="text-danger">
              {errorFlag && errorType === "saveSchedule" && errorMsg}
            </small>
          </div>
        </div>
      )}
    </div>
  );
};

export default Schedule;
