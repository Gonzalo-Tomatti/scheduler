import React from "react";
import Navbar from "../components/Navbar";

const NotFound = () => {
  return (
    <div className=" text-center section">
      <Navbar />

      <p className="error404 pt-5">404</p>
      <p className="fs-1">La página buscada no existe.</p>
    </div>
  );
};

export default NotFound;
