import React from "react";
import LineChart from "components/LineChart";

const LineChartUI = ({ data, Id, Index, setIndex }) => {
  const handleSetIndex = (Id) => Index !== Id && setIndex(Id);

  return (
    <>
      <div className="w-full" onClick={() => handleSetIndex(Id)}>
        {Index === Id && (
          <div className="flex flex-col items-center justify-center gap-10">
            <div className="mb-20 text-base font-semibold">
              Salary Projection
            </div>
            <div className="w-full">
              <LineChart info={data} />
            </div>    
          </div>
        )}
      </div>
    </>
  );
};

export default LineChartUI;
