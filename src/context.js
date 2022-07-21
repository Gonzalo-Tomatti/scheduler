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
    defaultHoursFrom: 0,
    defaultMinutesFrom: 0,
    defaultHoursTo: 0,
    defaultMinutesTo: 0,
  });
  const [continueActivityMode, setContinueActivityMode] = useState({
    continueActivityNextWeek: "false",
    continueActivityNextDay: "false",
  });
  const [schedule, setSchedule] = useState([]);

  const handleContinueActivityMode = (e) => {
    const { name, value } = e.target;
    setContinueActivityMode((prev) => {
      return { ...prev, [name]: value };
    });
  };

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
    const duration = activity.hours * 60 + activity.minutes;
    const act = {
      name: activity.name,
      duration,
      hours: activity.hours,
      minutes: activity.minutes,
    };
    setActivities((prevActivities) => {
      return [...prevActivities, act];
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
    if (name !== "name") {
      value = parseInt(value);
    }
    setDays((prevDays) => {
      //se busca si hay un objeto guardado con el mismo índice del nuevo valor
      if (prevDays.find((d) => d.index === index)) {
        //si hay algún objeto guardado con el mismo índice que el nuevo valor, se guarda el valor en ese mismo objeto
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

  const getChosenDays = () => {
    const chosen = days
      //se sacan los objetos que no tengan día
      .filter((d) => {
        return d.name !== undefined;
      })
      //se llenan los campos faltantes con el default
      .map((d) => {
        d.minutesFrom = d.minutesFrom || defaultTime.defaultMinutesFrom;
        d.hoursFrom = d.hoursFrom || defaultTime.defaultHoursFrom;
        d.minutesTo = d.minutesTo || defaultTime.defaultMinutesTo;
        d.hoursTo = d.hoursTo || defaultTime.defaultHoursTo;
        //se agrega un campo de tiempo total del día
        const hours = d.hoursTo - d.hoursFrom;
        const minutes = d.minutesTo - d.minutesFrom;
        const totalDayTime = hours * 60 + minutes;
        const chosenDay = { ...d, totalDayTime };
        // console.log(
        //   "chosenDay",
        //   chosenDay.hoursFrom,
        //   chosenDay.minutesFrom,
        //   chosenDay.totalDayTime
        // );
        return chosenDay;
      });
    return chosen;
  };

  const checkIfActivityFitsInDay = (d, hoursTo, minutesTo) => {
    console.log("inside");
    //ver si la actividad entra en el tiempo restante del día
    //ver si la hora se pasa
    if (hoursTo - d.hoursTo > 0) {
      //no entra
      console.log("hoursTo - d.hourstTo", hoursTo - d.hoursTo);
      return false;
    }
    //si da 0 (termina a la misma hora que se acaba el día), ver si los minutos se pasan
    else if (hoursTo - d.hoursTo === 0) {
      console.log("hoursTo - d.hoursTo === 0", hoursTo - d.hoursTo === 0);
      if (minutesTo - d.minutesTo > 0) {
        console.log("minutesTo - d.minutesTo > 0", minutesTo - d.minutesTo > 0);
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

  const checkOverlap = (
    d,
    a,
    minutesFrom,
    minutesTo,
    hoursFrom,
    hoursTo,
    returnNothing,
    otherGroupHoursFrom,
    otherGroupMinutesFrom,
    otherGroupMinutesTo,
    otherGroupHoursTo
  ) => {
    //ver si las horas de la nueva actividad se superponen con la misma actividad de otro grupo
    if (
      otherGroupHoursTo - hoursFrom > 0 &&
      hoursTo - otherGroupHoursFrom > 0
    ) {
      //se superponen. Cambiar el horario de inicio de la nueva actividad a la hora en la que termina la actividad con la que se superpone
      hoursFrom = otherGroupHoursTo;
      minutesFrom = otherGroupMinutesTo;
      minutesTo = otherGroupMinutesTo + a.minutes;
      let extraHours = 0;
      if (minutesTo > 59) {
        extraHours = Math.trunc(minutesTo / 60);
        minutesTo = minutesTo % 60;
      }
      hoursTo = hoursTo + a.hours + extraHours;

      console.log(
        `horario inicial: horas ${hoursFrom}, minutos ${minutesFrom}, a horas ${hoursTo}, minutos ${minutesTo})} `
      );
      //ver si la actividad entra en el tiempo restante del día
      if (!checkIfActivityFitsInDay(d, hoursTo, minutesTo)) {
        console.log("no devuelve nada");
        returnNothing = true;

        // return { name: "" };
      }
    }
    //si termina a la misma hora que empieza la actividad del otro grupo o empieza a la misma hora ver si los minutos se superponen
    else if (
      otherGroupHoursTo - hoursFrom === 0 &&
      hoursTo - otherGroupHoursFrom === 0
    ) {
      if (
        otherGroupMinutesTo - minutesFrom > 0 &&
        minutesTo - otherGroupMinutesFrom > 0
      ) {
        //se superponen. Cambiar los minutos
        minutesFrom = otherGroupMinutesTo;
        minutesTo = otherGroupMinutesTo + a.minutes;
        let extraHours = 0;
        if (minutesTo > 59) {
          extraHours = Math.trunc(minutesTo / 60);
          minutesTo = minutesTo % 60;
        }
        hoursTo = hoursTo + extraHours;

        console.log(
          `horario inicial: horas ${hoursFrom}, minutos ${minutesFrom}, a horas ${hoursTo}, minutos ${minutesTo})} `
        );
        //ver si la actividad entra en el tiempo restante del día
        if (!checkIfActivityFitsInDay(d, hoursTo, minutesTo)) {
          console.log("no devuelve nada");
          returnNothing = true;
          // return { name: "" };
        }
      }
    }
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
    otherGroupHoursFrom,
    otherGroupMinutesFrom,
    otherGroupMinutesTo,
    otherGroupHoursTo
  ) => {
    if (otherGroupHoursFrom !== undefined) {
      [minutesFrom, minutesTo, hoursFrom, hoursTo, returnNothing] =
        checkOverlap(
          d,
          a,
          minutesFrom,
          minutesTo,
          hoursFrom,
          hoursTo,
          returnNothing,
          otherGroupHoursFrom,
          otherGroupMinutesFrom,
          otherGroupMinutesTo,
          otherGroupHoursTo
        );
      console.log("SÍ hay actividades pero");

      console.log(
        `horario inicial: horas ${hoursFrom}, minutos ${minutesFrom}, a horas ${hoursTo}, minutos ${minutesTo})} `
      );

      //ver si la actividad entra en el tiempo restante del día
      if (!checkIfActivityFitsInDay(d, hoursTo, minutesTo)) {
        console.log("no devuelve nada");
        returnNothing = true;
      }
    }

    if (act.length > 0) {
      act.forEach((ac) => {
        //ver si las horas de la nueva actividad se superponen con una actividad ya asignada
        if (ac.hoursTo - hoursFrom > 0 && hoursTo - ac.hoursFrom > 0) {
          //se superponen. Cambiar el horario de inicio de la nueva actividad a la hora en la que termina la actividad con la que se superpone
          hoursFrom = ac.hoursTo;
          minutesFrom = ac.minutesTo;
          minutesTo = ac.minutesTo + a.minutes;
          let extraHours = 0;
          if (minutesTo > 59) {
            extraHours = Math.trunc(minutesTo / 60);
            minutesTo = minutesTo % 60;
          }
          hoursTo = ac.hoursTo + a.hours + extraHours;

          console.log(
            `horario inicial: horas ${hoursFrom}, minutos ${minutesFrom}, a horas ${hoursTo}, minutos ${minutesTo})} `
          );

          //después de cambiar el horario hay que ver si no se superpone con la misma actividad otro día
          if (otherGroupHoursFrom !== undefined) {
            [minutesFrom, minutesTo, hoursFrom, hoursTo, returnNothing] =
              checkOverlap(
                d,
                a,
                minutesFrom,
                minutesTo,
                hoursFrom,
                hoursTo,
                returnNothing,
                otherGroupHoursFrom,
                otherGroupMinutesFrom,
                otherGroupMinutesTo,
                otherGroupHoursTo
              );
          }

          console.log(
            `horario inicial: horas ${hoursFrom}, minutos ${minutesFrom}, a horas ${hoursTo}, minutos ${minutesTo})} `
          );

          //ver si la actividad entra en el tiempo restante del día
          if (!checkIfActivityFitsInDay(d, hoursTo, minutesTo)) {
            console.log("no devuelve nada");
            returnNothing = true;

            // return { name: "" };
          }
        }
        //si termina a la misma hora que empieza otra actividad o empieza a la misma hora que termina otra actividad ver si los minutos se superponen
        else if (ac.hoursTo - hoursFrom === 0 && hoursTo - ac.hoursFrom === 0) {
          if (
            ac.minutesTo - minutesFrom > 0 &&
            minutesTo - ac.minutesFrom > 0
          ) {
            //se superponen. Cambiar los minutos
            minutesFrom = ac.minutesTo;
            minutesTo = ac.minutesTo + a.minutes;
            let extraHours = 0;
            if (minutesTo > 59) {
              extraHours = Math.trunc(minutesTo / 60);
              minutesTo = minutesTo % 60;
            }
            hoursTo = hoursTo + extraHours;
            console.log(
              `horario inicial: horas ${hoursFrom}, minutos ${minutesFrom}, a horas ${hoursTo}, minutos ${minutesTo})} `
            );

            //después de cambiar el horario hay que ver si no se superpone con la misma actividad otro día
            if (otherGroupHoursFrom !== undefined) {
              [minutesFrom, minutesTo, hoursFrom, hoursTo, returnNothing] =
                checkOverlap(
                  d,
                  a,
                  minutesFrom,
                  minutesTo,
                  hoursFrom,
                  hoursTo,
                  returnNothing,
                  otherGroupHoursFrom,
                  otherGroupMinutesFrom,
                  otherGroupMinutesTo,
                  otherGroupHoursTo
                );
            }

            console.log(
              `horario inicial: horas ${hoursFrom}, minutos ${minutesFrom}, a horas ${hoursTo}, minutos ${minutesTo})} `
            );

            //ver si la actividad entra en el tiempo restante del día
            if (!checkIfActivityFitsInDay(d, hoursTo, minutesTo)) {
              console.log("no devuelve nada");
              returnNothing = true;

              // return { name: "" };
            }
          }
        }
      });
      //si no hay actividades pero hay otro grupo con la misma actividad se ve que no se superponga
    } else if (otherGroupHoursFrom !== undefined) {
      [minutesFrom, minutesTo, hoursFrom, hoursTo, returnNothing] =
        checkOverlap(
          d,
          a,
          minutesFrom,
          minutesTo,
          hoursFrom,
          hoursTo,
          returnNothing,
          otherGroupHoursFrom,
          otherGroupMinutesFrom,
          otherGroupMinutesTo,
          otherGroupHoursTo
        );
      console.log("no hay actividades pero");

      console.log(
        `horario inicial: horas ${hoursFrom}, minutos ${minutesFrom}, a horas ${hoursTo}, minutos ${minutesTo})} `
      );

      //ver si la actividad entra en el tiempo restante del día
      if (!checkIfActivityFitsInDay(d, hoursTo, minutesTo)) {
        console.log("no devuelve nada");
        returnNothing = true;

        // return { name: "" };
      }
    }
    // console.log(hoursFrom, minutesFrom, hoursTo, minutesTo, returnNothing);
    return [hoursFrom, minutesFrom, hoursTo, minutesTo, returnNothing];
  };

  const getSameActivityFromOtherGroup = (sche, d, a) => {
    let otherGroupHoursFrom;
    let otherGroupMinutesFrom;
    let otherGroupMinutesTo;
    let otherGroupHoursTo;
    //si ya hay grupos con horarios
    console.log("sche.length", sche.length);
    if (sche.length > 0) {
      console.log("hay grupos");
      sche.forEach((group) => {
        group.days.forEach((day) => {
          //buscar por cada día de cada grupo cuál es el mismo día al que se le están asignando actividades ahora
          console.log("día ", day.day);
          if (d.name === day.day) {
            console.log("mismo día ", day.day);
            day.dayActivities.forEach((da) => {
              //ver si en ese día se encuentra la misma actividad que se está asignando ahora
              console.log("actividad ", da.name);
              if (da.name === a.name) {
                console.log("misma actividad ", da.name);

                otherGroupHoursFrom = da.hoursFrom;
                otherGroupMinutesFrom = da.minutesFrom;
                otherGroupMinutesTo = da.minutesTo;
                otherGroupHoursTo = da.hoursTo;
              }
            });
          }
        });
      });
    }
    return [
      otherGroupHoursFrom,
      otherGroupMinutesFrom,
      otherGroupMinutesTo,
      otherGroupHoursTo,
    ];
  };

  const createSchedule = () => {
    // console.log("COMIENZO----------------");
    const sortedActivities = activities.sort((a, b) =>
      a.duration < b.duration ? 1 : -1
    );
    // console.log("sorted", sortedActivities);

    let sche = [];
    groups.map((g) => {
      // console.log("INICIO DE GRUPO--------------");
      let sortedActivitiesCopy = [...sortedActivities];
      //almacena cada día con las actividades de ese día
      const chosenDays = getChosenDays();

      // console.log("chosenDays 0 totalDayTime", chosenDays[0].totalDayTime);
      const days = chosenDays.map((d) => {
        // console.log("initial totalDayTime", d.name, d.totalDayTime);

        let act = [];
        let dayActivities = sortedActivitiesCopy.map((a) => {
          let returnNothing = false;
          //horario de la nueva actividad
          console.log("act", act);
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
            `horario inicial: horas ${hoursFrom}, minutos ${minutesFrom}, a horas ${hoursTo}, minutos ${minutesTo})} `
          );

          //ver si la actividad entra en el tiempo restante del día
          if (!checkIfActivityFitsInDay(d, hoursTo, minutesTo)) {
            console.log("doesn't fit");
            returnNothing = true;

            // return { name: "" };
          }

          //obtener el horario de la misma actividad en otro grupo
          let otherGroupHoursFrom;
          let otherGroupMinutesFrom;
          let otherGroupMinutesTo;
          let otherGroupHoursTo;
          [
            otherGroupHoursFrom,
            otherGroupMinutesFrom,
            otherGroupMinutesTo,
            otherGroupHoursTo,
          ] = getSameActivityFromOtherGroup(sche, d, a);
          console.log(
            "otherGroupHoursFrom",
            otherGroupHoursFrom,
            "otherGroupMinutesFrom",
            otherGroupMinutesFrom,
            "otherGroupMinutesTo",
            otherGroupMinutesTo,
            "otherGroupHoursTo",
            otherGroupHoursTo
          );
          //ver si hay actividades ya asignadas ese día

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
              otherGroupHoursFrom,
              otherGroupMinutesFrom,
              otherGroupMinutesTo,
              otherGroupHoursTo
            );

          if (returnNothing) {
            console.log("no devuelve nada");

            return { name: "" };
          } else {
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
            console.log("devuelve actividad");
            return {
              name: a.name,
              hoursFrom,
              minutesFrom,
              hoursTo,
              minutesTo,
            };
          }
        });

        //se sacan las actividades asignadas del array
        // console.log("before sortedActivitiesCopy", sortedActivitiesCopy);
        // console.log("dayActivities, ", dayActivities);
        sortedActivitiesCopy = sortedActivitiesCopy.filter(
          (sa) => !dayActivities.find((da) => da.name === sa.name)
        );

        dayActivities = dayActivities.filter((da) => {
          return da.name !== "";
        });
        //retorna cada día con las actividades de ese día
        return { day: d.name, dayActivities };
      });
      //guarda el grupo con un arreglo de días con actividades asignadas
      // console.log("sortedActivitiesCopy", sortedActivitiesCopy);

      if (sortedActivitiesCopy.length > 0) {
        console.log(
          "Se necesita más tiempo en la semana para las siguientes actividades: "
        );
        sortedActivitiesCopy.map((sa) => {
          console.log("para: ", sa.name);
        });
      }

      sche = [...sche, { name: g, days }];
      console.log("sche", sche);
      setSchedule((prev) => {
        return [...prev, { name: g, days }];
      });
    });
  };
  // console.log("schedule", schedule);
  // console.log("group", group);
  // console.log("activity", activity);
  // console.log("groups:", groups);
  // console.log("activities", activities);
  // console.log("days", days);
  // console.log("defTime", defaultTime);
  // console.log("defActSet", defaultActivitySettings);
  // console.log(continueActivityMode);

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
        handleContinueActivityMode,
        continueActivityMode,
        schedule,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
