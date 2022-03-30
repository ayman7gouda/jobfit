import React from "react";

export default function JobFitFrame({ title, icon, content }) {
  return (
    <div className="flex flex-col w-full h-44 sm:w-64 sm:h-64  rounded-lg bg-white shadow-sm place-content-center gap-6 items-start sm:items-center p-5">
      <div className="flex flex-row gap-4 items-center">
        <img src={icon} alt="" className="" />
        <h3 className="font-bold text-[24px]">{title}</h3>
      </div>
      <p className="text-[16px] leading-wsu text-black items-start sm:text-center px-2">
        {content}
      </p>
    </div>
  );
}
