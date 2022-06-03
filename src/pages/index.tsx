import { NextPageContext } from "next";

import Landing from "components/Landing/Landing";
import { getSession } from "next-auth/react";
import Head from "next/head";

export default function Home({ csrfToken }) {
  // const session = useSession();

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
