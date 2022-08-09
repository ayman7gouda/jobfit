import { useMemo, useState } from 'react';

import { AllCombinationsExplorer } from '../CombinationsExplorer';
import { nodeToTree, trimResults } from '../helpers';
import { HandbookFragment } from '../queries/handbook.fragment.generated';
import { useResolveConstraintsLazyQuery } from '../queries/resolveContraints.query.generated';
import { NodeModel } from '../types';
import { Step2Combinations } from './Step2Combinations';

export type CombinationProps = {
  handbook: HandbookFragment[];
  tree: NodeModel[];
  setTree(tree: NodeModel[]): void;
  setExploring(isExploring: boolean): void;
};

export const Step1Program = (props: CombinationProps) => {
  const { handbook, setTree, setExploring, tree } = props;

  const [selectedProgram, setSelectedProgram] = useState<number>();
  const [error, setError] = useState("");

  const programs = useMemo(
    () =>
      handbook.filter(
        (h) => h.type === "Program" || h.type === "ConstraintProgram"
      ),
    [handbook]
  );

  const [currentHandbook, setCurrentHandbook] = useState<HandbookFragment[]>(
    programs.length == 0 ? handbook : null
  );

  const [resolveConstraints, { loading }] = useResolveConstraintsLazyQuery({
    context: { clientName: "science" },
    onError(error) {
      setError(error.message);
    },
    onCompleted(data) {
      if (data?.resolveConstraints) {
        const newTree = data.resolveConstraints.map((h, j) => nodeToTree(h, j));
        const results = trimResults([data.resolveConstraints])[0];
        setTree(newTree);
        setCurrentHandbook(results);
      }
    },
  });

  return (
    <>
      <h3 className="bg-slate-500 p-2 text-slate-100 flex items-center">
        <div className="flex-1">1. Choose the program</div>
      </h3>
      {error && <div className="bg-red-700 text-slate-50 m-2 p-4">{error}</div>}

      <div className="p-2 flex">
        {(programs.length === 0 || programs.length === 1) && (
          <div>There is only one program</div>
        )}
        {programs.length > 1 && (
          <select
            value={selectedProgram || ""}
            onChange={(e) => {
              if (e.currentTarget.value) {
                const id = parseInt(e.currentTarget.value);
                setSelectedProgram(id);
                resolveConstraints({
                  variables: {
                    programId: id,
                    handbook,
                  },
                });
              } else {
                const newTree = handbook.map((h, j) => nodeToTree(h, j));
                setTree(newTree);
                setCurrentHandbook(undefined);
                setSelectedProgram(undefined);
              }
            }}
          >
            <option value="">Please select the program ...</option>
            {programs.map((p) => (
              <option value={p.reference}>{p.text}</option>
            ))}
          </select>
        )}
      </div>

      {currentHandbook && (
        <>
          <Step2Combinations
            {...props}
            selectedProgram={selectedProgram || 0}
            handbook={currentHandbook}
          />

          <AllCombinationsExplorer
            tree={tree}
            setExploring={setExploring}
            setTree={setTree}
            programId={selectedProgram || 0}
          />
        </>
      )}
    </>
  );
};
