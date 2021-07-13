// @TODO: YOUR CODE HERE!
var Width = 700;
var Height = 680;

var margin = {
    top: 30,
    right: 50,
    bottom: 90,
    left: 60
};

var w = Width - margin.left - margin.right;
var he = Height - margin.top - margin.bottom;

var svg = d3
    .select("#scatter")
    .append("svg")
    .attr("width", Width)
    .attr("height", Height);

var chart = svg.append("g")
    .attr("transform", 'translate(${margin.left}, ${margin.top})');

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