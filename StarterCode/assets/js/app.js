

var width = parseInt(d3.select("#scatter").style("width"));

var height = width - width/3.9;

var margin = {
    top: 30,
    right: 50,
    bottom: 90,
    left: 60
};


var labelArea = 110;
var tPadBot = 40;
var tPadLeft = 40;


var svg = d3
    .select("#scatter")
    .append("svg")
    .attr("width", Width)
    .attr("height", Height);
    .attr("class", "chart");




svg.append("g").attr("class", "xText");

var xText = d3.select(".xText");

function xTextRefresh() {
    xText.attr(
      "transform",
      "translate(" +
        ((width - labelArea) / 2 + labelArea) +
        ", " +
        (height - margin - tPadBot) +
        ")"
    );
  }
  xTextRefresh();

  xText
  .append("text")
  .attr("y", -26)
  .attr("data-name", "poverty")
  .attr("data-axis", "x")
  .attr("class", "aText active x")
  .text("In Poverty (%)");

xText
  .append("text")
  .attr("y", 0)
  .attr("data-name", "age")
  .attr("data-axis", "x")
  .attr("class", "aText inactive x")
  .text("Age (Median)");

xText
  .append("text")
  .attr("y", 26)
  .attr("data-name", "income")
  .attr("data-axis", "x")
  .attr("class", "aText inactive x")
  .text("Household Income (Median)");


d3.csv("data.csv", function(data){
    data.poverty = +data.poverty;
    data.healthcare = +data.healthcare;
    return data;
}).then(function(data) {
    console.log(data);


var xScale = d3.scaleLinear()
    .domain([8, d3.max(data,function(d){
    return +d.poverty;
    })])
    .range([0, width]);

var yScale = d3.scaleLinear()
    .domain([2, d3.max(data,function(d){
    return +d.healthcare;
    })])
    .range([height, 0]);
  
    Create axis functions
    var bottomAxis = d3.axisBottom(xLinearScale);
    var leftAxis = d3.axisLeft(yLinearScale);  

    chartGroup.append("g")
        .attr("transform", `translate(0, ${height})`)
        .call(bottomAxis);

    chartGroup.append("g")
        .call(leftAxis);

    var circlesGroup = chartGroup.selectAll("circle")
        .data(stateData)
        .enter()
        .append("circle")
        .attr("cx", d => xLinearScale(d.poverty))
        .attr("cy", d => yLinearScale(d.healthcare))
        .attr("r", 10)
        .attr("fill", "lightblue")
        .attr("opacity", ".5")
        .attr("stroke", "white");    

        chartGroup.append("text")
        .style("text-anchor", "middle")
        .style("font-family", "sans-serif")
        .style("font-size", "8px")
        .selectAll("tspan")
        .data(stateData)
        .enter()
        .append("tspan")
        .attr("x", function(data) {
            return xLinearScale(data.poverty);
        })
        .attr("y", function(data) {
            return yLinearScale(data.healthcare -.02);
        })
        .text(function(data) {
            return data.abbr
        });