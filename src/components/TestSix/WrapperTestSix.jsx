import React from "react";
import TestSix from "./TestSix";

function WrapperTestSix() {
  const labels = ["Tháng 1", "Tháng 2", "Tháng 3", "Tháng 4"];

  const values = [
    {
      name: "Công ty A",
      data: [10, 5, 30, 20],
      color: "red",
    },
    {
      name: "Công ty B",
      data: [30, 10, 20, 5],
      color: "black",
    },
    {
      name: "Công ty C",
      data: [20, 30, 50, 40],
      color: "blue",
    },
    {
      name: "Công ty D",
      data: [40, 45, 5, 10],
      color: "green",
    },
  ];

  return (
    <React.Fragment>
      <h2>Line Chart with D3 </h2>

      <TestSix values={values} labels={labels} />

      {values.map((item, index) => {
        return (
          <div key={index} className="flex justify-center items-center">
            <p
              className="w-2 h-2 rounded-full bg-black mr-3"
              style={{
                backgroundColor: item.color,
              }}
            ></p>
            {item.name}
          </div>
        );
      })}
    </React.Fragment>
  );
}

export default WrapperTestSix;
