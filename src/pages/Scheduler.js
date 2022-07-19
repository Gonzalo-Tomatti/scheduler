import React, { useContext } from "react";
import { GlobalContext } from "../context";

const Scheduler = () => {
  const { logOut } = useContext(GlobalContext);
  return (
    <div>
      <button onClick={logOut} className="btn btn-success">
        Cerrar sesión
      </button>
    </div>
  );
};

export default Scheduler;
