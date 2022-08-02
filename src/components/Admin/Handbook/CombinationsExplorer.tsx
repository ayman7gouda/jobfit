import type { NodeModel } from "./types";
import { useEffect, useMemo, useState } from 'react';

import { HiChevronLeft, HiChevronRight } from 'react-icons/hi';
import { ClientHandbook } from 'server/handbook/types';
import { expandMinimumMaximum, expandOrNodes, expandSequence } from 'server/handbook/validator';

import { daoInNode, nodeToTree } from './helpers';
import { HandbookFragment } from './queries/handbook.fragment.generated';
import { useStepFourResolveNodesLazyQuery } from './queries/stepFourResolveNodes.query.generated';
import {
  useStepOneExpandCollectionsLazyQuery
} from './queries/stepOneExpandCollections.query.generated';
import {
  useStepThreeExpandConditionsLazyQuery
} from './queries/stepThreeExpandConditions.query.generated';
import { useStepTwoExpandExtremesLazyQuery } from './queries/stepTwoExpandExtremes.query.generated';

export function CombinationsExplorer({
  tree,
  setTree,
  setExploring,
}: {
  tree: NodeModel[];
  setTree(tree: NodeModel[]): void;
  setExploring(isExploring: boolean): void;
}) {
  const [originalTree, setOriginalTree] = useState(tree);
  const [error, setError] = useState("");
  const [activeProgram, setActiveProgram] = useState<number | null>(null);

  const handbook: HandbookFragment[] = useMemo(
    () =>
      daoInNode(
        {
          handbook: tree,
          id: 0,
          code: "",
          name: "",
          url: "",
        },
        false
      ).handbook as ClientHandbook[],
    []
  );

  const programs = handbook.filter((h) => h.type === "Program");

  const [collections, setCollections] = useState([] as HandbookFragment[][]);
  // const [minMaxes, setMinMaxes] = useState([] as HandbookFragment[][]);

  const [state, setState] = useState({
    collection: {
      index: 0,
      handbook,
    },
    minMax: {
      index: 0,
      handbook,
    },
    or: {
      index: 0,
      handbook,
    },
    final: {
      index: 0,
      handbook,
    },
  });

  const [expandCollection] = useStepOneExpandCollectionsLazyQuery({
    context: { clientName: "science" },
  });

  const [expandExtremes] = useStepTwoExpandExtremesLazyQuery({
    context: { clientName: "science" },
  });

  const [expandConditions] = useStepThreeExpandConditionsLazyQuery({
    context: { clientName: "science" },
  });

  const [expandReferences] = useStepFourResolveNodesLazyQuery({
    context: { clientName: "science" },
  });

  useEffect(() => {
    expandCollection({ variables: { handbook } }).then(({ data }) => {
      if (data && data.stepOneExpandCollections) {
        setCollections(data.stepOneExpandCollections);
      }
    });
  }, []);

  const minMaxes = useMemo(() => {
    if (state.collection.index == 0) {
      return [];
    }
    return expandMinimumMaximum(
      {
        parent: null,
        items: state.minMax.handbook,
      },
      collections[state.collection.index - 1]
    );
  }, [state.collection]);

  const orNodes = useMemo(() => {
    try {
      return expandOrNodes(state.or.handbook);
    } catch (ex: any) {
      setError(ex.message);
    }
  }, [state.collection]);

  function setOr(currentIndex: number) {
    if (orNodes == null) {
      return;
    }
    // set return to previous state
    if (currentIndex == 0) {
      if (orNodes.length == 0) {
        setTree(state.or.handbook.map((n, i) => nodeToTree(n, i)));
      } else {
        setCollection(state.collection.index);
      }
      setState({
        ...state,
        or: { handbook: state.minMax.handbook, index: 0 },
        final: { handbook: state.minMax.handbook, index: 0 },
      });
    } else {
      let currentSequence = orNodes[currentIndex - 1];
      let nodes = expandSequence(currentSequence);

      let hb = nodes.map((n, i) => nodeToTree(n, i));
      setTree(hb);
      setState({
        ...state,
        or: { handbook: nodes, index: currentIndex },
        final: { handbook: nodes, index: 0 },
      });
    }

    setExploring(currentIndex > 0);
  }

  function setMinMax(currentIndex: number) {
    // set return to previous state
    if (currentIndex == 0) {
      if (collections.length == 0) {
        setTree(state.minMax.handbook.map((n, i) => nodeToTree(n, i)));
      } else {
        setCollection(state.collection.index);
      }
      setState({
        ...state,
        minMax: { handbook: state.collection.handbook, index: currentIndex },
        or: { handbook: state.collection.handbook, index: 0 },
        final: { handbook: state.collection.handbook, index: 0 },
      });
    } else {
      let currentSequence = minMaxes[currentIndex - 1];
      let nodes = expandSequence(currentSequence);

      let hb = nodes.map((n, i) => nodeToTree(n, i));
      setTree(hb);
      setState({
        ...state,
        minMax: { ...state.minMax, index: currentIndex },
        or: { handbook: nodes, index: 0 },
        final: { handbook: nodes, index: 0 },
      });
    }

    setExploring(currentIndex > 0);
  }

  function setCollection(currentIndex: number) {
    if (currentIndex == 0) {
      setTree(originalTree);
      setState({
        ...state,
        collection: { handbook, index: currentIndex },
        minMax: { handbook, index: 0 },
        or: { handbook, index: 0 },
        final: { handbook, index: 0 },
      });
    } else {
      let collectionCombination = collections[currentIndex - 1];

      // remove all collection children
      let existingCollections = handbook.filter((h) => h.type === "Collection");
      let hb = handbook.filter((h) =>
        existingCollections.every((e) => e.id !== h.parentId)
      );

      // now append the collection and all its children
      hb = hb.concat(collectionCombination || []);

      // set the tree
      setTree(hb.map((h, j) => nodeToTree(h, j)));

      setState({
        ...state,
        collection: { handbook: hb, index: currentIndex },
        minMax: { handbook: hb, index: 0 },
        or: { handbook: hb, index: 0 },
        final: { handbook: hb, index: 0 },
      });
    }
    setExploring(currentIndex > 0);
  }

  return (
    <div className="bg-slate-200">
      {error && <div className="bg-red-700 text-slate-50 m-2 p-4">{error}</div>}
      <h2 className="font-bold p-2">Combinations Explorer</h2>
      <h3 className="bg-slate-500 p-2 text-slate-100 flex items-center">
        <div className="flex-1">1. Choose the program</div>
      </h3>
      <div className="p-2 flex">
        {(programs.length === 0 || programs.length === 1) && (
          <div>There is only one program</div>
        )}
        {programs.length > 1 && (
          <select
            value={activeProgram || ""}
            onChange={(e) => {
              setActiveProgram(parseInt(e.currentTarget.value));
            }}
          >
            <option value="">Please select the program ...</option>
            {programs.map((p) => (
              <option value={p.id}>{p.text}</option>
            ))}
          </select>
        )}
      </div>

      <h3 className="bg-slate-500 p-2 text-slate-100 flex items-center">
        <div className="flex-1">2. Expand Collections</div>
      </h3>
      <div className="p-2 flex">
        <button
          type="button"
          disabled={state.collection.index == 0}
          className="ml-2 p-1 text-blue-900 rounded-l-lg disabled:bg-slate-300 bg-blue-200 hover:bg-blue-300 flex items-center"
          onClick={() => {
            setCollection(state.collection.index - 1);
          }}
        >
          <HiChevronLeft />
        </button>
        <div className="bg-slate-50 px-2">{state.collection.index}</div>
        <button
          type="button"
          disabled={state.collection.index === collections.length}
          className="p-1 text-blue-900 rounded-r-lg disabled:bg-slate-300 bg-blue-200 hover:bg-blue-300 flex items-center"
          onClick={() => {
            setCollection(state.collection.index + 1);
          }}
        >
          <HiChevronRight />
        </button>
        <div className="ml-2"> out of {collections.length}</div>
      </div>

      {/* MIN MAX */}
      {(collections.length == 0 || state.collection.index > 0) && (
        <>
          <h3 className="bg-slate-500 p-2 text-slate-100 flex items-center">
            <div className="flex-1">3. Expand Minimum / Maximum</div>
          </h3>
          <div className="p-2 flex">
            <button
              type="button"
              disabled={state.minMax.index == 0}
              className="ml-2 p-1 text-blue-900 rounded-l-lg disabled:bg-slate-300 bg-blue-200 hover:bg-blue-300 flex items-center"
              onClick={() => {
                setMinMax(state.minMax.index - 1);
              }}
            >
              <HiChevronLeft />
            </button>
            <div className="bg-slate-50 px-2">{state.minMax.index}</div>
            <button
              type="button"
              disabled={state.minMax.index === minMaxes.length}
              className="p-1 text-blue-900 rounded-r-lg disabled:bg-slate-300 bg-blue-200 hover:bg-blue-300 flex items-center"
              onClick={() => {
                setMinMax(state.minMax.index + 1);
              }}
            >
              <HiChevronRight />
            </button>
            <div className="ml-2"> out of {minMaxes.length}</div>
          </div>
        </>
      )}

      {/* OR NODES */}
      {(collections.length == 0 || state.collection.index > 0) && (
        <>
          <h3 className="bg-slate-500 p-2 text-slate-100 flex items-center">
            <div className="flex-1">4. Expand OR Nodes</div>
          </h3>
          <div className="p-2 flex">
            <button
              type="button"
              disabled={state.or.index == 0}
              className="ml-2 p-1 text-blue-900 rounded-l-lg disabled:bg-slate-300 bg-blue-200 hover:bg-blue-300 flex items-center"
              onClick={() => {
                setOr(state.or.index - 1);
              }}
            >
              <HiChevronLeft />
            </button>
            <div className="bg-slate-50 px-2">{state.or.index}</div>
            <button
              type="button"
              disabled={state.or.index === orNodes!.length}
              className="p-1 text-blue-900 rounded-r-lg disabled:bg-slate-300 bg-blue-200 hover:bg-blue-300 flex items-center"
              onClick={() => {
                setOr(state.or.index + 1);
              }}
            >
              <HiChevronRight />
            </button>
            <div className="ml-2"> out of {orNodes!.length}</div>
          </div>
        </>
      )}
    </div>
  );
}
