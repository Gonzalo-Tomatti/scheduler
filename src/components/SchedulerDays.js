import React, { useContext } from "react";
import { GlobalContext } from "../context";

const SchedulerDays = () => {
  const {
    addDay,
    handleDefaultTimeSettings,
    errorFlag,
    errorMsg,
    errorType,
    checkInput,
    handleContinueActivityMode,
    continueActivityMode,
    days,
    timeBetween,
    handleTimeBetween,
    defaultTime,
    formatTime,
  } = useContext(GlobalContext);

  const weekdays = [
    "Lunes",
    "Martes",
    "Miércoles",
    "Jueves",
    "Viernes",
    "Sábado",
    "Domingo",
  ];
  const hours = [
    "00",
    "01",
    "02",
    "03",
    "04",
    "05",
    "06",
    "07",
    "08",
    "09",
    "10",
    "11",
    "12",
    "13",
    "14",
    "15",
    "16",
    "17",
    "18",
    "19",
    "20",
    "21",
    "22",
    "23",
  ];
  const minutes = [
    "00",
    "01",
    "02",
    "03",
    "04",
    "05",
    "06",
    "07",
    "08",
    "09",
    "10",
    "11",
    "12",
    "13",
    "14",
    "15",
    "16",
    "17",
    "18",
    "19",
    "20",
    "21",
    "22",
    "23",
    "24",
    "25",
    "26",
    "27",
    "28",
    "29",
    "30",
    "31",
    "32",
    "33",
    "34",
    "35",
    "36",
    "37",
    "38",
    "39",
    "40",
    "41",
    "42",
    "43",
    "44",
    "45",
    "46",
    "47",
    "48",
    "49",
    "50",
    "51",
    "52",
    "53",
    "54",
    "55",
    "56",
    "57",
    "58",
    "59",
  ];
  return (
    <form>
      <h5 className="ms-2">Días</h5>
      <p>Horario predeterminado para días con horarios no especificados: </p>
      <div className="mb-3">
        <label>Desde </label>
        <select
          name="defaultHoursFrom"
          className="select"
          onChange={handleDefaultTimeSettings}
          defaultValue={formatTime(defaultTime.defaultHoursFrom)}
        >
          <option value="">---</option>
          {hours.map((h, index) => (
            <option
              // selected={index === defaultTime.defaultHoursFrom}
              key={index}
              value={h}
            >
              {h}
            </option>
          ))}
        </select>
        <label>: </label>
        <select
          name="defaultMinutesFrom"
          className="select"
          onChange={handleDefaultTimeSettings}
          defaultValue={formatTime(defaultTime.defaultMinutesFrom)}
        >
          <option value="">---</option>
          {minutes.map((m, index) => (
            <option
              // selected={index === defaultTime.defaultMinutesFrom}
              key={index}
              value={m}
            >
              {m}
            </option>
          ))}
        </select>
        <label>Hasta </label>
        <select
          name="defaultHoursTo"
          className="select"
          onChange={handleDefaultTimeSettings}
          defaultValue={formatTime(defaultTime.defaultHoursTo)}
        >
          <option value="">---</option>
          {hours.map((h, index) => (
            <option
              // selected={index === defaultTime.defaultHoursTo}
              key={index}
              value={h}
            >
              {h}
            </option>
          ))}
        </select>
        <label>: </label>
        <select
          name="defaultMinutesTo"
          className="select"
          onChange={handleDefaultTimeSettings}
          defaultValue={formatTime(defaultTime.defaultMinutesTo)}
        >
          <option value="">---</option>
          {minutes.map((m, index) => (
            <option
              // selected={index === defaultTime.defaultMinutesTo}
              key={index}
              value={m}
            >
              {m}
            </option>
          ))}
        </select>
      </div>
      {weekdays.map((d, weekdayIndex) => (
        <div key={weekdayIndex} className="d-sm-flex my-3">
          <div className="form-check">
            <input
              onChange={(e) => addDay(e, weekdayIndex)}
              className="form-check-input"
              type="checkbox"
              value={days[weekdayIndex].enabled}
              checked={days[weekdayIndex].enabled}
              name={"enabled"}
            />

            <label
              className="form-check-label day-label"
              htmlFor="flexCheckDefault"
            >
              {d}
            </label>
          </div>
          <div>
            <label>Desde </label>
            <select
              disabled={!days[weekdayIndex].enabled}
              name="hoursFrom"
              className="select"
              onChange={(e) => addDay(e, weekdayIndex)}
              defaultValue={formatTime(days[weekdayIndex].hoursFrom)}
            >
              <option value="">---</option>
              {hours.map((h, index) => (
                <option
                  // selected={index === days[weekdayIndex].hoursFrom}
                  key={index}
                  value={h}
                >
                  {h}
                </option>
              ))}
            </select>
            <label>: </label>
            <select
              disabled={!days[weekdayIndex].enabled}
              name="minutesFrom"
              className="select"
              onChange={(e) => addDay(e, weekdayIndex)}
              defaultValue={formatTime(days[weekdayIndex].minutesFrom)}
            >
              <option value="">---</option>
              {minutes.map((m, index) => (
                <option
                  // selected={index === days[weekdayIndex].minutesFrom}
                  key={index}
                  value={m}
                >
                  {m}
                </option>
              ))}
            </select>
            <label>Hasta </label>
            <select
              disabled={!days[weekdayIndex].enabled}
              name="hoursTo"
              className="select"
              onChange={(e) => addDay(e, weekdayIndex)}
              defaultValue={formatTime(days[weekdayIndex].hoursTo)}
            >
              <option value="">---</option>
              {hours.map((h, index) => (
                <option
                  // selected={index === days[weekdayIndex].hoursTo}
                  key={index}
                  value={h}
                >
                  {h}
                </option>
              ))}
            </select>
            <label>: </label>
            <select
              disabled={!days[weekdayIndex].enabled}
              name="minutesTo"
              className="select"
              onChange={(e) => addDay(e, weekdayIndex)}
              defaultValue={formatTime(days[weekdayIndex].minutesTo)}
            >
              <option value="">---</option>
              {minutes.map((m, index) => (
                <option
                  // selected={index === days[weekdayIndex].minutesTo}
                  key={index}
                  value={m}
                >
                  {m}
                </option>
              ))}
            </select>
          </div>
        </div>
      ))}

      <h5 className="ms-2 mt-4">Opciones avanzadas</h5>

      <p className="p">
        Dejar un intervalo de tiempo entre las actividades de un grupo de:{" "}
      </p>
      <div className="">
        <label className="my-2" htmlFor="hours">
          Horas
        </label>
        <input
          className="short-form-input ps-1"
          type="number"
          id="hours"
          name="hours"
          value={timeBetween.hours}
          onChange={handleTimeBetween}
        />
        <label className="my-2" htmlFor="hours">
          Minutos
        </label>
        <input
          className="short-form-input ps-1"
          type="number"
          id="minutes"
          name="minutes"
          value={timeBetween.minutes}
          onChange={handleTimeBetween}
        />
      </div>

      {/*
      <div className="form-check">
        <input
          className="form-check-input"
          type="checkbox"
          id="continueActivityNextWeek"
          name="continueActivityNextWeek"
          value={continueActivityMode.continueActivityNextWeek}
          checked={continueActivityMode.continueActivityNextWeek}
          onChange={handleContinueActivityMode}
        />
        <label className="form-check-label" htmlFor="continueActivityNextWeek">
          Permitir que si las actividades no entran en una semana se las pase a
          la siguiente semana.{" "}
        </label>
      </div>
      */}
      <div>
        <small className="text-danger">
          {errorFlag && errorType === "days" && errorMsg}
        </small>
      </div>

      <button
        className="btn btn-success btn-sm mt-3 ms-5"
        onClick={(e) => checkInput(e, "days")}
      >
        Crear calendario
      </button>
    </form>
  );
};

export default SchedulerDays;
