import React from "react";
import { useEffect } from "react";
import { useRef } from "react";
import * as d3 from "d3";

const data = [
  {
    year: 2011,
    people: 436121,
    rate: 7.23,
  },
  {
    year: 2012,
    people: 441004,
    rate: 1.12,
  },
  {
    year: 2013,
    people: 442929,
    rate: 0.44,
  },
  {
    year: 2014,
    people: 472814,
    rate: 6.75,
  },
  {
    year: 2014,
    people: 472814,
    rate: 6.75,
  },
  {
    year: 2015,
    people: 451814,
    rate: -4.44,
  },
  {
    year: 2016,
    people: 444536,
    rate: -1.61,
  },
  {
    year: 2017,
    people: 492805,
    rate: 10.86,
  },
  {
    year: 2018,
    people: 511823,
    rate: 3.86,
  },
  {
    year: 2019,
    people: 484559,
    rate: -5.33,
  },
  {
    year: 2020,
    people: 533663,
    rate: 10.13,
  },
  {
    year: 20214,
    people: 674130,
    rate: 26.32,
  },
];

const columns = ["year", "people", "rate"];

const y1 = "people (百萬美元)";
const y2 = "rate (%)";

const margin = { top: 10, right: 50, bottom: 20, left: 40 };

export const TestThree = () => {
  const wrapperRef = useRef();
  const svgRef = useRef();
  const width = 800;
  const height = 400;

  const line = d3
    .line()
    .x((d) => x(d.year) + x.bandwidth() / 2)
    .y((d) => y2(d.rate));

  const x = d3
    .scaleBand()
    .domain(data.map((d) => d.year))
    .rangeRound([margin.left, width - margin.right])
    .padding(0.1);

  const y1 = d3
    .scaleLinear()
    .domain([0, d3.max(data, (d) => d.people) + 100000])
    .rangeRound([height - margin.bottom, margin.top]);

  const y2 = d3
    .scaleLinear()
    .domain([-15, d3.max(data, (d) => d.rate) + 5])
    .rangeRound([height - margin.bottom, margin.top]);

  const xAxis = (g) =>
    g
      .attr("transform", `translate(0,${height - margin.bottom})`)
      .call(d3.axisBottom(x));

  const y1Axis = (g) =>
    g
      .attr("transform", `translate(${margin.left},0)`)
      .style("color", "black")
      .call(d3.axisLeft(y1).ticks(null, "s"))
      .call((g) => g.select(".domain").remove())
      .call((g) =>
        g
          .append("text")
          .attr("x", -margin.left)
          .attr("y", 10)
          .attr("fill", "currentColor")
          .attr("text-anchor", "start")
          .text(data.y1)
      );

  const y2Axis = (g) =>
    g
      .attr("transform", `translate(${width - margin.right},0)`)
      .call(d3.axisRight(y2))
      .call((g) => g.select(".domain").remove())
      .call((g) =>
        g
          .append("text")
          .attr("x", margin.right)
          .attr("y", 10)
          .attr("fill", "currentColor")
          .attr("text-anchor", "end")
          .text(data.y2)
      );

  const yGrid = (g) =>
    g
      .selectAll("line")
      .data(y2.ticks())
      .join("line")
      .attr("x1", margin.left)
      .attr("x2", width - margin.right)
      .attr("y1", (d) => y2(d))
      .attr("y2", (d) => y2(d))
      .attr("stroke", "gray")
      .attr("opacity", 0.2);

  useEffect(() => {
    const svg = d3
      .select(svgRef.current)
      .attr("viewBox", [0, 0, width, height]);

    svg
      .append("g")
      .attr("fill", "orange")
      .attr("fill-opacity", 0.8)
      .selectAll("rect")
      .data(data) // 綁定資料
      .join("rect") // 加入矩形
      .attr("x", (d) => x(d.year))
      .attr("width", x.bandwidth())
      .attr("y", (d) => y1(d.people)) // 左邊 y 軸
      .attr("height", (d) => y1(0) - y1(d.people)); // 由下往上畫出長條圖;

    // 加入直線
    svg
      .append("path")
      .attr("fill", "none")
      .attr("stroke", "currentColor")
      .attr("stroke-miterlimit", 1) // 調整線段轉折處圓角
      .attr("stroke-width", 5)
      .attr("d", line(data));

    svg
      .selectAll("circle")
      .data(data)
      .join("circle")
      .attr("cx", (d, i) => x(d.year) + x.bandwidth() / 2)
      .attr("cy", (d) => y2(d.rate))
      .attr("r", x.bandwidth() / 8);

    svg.append("g").call(xAxis).attr("font-size", 14);

    svg.append("g").call(y1Axis).attr("font-size", 14);

    svg.append("g").call(y2Axis).attr("font-size", 14);

    svg.append("g").call(yGrid);
  }, []);

  return (
    <div ref={wrapperRef}>
      <svg ref={svgRef}></svg>
    </div>
  );
};
