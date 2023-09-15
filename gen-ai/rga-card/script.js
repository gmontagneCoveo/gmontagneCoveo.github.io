var data = [22];
var width = 290,
  height = 250,
  radius = 60;

var color = d3.scaleLinear().domain([0, 60]).range(["#3f37c9", "#4cc9f0"]);

var svg = d3
  .select("svg")
  .attr("width", width)
  .attr("height", height)
  .attr("class", "span4");

var group = svg
  .append("g")
  .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

var arc = d3
  .arc()
  .innerRadius(radius + 10)
  .outerRadius(radius + 22.5)
  .padAngle(0.08)
  .cornerRadius(2);

let totalNumber = svg
  .append("text")
  .attr("y", height / 2 + 15)
  .text(d3.sum(data))
  .attr("fill", "black")
  .attr("font-size", "35px")
  .attr("text-anchor", "middle")
  .attr("id", "totals");

let totalText = svg
  .append("text")
  .attr("y", height / 2 - 20)
  .text("Seconds")
  .attr("fill", "#aaaaaa")
  .attr("font-size", "14px")
  .attr("text-anchor", "middle");

totalNumber.attr("x", width / 2);
totalText.attr("x", width / 2);

var pie = d3.pie().value(function (d) {
  return d;
});

var arcs = group
  .selectAll(".arc")
  .data(pie(data))
  .enter()
  .append("g")
  .attr("class", "arc")
  .attr("id", function (d, i) {
    return `arc-${i}`;
  });

arcs
  .append("path")
  .attr("d", arc)
  .attr("fill", function (d) {
    return color(d.data);
  });

group
  .selectAll(".arc-text")
  .data(pie(data))
  .join("g")
  .each(function (d) {
    var centroid = arc.centroid(d);

    var g = d3.select(this),
      x = centroid[0] * 1.4,
      y = centroid[1] * 1.4;

    g.append("line")
      .attr("x1", centroid[0])
      .attr("y1", centroid[1])
      .attr("x2", x)
      .attr("y2", y)
      .attr("stroke", "#aaa")
      .attr("stroke-width", 0.5);

    g.append("circle")
      .attr("r", 2)
      .attr("cx", centroid[0])
      .attr("cy", centroid[1])
      .attr("fill", "#fff")
      .attr("stroke", "none");

    g.append("circle")
      .attr("r", 12)
      .attr("cx", x)
      .attr("cy", y)
      .attr("fill", "#fff")
      .attr("stroke", "#aaa")
      .attr("stroke-width", 1);

    g.append("text")
      .attr("x", x)
      .attr("y", y)
      .attr("class", "arc-text")
      .attr("color", "black")
      .attr("font-size", "14px")
      .attr("text-anchor", "middle")
      .attr("dy", "0.33em")
      .text(d.data);
  });