import classNames from 'classnames';
import { action, makeObservable, observable } from 'mobx';
import { Observer } from 'mobx-react';
import React, { useState } from 'react';

import {
  JobCategoriesQuery, useJobCategoriesQuery
} from 'components/Admin/JobsAnalysis/queries/jobCategories.query.generated';
import {
  BsEmojiDizzy, BsEmojiDizzyFill, BsEmojiFrown, BsEmojiFrownFill, BsEmojiHeartEyes,
  BsEmojiHeartEyesFill, BsEmojiNeutral, BsEmojiNeutralFill, BsEmojiSmile, BsEmojiSmileFill
} from 'react-icons/bs';
import { HiChevronDown, HiChevronRight } from 'react-icons/hi';

import styles from './questionnaire.module.scss';
import questions from './questions.json';

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

const RatingWrapper = ({ children }) => (
  <svg
    aria-hidden="true"
    focusable="false"
    data-prefix="far"
    data-icon="angry"
    className="w-5 text-gray-400 hover:text-blue-500 mr-1"
    role="img"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 496 512"
    fill="red"
  >
    {children}
  </svg>
);

const Rating = ({ rating }: { rating: { value: number } }) => {
  return (
    <Observer>
      {() => (
        <ul className={styles.options + " mr-2 my-1"}>
          <li>
            {rating.value == 1 ? (
              <BsEmojiDizzyFill className={styles.selected} title="No way!" />
            ) : (
              <BsEmojiDizzy
                title="No way!"
                onClick={() => (rating.value = 1)}
                className="w-5 h-5 text-gray-400 hover:text-crimson cursor-pointer"
              />
            )}
          </li>
          <li>
            {rating.value == 2 ? (
              <BsEmojiFrownFill
                className={styles.selected}
                title="I prefer not"
              />
            ) : (
              <BsEmojiFrown
                onClick={() => (rating.value = 2)}
                title="I prefer not"
              />
            )}
          </li>
          <li>
            {rating.value == 3 ? (
              <BsEmojiNeutralFill
                className={styles.selected}
                title="Just, maybe!"
              />
            ) : (
              <BsEmojiNeutral
                onClick={() => (rating.value = 3)}
                title="Just, maybe!"
              />
            )}
          </li>
          <li>
            {rating.value == 4 ? (
              <BsEmojiSmileFill
                className={styles.selected}
                title="That is interesting!"
              />
            ) : (
              <BsEmojiSmile
                onClick={() => (rating.value = 4)}
                title="That is interesting!"
              />
            )}
          </li>
          <li>
            {rating.value == 5 ? (
              <BsEmojiHeartEyesFill
                className={styles.selected}
                title="Absolutely! Let's do this!"
              />
            ) : (
              <BsEmojiHeartEyes
                onClick={() => (rating.value = 5)}
                title="Absolutely! Let's do this!"
              />
            )}
          </li>
        </ul>
      )}
    </Observer>
  );
};

function calculateRating(item: LikertAnswer) {
  let result = 0;
  while (item != null) {
    result += item.value == -1 ? 0 : item.value;
    item = item.parent;
  }
  return result;
}

function Panel(props: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      {...props}
      className={classNames(
        props.className,
        "p-4 rounded-lg bg-slate-50 border-blue-500 border-2 divide-slate-200"
      )}
    >
      {props.children}
    </div>
  );
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

    this.items = items.slice(0, 5);
    this.queue = items.slice(5);
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

  retrieveJobs() {
    for (let decision of this.assigned.filter((a) => a.leaf)) {
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
    // this.queue = this.queue.sort((a, b) =>
    //   a.value == 0 && b.value !== -1
    //     ? -1
    //     : a.value != -1 && b.value == -1
    //     ? 1
    //     : calculateRating(a) < calculateRating(b)
    //     ? 1
    //     : -1
    // );

    // first ten items are our new items
    this.items = this.queue.slice(0, 5);

    // queue the rest
    this.queue = this.queue.slice(5);
  }
}

function Checkbox({
  state,
  job,
  ...rest
}: React.HTMLAttributes<HTMLInputElement> & {
  state: JobState;
  job: RatedJobCategory;
}) {
  const isSelected = state.selectedJobs.some((j) => j.id === job.id);

  return (
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
      aria-describedby="comments-description"
      name="comments"
      type="checkbox"
      className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
    />
  );
}

