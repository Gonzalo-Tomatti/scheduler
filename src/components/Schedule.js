import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import { GlobalContext } from "../context";

const Schedule = () => {
  const { schedule, errorType } = useContext(GlobalContext);

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

  console.log(schedule);

  return (
    <div className="section p-3 text-center text-light">
      <h4 className="mb-4">Horarios</h4>
      {!schedule.length || errorType === "remainingActivities" ? (
        <h4 className="mt-5">No se han creado horarios aún.</h4>
      ) : (
        <div>
          {schedule.map((g, index) => (
            <div key={index}>
              <p>{g.name}</p>
              {g.days.map((day, index) => (
                <div key={index}>
                  <div> {day.day}</div>
                  {day.dayActivities.map((da, index) => (
                    <p key={index}>
                      {da.name} = {da.hoursFrom}:{da.minutesFrom} - {da.hoursTo}
                      :{da.minutesTo}
                    </p>
                  ))}
                </div>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Schedule;
