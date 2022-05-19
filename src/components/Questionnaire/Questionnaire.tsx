import classNames from 'classnames';
import { action, makeObservable, observable } from 'mobx';
import { Observer, useLocalObservable } from 'mobx-react';
import React from 'react';

import {
  BsEmojiDizzy, BsEmojiDizzyFill, BsEmojiFrown, BsEmojiFrownFill, BsEmojiHeartEyes,
  BsEmojiHeartEyesFill, BsEmojiNeutral, BsEmojiNeutralFill, BsEmojiSmile, BsEmojiSmileFill
} from 'react-icons/bs';

import styles from './questionnaire.module.scss';
import questions from './questions.json';

const { decisions } = questions;

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

type WithParent = {
  parent: WithParent | null;
  value: number;
};

function calculateRating(item: WithParent) {
  let result = 0;
  while (item != null) {
    result += item.value;
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
  items: WithParent[];
  steps: WithParent[][];
  assigned: WithParent[];
  queue: WithParent[];
  jobs: number[];
  selectedJobs: number[];

  constructor() {
    makeObservable(this, {
      items: observable,
      jobs: observable,
      selectedJobs: observable,
    });

    this.items = this.buildItems(decisions.find((s) => s.id === 0).true, null);
    this.steps = [];
    this.assigned = [];
    this.queue = [];
    this.jobs = [];
    this.selectedJobs = [];
  }

  buildItems(ids: number[], parent: WithParent | null) {
    return ids.map((d) => ({
      id: d,
      value: -1,
      parent: null,
    }));
  }
}

export function Questionnaire() {
  const state = useLocalObservable(() => ({
    items: decisions
      .find((s) => s.id === 0)
      .true.map((d) => ({
        id: d,
        value: -1,
        parent: null,
      })),
    steps: [],
    assigned: [],
    queue: [],
    jobs: [],
    selectedJobs: [],
  }));

  return (
    <Observer>
      {() => (
        <div className="flex items-center justify-center w-full h-full">
          <div className="flex gap-4">
            <Panel className="ml-4 flex-[2] divide-y divide-slate-200">
              <h2 className="font-bold">Selected Jobs</h2>

              {state.items.map((item, i) => (
                <div className="flex items-center py-1" key={i}>
                  <Rating rating={item} />{" "}
                  {decisions.find((d) => d.id === item.id).text} [
                  {calculateRating(item)}]
                </div>
              ))}

              <div className="pt-4">
                <button
                  className="bg-slate-500 px-4 py-2 text-gray-100 mr-1"
                  onClick={() => {
                    state.items = state.steps.pop();
                  }}
                >
                  Previous
                </button>
                <button
                  className="bg-slate-500 px-4 py-2 text-gray-100"
                  onClick={action(() => {
                    // remember history
                    state.steps.push([...state.items]);

                    let newItems = state.queue;
                    for (let decision of state.items) {
                      // add to assigned we need to remember this if we go back and forth in history
                      let index = state.assigned.findIndex(
                        (a) => a.id === decision.id
                      );
                      if (index == -1) {
                        state.assigned.push(decision);
                      } else {
                        state.assigned[index] = decision;
                      }

                      if (decision.value != -1) {
                        let question = decisions.find(
                          (d) => d.id === decision.id
                        );

                        // it is either a final node "[0]" or has some questions"
                        if (question.true && question.true[0] === 0) {
                          state.jobs.push(
                            question.text +
                              " Rating: " +
                              calculateRating(decision)
                          );
                        } else {
                          // remove existing
                          newItems = newItems.filter((i) =>
                            question.true.every((q) => q != i.id)
                          );

                          // remember parents
                          newItems.push(
                            ...question.true.map((d) => {
                              let existingDecision = state.assigned.find(
                                (s) => s.id === d
                              );
                              return {
                                id: d,
                                value: existingDecision
                                  ? existingDecision.value
                                  : -1,
                                parent: decision,
                              };
                            })
                          );
                        }
                      }
                    }

                    // we are done processing, first ten become questions, rest remains in the queue
                    newItems = newItems.sort((a, b) =>
                      calculateRating(a) < calculateRating(b) ? 1 : -1
                    );

                    state.queue = state.queue.slice(10);
                    state.items = newItems.slice(0, 10);
                  })}
                >
                  Next
                </button>
              </div>
            </Panel>

            <div className="flex flex-col gap-4 flex-1">
              <Panel>
                <h2 className="font-bold">Selected Jobs</h2>
                {state.jobs.map((j) => (
                  <div key={j}>{}</div>
                ))}
              </Panel>
              <Panel>
                <h2 className="font-bold">Available Jobs</h2>
              </Panel>
            </div>
          </div>
        </div>
      )}
    </Observer>
  );
}
