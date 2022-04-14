import Accordion from "components/Accordion";
import React from "react";
import LineChart from "components/LineChart";
import { UserData } from "./../Data";
import SalaryChart from "components/SalaryChart";

export default function CareerData() {
  const accordionItems = [
    {
      title: "Software Developer",
      content:
        "Systems developers design, develop, test, maintain and document program code in accordance with user requirements, and system and technical specifications.",
    },
    {
      title: "Game Developer",
      content:
        "Systems developers design, develop, test, maintain and document program code in accordance with user requirements, and system and technical specifications.",
    },
    {
      title: "Database Administrator or Programmer",
      content:
        "Systems developers design, develop, test, maintain and document program code in accordance with user requirements, and system and technical specifications.",
    },
    {
      title: "Information Systems Manager",
      content:
        "Systems developers design, develop, test, maintain and document program code in accordance with user requirements, and system and technical specifications.",
    },
    {
      title: "Web Systems Developer",
      content:
        "Systems developers design, develop, test, maintain and document program code in accordance with user requirements, and system and technical specifications.",
    },
    {
      title: "Network Administrator or Engineer",
      content:
        "Systems developers design, develop, test, maintain and document program code in accordance with user requirements, and system and technical specifications.",
    },
  ];
  return (
    <section className=" bg-backgrounds-dark-blue">
      <div className="container flex flex-col py-12 lg:py-24  gap-14 text-white">
        <div className="flex flex-1 flex-col item-center lg:items-center">
          <h2 className="text-white text-2xl lg:text-3xl font-[800]">
            Setup yourself up to thrive in an area of growth
          </h2>
        </div>
        <div className="flex flex-col lg:flex-row gap-6 ">
          <div className="w-1/3">
            <Accordion items={accordionItems} />
          </div>
          <div className="">
          <LineChart />
          </div>
        </div>
        <h2 className="text-white text-xl lg:text-2xl font-[600]">
          Not sure which career suits your interests and skills?
        </h2>
        <div className="flex flex-1 flex-col md:flex-row gap-8">
          <p className="w-1/2 text-base leading-wsu">
            Take a quick questionnaire, explore the market more deeply and get
            Western Sydney University course recommendations based on your
            interests and skills.
          </p>
          <button
            type="button"
            className="w-1/2 md:w-[36rem] h-[4rem] lg:h-[4rem] btn-red"
          >
            <div className="text-xs lg:text-2xl font-bold text-white">
              Take the JobFit questionnaire
            </div>
          </button>
        </div>
      </div>
    </section>
  );
}
