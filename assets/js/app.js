// @TODO: YOUR CODE HERE!
var svgWidth = 600;
  var svgHeight = 600;

  var margin = {
    top: 50,
    right: 50,
    bottom: 50,
    left: 50
  };

  var height = svgHeight - margin.top - margin.bottom;
  var width = svgWidth - margin.left - margin.right;

  var svg = d3.select("#scatter")
  .append("svg")
  .attr("height", svgHeight)
  .attr("width", svgWidth);

  var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);


  d3.csv("assets/data/data.csv").then(function(data){
    
    
    data.forEach(function(d) {
        d.poverty = +d.poverty;
        d.healthcare = +d.healthcare;
    });
    console.log(data.healthcare)



    var xScale = d3.scaleLinear()
    .domain(d3.extent(data, d => d.poverty))
    .range([0, width]);

    var yLinearScale = d3.scaleLinear()
    .domain(d3.extent(data, (d) => d.healthcare))
    .range([height, 0]);

    var bottomAxis = d3.axisBottom(xScale);
    var leftAxis = d3.axisLeft(yLinearScale);

    chartGroup.append("g").attr("transform", `translate(0, ${height})`).call(bottomAxis);

    chartGroup.append("g").call(leftAxis);

    var circlesGroup = chartGroup.selectAll("circle")
    .data(data)
    .enter()
    .append("circle")
    .attr("cx", d => xScale(d.poverty))
    .attr("cy", d => yLinearScale(d.healthcare))
    .attr("r", "14")
    .attr("class", "stateCircle");



    // ------------------------------------------------------
    data.forEach(d => (d.abbr))
      chartGroup.selectAll(null)
      .data(data)
      .enter()
      .append("text")
      .attr("x", d => xScale(d.poverty))
      .attr("y", d => yLinearScale(d.healthcare-.25))
      .text(d => d.abbr)
      .attr("class", "stateText");

     //  x and y axes labels
      chartGroup.append("text")
      .attr("transform", `translate(300, 540)`)
      .attr("class", "aText")
      .text("Poverty (%)");
      chartGroup.append("text")
      .attr("transform", `translate(-35, 200)rotate(270)`)
      .attr("class", "aText")
      .text("Lacks HealthCare (%)");

      var toolTip = d3.select("body").append("div")
    .attr("class", "tooltip");

    circlesGroup.on("mouseover", function(d, i) {
        toolTip.style("display", "block");
        toolTip.html(`Pizzas eaten: `)
          .style("left", d3.event.pageX + "px")
          .style("top", d3.event.pageY + "px");
      })
    
      .on("mouseout", function() {
        toolTip.style("display", "none");
      });
  
  



  });