var histogram = (function() {

  var loadData = function(path, year) {
    $('#chart').html('');
    d3.json(path, function (idx, json) {

      var data = [];

      if (year == undefined) {
        data = json.result.map(function (d) {
          return d.precio;
        });
      } else {
        $.each(json.result, function (idx, d) {
          if (d.year == year)
            data.push(d.precio);
        });
      }

      var formatCount = d3.format(",.0f");

      var margin = {top: 10, right: 30, bottom: 30, left: 30},
        width = 800 - margin.left - margin.right,
        height = 600 - margin.top - margin.bottom;

      data.splice(data.indexOf(d3.max(data)), 1);
      data.splice(data.indexOf(d3.min(data)), 1);

      var x = d3.scaleLinear()
        .domain([d3.min(data), d3.max(data)])
        .range([0, width]);

      var bins = d3.histogram()
        .domain(x.domain())
        .thresholds(x.ticks(20))(data);

      var y = d3.scaleLinear()
        .domain([0, d3.max(bins, function (d) {
          return d.length;
        })])
        .range([height, 0]);

      var svg = d3.select("#chart").append("svg")
          .attr("width", width + margin.left + margin.right)
          .attr("height", height + margin.top + margin.bottom)
          .append("g")
          .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

      var bar = svg.selectAll(".bar")
        .data(bins)
        .enter().append("g")
        .attr("class", "bar")
        .attr("transform", function (d) {
          return "translate(" + x(d.x0) + "," + y(d.length) + ")";
        });

      bar.append("rect")
        .attr("x", 1)
        .attr("width", x(bins[0].x1) - x(bins[0].x0) - 1)
        .attr("height", function (d) {
          return height - y(d.length);
        });

      bar.append("text")
        .attr("dy", ".75em")
        .attr("y", 6)
        .attr("x", (x(bins[0].x1) - x(bins[0].x0)) / 2)
        .attr("text-anchor", "middle")
        .text(function (d) {
          return formatCount(d.length);
        });

      svg.append("g")
        .attr("class", "axis axis--x")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x));
    });
  };

  updateData = function(path, year) {
    d3.json(path, function (idx, json) {
      var formatCount = d3.format(",.0f");

      var margin = {top: 10, right: 30, bottom: 30, left: 30},
        width = 800 - margin.left - margin.right,
        height = 600 - margin.top - margin.bottom;

      var data = [];

      if (year == undefined) {
        data = json.result.map(function (d) {
          return d.precio;
        });
      } else {
        $.each(json.result, function (idx, d) {
          if (d.year == year)
            data.push(d.precio);
        });
      }

      data.splice(data.indexOf(d3.max(data)), 1);
      data.splice(data.indexOf(d3.min(data)), 1);

      var x = d3.scaleLinear()
        .domain([d3.min(data), d3.max(data)])
        .range([0, width]);

      var bins = d3.histogram()
        .domain(x.domain())
        .thresholds(x.ticks(20))(data);

      var y = d3.scaleLinear()
        .domain([0, d3.max(bins, function (d) {
          return d.length;
        })])
        .range([height, 0]);

      var svg = d3.select('#chart');

      var bar = svg.selectAll(".bar")
        .data(bins)
        .transition()
        .duration(750)
        .remove()
        .enter().append("g")
        .attr("class", "bar")
        .attr("transform", function (d) {
          return "translate(" + x(d.x0) + "," + y(d.length) + ")";
        });
      bar.append("rect")
        .attr("x", 1)
        .attr("width", x(bins[0].x1) - x(bins[0].x0) - 1)
        .attr("height", function (d) {
          return height - y(d.length);
        });

      bar.append("text")
        .attr("dy", ".75em")
        .attr("y", 6)
        .attr("x", (x(bins[0].x1) - x(bins[0].x0)) / 2)
        .attr("text-anchor", "middle")
        .text(function (d) {
          return formatCount(d.length);
        });

        svg
        .transition()
        .duration(750)
        .attr("class", "axis axis--x")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x));
    });
  };
  return {
    loadData: loadData,
    updateData: updateData
  };
})();