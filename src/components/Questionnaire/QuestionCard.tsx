import React from "react";
import { Observer } from "mobx-react";
import { MdRadioButtonUnchecked, MdCheckCircle } from "react-icons/md";

export const QuestionCard = ({ state, decisions }) => {
  const Rating = ({ rating }: { rating: { value: number } }) => {
    return (
      <Observer>
        {() => (
          <div className="flex flex-row items-center gap-4">
            {rating.value == 5 ? (
              <button className="w-1/3 border-[1px] rounded-lg p-4 flex flex-col items-start gap-2 bg-session-summer-b-light border-cherry-red">
                <MdCheckCircle size={24} color="black" />
                <span className="text-base font-bold">Yes</span>
              </button>
            ) : (
              <button
                className="w-1/3 border-[1px] rounded-lg p-4 bg-white shadow-btn flex flex-col items-start gap-2"
                onClick={() => (rating.value = 5)}
              >
                <MdRadioButtonUnchecked size={24} />
                <span className="text-base font-bold">Yes</span>
              </button>
            )}

            {rating.value == 3 ? (
              <button className="w-1/3 border-[1px] rounded-lg p-4 flex flex-col items-start gap-2 bg-session-summer-b-light border-cherry-red">
                <MdCheckCircle size={24} color="black" />
                <span className="text-base font-bold">A little</span>
              </button>
            ) : (
              <button
                className="w-1/3 border-[1px] rounded-lg p-4 bg-white shadow-btn flex flex-col items-start gap-2"
                onClick={() => (rating.value = 3)}
              >
                <MdRadioButtonUnchecked size={24} />
                <span className="text-base font-bold">A little</span>
              </button>
            )}

            {rating.value == 1 ? (
              <button className="w-1/3 border-[1px] rounded-lg p-4 flex flex-col items-start gap-2 bg-session-summer-b-light border-cherry-red">
                <MdCheckCircle size={24} color="black" />
                <span className="text-base font-bold">No</span>
              </button>
            ) : (
              <button
                className="w-1/3 border-[1px] rounded-lg p-4 bg-white shadow-btn flex flex-col items-start gap-2"
                onClick={() => (rating.value = 1)}
              >
                <MdRadioButtonUnchecked size={24} />
                <span className="text-base font-bold">No</span>
              </button>
            )}
          </div>
        )}
      </Observer>
    );
  };

  return (
    <div className="p-6">
      {state.items.map((item, i) => (
        <div className="flex flex-col" key={i}>
          <h1 className="text-xl leading-wsu font-bold py-4">
            {decisions.find((d) => d.id === item.id).text}
          </h1>
          <Rating rating={item} />
        </div>
      ))}
    </div>
  );
};
