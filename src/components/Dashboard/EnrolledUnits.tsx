import React from "react";

const EnrolledUnits = () => {
  return (
    <div className="w-full h-80 flex flex-row rounded-2xl bg-dark-ui-dark-blue-lv-1 shadow-sm overflow-hidden p-4">
        <div className="flex flex-row items-start justify-center gap-6">
            <img src="./images/CalendarCheck.svg" alt="" />
            <h3 className="text-base font-bold text-text-lighter">Enrolled Units</h3>
            <h2 className="text-xl font-bold text-white">Semester 1 Autumn</h2>
            <img src="./images/autumn.svg" alt="" />
        </div>
    </div>
  );
};

export default EnrolledUnits;
