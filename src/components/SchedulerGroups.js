import React, { useContext } from "react";
import { GlobalContext } from "../context";

const SchedulerGroups = () => {
  const {
    groups,
    group,
    handleGroup,
    errorFlag,
    errorMsg,
    errorType,
    checkInput,
  } = useContext(GlobalContext);
  return (
    <div>
      <form>
        <h4>Grupos</h4>
        <label className="my-2" htmlFor="group">
          Nombre
        </label>
        <input
          className="form-input ps-1"
          onChange={handleGroup}
          name="group"
          id="group"
          type="text"
          value={group}
          autoFocus
        />
        <button onClick={(e) => checkInput(e, "group")}>Añadir</button>
        <small>{errorFlag && errorType === "group" && errorMsg}</small>
      </form>
      <ul>
        {groups.map((g, index) => (
          <li key={index}>{g}</li>
        ))}
      </ul>
    </div>
  );
};

export default SchedulerGroups;
