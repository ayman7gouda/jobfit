import React from "react";
import SalaryChart from "./SalaryChart";
import { Line } from "react-chartjs-2";

const data = {
  chartData: {
    labels: [
      "2019",
      "2020",
      "2021",
      "2022",
      "2023",
      "2024",
      "2025",
      "2026",
      "2027",
      "2028",
      "2029",
    ],
    dataset: [
      50000, 60000, 80000, 85000, 90000, 95000, 92000, 10000, 12000, 13000,
      13000,
    ],
  },
};

function ChartData() {
  return (
    <div
      className="rounded shadow-xl overflow-hidden w-full md:flex"
      style={{ maxWidth: "900px" }}
    >
      <div className="flex w-full md:w-1/2 px-5 pb-4 pt-8 bg-indigo-500 text-white items-center">
        <Line data={data} />
      </div>
    </div>
  );
}

export default ChartData;
