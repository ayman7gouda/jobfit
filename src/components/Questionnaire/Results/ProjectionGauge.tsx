import React from "react";
import { arc } from "d3-shape";
import { scaleLinear } from "d3-scale";
const ProjectionGauge = ({ value, min, max, labels }) => {
  const backgroundArc1 = arc()
    .innerRadius(0.5)
    .outerRadius(1)
    .startAngle(-Math.PI/2)
    .endAngle(Math.PI/2)
    .cornerRadius(0)();
  const backgroundArc2 = arc()
    .innerRadius(0.45)
    .outerRadius(1.05)
    .startAngle(-0.56)
    .endAngle(0.56)
    .cornerRadius(0)();
  const percentScale = scaleLinear().domain([min, max]).range([0, 1]);
  const percent = percentScale(value);
  const angleScale = scaleLinear()
    .domain([0, 1])
    .range([-Math.PI / 2, Math.PI / 2])
    .clamp(true);
  const angle = angleScale(percent);
  // const filledArc1 = arc()
  //   .innerRadius(0.55)
  //   .outerRadius(1)
  //   .startAngle(-Math.PI / 2)
  //   .endAngle(angle)
  //   .cornerRadius(0)();
  //   const filledArc2 = arc()
  //   .innerRadius(0.55)
  //   .outerRadius(1)
  //   .startAngle(-Math.PI / 2)
  //   .endAngle(angle)
  //   .cornerRadius(0)();
  //   const filledArc3 = arc()
  //   .innerRadius(0.55)
  //   .outerRadius(1)
  //   .startAngle(-Math.PI / 2)
  //   .endAngle(angle)
  //   .cornerRadius(0)();
  const colorScale = scaleLinear().domain([0, 1]).range(["#081F30", "#E90133"]);
  const gradientSteps = colorScale.ticks(10).map((value) => colorScale(value));
  const colorScaleEclipse = scaleLinear().domain([0, 1]).range(["#990033", "#ED0033", "#FF5C5E"]);
  const gradientStepsEclipse = colorScaleEclipse.ticks(5).map((value) => colorScaleEclipse(value));
  const text = ["< 0%", "0 - 15%", "> 15%"]
  return (
    <div
      style={{
        textAlign: "center",
      }}
    >
      <svg
        style={{ overflow: "visible" }}
        width="11em"
        viewBox={[-1, -1, 2, 1].join(" ")}
      >
        <defs>
          <linearGradient
            id="Gauge__gradient"
            gradientUnits="userSpaceOnUse"
            x1="-1"
            x2="1"
            y2="0"
          >
            {gradientSteps.map((color, index) => (
              <stop
                key={color}
                stopColor={color}
                offset={`${index / (gradientSteps.length - 1)}`}
              />
            ))}
          </linearGradient>
          <linearGradient
            id="Eclipse__gradient"
            gradientUnits="userSpaceOnUse"
            x1="-1"
            x2="1"
            y2="0"
          >
            {gradientStepsEclipse.map((color, index) => (
              <stop
                key={color}
                stopColor={color}
                offset={`${index / (gradientSteps.length - 1)}`}
              />
            ))}
          </linearGradient>
        </defs>
        <path d={backgroundArc1} fill="url(#Gauge__gradient)" textAnchor="Test" />
        {/* <path d={filledArc1} fill="url(#Gauge__gradient)" />
        <path d={filledArc2} fill="url(#Gauge__gradient)" />
        <path d={filledArc3} fill="url(#Gauge__gradient)" /> */}
        <path d={backgroundArc2} fill="url(#Eclipse__gradient)" />
        <text x="-0.8" y="-.3" fontSize="0.13" fill="white">{labels[0]}</text>
        <text fontSize="0.13" fill="white" transform="translate(-0.2, -0.65)">{labels[1]}</text>
        <text x="0.5" y="-.3" fontSize="0.13" fill="white">{labels[2]}</text>
        <line
          x1="-0.64"
          y1="-1"
          x2="0"
          y2="0"
          stroke="white"
          strokeWidth="0.027"
        />
        <line
          x1="0.64"
          y1="-1"
          x2="0"
          y2="0"
          stroke="white"
          strokeWidth="0.027"
        />
        {/* <circle
          cx={markerLocation[0]}
          cy={markerLocation[1]}
          r="0.2"
          stroke="#2c3e50"
          strokeWidth="0.01"
          fill={colorScale(percent)}
        /> */}
        <path
          d="M0.136364 0.0290102C0.158279 -0.0096701 0.219156 -0.00967009 0.241071 0.0290102C0.297078 0.120023 0.375 0.263367 0.375 0.324801C0.375 0.422639 0.292208 0.5 0.1875 0.5C0.0852272 0.5 -1.8346e-08 0.422639 -9.79274e-09 0.324801C0.00243506 0.263367 0.0803571 0.120023 0.136364 0.0290102ZM0.1875 0.381684C0.221591 0.381684 0.248377 0.356655 0.248377 0.324801C0.248377 0.292947 0.221591 0.267918 0.1875 0.267918C0.153409 0.267918 0.126623 0.292947 0.126623 0.324801C0.126623 0.356655 0.155844 0.381684 0.1875 0.381684Z"
          transform={`rotate(${
            angle * (180 / Math.PI)
          }) translate(-0.2, -0.35)`}
          fill="#000"
        />
      </svg>
      <div className="text-base font-OpenSans font-bold mt-5">{(value<=0?"":"+") + (Math.round(value * 100) / 100).toFixed(1)}%</div>
    </div>
  );
};
const getCoordsOnArc = (angle, offset = 10) => [
  Math.cos(angle - Math.PI / 2) * offset,
  Math.sin(angle - Math.PI / 2) * offset,
];

export default ProjectionGauge;
