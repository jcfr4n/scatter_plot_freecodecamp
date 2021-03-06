# Visualiza datos con una gráfica de diagrama de dispersión

## Objetivo: 
Construye una aplicación en CodePen.io que funcionalmente sea similar a esta: [Ir al ejemplo](https://codepen.io/freeCodeCamp/full/bgpXyK).

## Completa las siguientes historias de usuario y consigue que pasen todas las pruebas. Dale tu propio estilo personal.

Puedes utilizar HTML, JavaScript, CSS y la librería D3 de visualización basada en svg. Las pruebas requieren que los ejes se generen utilizando la propiedad de eje D3, que genera automáticamente marcas a lo largo del eje. Estas marcas son necesarias para pasar las pruebas de D3, ya que sus posiciones se utilizan para determinar el alineamiento de los elementos gráficos. Encontrarás información sobre cómo generar ejes en [Ir a la información](https://github.com/d3/d3/blob/master/API.md#axes-d3-axis). Los elementos DOM requeridos (no virtuales) son consultados en el momento de cada prueba. Si usas un framework frontend (como por ejemplo Vue), los resultados de la prueba pueden ser inexactos para el contenido dinámico. Esperamos poder adaptarlos eventualmente, pero por ahora estos frameworks no son soportados por los proyectos con D3.

**Historia de usuario #1:** Puedo ver un elemento titular que tiene un id="title".

**Historia de usuario #2:** Puedo ver un eje-x que tiene un correspondiente id="x-axis".

**Historia de usuario #3:** Puedo ver un eje-y que tiene un correspondiente id="y-axis".

**Historia de usuario #4:** Puedo ver los puntos, que cada uno tiene una clase dot, que representa los datos que están siendo graficados.

**Historia de usuario #5:** Cada punto debe tener las propiedades data-xvalue y data-yvalue con sus valores correspondientes x y y.

**Historia de usuario #6:** Los atributos data-xvalue y data-yvalue de cada punto deben estar dentro del rango de los datos reales y en el formato de datos correcto. Para data-xvalue, los objetos enteros (años completos) o Date son aceptables para la evaluación de la prueba. Para data-yvalue (minutos), usa objetos Date.

**Historia de usuario #7:** El atributo data-xvalue y su correspondiente punto deben alinearse con el punto/valor correspondiente en el eje-x.

**Historia de usuario #8:** El atributo data-yvalue y su correspondiente punto deben alinearse con el punto/valor correspondiente en el eje-y.

**Historia de usuario #9:** Puedo ver varias etiquetas de marca en el eje-y con el formato de tiempo %M:%S.

**Historia de usuario #10:** Puedo ver varias etiquetas de marca en el eje-x mostrando el año.

**Historia de usuario #11:** Puedo ver que el rango de las etiquetas del eje-x está dentro del rango de los datos reales del eje-x.

**Historia de usuario #12:** Puedo ver que el rango de las etiquetas del eje-y está dentro del rango de los datos reales del eje-y.

**Historia de usuario #13:** Puedo ver una leyenda con un texto descriptivo con su correspondiente id="legend".

**Historia de usuario #14:** Puedo pasar el ratón por encima de un área y ver un cuadro emergente con su correspondiente id="tooltip" que muestra más información acerca del área.

**Historia de usuario #15:** Mi cuadro emergente debe tener una propiedad data-year que corresponda con el data-xvalue del área activa.

Aquí está el conjunto de datos que necesitarás para completar este proyecto: [Ver conjunto de datos](https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/cyclist-data.json)

Puedes construir tu proyecto con usando esta plantilla CodePen y haciendo clic en Save para crear tu propio pen. O puedes utilizar este enlace CDN para ejecutar las pruebas en cualquier entorno que desees: https://cdn.freecodecamp.org/testable-projects-fcc/v1/bundle.js