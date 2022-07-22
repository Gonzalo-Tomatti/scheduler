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
      <h4>Días</h4>
      <span>Horario para días con horarios no especificados: </span>
      <label>De </label>
      <select
        name="defaultHoursFrom"
        className=""
        onChange={handleDefaultTimeSettings}
      >
        <option value="">-----</option>
        {hours.map((h, index) => (
          <option key={index} value={h}>
            {h}
          </option>
        ))}
      </select>
      <label>: </label>
      <select
        name="defaultMinutesFrom"
        className=""
        onChange={handleDefaultTimeSettings}
      >
        <option value="">-----</option>
        {minutes.map((m, index) => (
          <option key={index} value={m}>
            {m}
          </option>
        ))}
      </select>
      <label>A </label>
      <select
        name="defaultHoursTo"
        className=""
        onChange={handleDefaultTimeSettings}
      >
        <option value="">-----</option>
        {hours.map((h, index) => (
          <option key={index} value={h}>
            {h}
          </option>
        ))}
      </select>
      <label>: </label>
      <select
        name="defaultMinutesTo"
        className=""
        onChange={handleDefaultTimeSettings}
      >
        <option value="">-----</option>
        {minutes.map((m, index) => (
          <option key={index} value={m}>
            {m}
          </option>
        ))}
      </select>
      {weekdays.map((d, index) => (
        <div key={index} className="form-check">
          <input
            onChange={(e) => addDay(e, index)}
            className="form-check-input"
            type="checkbox"
            value={d}
            name={"name"}
          />
          <label className="form-check-label" htmlFor="flexCheckDefault">
            {d}
          </label>
          <label>De </label>
          <select
            name="hoursFrom"
            className=""
            onChange={(e) => addDay(e, index)}
          >
            <option value="">-----</option>
            {hours.map((h, index) => (
              <option key={index} value={h}>
                {h}
              </option>
            ))}
          </select>
          <label>: </label>
          <select
            name="minutesFrom"
            className=""
            onChange={(e) => addDay(e, index)}
          >
            <option value="">-----</option>
            {minutes.map((m, index) => (
              <option key={index} value={m}>
                {m}
              </option>
            ))}
          </select>
          <label>A </label>
          <select
            name="hoursTo"
            className=""
            onChange={(e) => addDay(e, index)}
          >
            <option value="">-----</option>
            {hours.map((h, index) => (
              <option key={index} value={h}>
                {h}
              </option>
            ))}
          </select>
          <label>: </label>
          <select
            name="minutesTo"
            className=""
            onChange={(e) => addDay(e, index)}
          >
            <option value="">-----</option>
            {minutes.map((m, index) => (
              <option key={index} value={m}>
                {m}
              </option>
            ))}
          </select>
        </div>
      ))}

      <input
        type="checkbox"
        id="continueActivityNextDay"
        name="continueActivityNextDay"
        value={continueActivityMode.continueActivityNextDay}
        onChange={handleContinueActivityMode}
      />
      <label htmlFor="continueActivityNextDay">
        Permitir que las actividades puedan empezar un día y terminarse al
        siguiente{" "}
      </label>
      <input
        type="checkbox"
        id="continueActivityNextWeek"
        name="continueActivityNextWeek"
        value={continueActivityMode.continueActivityNextWeek}
        onChange={handleContinueActivityMode}
      />
      <label htmlFor="continueActivityNextWeek">
        Permitir que si las actividades no entran en una semana se las pase a la
        siguiente semana{" "}
      </label>

      <small>{errorFlag && errorType === "days" && errorMsg}</small>
      <button onClick={(e) => checkInput(e, "days")}>Crear calendario</button>
    </form>
  );
};

export default SchedulerDays;
