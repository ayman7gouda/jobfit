import classNames from "classnames";
import { action, makeObservable, observable } from "mobx";
import { Observer } from "mobx-react";
import React, { useState } from "react";
import { QuestionCard } from "./QuestionCard";
import { HiOutlineArrowRight, HiOutlineArrowLeft } from "react-icons/hi";

import {
  JobCategoriesQuery,
  useJobCategoriesQuery,
} from "components/Admin/JobsAnalysis/queries/jobCategories.query.generated";

import questions from "./questions.json";
import Link from "next/link";

import Router from "next/router";

const { decisions } = questions;

type DecisionOptions = typeof decisions;
type DecisionOption = DecisionOptions[0];
type JobCategory = JobCategoriesQuery["jobCategories"][0];
type RatedJobCategory = JobCategory & {
  rating: LikertAnswer;
  children: RatedJobCategory[];
};
type LikertAnswer = {
  parent: LikertAnswer | null;
  value: number;
  id: number;
  leaf: boolean;
};

function calculateRating(item: LikertAnswer) {
  let result = 0;
  while (item != null) {
    result += item.value == -1 ? 0 : item.value;
    item = item.parent;
  }
  return result;
}

class JobState {
  items: LikertAnswer[] = [];
  steps: LikertAnswer[][] = [];
  assigned: LikertAnswer[] = [];
  queue: LikertAnswer[] = [];
  jobs: RatedJobCategory[] = [];
  selectedJobs: RatedJobCategory[] = [];
  categories: JobCategoriesQuery["jobCategories"];

  constructor() {
    makeObservable(this, {
      items: observable,
      jobs: observable,
      selectedJobs: observable,
      calculateNext: action,
    });

    let items = this.buildItems(decisions.find((s) => s.id === 0).true, null);

    this.items = items.slice(0, 3);
    this.queue = items.slice(3);
    this.steps = [];
    this.assigned = [];
    this.jobs = [];
    this.selectedJobs = [];
  }

  buildItems(ids: number[], parent: LikertAnswer | null) {
    return ids.map((d) => {
      let existingDecision = this.assigned.find((s) => s.id === d);

      return {
        id: d,
        value: existingDecision ? existingDecision.value : -1,
        parent,
        leaf: false,
      };
    });
  }

  rememberDecision(decision: LikertAnswer) {
    let index = this.assigned.findIndex((a) => a.id === decision.id);
    if (index == -1) {
      this.assigned.push(decision);
    } else {
      this.assigned[index] = decision;
    }
  }

  sortJobs(ratedJobs: RatedJobCategory[]) {
    ratedJobs.sort((a, b) =>
      calculateRating(a.rating) < calculateRating(b.rating) ? 1 : -1
    );

    for (let job of ratedJobs) {
      this.sortJobs(job.children);
    }
  }

  shouldSkip(decision: LikertAnswer) {
    while (decision != null) {
      if (decision.value == 1) {
        return true;
      }
      decision = decision.parent;
    }
    return false;
  }

