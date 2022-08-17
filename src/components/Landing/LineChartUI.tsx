import React from "react";
import LineChart from "components/Landing/LineChart";

const LineChartUI = ({ data, Id, Index, setIndex }) => {
  const handleSetIndex = (Id) => Index !== Id && setIndex(Id);

  return (
    <>
      <div className="w-full" onClick={() => handleSetIndex(Id)}>
        {Index === Id && (
          <div className="flex flex-col items-center justify-center md:gap-10">
            <div className="mb-4 md:mb-10 md:mt-10 text-base font-semibold">
              Salary Projection
            </div>
            <div className="w-full md:pb-10">
              <LineChart info={data} />
            </div>    
          </div>
        )}
      </div>
    </>
  );
};

export default LineChartUI;
