// jshint esversion:6
let urlData = 'https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/cyclist-data.json';

let width = 800;
let height = 600;
let padding = 50;

let xScale;
let xAxis;
let yScale;
let yAxis;

let tooltip = d3
  .select(".main")
  .append("div")
  .attr("id", "tooltip")
  .style("opacity", 0);

function drawSvgHolder(){
    d3.select('#svgHolder')
        .attr('width',width)
        .attr('height',height);
}

function generateScales(data) {
    xScale = d3.scaleLinear()
                .domain([d3.min(data, (item) => item.Year - 1),d3.max(data, (item) => item.Year + 1)])
                .range([padding,width - (padding)]);

    yScale = d3.scaleTime()
                .domain([d3.min(data,(item)=> new Date((item.Seconds - 5)  * 1000)),d3.max(data,(item)=> new Date((item.Seconds + 5) * 1000))])
                .range([padding, height - padding]);

}

function drawAxis() {
    xAxis = d3.axisBottom(xScale)
                .tickFormat(d3.format('d'));
    yAxis = d3.axisLeft(yScale)
                .tickFormat(d3.timeFormat('%M:%S'));

    d3.select('#svgHolder')
        .append('g')
        .call(xAxis)
        .attr('id','x-axis')
        .attr('transform','translate(0, ' + (height - padding) + ')');

    d3.select('#svgHolder')
        .append('g')
        .call(yAxis)
        .attr('id','y-axis')
        .attr('transform','translate(' + padding  + ', 0)');
}

function drawPoints(data) {
    d3.select('#svgHolder')
        .selectAll('circle')
        .data(data)
        .enter()
        .append('circle')
        .attr('class','dot')
        .attr('r',5)
        .attr('data-xvalue',(item) =>{
            return item.Year;
        })
        .attr('data-yvalue',(item) =>{
            return new Date(item.Seconds * 1000);
        })
        .attr('cx',(item) => {
            return xScale(item.Year);
        })
        .attr('cy', (item) => {
            return yScale(new Date(item.Seconds * 1000));
        })
        .attr('fill',(item) => {
            return (item.Doping != '') ? 'orange' : 'black';
        })
        .on("mouseover", function (event, item) {
            let xDot = this.getAttribute("cx");
            let yDot = this.getAttribute("cy");
    
          tooltip.transition().duration(200).style("opacity", 0.9);
    
          tooltip
            .html(item.Year + '<br>' + item.Doping + '<br><br>' + item.Name)
            .attr("id", "tooltip")
            .attr("data-Year", item.Year)
            .attr("top", yDot)
            .attr("left", xDot)
            .attr("transform", function (d, i){
                console.log(i);
                return 'translate (0,' + (height/2 - i * 20) + ')';
            });
        })
        .on("mouseout", function () {
          tooltip.transition().duration(200).style("opacity", 0);
        });

}


d3.json(urlData)
.then((data) => {
    console.log(data);
    drawSvgHolder();
    generateScales(data);
    drawAxis();
    drawPoints(data);

})
.catch((err) => console.log(err));