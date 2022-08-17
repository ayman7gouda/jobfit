import React, { useState } from "react";

const SideBar = () => {

  return (
    <div className="h-screen w-32 bg-dark-ui-dark-blue-lv-1 border-r-[1px] border-med-blue">
      <div className="flex flex-col justify-center items-center">
        <img
          src="./images/mini_logo.svg"
          alt=""
          className="w-[75px] h-[75px]"
        />
        <div className="w-full flex flex-col justify-center items-center mt-16">
          <button className="w-full h-[120px] flex flex-col justify-center items-center bg-[#2c353b]">
            <img src="./images/dashboard.svg" alt="" />
            <span className="text-base text-white text-center">
              Dashboard
            </span>
          </button>
          <button className="w-full h-[120px] flex flex-col justify-center items-center">
            <img src="./images/schedule.svg" alt="" />
            <span className="text-base text-mid-grey text-center">
              Schedule
            </span>
          </button>
          <button className="w-full h-[120px] flex flex-col justify-center items-center">
            <img src="./images/jobBoard.svg" alt="" />
            <span className="text-base text-mid-grey text-center">
              Job Board
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
