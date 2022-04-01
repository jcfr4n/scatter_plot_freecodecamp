// jshint esversion:6

let urlData =
  "https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/cyclist-data.json";

let width = 600;
let height = 400;
let padding = 50;

let xScale;
let xAxis;
let yScale;
let yAxis;

/* Define 'tooltip' element
 */
/* Definir el elemento 'tooltip'
 */
let tooltip = d3
  .select(".main")
  .append("div")
  .attr("id", "tooltip")
  .style("opacity", 0);

/* This function takes the 'svgHolder' element and  assign it width and height properties
 */
/* Esta función toma el elemento 'svgHolder' y le asigna propiedades de ancho y alto
 */
function drawSvgHolder() {
  d3.select("#svgHolder").attr("width", width).attr("height", height);
}

/* Generate the scales that we gonna use to represent data.
 */
/* Genere las escalas que usaremos para representar los datos.
 */
function generateScales(data) {
  xScale = d3
    .scaleLinear()
    .domain([
      d3.min(data, (item) => item.Year - 1),
      d3.max(data, (item) => item.Year + 1),
    ])
    .range([padding, width - padding]);

  yScale = d3
    .scaleTime()
    .domain([
      d3.min(data, (item) => new Date((item.Seconds - 5) * 1000)),
      d3.max(data, (item) => new Date((item.Seconds + 5) * 1000)),
    ])
    .range([padding, height - padding]);
}

/* Draw the axes.
 */
/* Dibujar los ejes
 */
function drawAxis() {
  xAxis = d3.axisBottom(xScale).tickFormat(d3.format("d"));
  yAxis = d3.axisLeft(yScale).tickFormat(d3.timeFormat("%M:%S"));

  d3.select("#svgHolder")
    .append("g")
    .call(xAxis)
    .attr("id", "x-axis")
    .attr("transform", "translate(0, " + (height - padding) + ")");

  d3.select("#svgHolder")
    .append("g")
    .call(yAxis)
    .attr("id", "y-axis")
    .attr("transform", "translate(" + padding + ", 0)");
}

/* Draw the points into 'svgHolder' element and turn visible the 'tooltip' element when mouse is over the dot.
 */
/* Dibujar los puntos en el elemento 'svgHolder' y hacer visible el elemento 'tooltip' cuando el mouse esté sobre el punto.
 */
function drawPoints(data) {
  d3.select("#svgHolder")
    .selectAll("circle")
    .data(data)
    .enter()
    .append("circle")
    .attr("class", "dot")
    .attr("r", 4)
    .attr("data-xvalue", (item) => {
      return item.Year;
    })
    .attr("data-yvalue", (item) => {
      return new Date(item.Seconds * 1000);
    })
    .attr("cx", (item) => {
      return xScale(item.Year);
    })
    .attr("cy", (item) => {
      return yScale(new Date(item.Seconds * 1000));
    })
    .attr("fill", (item) => {
      return item.Doping != "" ? "orange" : "black";
    })
    .on("mouseover", function (event, item) {
      let xDot = this.getAttribute("cx");
      let yDot = this.getAttribute("cy");
      console.log(xDot + " = x");
      console.log(yDot + " = y");
      console.log(event);

      tooltip.transition().duration(200).style("opacity", 0.9);

      tooltip
        .html(item.Year + "<br>" + item.Doping + "<br><br>" + item.Name)
        .attr("id", "tooltip")
        .attr("data-Year", item.Year)
        .style("left", event.pageX + "px")
        .style("top", event.pageY - 30 + "px");
    })
    .on("mouseout", function () {
      tooltip.transition().duration(200).style("opacity", 0);
    });
}

/* Fetches the JSON file at the specified input URL. If init is specified, it is passed along to the underlying call to fetch; see RequestInit for allowed fields. If the server returns a status code of 204 No Content or 205 Reset Content, the promise resolves to undefined.
 */

/* Obtiene el archivo JSON en la URL de entrada especificada. Si se especifica init, se pasa a la llamada subyacente a fetch; véase RequestInit para los campos permitidos. Si el servidor devuelve un código de estado 204 No Content o 205 Reset Content, la promesa se resuelve como undefined.
 */
d3.json(urlData)
  .then((data) => {
    console.log(data);
    drawSvgHolder();
    generateScales(data);
    drawAxis();
    drawPoints(data);
  })
  .catch((err) => console.log(err));
