import { SkillsList } from "components/Admin/SkillsList/SkillsList";
import React from "react";
import { JobRoleProfileQuery } from "../queries/jobRoleProfile.query.generated";

type Props = {
  profile: JobRoleProfileQuery["jobRoleProfile"];
};

const SkillsSnapshot: React.FC<Props> = ({ profile }) => {

  const {
    name: roleName,
    skills,
  } = profile;

  return (
    <div className="flex flex-col items-start p-10 w-full bg-white gap-6 shadow-btn rounded-2xl">
      <h1 className="text-base font-bold">{roleName} Skills Snapshot</h1>

      <p className="text-dark-grey text-base">
        The skills most in demand for a {roleName} role.
      </p>
      <p className="text-dark-grey text-sm">
        The skills you indicated you have are already checked in the list.
      </p>

      <div>
        <h1>Specialised Skills</h1>
        <div className="flex flex-wrap flex-1 gap-2 mt-4">
          {skills.map((items) => (
            <div className="whitespace-nowrap flex grow items-center justify-center border-2 rounded-full border-black py-2 px-3">
              <span className="text-sm text-center leading-wsu ">{items.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SkillsSnapshot;
