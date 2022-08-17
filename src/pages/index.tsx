import { NextPageContext } from "next";

import { getSession, useSession } from "next-auth/react";
import Head from "next/head";

import CareerData from "components/Landing/CareerData";
import HeaderHero from "components/Landing/HeaderHero";
import MarketJobFit from "components/Landing/MarketJobFit";
import ReadyApply from "components/Landing/ReadyApply";
import StudyWSU from "components/Landing/StudyWSU";
import Footer from "components/Footer";

export default function Home({ csrfToken }) {
  const session = useSession();

  return (
    <div>
      <Head>
        <title>JobFit</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="overflow-hidden">
        <HeaderHero />
        <MarketJobFit />
        <CareerData />
        <StudyWSU />
        <ReadyApply />
        <Footer />
      </div>
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
