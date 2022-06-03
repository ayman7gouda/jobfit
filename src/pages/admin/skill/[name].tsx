import type { NextPage, NextPageContext } from "next";

import { Layout } from 'components/Admin/Skills/Layout';
import { SkillDetails } from 'components/Admin/Skills/SkillDetails';

const Page: NextPage = () => {
  return (
    <Layout>
      <SkillDetails />
    </Layout>
  );
};

Page.getInitialProps = async (context: NextPageContext) => {
  return {};
};

export default Page;
