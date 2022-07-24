import React, { useContext } from "react";
import { GlobalContext } from "../context";
import { FaTrashAlt } from "react-icons/fa";
import { FaRegEdit } from "react-icons/fa";

const SchedulerGroups = () => {
  const {
    groups,
    group,
    handleGroup,
    errorFlag,
    errorMsg,
    errorType,
    checkInput,
    editGroup,
    deleteGroup,
    editGroupFlag,
  } = useContext(GlobalContext);
  return (
    <div>
      <form>
        <h5 className="ms-2">Grupos/Personas</h5>
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
        {editGroupFlag ? (
          <button
            className="btn btn-success btn-sm"
            onClick={(e) => checkInput(e, "editGroup")}
          >
            Editar
          </button>
        ) : (
          <button
            className="btn btn-success btn-sm"
            onClick={(e) => checkInput(e, "group")}
          >
            Añadir
          </button>
        )}
        <div>
          <small className="text-danger">
            {errorFlag &&
              (errorType === "group" || errorType === "editGroup") &&
              errorMsg}
          </small>
        </div>
      </form>
      <ul className="text-break">
        {groups.map((g, index) => (
          <li key={index} className="d-flex li">
            {g}
            <div className="btn-container ms-auto">
              {/*edit Group*/}

              <FaRegEdit
                className="mx-2 edit-trash"
                onClick={() => editGroup(g, index)}
              />
              {/*delete Group*/}

              <FaTrashAlt
                className="mx-2 edit-trash"
                onClick={() => deleteGroup(g)}
              />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SchedulerGroups;
