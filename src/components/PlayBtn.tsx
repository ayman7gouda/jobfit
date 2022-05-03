import React from "react";

export default function PlayBtn({ icon, content }) {
  return (
    <div className="w-full md:w-[378px] h-[168px] shadow-sm rounded-tr-[1.5rem] rounded-bl-[1.5rem] rounded-tl-[1rem] rounded-br-[1rem] p-[6px] bg-white">
      <button
        type="button"
        className="w-full h-full rounded-tr-[1.5rem] rounded-bl-[1.5rem] rounded-tl-[1rem] rounded-br-[1rem] bg-gradient-to-r from-[#081f30] to-[#e90133] overflow-hidden"
      >
        <div className="relative">
          <img src={icon} alt="" className="w-[64px] h-[64px] block m-auto" />
          <div className="">
          <img
            src="./images/hex.svg"
            alt=""
            className="absolute left-0 top-0 right-0 bottom-0 block m-auto w-[168px]"
          />
          </div>
          
        </div>

        <div className="text-white text-xl font-bold">{content}</div>
      </button>
    </div>
  );
}
