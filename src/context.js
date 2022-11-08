import { createContext, useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

//https://scheduler-84ui.onrender.com/

let storedToken,
  storedSchedule,
  storedActivities,
  storedDays,
  storedGroups,
  storedContinueSettings,
  storedTimeBetween,
  storedDefaultSettings;
window.addEventListener("DOMContentLoaded", () => {
  storedToken = JSON.parse(localStorage.getItem("schedulerToken")) || "";
  storedDefaultSettings = JSON.parse(
    localStorage.getItem("storedDefaultSettings")
  ) || {
    defaultActivity: {
      hours: 0,
      minutes: 0,
    },
    defaultDays: {
      defaultHoursFrom: 0,
      defaultMinutesFrom: 0,
      defaultHoursTo: 0,
      defaultMinutesTo: 0,
    },
  };
  storedTimeBetween = JSON.parse(localStorage.getItem("storedTimeBetween")) || {
    hours: 0,
    minutes: 0,
  };
  storedSchedule = JSON.parse(localStorage.getItem("lastSchedule")) || [];
  storedActivities = JSON.parse(localStorage.getItem("lastActivities")) || [];
  storedContinueSettings = JSON.parse(
    localStorage.getItem("StoredContinueSettings")
  ) || {
    continueActivityNextWeek: false,
    continueActivityNextDay: false,
  };
  storedGroups = JSON.parse(localStorage.getItem("lastGroups")) || [];
  storedDays = JSON.parse(localStorage.getItem("lastDays")) || [
    {
      name: "lunes",
      enabled: false,
      hoursTo: 0,
      hoursFrom: 0,
      minutesTo: 0,
      minutesFrom: 0,
    },
    {
      name: "martes",
      enabled: false,
      hoursTo: 0,
      hoursFrom: 0,
      minutesTo: 0,
      minutesFrom: 0,
    },
    {
      name: "miércoles",
      enabled: false,
      hoursTo: 0,
      hoursFrom: 0,
      minutesTo: 0,
      minutesFrom: 0,
    },
    {
      name: "jueves",
      enabled: false,
      hoursTo: 0,
      hoursFrom: 0,
      minutesTo: 0,
      minutesFrom: 0,
    },
    {
      name: "viernes",
      enabled: false,
      hoursTo: 0,
      hoursFrom: 0,
      minutesTo: 0,
      minutesFrom: 0,
    },
    {
      name: "sábado",
      enabled: false,
      hoursTo: 0,
      hoursFrom: 0,
      minutesTo: 0,
      minutesFrom: 0,
    },
    {
      name: "domingo",
      enabled: false,
      hoursTo: 0,
      hoursFrom: 0,
      minutesTo: 0,
      minutesFrom: 0,
    },
  ];
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
  const [groups, setGroups] = useState(storedGroups);
  const [activities, setActivities] = useState(storedActivities);
  const [days, setDays] = useState(storedDays);
  const [group, setGroup] = useState("");
  const [activity, setActivity] = useState({
    name: "",
    hours: 0,
    minutes: 0,
  });
  const [defaultActivitySettings, setDefaultActivitySettings] = useState(
    storedDefaultSettings.defaultActivity
  );
  const [defaultTime, setDefaultTime] = useState(
    storedDefaultSettings.defaultDays
  );
  const [continueActivityMode, setContinueActivityMode] = useState(
    storedContinueSettings
  );
  const [schedule, setSchedule] = useState(storedSchedule);
  const [editGroupFlag, setEditGroupFlag] = useState(false);
  const [editActivityFlag, setEditActivityFlag] = useState(false);
  const [editGroupIndex, setEditGroupIndex] = useState();
  const [editActivityIndex, setEditActivityIndex] = useState();
  const [scheduleName, setScheduleName] = useState("");
  const [timeBetween, setTimeBetween] = useState(storedTimeBetween);

  const clearFields = () => {
    setSchedule([]);
    setActivities([]);
    setDays([
      {
        name: "lunes",
        enabled: false,
        hoursTo: 0,
        hoursFrom: 0,
        minutesTo: 0,
        minutesFrom: 0,
      },
      {
        name: "martes",
        enabled: false,
        hoursTo: 0,
        hoursFrom: 0,
        minutesTo: 0,
        minutesFrom: 0,
      },
      {
        name: "miércoles",
        enabled: false,
        hoursTo: 0,
        hoursFrom: 0,
        minutesTo: 0,
        minutesFrom: 0,
      },
      {
        name: "jueves",
        enabled: false,
        hoursTo: 0,
        hoursFrom: 0,
        minutesTo: 0,
        minutesFrom: 0,
      },
      {
        name: "viernes",
        enabled: false,
        hoursTo: 0,
        hoursFrom: 0,
        minutesTo: 0,
        minutesFrom: 0,
      },
      {
        name: "sábado",
        enabled: false,
        hoursTo: 0,
        hoursFrom: 0,
        minutesTo: 0,
        minutesFrom: 0,
      },
      {
        name: "domingo",
        enabled: false,
        hoursTo: 0,
        hoursFrom: 0,
        minutesTo: 0,
        minutesFrom: 0,
      },
    ]);
    setGroups([]);
    setTimeBetween({ hours: 0, minutes: 0 });
    setDefaultActivitySettings({
      hours: 0,
      minutes: 0,
    });
    setDefaultTime({
      defaultHoursFrom: 0,
      defaultMinutesFrom: 0,
      defaultHoursTo: 0,
      defaultMinutesTo: 0,
    });
    setScheduleName("");
    setContinueActivityMode({
      continueActivityNextWeek: false,
      continueActivityNextDay: false,
    });
  };

  const handleTimeBetween = (e) => {
    let { value, name } = e.target;
    if (value === "") {
      value = 0;
    }
    value = parseInt(value);
    if (name === "minutes" && value > 59) {
      value = 59;
    }
    setTimeBetween((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const formatTime = (time) => {
    time = time < 10 ? "0" + time.toString() : time.toString();
    return time;
  };

  const editGroup = (name, index) => {
    setEditGroupFlag(true);
    setGroup(name);
    setEditGroupIndex(index);
  };

  const commitEditGroup = () => {
    setGroups((prev) => {
      const newGroups = prev.map((g, index) => {
        if (index === editGroupIndex) {
          return group;
        } else {
          return g;
        }
      });
      return newGroups;
    });
    setGroup("");
    setEditGroupFlag(false);
    setErrorFlag(false);
  };
  const deleteGroup = (name) => {
    setGroups((prev) => {
      const newGroups = prev.filter((g) => {
        return g !== name;
      });
      return newGroups;
    });
  };

  const editActivity = (act, index) => {
    setEditActivityFlag(true);
    setActivity(act);
    setEditActivityIndex(index);
  };

  const commitEditActivity = () => {
    setActivities((prev) => {
      const newActivities = prev.map((a, index) => {
        if (index === editActivityIndex) {
          return activity;
        } else {
          return a;
        }
      });
      return newActivities;
    });
    setActivity({
      name: "",
      hours: defaultActivitySettings.hours,
      minutes: defaultActivitySettings.minutes,
    });
    setErrorFlag(false);
    setEditActivityFlag(false);
    setErrorFlag(false);
  };

  const deleteActivity = (name) => {
    setActivities((prev) => {
      const newActivities = prev.filter((a) => {
        return a.name !== name;
      });
      return newActivities;
    });
  };
  const handleContinueActivityMode = (e) => {
    const { name, checked } = e.target;
    setContinueActivityMode((prev) => {
      return { ...prev, [name]: checked };
    });
  };

  const showError = (msg, type) => {
    setErrorMsg(msg);
    setErrorFlag(true);
    setErrorType(type);
    let time = 3000;
    if (type === "remainingActivities") {
      time = 10000;
    }
    setTimeout(() => {
      setErrorFlag(false);
    }, time);
  };
  const checkInput = (e, input) => {
    e.preventDefault();
    switch (input) {
      case "group":
      case "editGroup":
        if (group === "") {
          showError("Ingrese un nombre de grupo.", input);
        } else if (
          groups.find((g, index) => g === group && index !== editGroupIndex)
        ) {
          showError("El grupo ya existe.", input);
        } else {
          if (input === "group") {
            addGroup();
          } else if (input === "editGroup") {
            commitEditGroup();
          }
        }
        break;

      case "saveSchedule":
        if (scheduleName === "") {
          showError("Ingrese un nombre para guardar los horarios.", input);
        }
        // else if (
        //   groups.find((g, index) => g === group && index !== editGroupIndex)
        // ) {
        //   showError("El grupo ya existe.", input);
        // }
        else {
          postSchedule();
        }

        break;

      case "activity":
      case "editActivity":
        if (activity.name === "") {
          showError("Ingrese un nombre para la actividad.", input);
        } else if (
          activities.find(
            (a, index) =>
              a.name === activity.name && index !== editActivityIndex
          )
        ) {
          showError("La actividad ya existe.", input);
        } else if (activity.hours === 0 && activity.minutes === 0) {
          showError("Ingrese el tiempo que la actividad requiere.", input);
        } else if (input === "activity") {
          addActivity();
        } else {
          commitEditActivity();
        }
        break;

      case "days":
        if (!groups.length) {
          showError("No se han ingresado grupos.", input);
        } else if (!activities.length) {
          showError("No se han ingresado actividades.", input);
        } else if (!days.filter((d) => d.enabled).length) {
          showError("No se han seleccionado días.", input);
        } else {
          createSchedule();
        }
        break;
    }
  };

  //login form
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => {
      return {
        ...prevUser,
        [name]: value,
      };
    });
  };

  const handleScheduleName = (e) => {
    const { value } = e.target;
    setScheduleName(value);
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
    let { name, value } = e.target;
    value = parseInt(value);

    setDefaultTime((prevDefaultTime) => {
      return {
        ...prevDefaultTime,
        [name]: value,
      };
    });
  };

  // cuando refrescás la página, si hay un token en local storage seteas loggedIn a true
  useEffect(() => {
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  // cuando refrescás la página, si hay un schedule guardado en local storage lo recuperás
  useEffect(() => {
    if (isLoggedIn) {
      localStorage.setItem("lastSchedule", JSON.stringify(schedule));
      localStorage.setItem("lastDays", JSON.stringify(days));
      localStorage.setItem("lastGroups", JSON.stringify(groups));
      localStorage.setItem("lastActivities", JSON.stringify(activities));
      localStorage.setItem(
        "storedDefaultSettings",
        JSON.stringify({
          defaultActivity: defaultActivitySettings,
          defaultDays: defaultTime,
        })
      );
      localStorage.setItem("storedTimeBetween", JSON.stringify(timeBetween));
      localStorage.setItem(
        "StoredContinueSettings",
        JSON.stringify(continueActivityMode)
      );
    }
  }, [
    schedule,
    days,
    groups,
    activities,
    isLoggedIn,
    continueActivityMode,
    timeBetween,
    defaultActivitySettings,
    defaultTime,
  ]);

  //cuando te logeás, se guarda el token en local storage. Cuando cerrás sesión se borra el token y demás variables de local storage
  useEffect(() => {
    if (isLoggedIn) {
      localStorage.setItem("schedulerToken", JSON.stringify(token));
    } else {
      localStorage.removeItem("schedulerToken");
      localStorage.removeItem("lastSchedule");
      localStorage.removeItem("lastGroups");
      localStorage.removeItem("lastActivities");
      localStorage.removeItem("lastDays");
      localStorage.removeItem("StoredContinueSettings");
      localStorage.removeItem("storedTimeBetween");
      localStorage.removeItem("storedDefaultSettings");
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
      axios
        .post("https://scheduler-84ui.onrender.com/signup", user)
        .then((res) => {
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
      axios
        .post(`https://scheduler-84ui.onrender.com/login`, user)
        .then((res) => {
          if (res.data.msg === "user not found") {
            showError("Usuario o contraseña incorrectos.", "login");
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
    clearFields();
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
    setErrorFlag(false);
  };
  const addActivity = () => {
    const duration = activity.hours * 60 + activity.minutes;
    const act = {
      name: activity.name,
      duration,
      hours: activity.hours,
      minutes: activity.minutes,
    };
    setActivities((prevActivities) => {
      const orderedActivities = prevActivities.sort((a, b) => {
        if (a.duration < b.duration) {
          return 1;
        } else {
          return -1;
        }
      });
      return [...orderedActivities, act];
    });
    setActivity({
      name: "",
      hours: defaultActivitySettings.hours,
      minutes: defaultActivitySettings.minutes,
    });
    setErrorFlag(false);
  };

  const addDay = (e, index) => {
    // e.preventDefault();
    let { name, value, checked, type } = e.target;
    if (name !== "enabled") {
      value = parseInt(value);
    }
    setDays((prevDays) => {
      //si hay algún objeto guardado con el mismo índice que el nuevo valor, se guarda el valor en ese mismo objeto
      const prev = prevDays.map((d, i) => {
        if (i === index) {
          return { ...d, [name]: type === "checkbox" ? checked : value };
        } else {
          return d;
        }
      });

      return [...prev];
    });
  };

  const getChosenDays = () => {
    const chosen = days
      //se sacan los objetos que no tengan día
      .filter((d) => {
        return d.enabled;
      })
      //se llenan los campos faltantes con el default
      .map((d) => {
        d.minutesFrom = d.minutesFrom || defaultTime.defaultMinutesFrom;
        d.hoursFrom = d.hoursFrom || defaultTime.defaultHoursFrom;
        d.minutesTo = d.minutesTo || defaultTime.defaultMinutesTo;
        d.hoursTo = d.hoursTo || defaultTime.defaultHoursTo;
        return d;
      });
    return chosen;
  };

  //ver si la actividad entra en el tiempo restante del día
  const checkIfActivityFitsInDay = (d, hoursTo, minutesTo) => {
    //ver si la hora se pasa de la hora a la que termina el día
    if (hoursTo > d.hoursTo) {
      //no entra
      return false;
    }
    //si termina a la misma hora que se acaba el día, ver si los minutos se pasan
    else if (hoursTo === d.hoursTo) {
      if (minutesTo > d.minutesTo) {
        //no entra
        return false;
      } else {
        //entra
        return true;
      }
    } else {
      //entra
      return true;
    }
  };

  const changeActivityTime = (
    hoursFrom,
    minutesFrom,
    hoursTo,
    minutesTo,
    comparingActivity,
    a
  ) => {
    hoursFrom = comparingActivity.hoursTo;
    minutesFrom = comparingActivity.minutesTo;
    minutesTo = comparingActivity.minutesTo + a.minutes;
    let extraHours = 0;
    if (minutesTo > 59) {
      extraHours = Math.trunc(minutesTo / 60);
      minutesTo = minutesTo % 60;
    }
    hoursTo = comparingActivity.hoursTo + a.hours + extraHours;
    return [hoursFrom, minutesFrom, hoursTo, minutesTo];
  };

  //ver si las horas de la nueva actividad se superponen con la misma actividad de otro grupo
  const checkOverlap = (
    d,
    a,
    minutesFrom,
    minutesTo,
    hoursFrom,
    hoursTo,
    returnNothing,
    otherGroupsActivities
  ) => {
    otherGroupsActivities.forEach((other) => {
      if (other.hoursTo > hoursFrom && hoursTo > other.hoursFrom) {
        //se superponen. Cambiar el horario de inicio de la nueva actividad a la hora en la que termina la actividad con la que se superpone
        [hoursFrom, minutesFrom, hoursTo, minutesTo] = changeActivityTime(
          hoursFrom,
          minutesFrom,
          hoursTo,
          minutesTo,
          other,
          a
        );

        console.log(
          `horario: horas ${hoursFrom}, minutos ${minutesFrom}, a horas ${hoursTo}, minutos ${minutesTo})} `
        );

        if (!checkIfActivityFitsInDay(d, hoursTo, minutesTo)) {
          console.log("no devuelve nada");
          returnNothing = true;
        }
      }
      //si termina a la misma hora que empieza la actividad del otro grupo o empieza a la misma hora que termina el otro, ver si los minutos se superponen
      else if (
        other.hoursTo - hoursFrom === 0 ||
        hoursTo - other.hoursFrom === 0
      ) {
        if (other.minutesTo > minutesFrom && minutesTo > other.minutesFrom) {
          //se superponen.
          [hoursFrom, minutesFrom, hoursTo, minutesTo] = changeActivityTime(
            hoursFrom,
            minutesFrom,
            hoursTo,
            minutesTo,
            other,
            a
          );

          console.log(
            `horario: horas ${hoursFrom}, minutos ${minutesFrom}, a horas ${hoursTo}, minutos ${minutesTo})} `
          );

          if (!checkIfActivityFitsInDay(d, hoursTo, minutesTo)) {
            console.log("no devuelve nada");
            returnNothing = true;
          }
        }

        if (
          (other.hoursTo > hoursFrom &&
            other.minutesTo <= minutesFrom &&
            minutesTo > other.minutesFrom) ||
          (hoursTo > other.hoursFrom &&
            minutesTo <= other.minutesFrom &&
            other.minutesTo > minutesFrom)
        ) {
          console.log("segundo if");
          //se superponen.
          [hoursFrom, minutesFrom, hoursTo, minutesTo] = changeActivityTime(
            hoursFrom,
            minutesFrom,
            hoursTo,
            minutesTo,
            other,
            a
          );

          console.log(
            `horario: horas ${hoursFrom}, minutos ${minutesFrom}, a horas ${hoursTo}, minutos ${minutesTo})} `
          );

          //después de cambiar el horario hay que ver si no se superpone con la misma actividad otro día
          // if (otherGroupsActivities.length > 0) {
          //   [minutesFrom, minutesTo, hoursFrom, hoursTo, returnNothing] =
          //     checkOverlap(
          //       d,
          //       a,
          //       minutesFrom,
          //       minutesTo,
          //       hoursFrom,
          //       hoursTo,
          //       returnNothing,
          //       otherGroupsActivities
          //     );
          // }

          // console.log(
          //   `horario: horas ${hoursFrom}, minutos ${minutesFrom}, a horas ${hoursTo}, minutos ${minutesTo})} `
          // );

          if (!checkIfActivityFitsInDay(d, hoursTo, minutesTo)) {
            console.log("no devuelve nada");
            returnNothing = true;
          }
        }
      }
      console.log(
        "dentro del for each",
        minutesFrom,
        minutesTo,
        hoursFrom,
        hoursTo,
        returnNothing
      );
    });
    console.log(
      "FUERA for each",
      minutesFrom,
      minutesTo,
      hoursFrom,
      hoursTo,
      returnNothing
    );

    return [minutesFrom, minutesTo, hoursFrom, hoursTo, returnNothing];
  };

  const checkWithSameDayActivities = (
    act,
    hoursFrom,
    minutesFrom,
    hoursTo,
    minutesTo,
    returnNothing,
    a,
    d,
    otherGroupsActivities
  ) => {
    //antes de comparar con las actividades del mismo día se compara con la misma actividad de otros grupos (ya que puede pasar que no se superponga con actividades del mismo día)
    if (otherGroupsActivities.length > 0) {
      [minutesFrom, minutesTo, hoursFrom, hoursTo, returnNothing] =
        checkOverlap(
          d,
          a,
          minutesFrom,
          minutesTo,
          hoursFrom,
          hoursTo,
          returnNothing,
          otherGroupsActivities
        );
      console.log("chckea si hay overlap con otro grupo");

      console.log(
        `horario: horas ${hoursFrom}, minutos ${minutesFrom}, a horas ${hoursTo}, minutos ${minutesTo})} `
      );

      if (!checkIfActivityFitsInDay(d, hoursTo, minutesTo)) {
        console.log("no devuelve nada");
        returnNothing = true;
      }
    }

    if (act.length > 0) {
      act.forEach((ac) => {
        //poner el intervalo de tiempo entre actividades antes y después de cada actividad ya asignada
        const acWithIntervals = {};

        acWithIntervals.minutesTo = ac.minutesTo + timeBetween.minutes;
        let extraHours = 0;
        if (acWithIntervals.minutesTo > 59) {
          extraHours = Math.trunc(acWithIntervals.minutesTo / 60);
          acWithIntervals.minutesTo = acWithIntervals.minutesTo % 60;
        }
        acWithIntervals.hoursTo = ac.hoursTo + extraHours + timeBetween.hours;

        acWithIntervals.minutesFrom = ac.minutesFrom - timeBetween.minutes;
        let minusHours = 0;
        if (acWithIntervals.minutesFrom < 0) {
          minusHours = 1;
          acWithIntervals.minutesFrom = 60 + acWithIntervals.minutesFrom;
        }
        acWithIntervals.hoursFrom =
          ac.hoursFrom - minusHours - timeBetween.hours;

        console.log(acWithIntervals, "with inter");
        console.log("pasa por ", ac);
        //ver si las horas de la nueva actividad se superponen con una actividad ya asignada
        if (
          acWithIntervals.hoursTo > hoursFrom &&
          hoursTo > acWithIntervals.hoursFrom
        ) {
          console.log("cambia horas");
          //se superponen. Cambiar el horario de inicio de la nueva actividad a la hora en la que termina la actividad con la que se superpone
          [hoursFrom, minutesFrom, hoursTo, minutesTo] = changeActivityTime(
            hoursFrom,
            minutesFrom,
            hoursTo,
            minutesTo,
            acWithIntervals,
            a
          );

          console.log(
            `horario: horas ${hoursFrom}, minutos ${minutesFrom}, a horas ${hoursTo}, minutos ${minutesTo})} `
          );

          //después de cambiar el horario hay que ver si no se superpone con la misma actividad otro día
          if (otherGroupsActivities.length > 0) {
            [minutesFrom, minutesTo, hoursFrom, hoursTo, returnNothing] =
              checkOverlap(
                d,
                a,
                minutesFrom,
                minutesTo,
                hoursFrom,
                hoursTo,
                returnNothing,
                otherGroupsActivities
              );
          }

          console.log(
            `horario: horas ${hoursFrom}, minutos ${minutesFrom}, a horas ${hoursTo}, minutos ${minutesTo})} `
          );

          if (!checkIfActivityFitsInDay(d, hoursTo, minutesTo)) {
            console.log("no devuelve nada");
            returnNothing = true;
          }
        }
        //si termina a la misma hora que empieza otra actividad o empieza a la misma hora que termina otra actividad ver si los minutos se superponen
        else if (
          acWithIntervals.hoursTo - hoursFrom === 0 ||
          hoursTo - acWithIntervals.hoursFrom === 0
        ) {
          if (
            acWithIntervals.minutesTo > minutesFrom &&
            minutesTo > acWithIntervals.minutesFrom
          ) {
            console.log("cambia minutoss");

            //se superponen.
            [hoursFrom, minutesFrom, hoursTo, minutesTo] = changeActivityTime(
              hoursFrom,
              minutesFrom,
              hoursTo,
              minutesTo,
              acWithIntervals,
              a
            );

            console.log(
              `horario: horas ${hoursFrom}, minutos ${minutesFrom}, a horas ${hoursTo}, minutos ${minutesTo})} `
            );

            //después de cambiar el horario hay que ver si no se superpone con la misma actividad otro día
            if (otherGroupsActivities.length > 0) {
              [minutesFrom, minutesTo, hoursFrom, hoursTo, returnNothing] =
                checkOverlap(
                  d,
                  a,
                  minutesFrom,
                  minutesTo,
                  hoursFrom,
                  hoursTo,
                  returnNothing,
                  otherGroupsActivities
                );
            }

            console.log(
              `horario: horas ${hoursFrom}, minutos ${minutesFrom}, a horas ${hoursTo}, minutos ${minutesTo})} `
            );

            if (!checkIfActivityFitsInDay(d, hoursTo, minutesTo)) {
              console.log("no devuelve nada");
              returnNothing = true;
            }
          }
          if (
            (acWithIntervals.hoursTo > hoursFrom &&
              acWithIntervals.minutesTo <= minutesFrom &&
              minutesTo > acWithIntervals.minutesFrom) ||
            (hoursTo > acWithIntervals.hoursFrom &&
              minutesTo <= acWithIntervals.minutesFrom &&
              acWithIntervals.minutesTo > minutesFrom)
          ) {
            console.log("segundo if");
            //se superponen.
            [hoursFrom, minutesFrom, hoursTo, minutesTo] = changeActivityTime(
              hoursFrom,
              minutesFrom,
              hoursTo,
              minutesTo,
              acWithIntervals,
              a
            );
            console.log(
              `horario: horas ${hoursFrom}, minutos ${minutesFrom}, a horas ${hoursTo}, minutos ${minutesTo})} `
            );

            //después de cambiar el horario hay que ver si no se superpone con la misma actividad otro día
            if (otherGroupsActivities.length > 0) {
              [minutesFrom, minutesTo, hoursFrom, hoursTo, returnNothing] =
                checkOverlap(
                  d,
                  a,
                  minutesFrom,
                  minutesTo,
                  hoursFrom,
                  hoursTo,
                  returnNothing,
                  otherGroupsActivities
                );
            }

            console.log(
              `horario: horas ${hoursFrom}, minutos ${minutesFrom}, a horas ${hoursTo}, minutos ${minutesTo})} `
            );

            if (!checkIfActivityFitsInDay(d, hoursTo, minutesTo)) {
              console.log("no devuelve nada");
              returnNothing = true;
            }
          }
        }
      });
    }
    //si no hay actividades pero hay otro grupo con la misma actividad se ve que no se superponga
    // else if (otherGroupsActivities.length > 0) {
    //   [minutesFrom, minutesTo, hoursFrom, hoursTo, returnNothing] =
    //     checkOverlap(
    //       d,
    //       a,
    //       minutesFrom,
    //       minutesTo,
    //       hoursFrom,
    //       hoursTo,
    //       returnNothing,
    //       otherGroupsActivities
    //     );
    //   console.log("no hay actividades pero");

    //   console.log(
    //     `horario: horas ${hoursFrom}, minutos ${minutesFrom}, a horas ${hoursTo}, minutos ${minutesTo})} `
    //   );

    //   if (!checkIfActivityFitsInDay(d, hoursTo, minutesTo)) {
    //     console.log("no devuelve nada");
    //     returnNothing = true;
    //   }
    // }

    // console.log(hoursFrom, minutesFrom, hoursTo, minutesTo, returnNothing);
    return [hoursFrom, minutesFrom, hoursTo, minutesTo, returnNothing];
  };

  const getSameActivityFromOtherGroup = (sche, d, a) => {
    const otherGroupsActivities = [];
    console.log("sche.length", sche.length);
    //ver si ya hay grupos con horarios
    if (sche.length > 0) {
      console.log("hay grupos");
      sche.forEach((group) => {
        group.days.forEach((currentDay) => {
          //buscar por cada día de cada grupo el mismo día en el que se están asignando actividades ahora
          console.log("día ", currentDay.day);
          if (d.name === currentDay.day) {
            console.log("mismo día ", currentDay.day);
            currentDay.dayActivities.forEach((da) => {
              //ver si en ese día se encuentra la misma actividad que se está asignando ahora
              console.log("actividad ", da.name);
              if (da.name === a.name) {
                console.log("misma actividad ", da.name);
                //si se encuentra la misma actividad, se guarda el horario que tiene
                const hoursFrom = da.hoursFrom;
                const minutesFrom = da.minutesFrom;
                const minutesTo = da.minutesTo;
                const hoursTo = da.hoursTo;
                otherGroupsActivities.push({
                  hoursFrom,
                  minutesFrom,
                  minutesTo,
                  hoursTo,
                });
              }
            });
          }
        });
      });
    }
    return otherGroupsActivities;
  };

  const postSchedule = () => {
    const newSchedule = {
      days,
      activities,
      schedule,
      groups,
      scheduleName,
    };
    axios
      .post("https://scheduler-84ui.onrender.com/post-schedule", newSchedule)
      .then((res) => {
        console.log(res.data);
      });
    clearFields();
  };

  const createSchedule = () => {
    let sche = [];
    //msg en caso de que no entren todas las actividades
    let msg =
      "Se necesita más tiempo en la semana para las siguientes actividades: ";
    const chosenDays = getChosenDays();

    groups.map((g) => {
      console.log(
        "----------------------------------------------------INICIO DE GRUPOOOOOOOOOOOOOOOOOOOOOOOOO--------------"
      );
      //se usa una copia en vez de activities para modificarlo y que vuelva a tener el estado original al principio de cada iteración
      let activitiesCopy = [...activities];

      const groupDays = chosenDays.map((d) => {
        //se van a guardar en act las actividades del día dentro del map de activitiesCopy para checkear si se superponen las actividades en cada iteración
        let act = [];

        //almacena los días con las actividades de cada día
        let dayActivities = activitiesCopy.map((a) => {
          let returnNothing = false;
          console.log("act", act);
          //horario de la nueva actividad
          let hoursFrom = d.hoursFrom;
          let minutesFrom = d.minutesFrom;
          let minutesTo = minutesFrom + a.minutes;
          let extraHours = 0;
          if (minutesFrom + a.minutes > 59) {
            extraHours = Math.trunc(minutesTo / 60);
            minutesTo = (minutesFrom + a.minutes) % 60;
          }
          let hoursTo = hoursFrom + a.hours + extraHours;
          console.log(
            `horario: horas ${hoursFrom}, minutos ${minutesFrom}, a horas ${hoursTo}, minutos ${minutesTo})} `
          );

          if (!checkIfActivityFitsInDay(d, hoursTo, minutesTo)) {
            returnNothing = true;
          }

          //obtener los horarios de la misma actividad en otros grupos
          let otherGroupsActivities = [];
          otherGroupsActivities = getSameActivityFromOtherGroup(sche, d, a);
          console.log("otherGroupsActivities", otherGroupsActivities);

          //ordenar por tiempo de más temprana a más tarde
          otherGroupsActivities = otherGroupsActivities.sort((a, b) => {
            if (a.hoursFrom === b.hoursFrom) {
              if (a.minutesFrom > b.mnutesFrom) {
                return 1;
              } else {
                return -1;
              }
            }
            if (a.hoursFrom > b.hoursFrom) {
              return 1;
            } else {
              return -1;
            }
          });

          //ver si se superpone con actividades ya asignadas el mismo día
          [hoursFrom, minutesFrom, hoursTo, minutesTo, returnNothing] =
            checkWithSameDayActivities(
              act,
              hoursFrom,
              minutesFrom,
              hoursTo,
              minutesTo,
              returnNothing,
              a,
              d,
              otherGroupsActivities
            );

          //si la actividad entra en el día y no se superpone a otra se guarda
          if (!returnNothing) {
            act = [
              ...act,
              {
                name: a.name,
                hoursFrom,
                minutesFrom,
                hoursTo,
                minutesTo,
              },
            ];
            //se ordenan por tiempo de más temprana a más tarde
            act = act.sort((a, b) => {
              if (a.hoursFrom === b.hoursFrom) {
                if (a.minutesFrom > b.minutesFrom) {
                  return 1;
                } else {
                  return -1;
                }
              }
              if (a.hoursFrom > b.hoursFrom) {
                return 1;
              } else {
                return -1;
              }
            });

            console.log("devuelve actividad");
            //devuelve la actividad que se guarda en dayActivities
            return {
              name: a.name,
              hoursFrom,
              minutesFrom,
              hoursTo,
              minutesTo,
            };
          }
        });
        //se sacan los indefinidos de cuando no se devolvió la actividad porque se superponía a otra o no entraba en el día
        dayActivities = dayActivities.filter((da) => {
          return da !== undefined;
        });

        //se sacan las actividades ya asignadas de activitiesCopy para no usarlas en el siguiente día
        activitiesCopy = activitiesCopy.filter(
          (activ) => !dayActivities.find((da) => da.name === activ.name)
        );

        //ordenar por hora
        dayActivities = dayActivities.sort((a, b) => {
          if (a.hoursFrom === b.hoursFrom) {
            if (a.minutesFrom > b.minutesFrom) {
              return 1;
            } else {
              return -1;
            }
          }
          if (a.hoursFrom > b.hoursFrom) {
            return 1;
          } else {
            return -1;
          }
        });

        //retorna cada día con las actividades de ese día
        return { day: d.name, dayActivities };
      });

      //si quedaron actividades sin asignarse porque no entraron:
      if (activitiesCopy.length > 0) {
        activitiesCopy.forEach((ac) => {
          msg += `${ac.name} (grupo ${g}) - `;
        });
      }

      //se guarda el grupo con sus días con las actividades asignadas
      sche = [...sche, { name: g, days: groupDays }];
      console.log("sche", sche);
    });
    //si se agregaron actividades al mensaje:
    if (msg.length > 69) {
      showError(msg, "remainingActivities");
      sche = [];
    } else {
      setErrorFlag(false);
      setErrorType("");
    }

    //formatear hora
    sche.map((g) =>
      g.days.map((day) =>
        day.dayActivities.map((da) => {
          da.hoursFrom = formatTime(da.hoursFrom);
          da.minutesFrom = formatTime(da.minutesFrom);
          da.hoursTo = formatTime(da.hoursTo);
          da.minutesTo = formatTime(da.minutesTo);
          return da;
        })
      )
    );

    setSchedule(sche);
    //se guarda el schedule armado
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
        defaultTime,
        createSchedule,
        errorFlag,
        errorMsg,
        errorType,
        checkInput,
        handleContinueActivityMode,
        continueActivityMode,
        schedule,
        editGroup,
        deleteGroup,
        editActivity,
        deleteActivity,
        editGroupFlag,
        editActivityFlag,
        postSchedule,
        handleScheduleName,
        scheduleName,
        formatTime,
        timeBetween,
        handleTimeBetween,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
