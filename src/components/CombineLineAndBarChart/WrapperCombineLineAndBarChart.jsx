import React, { useState } from "react";
import CombineLineAndBarChart from "./CombineLineAndBarChart";

const data = [
  {
    year: "Trang Bom",
    others: 8,
    cong_thanh: 24,
  },
  {
    year: "Bien Hoa",
    others: 7,
    cong_thanh: 11,
  },
  {
    year: "Long Thanh",
    others: 10,
    cong_thanh: 4,
  },
  {
    year: "Nhon Trach",
    others: 8,
    cong_thanh: 8,
  },
];

const allKeysTest = [
  {
    key: "others",
    name: "Other",
  },
  {
    key: "cong_thanh",
    name: "Cong Thanh",
  },
];

const colors = {
  others: "rgb(20 184 166)",
  cong_thanh: "orange",
};

// const total = [
//   {
//     name: "Trang Bom",
//     rtl_price: 92,
//     eu_price: 95,
//     selling: 12,
//     trade: 15,
//   },
//   {
//     year: "Bien Hoa",
//     rtl_price: 90,
//     eu_price: 92.5,
//     selling: 11,
//     trade: 7,
//   },
//   {
//     year: "Long Thanh",
//     rtl_price: 89,
//     eu_price: 90,
//     selling: 45,
//     trade: 43,
//   },
//   {
//     year: "Nhon Trach",
//     rtl_price: 83,
//     eu_price: 89,
//     selling: 20,
//     trade: 30,
//   },
// ];

function WrapperCombineLineAndBarChart() {
  const keys = allKeysTest.map((item) => item.key);

  const labels = ["Tháng 1", "Tháng 2", "Tháng 3", "Tháng 4"];

  const values = [
    {
      name: "Công ty 1",
      new_data: [10, 5, 30, 20],
      old_data: [8, 3, 28, 18],
      color: "red",
    },
    {
      name: "Công ty 2",
      new_data: [30, 10, 20, 5],
      old_data: [28, 8, 18, 3],
      color: "black",
    },
    {
      name: "Công ty 3",
      new_data: [20, 30, 50, 40],
      old_data: [18, 28, 48, 38],
      color: "blue",
    },
    {
      name: "Công ty 4",
      new_data: [40, 45, 5, 10],
      old_data: [38, 43, 3, 8],
      color: "green",
    },
  ];

  const final = values.reduce((accumulator, company) => {
    accumulator.push(...company.new_data, ...company.old_data);
    return accumulator;
  }, []);

  const uniqueValues = [...new Set(final)];

  return (
    <div>
      <h2>Combine Line And Bar Chart with D3 </h2>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <div
          className="fields"
          style={{
            marginRight: "40px",
          }}
        >
          {allKeysTest.map((item) => (
            <div
              key={item.key}
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: "20px",
              }}
            >
              <p
                style={{
                  backgroundColor: colors[item.key],
                  height: "10px",
                  width: "10px",
                  marginRight: "12px",
                }}
              ></p>
              <label htmlFor={item.key} style={{ color: colors[item.key] }}>
                {item.name}
              </label>
            </div>
          ))}
        </div>

        <CombineLineAndBarChart
          data={data}
          keys={keys}
          colors={colors}
          allKeysTest={allKeysTest}
          values={values}
          labels={labels}
          uniqueValues={uniqueValues}
        />
      </div>
    </div>
  );
}

export default WrapperCombineLineAndBarChart;
