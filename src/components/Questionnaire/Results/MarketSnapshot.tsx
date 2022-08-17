import React from "react";
import { JobRoleProfileQuery } from "../queries/jobRoleProfile.query.generated";
import AverageSalary from "./AverageSalary";
import ProjectionGauge from "./ProjectionGauge";

type Props = {
  profile: JobRoleProfileQuery["jobRoleProfile"];
};

export const MarketSnapshot: React.FC<Props> = ({ profile }) => {
  const {
    name: roleName,
    jobCount,
    demand,
    projection,
    minSalary,
    maxSalary,
    employers,
  } = profile;
  return (
    <div className="flex flex-col items-start p-10 w-full bg-white gap-6 shadow-btn rounded-2xl">
      <h1 className="text-base font-bold">{roleName} Market Snapshot</h1>
      <div className="flex flex-row w-full justify-between">
        <div className="flex flex-col gap-6 justify-between">
          <div className="flex flex-col gap-3">
            <h2 className="text-sm font-[600] text-mid-grey pb-1">Demand</h2>
            <p>
              {" "}
              <span className="font-bold">{jobCount}</span> Job postings in the
              last 12 months
            </p>
            <p>
              <span className="font-bold capitalize">{demand}</span> demand
              relative to other jobs
            </p>
          </div>
          <AverageSalary min={minSalary} max={maxSalary} />
        </div>
        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-6 items-start justify-center">
            <h1>National Projected Growth</h1>
            <div className="flex flex-col items-center justify-center gap-3">
              <ProjectionGauge
                value={projection}
                min={-15}
                max={30}
                labels={["< 0%", "0 - 15%", "> 15%"]}
              />
              <p className="text-sm">Signigicant estimated growth (10 yrs)</p>
            </div>
          </div>

          <div className="flex flex-row gap-6">
            <div className="flex flex-col">
              <h2 className="text-sm font-[600] text-mid-grey pb-1">
                Top Employers
              </h2>
              <ul className="text-sm">
                {employers.map((items) => (
                  <li>{items.name}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarketSnapshot;
