// @TODO: YOUR CODE HERE!
var svgWidth = window.innerWidth;
  var svgHeight = window.innerHeight;

  var margin = {
    top: 50,
    right: 50,
    bottom: 50,
    left: 50
  };

  var height = svgHeight - margin.top - margin.bottom;
  var width = svgWidth - margin.left - margin.right;

  var svg = d3.select(".chart")
  .append("svg")
  .attr("height", svgHeight)
  .attr("width", svgWidth);


  d3.csv("assets/data/data.csv").then(function(data){
    var xTimeScale = d3.scaleTime()
    .domain(d3.extent(data, d => d.poverty))
    .range([0, width]);

    var yLinearScale1 = d3.scaleLinear()
    .domain([0, d3.max(donutData, d => d.morning)])
    .range([height, 0]);



  });