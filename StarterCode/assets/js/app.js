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

