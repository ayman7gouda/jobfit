import type { NextPage } from "next";

import { Layout } from 'components/Admin/Skills/Layout';
import { SkillDetails } from 'components/Admin/Skills/SkillDetails';

const Home: NextPage = () => {
  return (
    <Layout>
      <SkillDetails />
    </Layout>
  );
};

export default Home;
