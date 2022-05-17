import classNames from 'classnames';
import React, { useState } from 'react';

import { Spinner } from 'components/Spinner';
import { parseQuery } from 'lib/utils';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { HiChevronDoubleLeft, HiChevronRight, HiThumbDown, HiThumbUp } from 'react-icons/hi';

import {
  FindSubjectSkillsDocument, FindSubjectSkillsQuery, useFindSubjectSkillsQuery
} from './queries/findSubject.query.generated';
import {
  SaveSubjectSfiaMutationFn, useSaveSubjectSfiaMutation
} from './queries/saveSubjectSfia.mutation.generated';
import { useSfiaQuery } from './queries/sfia.query.generated';
import { AllSfiaQuery, useAllSfiaQuery } from './queries/sfias.query.generated';

const Button = ({
  children,
  className,
  ...rest
}: React.ButtonHTMLAttributes<HTMLButtonElement>) => (
  <button
    {...rest}
    type="button"
    className={classNames(
      className,
      "relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium hover:text-gray-200  hover:bg-crimson focus:z-10 focus:outline-none focus:ring-1 focus:ring-crimson focus:border-crimson"
    )}
  >
    {children}
  </button>
);

function getLevel(data: SubjectEstimates) {
  return [data.l1, data.l2, data.l3, data.l4, data.l5, data.l6, data.l7].reduce(
    (p, n, i) => {
      if (p.value < n) {
        return {
          level: i + 1,
          value: n,
        };
      }
      return p;
    },
    { level: 0, value: 0 }
  ).level;
}

export const CircularProgressBar = ({
  sqSize,
  strokeWidth,
  percentage,
  color,
}) => {
  // SVG centers the stroke width on the radius, subtract out so circle fits in square
  const radius = (sqSize - strokeWidth) / 2;
  // Enclose cicle in a circumscribing square
  const viewBox = `0 0 ${sqSize} ${sqSize}`;
  // Arc length at 100% coverage is the circle circumference
  const dashArray = radius * Math.PI * 2;
  // Scale 100% coverage overlay with the actual percent
  const dashOffset = dashArray - (dashArray * percentage) / 100;

  return (
    <>
      <svg
        style={{ "--color": color } as any}
        width={sqSize}
        height={sqSize}
        viewBox={viewBox}
      >
        <circle
          className="circle-background"
          cx={sqSize / 2}
          cy={sqSize / 2}
          r={radius}
          strokeWidth={`${strokeWidth}px`}
        />
        <circle
          className="circle-progress"
          cx={sqSize / 2}
          cy={sqSize / 2}
          r={radius}
          strokeWidth={`${strokeWidth}px`}
          // Start progress marker at 12 O'Clock
          transform={`rotate(-90 ${sqSize / 2} ${sqSize / 2})`}
          style={{
            strokeDasharray: dashArray,
            strokeDashoffset: dashOffset,
          }}
        />
        <text
          className="circle-text"
          x="50%"
          y="50%"
          dy=".3em"
          textAnchor="middle"
        >
          {`${percentage}%`}
        </text>
      </svg>
      <style jsx>
        {`
          .circle-background,
          .circle-progress {
            fill: none;
          }

          .circle-background {
            stroke: #ddd;
          }

          .circle-progress {
            stroke: var(--color);
            stroke-linecap: round;
            stroke-linejoin: round;
          }

          .circle-text {
            font-size: 10px;
            font-weight: bold;
            fill: var(--color);
          }
        `}
      </style>
    </>
  );
};

function SfiaDetail({ id }: { id: number }) {
  const { data, loading } = useSfiaQuery({
    variables: {
      id,
    },
  });
  if (loading) {
    return <Spinner />;
  }
  return (
    <div>
      <h2 className="text-lg mb-1 font-bold">{data.sfia.name}</h2>
      <p>{data.sfia.description}</p>
      <h3 className="text-lg mb-1 mt-2 font-bold">Guidance</h3>
      <p>{data.sfia.guidance.replace("Guidance notes", "")}</p>
      <h3 className="text-lg mb-1 mt-2 font-bold">Levels</h3>
      {data.sfia.levels.map((l) => (
        <div className="flex mb-4" key={l.level}>
          <div className="w-24 shrink-0">Level {l.level}</div>
          <div>{l.description}</div>
        </div>
      ))}
    </div>
  );
}

