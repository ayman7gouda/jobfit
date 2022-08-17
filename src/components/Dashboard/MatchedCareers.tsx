import React from "react";

const MatchedCareers = () => {
  return (
    <div className="w-full flex flex-col items-start justify-center p-5 text-white gap-2">
      <h1 className="text-xl font-bold pb-4">Matched Careers</h1>
        <table className="w-full divide-y divide-dark-ui-white-15 mb-4">
          <thead className="">
            <tr className="">
              <th className="pb-2 text-xs text-left text-white/75">Career</th>
              <th className="pb-2 text-xs text-left text-white/75">Questionnaire %</th>
              <th className="pb-2 text-xs text-left text-white/75">JobFit %</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-dark-ui-white-15">
            <tr className="bg-white/[0.03] border-l-2 border-[#ed0033]">
              <td className="p-2 font-bold text-sm">Software developer</td>
              <td className="p-2 font-bold text-sm">72%</td>
              <td className="p-2 font-bold text-sm">90%</td>
            </tr>
            <tr>
              <td className="p-2">Security engineer</td>
              <td className="p-2">72%</td>
              <td className="p-2">21%</td>
            </tr>
            <tr>
              <td className="p-2">Data scientist</td>
              <td className="p-2">68%</td>
              <td className="p-2">20%</td>
            </tr>
          </tbody>
        </table>
        <button className="flex justify-center items-center rounded-lg w-full py-4 bg-gradient-to-r from-crimson via-[#ed0033] to-hilight-orange">
          <p className="font-bold text-base">Career Information</p>
        </button>
        <button className="flex justify-center items-center border-2 rounded-lg w-full py-4 bg-white/[0.05] border-white/[0.3]">
          <p className="font-bold text-base">JobFit Questionnaire</p>
        </button>
        <button>

        </button>
      </div>
  );
};

export default MatchedCareers;
