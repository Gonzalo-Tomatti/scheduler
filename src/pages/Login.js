import React, { useContext, useState } from "react";
import { GlobalContext } from "../context";

const Login = () => {
  const {
    handleChange,
    user,
    toggleSignupFlag,
    logIn,
    signUp,
    errorFlag,
    errorMsg,
    signupFlag,
  } = useContext(GlobalContext);

  return (
    <div className="section bg-dark d-flex justify-content-center">
      <form className="d-flex flex-column align-items-center justify-content-center bg-dark text-light p-3 form">
        {signupFlag && (
          <div className="form-group m-2 d-flex flex-column">
            <label className="my-2" htmlFor="username">
              Nombre de usuario
            </label>
            <input
              className="form-input ps-1"
              onChange={handleChange}
              name="username"
              id="username"
              type="username"
              value={user.username}
              autoFocus
              //autoComplete="off"
            />
          </div>
        )}
        <div className="form-group m-2 d-flex flex-column">
          <label className="my-2" htmlFor="email">
            Email
          </label>
          <input
            className="form-input ps-1"
            onChange={handleChange}
            name="email"
            id="email"
            type="email"
            value={user.email}
            autoFocus
            //autoComplete="off"
          />
        </div>
        <div className="form-group m-2 d-flex flex-column">
          <label className="my-2" htmlFor="password">
            Contraseña
          </label>
          <input
            className="form-input ps-1"
            onChange={handleChange}
            name="password"
            id="password"
            type="password"
            value={user.password}
            //autoComplete="off"
          />
        </div>
        {signupFlag && (
          <div className="form-group m-2 d-flex flex-column">
            <label className="my-2" htmlFor="repeatPassword">
              Repetir contraseña
            </label>
            <input
              className="form-input ps-1"
              onChange={handleChange}
              name="repeatPassword"
              id="repeatPassword"
              type="password"
              value={user.repeatPassword}
              //autoComplete="off"
            />
          </div>
        )}

        {signupFlag ? (
          <button onClick={signUp} className="btn btn-success ms-2 my-3">
            Crear cuenta
          </button>
        ) : (
          <button onClick={logIn} className="btn btn-success ms-2 my-3">
            Iniciar sesión
          </button>
        )}
        <p className="text-danger">{errorFlag && errorMsg}</p>
        <small onClick={toggleSignupFlag} className="login-question">
          {signupFlag
            ? "¿Ya tienes una cuenta? Inicia sesión."
            : "¿No tienes una cuenta? Regístrate."}
        </small>
      </form>
    </div>
  );
};

export default Login;
