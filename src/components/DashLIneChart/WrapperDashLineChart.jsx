import React from "react";
import DashLineChart from "./DashLIneChart";

function WrapperDashLineChart() {
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
    <React.Fragment>
      <h2>Dash Line Chart with D3 </h2>

      <DashLineChart
        values={values}
        labels={labels}
        uniqueValues={uniqueValues}
      />

      {values.map((item, index) => {
        return (
          <div key={index} className="flex justify-center items-center">
            <p
              className="w-10 h-[2px] mr-3"
              style={{
                backgroundColor: item.color,
              }}
            ></p>
            {item.name} cũ
          </div>
        );
      })}

      {values.map((item, index) => {
        return (
          <div key={index} className="flex justify-center items-center">
            <p
              className="w-10 mr-3 ml-2"
              style={{
                border: `1px dotted ${item.color}`,
              }}
            ></p>
            {item.name} mới
          </div>
        );
      })}
    </React.Fragment>
  );
}

export default WrapperDashLineChart;