type SubjectSkills = FindSubjectSkillsQuery["findSubjectSkills"];
type SubjectEstimates = SubjectSkills["sfiaEstimates"][0];
type SubjectSfia = SubjectSkills["sfia"][0];

function Voting({
  estimate,
  item,
  save,
  autoSave,
}: {
  item: SubjectSkills;
  estimate: SubjectEstimates & { level: number };
  save: SaveSubjectSfiaMutationFn;
  autoSave?: boolean;
}) {
  const [level, setLevel] = useState(estimate.level);

  return (
    <>
      <Button
        className="rounded-l-md bg-green-100 hover:bg-green-600"
        onClick={() => {
          save({
            variables: {
              level,
              sfiaId: estimate.sfiaId,
              subjectId: item.id,
            },
          });
        }}
      >
        <HiThumbUp />
      </Button>
      <select
        value={level}
        id="location"
        name="location"
        className="block w-full pl-3 pr-10 py-[5px] text-base border-gray-300 focus:outline-none focus:ring-crimson focus:border-crimson sm:text-sm rounded-none"
        defaultValue="Canada"
        onChange={(e) => {
          const level = parseInt(e.currentTarget.value);
          setLevel(level);
          if (autoSave) {
            save({
              variables: {
                level,
                sfiaId: estimate.sfiaId,
                subjectId: item.id,
              },
            });
          }
        }}
      >
        <option value={-1}>Ignored</option>
        {estimate.l1 && (
          <option value={1}>
            1 - Follow ({Math.floor(estimate.l1 * 100)}%)
          </option>
        )}
        {estimate.l2 && (
          <option value={2}>
            2 - Assist ({Math.floor(estimate.l2 * 100)}%)
          </option>
        )}
        {estimate.l3 && (
          <option value={3}>
            3 - Apply ({Math.floor(estimate.l3 * 100)}%)
          </option>
        )}
        {estimate.l4 && (
          <option value={4}>
            4 - Enable ({Math.floor(estimate.l4 * 100)}%)
          </option>
        )}
        {estimate.l5 && (
          <option value={5}>
            5 - Ensure ({Math.floor(estimate.l5 * 100)}%)
          </option>
        )}
        {estimate.l6 && (
          <option value={6}>
            6 - Initiate ({Math.floor(estimate.l6 * 100)}%)
          </option>
        )}
        {estimate.l7 && (
          <option value={7}>
            7 - Strategy ({Math.floor(estimate.l7 * 100)}%)
          </option>
        )}
      </select>
      <Button
        className="bg-red-100 rounded-r-md  hover:bg-red-600"
        onClick={() => {
          save({
            variables: {
              level: -1,
              sfiaId: estimate.sfiaId,
              subjectId: item.id,
            },
          });
        }}
      >
        <HiThumbDown />
      </Button>
    </>
  );
}

function SkillList({
  item,
  items,
  estimates,
  sfiaDetail,
  setSfiaDetail,
  sfiaData,
  save,
  autoSave,
}: {
  item: SubjectSkills;
  items: { level?: number; sfiaId: number; id: number }[];
  estimates: SubjectEstimates[];
  sfiaDetail: number;
  setSfiaDetail(id: number): void;
  sfiaData: AllSfiaQuery;
  save: SaveSubjectSfiaMutationFn;
  autoSave?: boolean;
}) {
  return (
    <table className="w-full">
      <tbody>
        {items.map((e) => {
          const estimate = estimates.find((s) => e.sfiaId === s.sfiaId);
          const level = e.level == null ? getLevel(estimate) : e.level;
          return (
            <React.Fragment key={e.id}>
              <tr>
                <td className="pr-2">
                  <CircularProgressBar
                    strokeWidth="4"
                    sqSize={32}
                    percentage={Math.floor(estimate.overall * 100)}
                    color={
                      estimate.overall > 0.4
                        ? "green"
                        : estimate.overall > 0.3
                        ? "orange"
                        : "red"
                    }
                  />
                </td>
                <td className="pr-2 w-full">
                  <div
                    title="Click to show SFIA details"
                    className="flex cursor-pointer"
                    onClick={() =>
                      setSfiaDetail(e.sfiaId === sfiaDetail ? -1 : e.sfiaId)
                    }
                  >
                    {sfiaData.sfias.find((s) => s.id === e.sfiaId)?.name}
                  </div>
                </td>
                <td>
                  {estimate.rank && (
                    <span className="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-red-100 text-red-800">
                      {estimate.rank}
                    </span>
                  )}
                </td>
                <td>
                  <div className="flex items-center w-[265px]">
                    <Voting
                      estimate={{ ...estimate, level }}
                      item={item}
                      save={save}
                      autoSave={autoSave}
                    />
                  </div>
                </td>
              </tr>
              {sfiaDetail === e.sfiaId && (
                <tr>
                  <td colSpan={4}>
                    <div className="relative z-0 inline-flex shadow-sm rounded-md mb-4 mt-4 p-4 bg-white">
                      <SfiaDetail id={e.sfiaId} />
                    </div>
                  </td>
                </tr>
              )}
            </React.Fragment>
          );
        })}
      </tbody>
    </table>
  );
}

