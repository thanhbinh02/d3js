import { axisBottom, axisLeft, line, max, scaleLinear, select } from "d3";
import React, { useEffect, useRef } from "react";

function DashLineChart({ values, labels, uniqueValues }) {
  const svgRef = useRef();
  const wrapperRef = useRef();

  useEffect(() => {
    const svg = select(svgRef.current);

    const svgContent = svg.select(".content");
    const { width, height } = wrapperRef.current.getBoundingClientRect();

    const xScale = scaleLinear()
      .domain([0, values[0].old_data.length - 1])
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
        .data([month.new_data])
        .join("path")
        .attr("class", `line-${index}`)
        .attr("stroke", month.color)
        .attr("fill", "none")
        .attr("d", lineGenerator);
    });

    values.forEach((month, index) => {
      svgContent
        .selectAll(`.line-dash-${index}`)
        .data([month.old_data])
        .join("path")
        .attr("class", `line-${index}`)
        .attr("stroke", month.color)
        .attr("fill", "none")
        .attr("d", lineGenerator)
        .style("stroke-dasharray", "5,5");
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
      <div ref={wrapperRef} style={{ marginBottom: "2rem" }}>
        <svg ref={svgRef}>
          <g className="content"></g>
          <g className="x-axis" />
          <g className="y-axis" />
        </svg>
      </div>
    </React.Fragment>
  );
}

export default DashLineChart;
