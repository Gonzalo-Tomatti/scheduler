import React, { useContext } from "react";
import { GlobalContext } from "../context";

const Schedule = () => {
  const { schedule } = useContext(GlobalContext);
  return (
    <div>
      {schedule.map((g, index) => {
        <h4 key={index}>{g.name}</h4>;
        {
          g.days.map((d, index) => {
            <p key={index}>{d.name}</p>;
            d.dayActivities.map((da, index) => {
              <p key={index}>
                {da.name}, hFrom, {da.hourFrom}, mFrom, {da.minuteFrom}, hTo,{" "}
                {da.hourTo}, mTo, {da.minuteTo}
              </p>;
            });
          });
        }
      })}
    </div>
  );
};

export default Schedule;
