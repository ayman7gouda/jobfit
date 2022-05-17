import { SubjectSkills } from 'components/Admin/SubjectSkills/SubjectSkillDetails';

import type { NextPage, NextPageContext } from "next";

const SubjectSkillsPage: NextPage = () => {
  return <SubjectSkills />;
};

SubjectSkillsPage.getInitialProps = async (context: NextPageContext) => {
  // const props = {
  //   id: context.query.id || null,
  // };
  // console.log(props);

  return {};
};

export default SubjectSkillsPage;
