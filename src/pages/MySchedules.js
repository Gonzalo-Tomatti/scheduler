import React, { useContext, useState, useEffect, useRef } from "react";
import Navbar from "../components/Navbar";
import Modal from "../components/Modal";
import axios from "axios";
import { GlobalContext } from "../context";
import { FaTrashAlt } from "react-icons/fa";
import { FaRegEdit } from "react-icons/fa";

const MySchedules = () => {
  const { formatTime } = useContext(GlobalContext);
  const [demos, setDemos] = useState([]);
  const [schedules, setSchedules] = useState([]);
  const [fetchingSchedule, setFetchingSchedule] = useState(true);
  const [showInfo, setShowInfo] = useState(false);
  const [showingScheduleIndex, setShowingScheduleIndex] = useState(0);
  const [newName, setNewName] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const refInput = useRef();
  const [scheduleId, setScheduleId] = useState();

  const fetchSchedules = () => {
    axios
      .all([axios.get(`get-demos`), axios.get(`get-schedules`)])
      .then(
        axios.spread((demos, scheds) => {
          setSchedules([...demos.data, ...scheds.data]);
          setDemos(demos.data);
          setFetchingSchedule(false);
        })
      )
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    fetchSchedules();
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

  //borrar horario
  const deleteSchedule = (id) => {
    axios
      .delete(`https://big-scheduler.herokuapp.com/delete-schedule/${id}`)
      .then(() => {
        fetchSchedules();
      })
      .catch((err) => console.log(err));
  };

  //editar nombre de horario

  const saveId = (id) => {
    setScheduleId(id);
    toggleModal();
  };
  // abrir/cerrar modal
  const toggleModal = async () => {
    await setIsModalOpen(!isModalOpen);
    refInput.current.focus();
  };

  const handleChange = (e) => {
    const { value } = e.target;
    setNewName(value);
  };
  console.log(newName);
  const editScheduleName = (e) => {
    e.preventDefault();

    axios
      .patch(
        `https://big-scheduler.herokuapp.com/edit-schedule-name/${scheduleId}`,
        {
          newName,
        }
      )
      .then(() => {
        fetchSchedules();
        toggleModal();
        setNewName("");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="container">
      <Navbar />
      <Modal
        isModalOpen={isModalOpen}
        handleChange={handleChange}
        toggleModal={toggleModal}
        refInput={refInput}
        newName={newName}
        editScheduleName={editScheduleName}
      />

      <div className="section d-flex flex-column align-items-center">
        <h3 className="mt-5">Horarios guardados:</h3>
        <ul className="list-group py-5">
          {schedules.map((s, index) => (
            <li
              onClick={() => showSchedule(index)}
              className={`${
                index === showingScheduleIndex && "list-group-item-primary"
              } list-group-item schedule-li px-5 text-center d-flex justify-content-between d-md-inline`}
              key={index}
            >
              <p className="p">{s.scheduleName}</p>
              {s.email !== "demo@gmail.com" && (
                <div className="edit-trash-container">
                  <FaRegEdit
                    className="mx-2 edit-trash"
                    onClick={() => saveId(s._id)}
                  />
                  <FaTrashAlt
                    className="mx-2 edit-trash"
                    onClick={() => deleteSchedule(s._id)}
                  />
                </div>
              )}
            </li>
          ))}
        </ul>
        {schedules.map((s, index) => {
          if (index === showingScheduleIndex)
            return (
              <div key={index} className="p-3 pb-5 text-break">
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
                      <ul className="ul p mt-3">
                        Actividades ingresadas:
                        {s.activities.map((a, index) => (
                          <li className="ms-4" key={index}>
                            {a.name} durante{" "}
                            <span className="ms-auto">
                              {formatTime(a.hours)}:{formatTime(a.minutes)}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="my-2">
                      <ul className="ul p  mt-3">
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
                                  <div className="my-1 col-6 col-lg-8">
                                    {da.name}
                                  </div>
                                  <div className="my-1 col-6 col-lg-4">
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
