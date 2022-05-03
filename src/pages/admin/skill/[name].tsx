import type { NextPage } from "next";

import { Layout } from 'components/Admin/Layout';
import { SkillDetails } from 'components/Admin/SkillDetails';

const Home: NextPage = () => {
  return (
    <Layout>
      <SkillDetails />
    </Layout>
  );
};

export default Home;
