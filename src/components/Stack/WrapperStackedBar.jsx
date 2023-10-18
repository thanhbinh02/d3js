import React, { useState } from "react";
import StackedBarChart from "./StackedBarChartx";

const data = [
  {
    year: "Trang Bom",
    others: 8,
    cong_thanh: 24,
    cam_pha: 12,
    sai_gon: 19,
    insee: 7,
    ha_tien: 16,
    fico: 14,
  },
  {
    year: "Bien Hoa",
    others: 7,
    cong_thanh: 11,
    cam_pha: 0,
    sai_gon: 29,
    insee: 7,
    ha_tien: 14,
    fico: 32,
  },
  {
    year: "Long Thanh",
    others: 10,
    cong_thanh: 4,
    cam_pha: 15,
    sai_gon: 0,
    insee: 43,
    ha_tien: 14,
    fico: 14,
  },
  {
    year: "Nhon Trach",
    others: 8,
    cong_thanh: 8,
    cam_pha: 15,
    sai_gon: 0,
    insee: 42,
    ha_tien: 17,
    fico: 10,
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
  {
    key: "cam_pha",
    name: "Cam Pha",
  },
  {
    key: "sai_gon",
    name: "Sai gon",
  },
  {
    key: "insee",
    name: "Insee",
  },
  {
    key: "ha_tien",
    name: "Ha Tien",
  },
  {
    key: "fico",
    name: "Fico",
  },
];

const colors = {
  others: "rgb(20 184 166)",
  cong_thanh: "orange",
  cam_pha: "purple",
  sai_gon: "rgb(236 72 153)",
  insee: "rgb(239 68 68)",
  ha_tien: "rgb(101 163 13)",
  fico: "blue",
};

function WrapperStackedBar() {
  const keys = allKeysTest.map((item) => item.key);

  return (
    <div>
      <h2>Stacked Bar Chart with D3 </h2>
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

        <StackedBarChart
          data={data}
          keys={keys}
          colors={colors}
          allKeysTest={allKeysTest}
        />
      </div>
    </div>
  );
}

export default WrapperStackedBar;
