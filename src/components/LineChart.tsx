import React, { useRef, useEffect, useState } from "react";
import type { ChartData, ChartArea } from "chart.js";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const options = {
  responsive: true,
  plugins: {
    legend: {
      display: false,
    },
  },
  scales: {
    y: {
      min: 50000,
      ticks: {
        display: false,
      },
      grid: {
        borderColor: 'rgba(19, 77, 120, 1)',
        display: false,
      },
    },
    x: {
      offset: true,
      ticks: {
        color: "#FFF",
        padding: 10,
      },
      grid: {
        borderColor: 'rgba(19, 77, 120, 1)',
        tickColor: 'rgba(19, 77, 120, 1)',
        display: true,
        color: 'rgba(0, 0, 0, 0)',
      },
    },
  },
  layout: {
    padding: {
      left: 50,
      right: 50,
    },
  },
};

function createGradient(ctx: CanvasRenderingContext2D, area: ChartArea) {
  var angle = (1 * Math.PI) / 180;
  var x2 = area.bottom * Math.cos(angle);
  var y2 = area.height * Math.sin(angle);
  const gradient = ctx.createLinearGradient(area.bottom, area.height, x2, y2);

  gradient.addColorStop(0, "rgba(153, 0, 51, 0)");
  gradient.addColorStop(0.1, "rgba(153, 0, 51, 0)");
  gradient.addColorStop(0.2, "rgba(153, 0, 51, 0.1)");
  gradient.addColorStop(0.3, "rgba(153, 0, 51, 0.25)");
  gradient.addColorStop(0.45, "rgba(153, 0, 51, 0.5)");
  gradient.addColorStop(0.85, "rgba(255, 92, 94, 0.75)");
  gradient.addColorStop(1, "rgba(255, 92, 94, 0.75)");

  return gradient;
}

function LineChart({ info }) {
  const chartRef = useRef<ChartJS>(null);
  const [chartData, setChartData] = useState<ChartData<"bar">>({
    datasets: [],
  });

  useEffect(() => {
    const { chartData } = info;
    const chart = chartRef.current;

    if (!chart) {
      return;
    }

    const data = {
      labels: chartData.labels,
      datasets: [
        {
          label: "",
          data: chartData.data,
          backgroundColor: createGradient(chart.ctx, chart.chartArea), 
          borderColor: "rgba(241, 20, 61, 1)", 
          borderWidth: 5,
          pointRadius: 0.2,
          fill: "start",
          tension: 0.5,
        },
      ],
    };

    setChartData(data);
  }, []);

  if (chartData == null) {
    return null;
  }

  return <Line ref={chartRef} options={options} data={chartData} />;
}

export default LineChart;
