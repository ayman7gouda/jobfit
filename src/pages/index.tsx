import { NextPageContext } from 'next';

import { Login } from 'components/Auth/Login';
import { UserInfo } from 'components/Auth/UserInfo';
import { SkillsList } from 'components/SkillsList/SkillsList';
import { getSession, useSession } from 'next-auth/react';
import Head from 'next/head';

export default function Home({ csrfToken }) {
  const session = useSession();

  return (
    <div className="flex min-h-screen">
      <Head>
        <title>JobFit</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <section className="bg-gray-400 h-screen overflow-auto p-4">
        <SkillsList />
      </section>
      <section className="flex-1 bg-red-400">
        <h1>User</h1>
        <UserInfo />
        {!session && (
          <>
            <h1>Login</h1>
            <Login csrfToken={csrfToken} />
          </>
        )}
      </section>
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
