import { NextPageContext } from "next";

import { Login } from "components/Auth/Login";
import { UserInfo } from "components/Auth/UserInfo";
import { SkillsList } from "components/SkillsList/SkillsList";
import { getSession, useSession } from "next-auth/react";
import Head from "next/head";
import Landing from "pages/Landing";


export default function Home({ csrfToken }) {
  const session = useSession();

  return (
    <div>
      <Head>
        <title>JobFit</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
    <Landing />
    </div>
  );
}

// Export the `session` prop to use sessions with Server Side Rendering
export async function getServerSideProps(context: NextPageContext) {
  return {
    props: {
      session: await getSession(context),
    },
  };
}
