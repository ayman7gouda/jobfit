import type { NextPage } from "next";

import { SearchBar } from "components/SearchBar";

const Home: NextPage = () => {
  return (
    <>
      <SearchBar />
      <style jsx global>{`
        body,
        html,
        #__next {
          height: 100%;
        }
      `}</style>
    </>
  );
};

export default Home;
