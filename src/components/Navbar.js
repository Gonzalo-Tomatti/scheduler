import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { GlobalContext } from "../context";

const Navbar = () => {
  const { logOut } = useContext(GlobalContext);
  return (
    <nav className="navbar navbar-expand-md py-3">
      <div className="container">
        <NavLink className={"navbar-brand"} to="/scheduler">
          Scheduler
        </NavLink>
        <button
          className="navbar-toggler"
          data-bs-toggle="collapse"
          data-bs-target="#nav-links"
        >
          <i className="bi bi-menu-button-wide"></i>
        </button>
        <div className="collapse navbar-collapse" id="nav-links">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <NavLink className={"navlink"} to="/scheduler">
                Inicio
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className={"navlink"} to="/horarios">
                Mis Horarios
              </NavLink>
            </li>
            <li onClick={logOut} className="nav-item navlink">
              Cerrar sesión
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