export function SubjectSkills() {
  const router = useRouter();
  const [part, setPart] = useState("postgrad");
  const [sfiaDetail, setSfiaDetail] = useState(-1);
  const [subjectInfo, toggleSubjectInfo] = useState(false);
  const { id } = parseQuery(router); //.query;
  const itemId = parseInt(id as string);
  const [save, { loading: saving }] = useSaveSubjectSfiaMutation({
    update(cache, { data: { saveSubjectSfia } }) {
      const { findSubjectSkills } = cache.readQuery<FindSubjectSkillsQuery>({
        query: FindSubjectSkillsDocument,
        variables: { id: itemId },
      });

      let existing = findSubjectSkills.sfia.find(
        (s) => s.id === saveSubjectSfia.id
      );
      let newCache;
      if (existing) {
        existing = { ...existing, level: saveSubjectSfia.level };
        newCache = [...findSubjectSkills.sfia];
      } else {
        newCache = findSubjectSkills.sfia.concat(saveSubjectSfia);
      }

      cache.writeQuery({
        query: FindSubjectSkillsDocument,
        variables: itemId,

        data: {
          findSubjectSkills: {
            ...findSubjectSkills,
            sfia: newCache,
          },
        },
      });
    },
  });

  const { data, loading } = useFindSubjectSkillsQuery({
    variables: {
      id: parseInt(id as string),
    },
  });

  const { data: sfiaData, loading: sfiaLoading } = useAllSfiaQuery();

  if (loading || sfiaLoading) {
    return <Spinner />;
  }

  if (!data || !data.findSubjectSkills) {
    return <div>No data</div>;
  }

  const item = data.findSubjectSkills;
  const estimates = [...item.sfiaEstimates];

  const undergrad = estimates.filter((e) => e.l1 || e.l2 || e.l3);
  const postgrad = estimates.filter(
    (e) => e.l1 || e.l2 || e.l3 || e.l4 || e.l5
  );
  const filtered = part === "undergrad" ? undergrad : postgrad;

  const endorsedSfia = item.sfia.filter((s) => s.level > 0);
  const rejectedSfia = item.sfia.filter((s) => s.level < 0);

  return (
    <div className="flex justify-center items-center flex-col">
      <div className="font-OpenSans flex items-center text-xl mt-4">
        <img src="/images/jobfit.svg" className="w-16 h-16 mr-2" alt=""></img>
        <span className="font-bold ">JobFit</span>
        <HiChevronRight />
        {item.code}
        <HiChevronRight />
        {item.name}
      </div>
      <div className="relative z-0 inline-flex shadow-sm rounded-md mb-4 mt-2">
        <Link href="/admin/subjects/skills">
          <Button className="rounded-l-md">
            <HiChevronDoubleLeft /> Back to Search
          </Button>
        </Link>
        <Button
          className={part === "undergrad" ? "bg-crimson text-white" : ""}
          onClick={() => setPart("undergrad")}
        >
          Undergraduate ({undergrad.length})
        </Button>
        <Button
          className={part === "postgrad" ? "bg-crimson text-white" : ""}
          onClick={() => setPart("postgrad")}
        >
          Postgraduate ({postgrad.length})
        </Button>

        <Button
          onClick={() => toggleSubjectInfo(!subjectInfo)}
          className="rounded-r-md"
        >
          {subjectInfo ? "Hide" : "Show"} Subject Info
        </Button>
      </div>

      <div className="w-[896px]">
        {subjectInfo && (
          <div className="relative z-0 shadow-sm rounded-md mb-4 mt-4 p-4 bg-white">
            <h3 className="text-lg mb-1 mt-2 font-bold">Handbook</h3>
            <p>{item.handbook}</p>
            <h3 className="text-lg mb-1 mt-2 font-bold">
              Learning Outcomes Introduction
            </h3>
            {item.losIntro && <p>{item.losIntro}</p>}
            <h3 className="text-lg mb-1 mt-2 font-bold">Learning Outcomes</h3>
            <p>{item.los}</p>
            {item.readingList && (
              <h3 className="text-lg mb-1 mt-2 font-bold">Reading List</h3>
            )}
            <p>{item.readingList}</p>
          </div>
        )}

        <div className="bg-green-200 p-2 relative z-0 shadow-sm rounded-md mb-4 mt-2 w-full">
          <h1 className="font-bold  mb-2">Endorsed Skills</h1>
          {endorsedSfia.length === 0 && <div>0 skills</div>}

          {endorsedSfia.length > 0 && (
            <SkillList
              item={item}
              items={endorsedSfia}
              estimates={filtered}
              save={save}
              setSfiaDetail={setSfiaDetail}
              sfiaData={sfiaData}
              sfiaDetail={sfiaDetail}
              autoSave={true}
            />
          )}
        </div>

        <div className="bg-gray-100 p-2 relative z-0 shadow-sm rounded-md mb-4 mt-2 w-full">
          <h1 className="font-bold mb-2">Estimated Skills</h1>

          <SkillList
            item={item}
            items={filtered
              .filter((e) => item.sfia.every((s) => s.sfiaId !== e.sfiaId))
              .sort((a, b) => (a.overall < b.overall ? 1 : -1))}
            estimates={filtered}
            save={save}
            setSfiaDetail={setSfiaDetail}
            sfiaData={sfiaData}
            sfiaDetail={sfiaDetail}
          />
          {/* <table>
            <tbody>
              {filtered
                .sort((a, b) => (a.overall < b.overall ? 1 : -1))
                .map((e) => {
                  return (
                    <React.Fragment key={e.id}>
                      <tr>
                        <td className="pr-2">
                          <CircularProgressBar
                            strokeWidth="4"
                            sqSize={32}
                            percentage={Math.floor(e.overall * 100)}
                            color={
                              e.overall > 0.4
                                ? "green"
                                : e.overall > 0.3
                                ? "orange"
                                : "red"
                            }
                          />
                        </td>
                        <td className="pr-2">
                          <div
                            title="Click to show SFIA details"
                            className="flex cursor-pointer"
                            onClick={() =>
                              setSfiaDetail(
                                e.sfiaId === sfiaDetail ? -1 : e.sfiaId
                              )
                            }
                          >
                            {
                              sfiaData.sfias.find((s) => s.id === e.sfiaId)
                                ?.name
                            }
                          </div>
                        </td>
                        <td>
                          {e.rank && (
                            <span className="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-red-100 text-red-800">
                              {e.rank}
                            </span>
                          )}
                        </td>
                        <td>
                          <div className="flex items-center">
                            <Voting estimate={e} item={item} save={save} />
                          </div>
                        </td>
                      </tr>
                      {sfiaDetail === e.sfiaId && (
                        <tr>
                          <td colSpan={4}>
                            <div className="relative z-0 inline-flex shadow-sm rounded-md mb-4 mt-4 p-4">
                              <SfiaDetail id={e.sfiaId} />
                            </div>
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  );
                })}
            </tbody>
          </table> */}
        </div>

        <div className="bg-red-400 p-2 relative z-0 shadow-sm rounded-md mb-4 mt-2 w-full">
          <h1 className="font-bold  mb-2">Rejected Skills</h1>
          {rejectedSfia.length === 0 && <div>0 skills</div>}

          {rejectedSfia.length > 0 && (
            <SkillList
              item={item}
              items={rejectedSfia}
              estimates={filtered}
              save={save}
              setSfiaDetail={setSfiaDetail}
              sfiaData={sfiaData}
              sfiaDetail={sfiaDetail}
            />
          )}
        </div>
      </div>
    </div>
  );
}
