import React from "react";

const WSUprograms = (Props) => {
  return (
    <div className="flex flex-col overflow-hidden w-[9rem] md:w-[318px] shadow-btn rounded-2xl">
      <img src="../images/st01.png" alt="" />

      <div className="flex flex-col text-black bg-white items-center justify-center gap-2 p-6">
        <h1 className="text-2xl font-bold text-center">Data Scientist</h1>
        <span className="text-base text-center">Programs at</span>
        <span className="text-base text-center">Western Sydney University</span>
        <div className="flex flex-col pt-3 gap-2">
          <button className="flex items-center w-full rounded-lg bg-crimson px-6 py-4">
            <p className="text-base font-bold text-white text-center">
              Bachelor of Information Systems
            </p>
          </button>
          <button className="flex items-center w-full rounded-lg bg-crimson px-6 py-4">
            <p className="text-base font-bold text-white text-center">
              Bachelor of Information Systems (Adv)
            </p>
          </button>
        </div>

        <p className="text-xs leading-wsu font-bold pt-4 pb-2">
          Apply now and start your unlimited journey.
        </p>
        <button className="flex justify-center items-center border-2 rounded-lg w-full py-2 px-4 bg-light-ui-black-5 border-light-ui-black-30">
          <p className="font-bold text-xs">Explore all programs</p>
        </button>
        {/* loginComponent */}
      </div>
    </div>
  );
};

export default WSUprograms;
