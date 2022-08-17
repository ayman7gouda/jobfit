import React, { useState } from "react";

const AverageSalary = ({ min, max }) => {
  const avg = (min + max) / 2;

  return (
    <div className="flex flex-col w-[342px] items-center mr-6">
      <h1 className="text-sm font-[600] text-mid-grey text-left w-full mb-6">
        Average Salary (AUD)
      </h1>
      <div className="text-base font-bold w-full text-center">
        ${(Math.round(avg) / 1000).toFixed(0)}K
      </div>
      <div className="w-4 overflow-hidden">
        <div className="h-3 w-3 bg-black -rotate-45 transform origin-top-left"></div>
      </div>
      <div className="w-full h-3 bg-[#c4c2c3] flex flex-row items-center">
        <div className="w-[20%] h-3 bg-[#c4c2c3]"></div>
        <div className="w-[60%] h-3  bg-gradient-to-r from-crimson via-cherry-red to-hilight-orange"></div>
        <div className="w-[20%] h-3 bg-[#c4c2c3]"></div>
      </div>

      <div className="w-full flex flex-row text-sm">
        <div className="w-[20%]"></div>
        <div className="w-[60%] -ml-5">
          ${(Math.round(min) / 1000).toFixed(0)}K
        </div>
        <div className="w-[20%]">${(Math.round(max) / 1000).toFixed(0)}K</div>
      </div>
    </div>
  );
};

export default AverageSalary;
