import React from "react";

export default function playSpace() {
  return (
    <div className="container bg-backgrounds-dark-blue">
      <div className="p-6">
      <li
        className="w-[23rem] border border-[#f9f1f2] rounded-tr-2xl rounded-bl-2xl rounded-br-md rounded-tl-md p-4 text-white flex flex-col gap-2 items-start bg-pine-green-54 mb-4"
      >
        <h2 className="w-full m-0 flex items-center justify-center">
          <button
            className="flex items-center justify-start w-full border-0 p-0 text-2xl font-bold cursor-pointer select-none">
            Title
          </button>
        </h2>
        <div className="transition-[height] ease-in-out duration-200 overflow-hidden">
          <div className="mt-[10px] leading-wsu text-base">
          Systems developers design, develop, test, maintain and document program code in accordance with user requirements, and system and technical specifications.
          </div>
        </div>
      </li>
      <li
        className="w-[23rem] border border-med-blue rounded-tr-2xl rounded-bl-2xl rounded-br-md rounded-tl-md p-4 text-white flex flex-col items-center bg-backgrounds-dark-blue"
      >
        <h2 className="w-full m-0 flex items-center justify-center">
          <button
            className="flex items-center justify-center w-full border-0 p-0 text-2xl font-bold cursor-pointer select-none">
            Title
          </button>
        </h2>
      </li>
      </div>
    </div>
  );
}
