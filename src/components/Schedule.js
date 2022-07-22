import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import { GlobalContext } from "../context";

const Schedule = () => {
  const { schedule, errorType, postSchedule } = useContext(GlobalContext);

  // setTimeout(() => {
  //   setFetchingSchedule(false);
  // }, 1000);
  // useEffect(() => {
  //   axios
  //     .get(`get-schedules`)
  //     .then((res) => {
  //       setSchedule(res.data);
  //     })
  //     .catch((err) => console.log(err));
  // }, [fetchingSchedule, getFlag]);

  return (
    <div className="">
      {!schedule.length || errorType === "remainingActivities" ? null : (
        <div className="section p-3 text-center">
          {schedule.map((g, index) => (
            <div key={index} className="p-3 text-capitalize">
              <h4 className="text-center">{g.name}</h4>
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">Día</th>
                    <th scope="col">Actividad</th>
                    <th scope="col">Hora</th>
                  </tr>
                </thead>
                <tbody>
                  {g.days.map((d, index) => (
                    <tr key={index}>
                      <td>{d.day}</td>
                      <td>
                        {d.dayActivities.map((da, index) => (
                          <div key={index} className="my-1">
                            {da.name}
                          </div>
                        ))}
                      </td>
                      <td>
                        {d.dayActivities.map((da, index) => (
                          <div key={index} className="my-1">
                            {da.hoursFrom}:{da.minutesFrom} - {da.hoursTo}:
                            {da.minutesTo}
                          </div>
                        ))}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ))}
          <button onClick={postSchedule} className="btn btn-success">
            Guardar Horarios
          </button>
        </div>
      )}
    </div>
  );
};

export default Schedule;
