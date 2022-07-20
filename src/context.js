import { createContext, useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

//https://big-scheduler.herokuapp.com/

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
  const [errorMsg, setErrorMsg] = useState(false);
  const [errorFlag, setErrorFlag] = useState(false);
  const [errorType, setErrorType] = useState(false);
  const [signupFlag, setSignupFlag] = useState(false);
  const [groups, setGroups] = useState([]);
  const [activities, setActivities] = useState([]);
  const [days, setDays] = useState([]);
  const [group, setGroup] = useState("");
  const [activity, setActivity] = useState({
    name: "",
    hours: 0,
    minutes: 0,
  });
  const [defaultActivitySettings, setDefaultActivitySettings] = useState({
    hours: 0,
    minutes: 0,
  });
  const [defaultTime, setDefaultTime] = useState({
    defaultHoursFrom: "00",
    defaultMinutesFrom: "00",
    defaultHoursTo: "00",
    defaultMinutesTo: "00",
  });

  const showError = (msg, type) => {
    setErrorMsg(msg);
    setErrorFlag(true);
    setErrorType(type);
    setTimeout(() => {
      setErrorFlag(false);
    }, 3000);
  };
  const checkInput = (e, input) => {
    e.preventDefault();
    switch (input) {
      case "group":
        if (group === "") {
          showError("Ingrese un nombre de grupo.", input);
        } else if (groups.find((g) => g === group)) {
          showError("El grupo ya existe.", input);
        } else {
          addGroup();
        }
        break;
      case "activity":
        if (activity.name === "") {
          showError("Ingrese un nombre para la actividad.", input);
        } else if (activities.find((a) => a.name === activity.name)) {
          showError("La actividad ya existe.", input);
        } else if (activity.hours === 0 && activity.minutes === 0) {
          showError("Ingrese el tiempo que la actividad requiere.", input);
        } else {
          addActivity();
        }
        break;
      case "days":
        if (!days.filter((d) => d.name !== undefined).length) {
          showError("No se han seleccionado días.", input);
        } else {
          createSchedule();
        }
        break;
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => {
      return {
        ...prevUser,
        [name]: value,
      };
    });
  };

  const handleDefaultActivitySettings = (e) => {
    let { name, value } = e.target;
    if (value === "") {
      value = 0;
    } else {
      value = parseInt(value);
    }
    if (name === "minutes" && value > 59) {
      value = 59;
    }
    setDefaultActivitySettings((prevDefaultActivitySettings) => {
      return {
        ...prevDefaultActivitySettings,
        [name]: value,
      };
    });
    setActivity((prevActivity) => {
      return {
        ...prevActivity,
        [name]: value,
      };
    });
  };

  const handleDefaultTimeSettings = (e) => {
    const { name, value } = e.target;
    setDefaultTime((prevDefaultTime) => {
      return {
        ...prevDefaultTime,
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

  const signUp = (e) => {
    e.preventDefault();
    if (
      user.repeatPassword === "" ||
      user.username === "" ||
      user.password === "" ||
      user.email === ""
    ) {
      showError("Por favor completar todos los campos.", "login");
    } else if (!user.email.includes("@")) {
      showError("El email debe contener @.", "login");
    } else if (user.password !== user.repeatPassword) {
      showError("Las contraseñas no coinciden.", "login");
    } else {
      axios.post("signup", user).then((res) => {
        if (res.data.msg === "email in use") {
          showError("El email ingresado se encuentra en uso.", "login");
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
      showError("Por favor completar todos los campos.", "login");
    } else {
      axios.post(`login`, user).then((res) => {
        if (res.data.msg === "user not found") {
          showError("El usuario no existe.", "login");
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

  const toggleSignupFlag = () => {
    setSignupFlag(!signupFlag);
  };

  const handleGroup = (e) => {
    const { value } = e.target;
    setGroup(value);
  };

  const handleActivity = (e) => {
    let { name, value } = e.target;
    if ((name === "minutes" || name === "hours") && value !== "") {
      value = parseInt(value);
    }
    if ((name === "minutes" || name === "hours") && value === "") {
      value = 0;
    }
    if (name === "minutes" && value > 59) {
      value = 59;
    }

    setActivity((prevActivty) => {
      return {
        ...prevActivty,
        [name]: value,
      };
    });
  };

  const addGroup = () => {
    setGroups((prevGroups) => {
      return [...prevGroups, group];
    });
    setGroup("");
  };
  const addActivity = () => {
    setActivities((prevActivities) => {
      return [...prevActivities, activity];
    });
    setActivity({
      name: "",
      hours: defaultActivitySettings.hours,
      minutes: defaultActivitySettings.minutes,
    });
  };

  const addDay = (e, index) => {
    // e.preventDefault();
    let { name, value } = e.target;
    setDays((prevDays) => {
      if (prevDays.find((d) => d.index === index)) {
        const prev = prevDays.map((d) => {
          if (d.index === index) {
            return { ...d, [name]: value };
          } else {
            return d;
          }
        });

        return [...prev];
      } else {
        return [...prevDays, { [name]: value, index }];
      }
    });
  };

  const createSchedule = (e) => {
    e.preventDefault();
    const chosenDays = days
      .filter((d) => {
        return d.name !== undefined;
      })
      .map((d) => {
        d.minutesFrom = d.minutesFrom || defaultTime.defaultMinutesFrom;
        d.hoursFrom = d.hoursFrom || defaultTime.defaultHoursFrom;
        d.minutesTo = d.minutesTo || defaultTime.defaultMinutesTo;
        d.hoursTo = d.hoursTo || defaultTime.defaultHoursTo;
        return d;
      });
  };
  // console.log("group", group);
  // console.log("activity", activity);
  // console.log("groups:", groups);
  // console.log("activities", activities);
  // console.log("days", days);
  // console.log("defTime", defaultTime);
  // console.log("defActSet", defaultActivitySettings);

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
        addGroup,
        addActivity,
        addDay,
        groups,
        days,
        activities,
        handleActivity,
        handleGroup,
        group,
        activity,
        handleDefaultTimeSettings,
        handleDefaultActivitySettings,
        defaultActivitySettings,
        createSchedule,
        errorFlag,
        errorMsg,
        errorType,
        checkInput,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
