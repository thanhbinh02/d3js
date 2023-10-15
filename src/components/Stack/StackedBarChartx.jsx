import {
  axisBottom,
  axisLeft,
  max,
  scaleBand,
  scaleLinear,
  select,
  stack,
  stackOrderNone,
} from "d3";
import React, { useEffect, useRef } from "react";

import * as d3 from "d3";

function StackedBarChart({ data, keys, colors, allKeysTest }) {
  const svgRef = useRef();
  const wrapperRef = useRef();

  const tooltipRef = useRef();

  useEffect(() => {
    const svg = select(svgRef.current);

    const tooltip = select(tooltipRef.current);

    const { width, height } = wrapperRef.current.getBoundingClientRect();

    const stackGenerator = stack().keys(keys).order(stackOrderNone);

    const layers = stackGenerator(data);

    const extent = [
      0,
      max(layers, (layer) => max(layer, (sequence) => sequence[1])),
    ];

    // scales
    const xScale = scaleBand()
      .domain(data.map((d) => d.year))
      .range([0, width])
      .padding(0.25);

    const yScale = scaleLinear().domain(extent).range([height, 0]);

    // rendering
    svg
      .selectAll(".layer")
      .data(layers)
      .join("g")
      .attr("class", "layer")
      .attr("fill", (layer) => colors[layer.key])
      .attr("name", (layer) => layer.key)
      .selectAll("rect")
      .data((layer) => {
        return layer;
      })
      .join("rect")
      .attr("x", (sequence) => {
        return xScale(sequence.data.year);
      })
      .attr("width", xScale.bandwidth())
      .attr("y", (sequence) => {
        return yScale(sequence[1]);
      })
      .attr("height", (sequence) => {
        return yScale(sequence[0]) - yScale(sequence[1]);
      })
      .on("mouseenter", function (event, datum) {
        const key = d3.select(this.parentNode).attr("name");
        const name = datum.data.year;
        const item = allKeysTest.find((item) => item.key === key);
        const value = datum[1] - datum[0];

        const rectX = parseFloat(d3.select(this).attr("x"));
        const rectY = parseFloat(d3.select(this).attr("y"));
        const rectWidth = parseFloat(d3.select(this).attr("width"));
        const rectHeight = parseFloat(d3.select(this).attr("height"));

        const tooltipX = rectX + rectWidth / 2;
        const tooltipY = rectY + rectHeight / 2;

        tooltip.style("display", "block");
        tooltip.style("left", tooltipX + "px").style("top", tooltipY + "px");
        tooltip.select(".color-tooltip").style("background-color", colors[key]);
        tooltip.select(".item-tooltip").text(name);
        tooltip.select(".element-tooltip").text(`${item.name}:`);
        tooltip.select(".percent-tooltip").text(`${value}%`);
      })
      .on("mouseleave", function (event) {
        tooltip.style("display", "none");
      });

    svg
      .selectAll(".label")
      .data(layers)
      .join("g")
      .attr("class", "label")
      .attr("fill", "white")
      .selectAll("text")
      .data((layer) => layer)
      .join("text")
      .attr(
        "x",
        (sequence) => xScale(sequence.data.year) + xScale.bandwidth() / 2
      )
      .attr(
        "y",
        (sequence) =>
          yScale(sequence[1]) + (yScale(sequence[0]) - yScale(sequence[1])) / 2
      )
      .attr("text-anchor", "middle")
      .attr("dominant-baseline", "middle")
      .text((sequence) => {
        const value = sequence[1] - sequence[0];
        return value !== 0 ? `${value}%` : null;
      });

    // axes
    const xAxis = axisBottom(xScale);
    svg
      .select(".x-axis")
      .attr("transform", `translate(0, ${height})`)
      .call(xAxis);

    const yAxis = axisLeft(yScale);
    svg.select(".y-axis").call(yAxis);
  }, [allKeysTest, colors, data, keys]);

  return (
    <div
      style={{
        position: "relative",
      }}
    >
      <div ref={wrapperRef} style={{ marginBottom: "2rem" }}>
        <svg ref={svgRef}>
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
        <span className="item-tooltip"></span>
        <br />
        <div
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <p
            style={{
              width: "10px",
              height: "10px",
              marginRight: "10px",
            }}
            className="color-tooltip"
          />

          <p className="element-tooltip"></p>
          <span
            className="percent-tooltip"
            style={{
              fontWeight: 600,
              paddingLeft: "4px",
            }}
          ></span>
        </div>
      </div>
    </div>
  );
}

export default StackedBarChart;
