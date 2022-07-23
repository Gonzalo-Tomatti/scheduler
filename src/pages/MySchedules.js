import React, { useContext, useState, useEffect, useRef } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";
import { GlobalContext } from "../context";

const MySchedules = () => {
  const { formatTime } = useContext(GlobalContext);
  const [schedules, setSchedules] = useState([]);
  const [fetchingSchedule, setFetchingSchedule] = useState(true);
  const [showInfo, setShowInfo] = useState(false);
  const [showingScheduleIndex, setShowingScheduleIndex] = useState(0);
  const activityRef = useRef();
  const activityTimeRef = useRef();
  useEffect(() => {
    axios
      .get(`get-schedules`)
      .then((res) => {
        setSchedules(res.data);
        setFetchingSchedule(false);
      })
      .catch((err) => console.log(err));
  }, [fetchingSchedule]);

  const showSchedule = (index) => {
    setShowingScheduleIndex(index);
  };

  const toggleShowInfo = () => {
    setShowInfo(!showInfo);
  };
  if (fetchingSchedule) {
    return (
      <div className="text-center">
        <Navbar />

        <p className="mt-5 fs-3">Cargando horarios...</p>
      </div>
    );
  }
  return (
    <div>
      <Navbar />
      <div className="section d-flex flex-column align-items-center">
        <h3 className="mt-5">Horarios guardados:</h3>
        <ul className="list-group py-5">
          <li className="list-group-item d-inline schedule-li px-5 text-center">
            demo1
          </li>
          <li className="list-group-item d-inline schedule-li px-5 text-center">
            demo2
          </li>
          {schedules.map((s, index) => (
            <li
              onClick={() => showSchedule(index)}
              className={`${
                index === showingScheduleIndex && "list-group-item-primary"
              } list-group-item d-inline schedule-li px-5 text-center`}
              key={index}
            >
              <p className="p">{s.scheduleName}</p>
            </li>
          ))}
        </ul>
        {schedules.map((s, index) => {
          if (index === showingScheduleIndex)
            return (
              <div key={index} className="p-3 pb-5 ">
                <h2 className="text-center">{s.scheduleName}</h2>
                <p>
                  <button
                    onClick={toggleShowInfo}
                    className="btn btn-success btn-sm"
                  >
                    {showInfo ? "Ocultar" : "Mostrar"}
                  </button>{" "}
                  la información ingresada para crear los horarios.
                </p>
                {showInfo && (
                  <div>
                    <div className="my-2">
                      <ul className="ul p">
                        Grupos ingresados:
                        {s.groups.map((g, index) => (
                          <li className="ms-4" key={index}>
                            {g}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="my-2">
                      <ul className="ul p">
                        Actividades ingresadas:
                        {s.activities.map((a, index) => (
                          <li className="ms-4 " key={index}>
                            {a.name} durante{" "}
                            <span className="ms-auto">
                              {formatTime(a.hours)}:{formatTime(a.minutes)}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="my-2">
                      <ul className="ul p ">
                        Días ingresados:
                        {s.days.map((d, index) => {
                          if (d.enabled) {
                            return (
                              <li
                                className="ms-4 d-flex li-short text-capitalize"
                                key={index}
                              >
                                {d.name}:{" "}
                                <span className="ms-auto">
                                  {formatTime(d.hoursFrom)}:
                                  {formatTime(d.minutesFrom)} -{" "}
                                  {formatTime(d.hoursTo)}:
                                  {formatTime(d.minutesTo)}
                                </span>
                              </li>
                            );
                          }
                        })}
                      </ul>
                    </div>
                  </div>
                )}
                {/*groups*/}

                {s.schedule.map((g, index) => (
                  <div key={index} className="table-container py-3 text-center">
                    <h4 className="ms-4">{g.name}</h4>
                    <table className="table">
                      <thead>
                        <tr>
                          <th className="col-3">Día</th>
                          <div className="col-12">
                            <div className="row">
                              <th className="col-6">Actividad</th>
                              <th className="col-6">Hora</th>
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
                                  <div className="my-1 col-6">{da.name}</div>
                                  <div className="my-1 col-6">
                                    {da.hoursFrom}:{da.minutesFrom} -{" "}
                                    {da.hoursTo}:{da.minutesTo}
                                  </div>
                                  <hr
                                    className={
                                      index === d.dayActivities.length - 1 &&
                                      "d-none"
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
              </div>
            );
        })}
      </div>
    </div>
  );
};

export default MySchedules;
