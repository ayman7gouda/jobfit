import React from "react";
import MatchedCareers from "./MatchedCareers";
import SkillsBar from "./SkillsBar";

const CareerGoal = () => {
  return (
    <div className="w-full flex flex-row rounded-2xl bg-dark-ui-dark-blue-lv-1 shadow-sm overflow-hidden">
      <div className="w-full bg-dashboard-goal p-10">
        <div className="flex flex-row justify-between">
          <h2 className="text-xl font-bold text-text-lighter">Career Goal</h2>
          <div className="flex flex-col justify-center items-center">
            <input type="checkbox" id="checkbox1" className="" />
            <label htmlFor="" className="text-white text-xs">
              Set as goal
            </label>
          </div>
        </div>
        <h1 className="text-[52px] font-extrabold text-white">
          Software developer
        </h1>
        <h2 className="text-sm text-white mt-16">
          You’re on your way to becoming skilled as a Software Developer!
        </h2>
        <div className="w-full h-6 bg-black rounded-lg mt-4 flex">
          <div className="w-[50%] rounded-lg bg-[#ed0033]"></div>
          {/* <span className="w-[50%] text-white">50%</span> */}
        </div>
      </div>
      <div className="flex flex-row w-[35%]">
        <MatchedCareers />
      </div>
      <div></div>
    </div>
  );
};

export default CareerGoal;
