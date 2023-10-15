import { axisBottom, axisLeft, line, max, scaleLinear, select } from "d3";
import React, { useEffect, useRef } from "react";

function LineChart({ values, labels }) {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const uniqueValues = [...new Set(values.flatMap((item) => item.data))];

  const svgRef = useRef();
  const wrapperRef = useRef();
  const tooltipRef = useRef();

  useEffect(() => {
    const svg = select(svgRef.current);
    const tooltip = select(tooltipRef.current);

    const svgContent = svg.select(".content");
    const { width, height } = wrapperRef.current.getBoundingClientRect();

    const xScale = scaleLinear()
      .domain([0, values[0].data.length - 1])
      .range([10, width - 10]);

    const yScale = scaleLinear()
      .domain([0, max(uniqueValues)])
      .range([height - 10, 10]);

    const lineGenerator = line()
      .x((d, index) => xScale(index))
      .y((d) => yScale(d));

    values.forEach((month, index) => {
      svgContent
        .selectAll(`.line-${index}`)
        .data([month.data])
        .join("path")
        .attr("class", `line-${index}`)
        .attr("stroke", month.color)
        .attr("fill", "none")
        .attr("d", lineGenerator);
    });

    values.forEach((month, index) => {
      svgContent
        .selectAll(`.dot-${index}`)
        .data(month.data)
        .join("circle")
        .attr("class", `dot-${index}`)
        .attr("stroke", month.color)
        .attr("r", 4)
        .attr("fill", month.color)
        .attr("location", (_, i) => i)
        .attr("cx", (_, i) => xScale(i))
        .attr("cy", (value) => yScale(value))
        .on("mouseenter", function (event, data) {
          const location = select(this).attr("location");
          const month = labels[location];

          const rectX = parseFloat(select(this).attr("cx"));
          const rectY = parseFloat(select(this).attr("cy"));

          const tooltipX = rectX - 18;
          const tooltipY = rectY + height;

          tooltip.style("display", "block");
          tooltip.style("left", tooltipX + "px").style("top", tooltipY + "px");

          tooltip.style("display", "block");
          tooltip.select(".company").text(values[index].name);
          tooltip.select(".month").text(`${month}:`);
          tooltip.select(".value").text(data);
          tooltip
            .select(".tooltip-color")
            .style("background-color", values[index].color);
        })
        .on("mouseleave", function (event) {
          tooltip.style("display", "none");
        });

      svgContent
        .selectAll(`.value-${index}`)
        .data(month.data)
        .join("text")
        .attr("class", `value-${index}`)
        .attr("x", (value, i) => xScale(i) - 10)
        .attr("y", (value) => yScale(value) - 10)
        .text((sequence) => sequence);
    });

    const xAxis = axisBottom(xScale)
      .tickValues([...Array(labels.length).keys()])
      .tickFormat((index) => labels[index]);

    svg
      .select(".x-axis")
      .attr("transform", `translate(0, ${height})`)
      .call(xAxis);

    const yAxis = axisLeft(yScale);

    svg.select(".y-axis").call(yAxis);
  }, [labels, values, uniqueValues]);

  return (
    <React.Fragment>
      <div
        className="w-[800px] h-[400px]"
        ref={wrapperRef}
        style={{ marginBottom: "2rem" }}
      >
        <svg ref={svgRef}>
          <g className="content"></g>
          <g className="x-axis" />
          <g className="y-axis" />
        </svg>
      </div>
      <div
        className="tooltip"
        style={{
          position: "absolute",
          textAlign: "left",
          padding: "10px",
          border: "1px solid black",
          backgroundColor: "white",
          display: "none",
        }}
        ref={tooltipRef}
      >
        <p className="company"></p>
        <div className="flex items-center">
          <p className="tooltip-color w-2 h-2 rounded-full mr-3"></p>
          <p>
            <span className="month"></span>
            <span className="value font-extrabold ml-1"></span>
          </p>
        </div>
      </div>
    </React.Fragment>
  );
}

export default LineChart;