  retrieveJobs() {
    this.jobs = [];

    for (let decision of this.assigned.filter((a) => a.leaf)) {
      // if we voted one of the parents out in the process, then skip it!
      if (this.shouldSkip(decision)) {
        continue;
      }

      let subMajorId =
        decision.id >= 10 ? parseInt(decision.id.toString().slice(0, 2)) : 0;

      // add subMajor
      let existingSubMajor = this.jobs.find((j) => j.id === subMajorId);
      if (existingSubMajor == null) {
        let subMajor =
          subMajorId > 0
            ? this.categories.find((c) => c.id === subMajorId)
            : null;
        this.jobs.push({
          ...subMajor,
          rating: decision,
          children: [],
        });
        existingSubMajor = this.jobs[this.jobs.length - 1];
      }

      // find the minor
      // if the minor does not exist add ALL minors
      let minorId =
        decision.id >= 100 ? parseInt(decision.id.toString().slice(0, 3)) : 0;
      if (minorId == 0) {
        existingSubMajor.children = this.categories
          .filter(
            (c) =>
              c.id >= 100 && c.id < 1000 && Math.floor(c.id / 10) == subMajorId
          )
          .map((m) => ({ ...m, rating: decision, children: [] }));
        continue;
      }

      let existingMinor = existingSubMajor.children.find(
        (j) => j.id === minorId
      );
      if (existingMinor == null) {
        let minor =
          minorId > 0 ? this.categories.find((c) => c.id === minorId) : null;

        existingSubMajor.children.push({
          ...minor,
          rating: decision,
          children: [],
        });
        existingMinor =
          existingSubMajor.children[existingSubMajor.children.length - 1];
      }

      // add all units
      let unitId =
        decision.id >= 1000 ? parseInt(decision.id.toString().slice(0, 4)) : 0;
      if (unitId == 0) {
        existingMinor.children = this.categories
          .filter(
            (c) =>
              c.id >= 1000 && c.id < 10000 && Math.floor(c.id / 10) == minorId
          )
          .map((m) => ({
            ...m,
            rating: decision,
            children: this.categories
              .filter((c) => c.id >= 100000 && Math.floor(c.id / 100) == m.id)
              .map((n) => ({ ...n, rating: decision, children: [] })),
          }));
        continue;
      }

      let existingUnit = existingMinor.children.find((j) => j.id === unitId);
      if (existingUnit == null) {
        let unit =
          unitId > 0 ? this.categories.find((c) => c.id === unitId) : null;

        existingMinor.children.push({
          ...unit,
          rating: decision,
          children: [],
        });
        existingUnit =
          existingMinor.children[existingMinor.children.length - 1];
      }

      // add all units
      existingUnit.children = this.categories
        .filter((c) => c.id >= 100000 && Math.floor(c.id / 100) == unitId)
        .map((m) => ({ ...m, rating: decision, children: [] }));
      continue;
    }

    // now sort them based on rating
    this.sortJobs(this.jobs);
  }

  addToQueue(question: DecisionOption, decision: LikertAnswer) {
    // remove items from queue that have the same id
    this.queue = this.queue.filter((i) =>
      question.true.every((q) => q != i.id)
    );

    // remember parents
    this.queue.push(...this.buildItems(question.true, decision));
  }

  calculateNext() {
    // add a new step to history
    this.steps.push([...this.items]);

    // we will add new items to the queue and then select the first ten to calculate a new step
    for (let decision of this.items) {
      // add to assigned we need to remember this if we go back and forth in history

      if (decision.value > 1) {
        this.rememberDecision(decision);

        let question = decisions.find((d) => d.id === decision.id);

        // it is either a final node "[0]" or has some questions"
        if (question.true && question.true[0] === 0) {
          decision.leaf = true;
        } else {
          this.addToQueue(question, decision);
        }
      }
    }

    // now retrieve jobs for all that we have
    this.retrieveJobs();

    // we are done processing, first ten become questions, rest remains in the queue
    // we sort the queue by the best fit
    if (this.steps.length > 1) {
      this.queue = this.queue.sort((a, b) =>
        calculateRating(a) < calculateRating(b) ? 1 : -1
      );
    }

    // first ten items are our new items
    this.items = this.queue.slice(0, 3);

    // queue the rest
    this.queue = this.queue.slice(3);
  }
}

function Panel(props: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      {...props}
      className={classNames(
        props.className,
        "w-[40rem] flex flex-col divide-y divide-gray-300 bg-backgrounds-light-grey rounded-2xl"
      )}
    >
      {props.children}
    </div>
  );
}