export function Questionnaire() {
  const [state] = useState(new JobState());
  const { data, loading } = useJobCategoriesQuery();

  if (data) {
    state.categories = data.jobCategories;
  }

  return (
    <Observer>
      {() => (
        <div className="flex items-center justify-center w-full h-full">
          <div className="flex gap-4  max-w-6xl">
            <Panel className="ml-4 flex-1 ">
              <h2 className="font-bold mb-4">Selected Jobs</h2>
              <p className="text-slate-700 text-sm mb-4">
                Please, tell us a little bit about yourself. You can vote on one
                or more of the questions below. You do not have to vote on all
                questions. The emoji on the left represents "No way!", the emoji
                on the right represents "Yes please!". We will find job
                categories matching for you, please choose three of them.
              </p>
              {state.items.length == 0 && (
                <div>
                  We have no more questions for you! Please see the job roles
                  that we selected for you and choose three that interest you
                  the most!
                </div>
              )}

              <div className="divide-y divide-slate-200">
                {state.items.map((item, i) => (
                  <div className="flex items-center py-1" key={i}>
                    <Rating rating={item} />{" "}
                    {decisions.find((d) => d.id === item.id).text} [
                    {calculateRating(item)}]
                  </div>
                ))}
              </div>

              <div className="pt-4">
                {state.steps.length > 0 && (
                  <button
                    className="bg-slate-500 px-4 py-2 text-gray-100 mr-1"
                    onClick={() => {
                      state.items = state.steps.pop();
                    }}
                  >
                    Previous
                  </button>
                )}
                {state.items.length > 0 && (
                  <button
                    className="bg-slate-500 px-4 py-2 text-gray-100"
                    onClick={action(() => {
                      // remember history
                      state.calculateNext();
                    })}
                  >
                    Next
                  </button>
                )}
              </div>
            </Panel>

            <div className="flex flex-col gap-4 flex-1">
              <Panel className="bg-green-300">
                <h2 className="font-bold mb-2">
                  Selected Jobs ({state.selectedJobs.length} / 3)
                </h2>
                {state.selectedJobs.length == 0 && (
                  <div>Please select a job category from the list below.</div>
                )}
                {state.selectedJobs.map((s, i) => (
                  <div key={s.id}>
                    {i + 1}. {s.name}
                  </div>
                ))}
                {state.selectedJobs.length == 3 && (
                  <button className="bg-slate-500 px-4 py-2 text-gray-100 mt-4">
                    Continue
                  </button>
                )}
              </Panel>
              <Panel className="flex-1 overflow-auto max-h-96 ">
                <h2 className="font-bold">Available Jobs</h2>

                <div className="flex font-bold text-sm ">
                  <div className="flex-1">Name</div>
                  <div>Average Salary</div>
                </div>

                <JobList state={state} />
              </Panel>
            </div>
          </div>
        </div>
      )}
    </Observer>
  );
}

function JobList({ state }: { state: JobState }) {
  return (
    <div role="list" className="divide-y-2 divide-slate-200">
      {state.jobs.map((j) => (
        <div key={j.id}>
          <CategoryList j={j} state={state} />
        </div>
      ))}
    </div>
  );
}

function CategoryList({ j, state }: { j: RatedJobCategory; state: JobState }) {
  const [showing, show] = useState(true);

  return (
    <>
      <div className="flex items-center bg-slate-600 text-slate-50 p-0.5">
        <div className="cursor-pointer mr-2" onClick={() => show(!showing)}>
          {showing ? <HiChevronDown /> : <HiChevronRight />}
        </div>
        <div className="flex-1">{j.name}</div>
        <div>${Math.round(j.avg)}</div>
      </div>

      {showing && (
        <div role="list" className="divide-y divide-slate-200">
          {j.children.map((min) => (
            <RoleList min={min} state={state} />
          ))}
        </div>
      )}
    </>
  );
}

function RoleList({ min, state }: { min: RatedJobCategory; state: JobState }) {
  const [showing, show] = useState(true);

  return (
    <div className="ml-6 py-1" key={min.id}>
      <div className="flex items-center">
        <div className="cursor-pointer mr-2" onClick={() => show(!showing)}>
          {showing ? <HiChevronDown /> : <HiChevronRight />}
        </div>
        <Checkbox state={state} job={min} />
        <div className="flex-1 ml-2 pr-4 truncate">{min.name}</div>
        <div>${Math.round(min.avg)}</div>
      </div>
      {showing && (
        <div role="list" className="divide-y divide-slate-200">
          {min.children.map((unit) => (
            <UnitList unit={unit} state={state} />
          ))}
        </div>
      )}
    </div>
  );
}

function UnitList({
  unit,
  state,
}: {
  unit: RatedJobCategory;
  state: JobState;
}) {
  const [showing, show] = useState(false);
  return (
    <div className="ml-6 py-1 " key={unit.id}>
      <div className="flex items-center mb-1">
        <div className="cursor-pointer mr-2" onClick={() => show(!showing)}>
          {showing ? <HiChevronDown /> : <HiChevronRight />}
        </div>
        <Checkbox state={state} job={unit} />
        <div className="flex-1 ml-2 pr-4 truncate">{unit.name}</div>
        <div>${Math.round(unit.avg)}</div>
      </div>

      {showing &&
        unit.children.map((job) => (
          <div className="flex items-center ml-8 py-1" key={job.id}>
            <Checkbox state={state} job={job} />
            <div className="flex-1 ml-2 pr-4 truncate">{job.name}</div>
            <div>${Math.round(job.avg)}</div>
          </div>
        ))}
    </div>
  );
}
