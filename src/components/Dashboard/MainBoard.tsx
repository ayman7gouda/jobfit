import React, { useState } from "react";
import { RiNotification3Fill } from "react-icons/ri";
import CareerGoal from "./CareerGoal";
import EnrolledUnits from "./EnrolledUnits";

const MainBoard = () => {
  return (
    <div className="w-full bg-backgrounds-dark-blue">
      <div className="w-full h-[75px] flex flex-row justify-between items-center border-b-[1px] border-med-blue">
        <h1 className="text-text-lighter font-bold text-2xl p-4">
          Welcome back,
          <a className="text-white"> Lina!</a>
        </h1>
        <div className="flex flex-row gap-4 pr-4">
          <button className="w-[36px] h-[36px] rounded-full bg-dark-ui-dark-blue-lv-3 flex justify-center items-center">
            <RiNotification3Fill style={{ color: "white", fontSize: "24px" }} />
          </button>
          <div className="w-[36px] h-[36px] rounded-full  bg-safe-orange"></div>
        </div>
      </div>
      <div className="my-8 mx-10 flex flex-col gap-8">
        <CareerGoal />
        <EnrolledUnits />
      </div>
    </div>
  );
};

export default MainBoard;
