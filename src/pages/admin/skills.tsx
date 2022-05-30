import type { NextPage } from "next";

import { useEffect, useState } from 'react';

import { Layout } from 'components/Admin/Skills/Layout';

const Home: NextPage = () => {
  const [ready, setReady] = useState(false);

  useEffect(() => setReady(true), []);

  if (!ready) {
    return <span></span>;
  }

  return (
    <Layout>
      <div className="pt-4 px-4">Please choose a skill category</div>
    </Layout>
  );
};

export default Home;
