import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const options = {
  responsive: true,
  plugins: {
    legend: {
      display: false,
    },
    scales: {
      yAxes: {
        ticks: {
          color: "rgba(255, 255, 255, 1)",
        },
        grid: {
          display: false,
          drawBorder: false,
        },
      },

      xAxes: {
        ticks: {
          color: "rgba(255, 255, 255, 1)",
        },
        grid: {
          circular: true,
          borderColor: "rgba(255, 255, 255, .2)",
          color: "rgba(255, 255, 255, .2)",
          borderDash: [5, 5],
        },
      },
    },
    layout: {
      padding: {
        right: 10,
      },
    },
  },
};

const buildData= ({ chartData}) => ({
  labels: chartData.labels,
  datasets:[
    {
      label: '',
      data: chartData.data,
      backgroundColor: 'rgba(255, 255, 255, 0.1)',
            borderColor: 'rgba(255, 255, 255, 1)',
            pointBackgroundColor: 'rgba(255, 255, 255, 1)',
            fill: 'start',
            tension: 0.4,
    },
  ],
});


function LineChart({ info }) {
  const data= buildData(info);
  return <Line options={options} data={data} />;
}

export default LineChart;
