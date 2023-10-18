import React from "react";
import { useEffect } from "react";
import { useRef } from "react";
import * as d3 from "d3";

const xBarDomains = ["week-1", "week-2", "week-3", "week-4"];

const xDomains = ["🍊", "🍇", "🍏", "🍌"];

const dataCategoryByName = [
  [
    { name: "🍊", week: "week-01", value: 210, sales: 234 },
    { name: "🍊", week: "week-02", value: 310, sales: 523 },
    { name: "🍊", week: "week-03", value: 210, sales: 114 },
    { name: "🍊", week: "week-04", value: 283, sales: 310 },
  ],
  [
    { name: "🍇", week: "week-01", value: 130, sales: 123 },
    { name: "🍇", week: "week-02", value: 123, sales: 312 },
    { name: "🍇", week: "week-03", value: 12, sales: 443 },
    { name: "🍇", week: "week-04", value: 112, sales: 123 },
  ],
  [
    { name: "🍏", week: "week-01", value: 80, sales: 321 },
    { name: "🍏", week: "week-02", value: 86, sales: 132 },
    { name: "🍏", week: "week-03", value: 320, sales: 225 },
    { name: "🍏", week: "week-04", value: 332, sales: 86 },
  ],
  [
    { name: "🍌", week: "week-01", value: 150, sales: 456 },
    { name: "🍌", week: "week-02", value: 229, sales: 645 },
    { name: "🍌", week: "week-03", value: 90, sales: 113 },
    { name: "🍌", week: "week-04", value: 445, sales: 229 },
  ],
];

const dataCategoryByWeek = {
  "week-01": [
    { name: "🍊", week: "week-01", value: 210, sales: 234 },
    { name: "🍇", week: "week-01", value: 130, sales: 123 },
    { name: "🍏", week: "week-01", value: 80, sales: 321 },
    { name: "🍌", week: "week-01", value: 150, sales: 456 },
  ],
  "week-02": [
    { name: "🍊", week: "week-02", value: 310, sales: 523 },
    { name: "🍇", week: "week-02", value: 123, sales: 312 },
    { name: "🍏", week: "week-02", value: 86, sales: 132 },
    { name: "🍌", week: "week-02", value: 229, sales: 645 },
  ],
};

export const TestSeven = () => {
  const wrapperRef = useRef();
  const svgRef = useRef();
  const width = 800;
  const height = 400;

  useEffect(() => {}, []);

  return (
    <div ref={wrapperRef}>
      <svg ref={svgRef}></svg>
    </div>
  );
};
