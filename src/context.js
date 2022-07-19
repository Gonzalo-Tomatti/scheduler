import { createContext, useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

let storedToken;
window.addEventListener("DOMContentLoaded", () => {
  storedToken = JSON.parse(localStorage.getItem("schedulerToken")) || "";
});

export const GlobalContext = createContext();
export const GlobalProvider = ({ children }) => {
  const [token, setToken] = useState(storedToken);
  // AXIOS GLOBALS
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

  const navigate = useNavigate();
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
    repeatPassword: "",
  });
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [errorFlag, setErrorFlag] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [signupFlag, setSignupFlag] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => {
      return {
        ...prevUser,
        [name]: value,
      };
    });
  };

  // when you refresh the website, if there's a user set in local storage then you set loggedIn to true
  useEffect(() => {
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  //when you log in save the token in local storage, when you close session remove token from local storage
  useEffect(() => {
    if (isLoggedIn) {
      localStorage.setItem("schedulerToken", JSON.stringify(token));
    } else {
      localStorage.removeItem("schedulerToken");
    }
  }, [isLoggedIn]);
  console.log(token);

  const signUp = (e) => {
    e.preventDefault();
    if (
      user.repeatPassword === "" ||
      user.username === "" ||
      user.password === "" ||
      user.email === ""
    ) {
      showError("Por favor completar todos los campos.");
    } else if (user.password !== user.repeatPassword) {
      showError("Las contraseñas no coinciden.");
    } else {
      axios.post("signup", user).then((res) => {
        if (res.data.msg === "email in use") {
          showError("El email ingresado se encuentra en uso.");
        } else {
          setToken(res.data.token);
          setIsLoggedIn(true);
          toggleSignupFlag();
          navigate("/scheduler");
        }
      });
    }
  };

  const logIn = (e) => {
    e.preventDefault();
    if (user.email === "" || user.password === "") {
      showError("Por favor completar todos los campos.");
    } else {
      axios.post(`login`, user).then((res) => {
        if (res.data.msg === "user not found") {
          showError("El usuario no existe.");
        } else {
          setToken(res.data.token);
          setIsLoggedIn(true);
          navigate("/scheduler");
        }
      });
    }
  };

  const logOut = () => {
    setIsLoggedIn(false);
    setUser({
      username: "",
      password: "",
      email: "",
      repeatPassword: "",
    });
    navigate("/");
  };

  const showError = (msg) => {
    setErrorMsg(msg);
    setErrorFlag(true);
    setTimeout(() => {
      setErrorFlag(false);
    }, 3000);
  };

  const toggleSignupFlag = () => {
    setSignupFlag(!signupFlag);
  };

  return (
    <GlobalContext.Provider
      value={{
        handleChange,
        user,
        logIn,
        signUp,
        errorFlag,
        errorMsg,
        toggleSignupFlag,
        signupFlag,
        logOut,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
