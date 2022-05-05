import React from 'react';

import { SkillCategories } from 'components/Admin/Skills/SkillCategories';
import Head from 'next/head';

export const Layout = ({ children }: React.PropsWithChildren<{}>) => {
  return (
    <>
      <Head>
        <title>Skills Processing for JobFit</title>
        <meta name="description" content="JobFit Skills Handler" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="flex min-h-screen">
        <Head>
          <title>House Credit Maintenance</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <section
          className="bg-yellow-400 h-screen overflow-auto p-4 drop-shadow-lg"
          style={{ direction: "rtl" }}
        >
          <div style={{ direction: "ltr" }}>
            <i>Skill Categories</i>
            <SkillCategories />
          </div>
        </section>
        <section className="flex-1">{children}</section>
      </div>
    </>
  );
};
