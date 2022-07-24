Scheduler.

Esta app te permite crear horarios para grupos que tienen que realizar actividades sin que dos grupos tengan la misma actividad al mismo tiempo.
Para crear un horario se debe ingresar el nombre de las personas o grupos, las actividades y su duración y los días en los que se van a realizar con el rango horario de cada uno.

Para utilizarla se debe crear una cuenta e iniciar sesión ya que los horarios son guardados en una base de datos de MongoDB y se pueden visualizar en la sección "Mis horarios". Además se pueden ver los valores ingresados que se usaron para crear cada horario. Todas las cuentas tienen acceso a horarios ya armados a modo de ejemplo.

La página utiliza Html5, Css3, Bootstrap y Javascript con la librería React.js para el frontend. Para el backend utiliza NodeJs con el framework Express y MongoDB para la base de datos. Para correrla después de clonar el repositorio (si se tiene npm instalado) utilizar el comando 'npm install', lo que instalará las dependencias necesarias, y luego 'npm start' para ejecutarla.