export function Questionnaire() {
  const [state] = useState(new JobState());
  const { data, loading } = useJobCategoriesQuery();
  const [showQuestions, setShowQuestions] = useState(false);
  const [results, setResults] = useState(true);
  const [showCareers, setShowCareers] = useState(false);
  const [careerNumber, setCareerNumber] = useState(0);

  const startQuestionnaire = () => {
    setResults(false);
    setShowCareers(false);
    setShowQuestions(true);
    setCareerNumber(0);
  };

  const checkCareers = () => {
    state.calculateNext();
    if (state.jobs.length > careerNumber || state.items.length === 0) {
      setCareerNumber(state.jobs.length);
      setShowCareers(true);
      setShowQuestions(false);
    }
  };

  const moreQuestions = () => {
    setShowCareers(false);
    setShowQuestions(true);
  };

  if (data) {
    state.categories = data.jobCategories;
  }

  return (
    <Observer>
      {() => (
        <div className="bg-black">
          <div
            className={classNames("px-0 bg-no-repeat", {
              "bg-start bg-cover lg:bg-[length:125%] lg:bg-[left_calc(100%)_top_calc(30%)]":
                results,
              "bg-questions bg-cover lg:bg-[length:118%] lg:bg-[right_calc(100%)_top_calc(30%)]":
                showQuestions,
              "bg-careers bg-cover lg:bg-[length:165%] lg:bg-[left_calc(100%)_top_calc(45%)]":
                showCareers,
            })}
          >
            <div className="bg-black bg-opacity-70 h-screen w-full">
              <div className="flex flex-col w-full items-start">
                <div className="flex items-start pt-6 pl-6">
                  <img src="./images/WSU.svg" alt="" className="w-48" />
                </div>
                <div className="flex w-full justify-center">
                  <img src="./images/logo 2.svg" alt="" className="w-52" />
                </div>
              </div>
              <div className="flex w-full items-center justify-center mt-[3.5%]">
                {results ? (
                  <Panel>
                    <div className="flex flex-col items-center justify-center p-6">
                      <div className="">
                        <img src="./images/startQuestionnaire.svg" alt="" />
                      </div>
                      <h1 className="w-full text-2xl font-bold leading-wsu text-left pt-10 pb-5">
                        Welcome to the JobFit Questionnaire
                      </h1>
                      <p className="w-full text-base leading-wsu text-left pb-10">
                        Find out which careers and courses best suit your skills
                        and personal interests
                      </p>
                    </div>
                    <div className="p-6 flex items-center justify-center">
                      <button
                        className="rounded-lg bg-gradient-to-r from-crimson via-cherry-red to-hilight-orange py-4 px-6"
                        onClick={startQuestionnaire}
                      >
                        <span className="text-base font-bold text-white">
                          Start
                        </span>
                      </button>
                    </div>
                  </Panel>
                ) : null}
                {showQuestions ? (
                  <Panel>
                    {state.items.length == 0 && (
                      <div className="text-xl leading-wsu font-bold py-10 px-7">
                        We have no more questions for you! Please see the job
                        roles that we selected for you and choose three that
                        interest you the most!
                      </div>
                    )}
                    {state.items.length != 0 && (
                      <QuestionCard state={state} decisions={decisions} />
                    )}

                    <div className="pt-4 flex flex-row justify-between items-center p-6">
                      <button
                        className="px-6 py-4 rounded-lg border-2 border-light-ui-black-30 bg-light-ui-black-5"
                        onClick={() => {
                          state.items = state.steps.pop();
                        }}
                        disabled={state.steps.length > 0 ? false : true}
                      >
                        <div className="flex flex-row items items-center justify-center gap-4">
                          <HiOutlineArrowLeft color="black" size={20} />
                          <span className="font-bold">Previous</span>
                        </div>
                      </button>

                      <button
                        className="px-6 py-4 rounded-lg bg-gradient-to-r from-crimson via-cherry-red to-hilight-orange"
                        onClick={checkCareers}
                      >
                        <div className="flex flex-row items items-center justify-center gap-4">
                          <span className="text-white font-bold">Continue</span>
                          <HiOutlineArrowRight color="white" size={20} />
                        </div>
                      </button>
                    </div>
                  </Panel>
                ) : null}
                {showCareers ? (
                  <Panel>
                    <div className="p-6">
                      <div className="flex flex-col gap-6 pb-10">
                        <h1 className="leading-wsu font-bold text-2xl">
                          Select upto 3 of the following areas that you like
                        </h1>
                        <p className="text-base leading-wsu text-left">
                          Based on your answers so far the following careers
                          areas could be a good fit!
                        </p>
                      </div>
                      <div className=" overflow-auto max-h-[300px]">
                        <CareerOptions state={state} />

                        {state.jobs.length == 0 && (
                          <div className="mt-2">
                            0 Careers. Please keep answering the questions and
                            soon we will find some great matches!
                          </div>
                        )}
                      </div>
                      {state.selectedJobs.map((s, i) => (
                        <div key={s.id}></div>
                      ))}
                    </div>
                    <div className="flex flex-col p-6 gap-6 items-center justify-center">
                      <p>Are you happy to continue using these career areas?</p>
                      <div className="w-full flex flex-row justify-between h-9">
                        <button
                          className="rounded-lg border-2 border-dark-ui-white-30 bg-backgrounds-dark-blue px-4"
                          onClick={moreQuestions}
                        >
                          <span className="text-white font-bold text-xs">
                            Not really, let’s keep investigating
                          </span>
                        </button>
                        <Link href="/questionnaire/results">
                        <button
                          className="px-10 rounded-lg bg-gradient-to-r from-crimson via-cherry-red to-hilight-orange"
                          onClick={() => localStorage.setItem('matchs', JSON.stringify(state.selectedJobs))}
                        >
                          <span className="text-white font-bold text-xs">
                            Yes, let’s continue
                          </span>
                        </button>
                        </Link>
                      </div>
                    </div>
                  </Panel>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      )}
    </Observer>
  );
}

function SelectCareer({
  state,
  job,
  unit,
  ...rest
}: React.HTMLAttributes<HTMLInputElement> & {
  state: JobState;
  job: RatedJobCategory;
  unit: RatedJobCategory;
}) {
  const isSelected = state.selectedJobs.some((j) => j.id === job.id);
  return (
    <div className="w-full">
      {job.id > 0 && (
        <label
          className="w-full flex justify-between items-center
                      py-[8px] px-[16px] my-1 mr-2
                      rounded-lg border-[1px] cursor-pointer
                      bg-white hover:bg-[#fff5f6]
                      group
                      "
        >
          <span className="font-bold text-sm">{unit.name}</span>
          <input
            {...rest}
            disabled={state.selectedJobs.length === 3 && !isSelected}
            checked={isSelected}
            onClick={(e) =>
              e.currentTarget.checked
                ? state.selectedJobs.push(job)
                : state.selectedJobs.splice(
                    state.selectedJobs.findIndex((i) => i.id === job.id)
                  )
            }
            type="checkbox"
            className="h-6 w-6 rounded-full pr-4 cursor-pointer 
                      focus:ring-white focus:ring-offset-0 
                      text-[#ed0033] border-2 border-mid-grey
                      group-checked:border-[#ed0033]"
          />
        </label>
      )}
    </div>
  );
}

function CareerOptions({ state }: { state: JobState }) {
  const [showing, show] = useState(true);

  return (
    <>
      {state.jobs.map((j) => (
        <div key={j.id}>
          <div className="flex items-center p-0.5">
            <div className="flex-1 font-bold text-base">{j.name}</div>
          </div>
          {showing && (
            <>
              {j.children.map((min) => (
                <div className="w-full" key={min.id}>
                  {showing && (
                    <>
                      {min.children.map((unit) => (
                        <div className="flex flex-row w-full" key={unit.id}>
                          <SelectCareer state={state} job={unit} unit={unit} />
                        </div>
                      ))}
                    </>
                  )}
                </div>
              ))}
            </>
          )}
        </div>
      ))}
    </>
  );
}
function sendResults({ state }: { state: JobState }) {
  localStorage.setItem('matchs', JSON.stringify(state.selectedJobs));
}
// function sendResults({ state }: { state: JobState }) {
//   if (state.selectedJobs.length == 3) {
//     Router.push({
//       pathname: "/questionnaire/results",
//       query: {
//         selectedJobs: 3,
//         career1: state.selectedJobs[0].id,
//         career2: state.selectedJobs[1].id,
//         career3: state.selectedJobs[2].id,
//       },
//     });
//   } else if (state.selectedJobs.length == 2) {
//     Router.push({
//       pathname: "/questionnaire/results",
//       query: {
//         selectedJobs: 2,
//         career1: state.selectedJobs[0].id,
//         career2: state.selectedJobs[1].id,
//       },
//     });
//   } else {
//     Router.push({
//       pathname: "/questionnaire/results",
//       query: {
//         selectedJobs: 1,
//         career1: state.selectedJobs[0].id,
//       },
//     });
//   }
// }
