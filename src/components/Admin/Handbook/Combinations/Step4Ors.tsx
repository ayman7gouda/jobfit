import { useState } from 'react';

import { HiChevronLeft, HiChevronRight } from 'react-icons/hi';

import { nodeToTree, trimResults } from '../helpers';
import { HandbookFragment } from '../queries/handbook.fragment.generated';
import {
  useStepThreeExpandConditionsQuery
} from '../queries/stepThreeExpandConditions.query.generated';
import { NodeModel } from '../types';
import { Step5Links } from './Step5Links';

export type CombinationProps = {
  handbook: HandbookFragment[];
  setTree(tree: NodeModel[]): void;
  setExploring(isExploring: boolean): void;
  selectedProgram: number;
};

export const Step4Ors = (props: CombinationProps) => {
  const { handbook, setTree, setExploring, selectedProgram } = props;

  const [error, setError] = useState("");
  const [currentHandbook, setCurrentHandbook] =
    useState<HandbookFragment[]>(null);
  const [combinations, setCombinations] = useState<HandbookFragment[][]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const { loading } = useStepThreeExpandConditionsQuery({
    context: { clientName: "science" },
    variables: {
      handbook: handbook,
    },
    onError(error) {
      setError(error.message);
    },
    onCompleted(data) {
      if (data?.stepThreeExpandConditions.length < 2) {
        setCurrentHandbook(handbook);
      } else {
        const results = trimResults(data.stepThreeExpandConditions);
        setCombinations(results);
      }
    },
  });

  function setIndex(index: number) {
    if (index == 0) {
      const newTree = handbook.map((h, j) => nodeToTree(h, j));
      setTree(newTree);
      setCurrentHandbook(undefined);
    } else {
      // remove all collection children

      let collectionCombination = combinations[index - 1];

      const newTree = collectionCombination.map((h, j) => nodeToTree(h, j));
      setTree(newTree);
      setCurrentHandbook(collectionCombination);
      setExploring(true);
    }
    setCurrentIndex(index);
  }

  return (
    <>
      <h3 className="bg-slate-500 p-2 text-slate-100 flex items-center">
        <div className="flex-1">4. Expand OR Nodes {loading && "..."}</div>
      </h3>
      {error && <div className="bg-red-700 text-slate-50 m-2 p-4">{error}</div>}

      <div className="p-2 flex">
        <button
          type="button"
          disabled={currentIndex == 0}
          className="ml-2 p-1 text-blue-900 rounded-l-lg disabled:bg-slate-300 bg-blue-200 hover:bg-blue-300 flex items-center"
          onClick={() => {
            setIndex(currentIndex - 1);
          }}
        >
          <HiChevronLeft />
        </button>
        <div className="bg-slate-50 px-2">{currentIndex}</div>
        <button
          type="button"
          disabled={currentIndex === combinations.length}
          className="p-1 text-blue-900 rounded-r-lg disabled:bg-slate-300 bg-blue-200 hover:bg-blue-300 flex items-center"
          onClick={() => {
            setIndex(currentIndex + 1);
          }}
        >
          <HiChevronRight />
        </button>
        <div className="ml-2"> out of {combinations.length}</div>
      </div>

      {currentHandbook && (
        <Step5Links
          {...props}
          selectedProgram={selectedProgram}
          handbook={currentHandbook}
        />
      )}
    </>
  );
};
