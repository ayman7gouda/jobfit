import React, { useState, useEffect } from "react";
import { useJobRoleProfileQuery } from "../queries/jobRoleProfile.query.generated";
import WSUprograms from "./WSUprograms";

import MarketSnapshot from "./MarketSnapshot";
import SkillsSnapshot from "./SkillsSnapshot";

import classNames from "classnames";

const Results = ({ results }) => {
  // var matches = [];
  // matches.push(Number(results.career1));
  // matches.push(Number(results.career2));
  // matches.push(Number(results.career3));

  const [selected, setSelected] = useState(results[0].id);
  const { data, loading } = useJobRoleProfileQuery({
    variables: { unit: selected },
  });

  const [shrunk, setShrunk] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setShrunk((shrunk) => {
        if (
          !shrunk &&
          (document.body.scrollTop > 250 ||
            document.documentElement.scrollTop > 250)
        ) {
          return true;
        }

        if (
          shrunk &&
          document.body.scrollTop < 20 &&
          document.documentElement.scrollTop < 20
        ) {
          return false;
        }

        return shrunk;
      });
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div>
      <section className="bg-backgrounds-dark-blue">
        <header className="container w-full p-4">
          <div className="w-full flex flex-row items-start justify-between gap-14 pb-20">
            <div className="flex flex-row gap-24">
              <img src="../images/WSU.svg" alt="" className="w-52" />
              <img src="../images/logo 2.svg" alt="" className="w-28" />
            </div>
            <div className="flex flex-row gap-6 text-white pr-6">
              <p>Log in</p>
              <p>Sign up</p>
            </div>
          </div>
        </header>
      </section>

      <section className="bg-backgrounds-dark-blue sticky top-0 ">
        <div
          className={classNames(
            "container flex flex-row transition duration-500",
            { "py-4": shrunk }
          )}
        >
          <div className="w-[70%] flex flex-col items-center gap-4 pr-12 text-white">
            {!shrunk && (
              <div>
                <h1 className="text-5xl uppercase font-extrabold text-center">
                  Your Results
                </h1>
                <p className="py-5 px-16 text-xl leading-wsu text-center">
                  Based on your answers the following careers could suit your
                  interests and skills.
                </p>
              </div>
            )}
            <div className="w-full flex flex-row items-center justify-center gap-4 text-white">
              {results.map((items) => (
                <div className="w-1/3 flex flex-col items-center justify-center gap-3 ">
                  {/* {!shrunk && (
                    <p className="text-sm">{items}% match</p>
                  )} */}
                  <button
                    className={classNames("rounded-md w-full" , {
                      "bg-gradient-to-r from-[#b80541] to-hilight-orange":
                        selected === items.id,
                      "border-[2px] border-dark-ui-white-30":
                        selected !== items.id,
                      "p-3 h-32": !shrunk,
                      "p-2": shrunk,
                    })}
                    key={items.id}
                    onClick={() => setSelected(items.id)}
                  >
                    <span
                      className={classNames("font-bold text-center", {
                        "text-sm": shrunk,
                        "text-lg": !shrunk,
                      })}
                    >
                      {items.name}
                    </span>
                  </button>
                </div>
              ))}
            </div>
            {!shrunk && (
              <a className="pb-4" href="/questionnaire">
                <button className="text-white">Retake questionaire</button>
              </a>
            )}
          </div>
          <div className="w-[30%] relative">
            <div className={classNames("fixed top-20", { "top-6": shrunk })}>
              <WSUprograms />
            </div>
          </div>
        </div>
      </section>

      {loading && (
        <section className="container mt-10">
          <div className="w-[70%] py-4 pr-12 flex justify-center">
            <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-32 w-32"></div>
          </div>
        </section>
      )}

      {!loading && data && (
        <section className="bg-backgrounds-light-grey">
          <div className="container w-full p-4 flex flex-col items-start justify-between text-black">
            <div className="w-[70%] flex flex-row pr-12">
              <div className="flex flex-col gap-6 items-center">
                <h1 className="text-3xl font-[800] uppercase">
                  {data.jobRoleProfile.name}
                </h1>
                <p className="text-base leading-wsu whitespace-pre-wrap">
                  {data.jobRoleProfile.description}
                </p>
                <MarketSnapshot profile={data.jobRoleProfile} />
                <SkillsSnapshot profile={data.jobRoleProfile} />
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default Results;
