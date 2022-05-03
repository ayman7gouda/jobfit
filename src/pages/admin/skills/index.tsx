import type { NextPage } from "next";

import { Layout } from 'components/Admin/Layout';

const Home: NextPage = () => {
  return (
    <Layout>
      <div className="pt-4 px-4">Please choose a skill category</div>
    </Layout>
  );
};

export default Home;
