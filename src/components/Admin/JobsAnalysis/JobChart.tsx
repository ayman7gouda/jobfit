import { Bar } from 'react-chartjs-2';

import {
  BarElement, CategoryScale, Chart as ChartJS, Filler, Legend, LinearScale, LineElement,
  PointElement, Title, Tooltip
} from 'chart.js';

import type { ChartData, ChartArea } from "chart.js";
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
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
    tooltip: {
      callbacks: {
        title: function (context) {
          if (context[0]?.raw) {
            let raw = context[0].raw;
            return `${raw.title} (${raw.city}, ${raw.state}, ${raw.country})`;
          }
          return undefined;
        },
        label: function (context) {
          let label = context.dataset.label || "";
          console.log(label);
          if (label) {
            label += ": ";
          }
          if (context.parsed.y !== null) {
            label += new Intl.NumberFormat("en-US", {
              style: "currency",
              currency: "USD",
            }).format(context.parsed.y);
          }
          return label;
        },
      },
    },
  },
  scales: {
    y: {
      min: 0,
      ticks: {
        display: true,
      },
      grid: {
        borderColor: "rgba(19, 77, 120, 1)",
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
        borderColor: "rgba(19, 77, 120, 1)",
        tickColor: "rgba(19, 77, 120, 1)",
        display: true,
        color: "rgba(0, 0, 0, 0)",
      },
    },
  },
  layout: {
    padding: {
      left: 20,
      right: 20,
      top: 20,
      bottom: 20,
    },
  },
  parsing: {
    xAxisKey: "titleShort",
    yAxisKey: "maxAnnualSalary",
  },
};

// function createGradient(ctx: CanvasRenderingContext2D, area: ChartArea) {
//   var angle = (1 * Math.PI) / 180;
//   var x2 = area.bottom * Math.cos(angle);
//   var y2 = area.height * Math.sin(angle);
//   const gradient = ctx.createLinearGradient(area.bottom, area.height, x2, y2);

//   gradient.addColorStop(0, "rgba(153, 0, 51, 0)");
//   gradient.addColorStop(0.1, "rgba(153, 0, 51, 0)");
//   gradient.addColorStop(0.2, "rgba(153, 0, 51, 0.1)");
//   gradient.addColorStop(0.3, "rgba(153, 0, 51, 0.25)");
//   gradient.addColorStop(0.45, "rgba(153, 0, 51, 0.5)");
//   gradient.addColorStop(0.85, "rgba(255, 92, 94, 0.75)");
//   gradient.addColorStop(1, "rgba(255, 92, 94, 0.75)");

//   return gradient;
// }

export function JobLineChart({ info }) {
  const { chartData } = info;

  const data = {
    labels: chartData.labels,
    datasets: [
      {
        label: "",
        data: chartData.data,
        // backgroundColor: createGradient(chart.ctx, chart.chartArea),
        // borderColor: "rgba(241, 20, 61, 1)",
        // borderWidth: 5,
        backgroundColor: (e) => {
          if (!e.raw) {
            return "white";
          }
          switch (e.raw.state) {
            case "ACT":
              return "rgba(241, 20, 61, 1)";
            case "NSW":
              return "#f4970d";
            case "NT":
              return "#226406";
            case "NZL":
              return "#535353";
            case "QLD":
              return "#624dff";
            case "SA":
              return "#0007da";
            case "TAS":
              return "#e82de2";
            case "VIC":
              return "#eef433";
            case "WA":
              return "#3ef2ff";

            default:
              console.log(e.raw.state);
              return "black";
          }
        },
        // pointRadius: 0.2,
        // fill: "start",
        // tension: 0.5,
      },
    ],
  };

  if (data == null) {
    return null;
  }

  return <Bar options={options} data={data} />;
}
