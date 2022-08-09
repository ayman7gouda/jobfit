import type { NodeModel } from "./types";
import { clone } from 'lodash';
import { useEffect, useMemo, useState } from 'react';

import { Handbook } from 'generated/clientTypes';
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi';
import { ClientHandbook } from 'server/handbook/types';

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

function trimResults(hb: Handbook[][]) {
  return hb.map((c) =>
    c.map((d) => {
      let clone = { ...d };
      delete clone.__typename;
      return clone as HandbookFragment;
    })
  );
}

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
      daoInNode({
        handbook: tree,
        id: 0,
        code: "",
        name: "",
        url: "",
      }).handbook as ClientHandbook[],
    []
  );

  const programs = handbook.filter((h) => h.type === "Program");

  const [collections, setCollections] = useState([] as HandbookFragment[][]);
  const [minMaxes, setMinMaxes] = useState([] as HandbookFragment[][]);
  const [orNodes, setOrNodes] = useState([] as HandbookFragment[][]);
  const [finalNodes, setFinalNodes] = useState([] as HandbookFragment[][]);

  const [state, setState] = useState({
    collection: {
      index: 0,
      handbook,
      expanded: false,
    },
    minMax: {
      index: 0,
      handbook,
      expanded: false,
    },
    or: {
      index: 0,
      handbook,
      expanded: false,
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
    expandCollection({
      variables: {
        programId: activeProgram || 0,
        handbook,
      },
    })
      .then((result) => {
        if (result.error) {
          setError(result.error.message);
        }
        if (result.data && result.data.stepOneExpandCollections) {
          setError("");
          setCollections(trimResults(result.data.stepOneExpandCollections));
          setCollection(0);
        }
      })
      .catch((e) => {
        debugger;
        setError(JSON.stringify(e));
      });
  }, [handbook]);

  useEffect(() => {
    if (state.collection.expanded) {
      expandExtremes({ variables: { handbook: state.minMax.handbook } }).then(
        ({ data, error }) => {
          if (error) {
            setError(error.message);
          } else if (data && data.stepTwoExpandExtremes) {
            setMinMaxes(trimResults(data.stepTwoExpandExtremes));
            setMinMax(0);
            setError("");
          }
        }
      );
    }
  }, [state.collection.expanded, state.minMax.handbook]);

  useEffect(() => {
    try {
      if (state.minMax.expanded) {
        expandConditions({ variables: { handbook: state.or.handbook } }).then(
          ({ data, error }) => {
            if (error) {
              setError(error.message);
            }
            if (data && data.stepThreeExpandConditions) {
              setError("");
              setOrNodes(trimResults(data.stepThreeExpandConditions));
            }
          }
        );
      }
    } catch (ex: any) {
      setError(ex.message);
    }
  }, [state.minMax.expanded, state.or.handbook]);

  // final
  useEffect(() => {
    try {
      if (state.or.expanded && (state.or.index > 0 || orNodes.length == 0)) {
        expandReferences({
          variables: {
            programId: activeProgram || 0,
            handbook: state.final.handbook,
          },
        }).then(({ data, error }) => {
          if (error) {
            setError(error.message);
          }
          if (data && data.stepFourResolveNodes) {
            setError("");
            setFinalNodes(data.stepFourResolveNodes);
          }
        });
      }
    } catch (ex: any) {
      setError(ex.message);
    }
  }, [state.or.expanded, state.final.handbook]);

  function setFinal(currentIndex: number) {
    if (orNodes == null) {
      return;
    }
    // set return to previous state
    if (currentIndex == 0) {
      if (finalNodes.length == 0) {
        setTree(state.final.handbook.map((n, i) => nodeToTree(n, i)));
      } else {
        setCollection(state.collection.index);
      }
      setState({
        ...state,
        final: { handbook: state.or.handbook, index: 0 },
      });
    } else {
      //let currentSequence = orNodes[currentIndex - 1];
      //let nodes = expandSequence(currentSequence);
      let nodes = finalNodes[currentIndex - 1];

      let hb = nodes.map((n, i) => nodeToTree(n, i));
      setTree(hb);
      setState({
        ...state,
        final: { ...state.final, index: currentIndex },
      });
    }

    setExploring(currentIndex > 0);
  }

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
        or: { handbook: state.minMax.handbook, index: 0, expanded: true },
        final: { handbook: state.minMax.handbook, index: 0 },
      });
    } else {
      //let currentSequence = orNodes[currentIndex - 1];
      //let nodes = expandSequence(currentSequence);
      let nodes = orNodes[currentIndex - 1];

      let hb = nodes.map((n, i) => nodeToTree(n, i));
      setTree(hb);
      setState({
        ...state,
        or: { ...state.or, index: currentIndex, expanded: true },
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
        minMax: {
          handbook: state.collection.handbook,
          index: currentIndex,
          expanded: true,
        },
        or: { handbook: state.collection.handbook, index: 0, expanded: false },
        final: { handbook: state.collection.handbook, index: 0 },
      });
    } else {
      let nodes = minMaxes[currentIndex - 1];
      // let nodes = expandSequence(currentSequence);

      let hb = nodes.map((n, i) => nodeToTree(n, i));
      setTree(hb);
      setState({
        ...state,
        minMax: { ...state.minMax, index: currentIndex, expanded: true },
        or: { handbook: nodes, index: 0, expanded: false },
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
        collection: { handbook, index: currentIndex, expanded: true },
        minMax: { handbook, index: 0, expanded: false },
        or: { handbook, index: 0, expanded: false },
        final: { handbook, index: 0 },
      });
    } else {
      let collectionCombination = collections[currentIndex - 1];

      // remove all collection children
      let existingCollections = handbook.filter((h) => h.type === "Collection");
      let hb = handbook.filter((h) =>
        existingCollections.every(
          (e) => e.nodeId !== h.parentId && e.nodeId !== h.nodeId
        )
      );

      // now append the collection and all its children
      hb = (collectionCombination || []).concat(hb);

      // set the tree
      setTree(hb.map((h, j) => nodeToTree(h, j)));

      setState({
        ...state,
        collection: { handbook: hb, index: currentIndex, expanded: true },
        minMax: { handbook: hb, index: 0, expanded: false },
        or: { handbook: hb, index: 0, expanded: false },
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
              <option value={p.nodeId}>{p.text}</option>
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

      {/* Final NODES */}
      {(collections.length == 0 || state.collection.index > 0) && (
        <>
          <h3 className="bg-slate-500 p-2 text-slate-100 flex items-center">
            <div className="flex-1">5. Expand Links</div>
          </h3>
          <div className="p-2 flex">
            <button
              type="button"
              disabled={state.final.index == 0}
              className="ml-2 p-1 text-blue-900 rounded-l-lg disabled:bg-slate-300 bg-blue-200 hover:bg-blue-300 flex items-center"
              onClick={() => {
                setFinal(state.final.index - 1);
              }}
            >
              <HiChevronLeft />
            </button>
            <div className="bg-slate-50 px-2">{state.final.index}</div>
            <button
              type="button"
              disabled={state.final.index === finalNodes!.length}
              className="p-1 text-blue-900 rounded-r-lg disabled:bg-slate-300 bg-blue-200 hover:bg-blue-300 flex items-center"
              onClick={() => {
                setFinal(state.final.index + 1);
              }}
            >
              <HiChevronRight />
            </button>
            <div className="ml-2"> out of {finalNodes!.length}</div>
          </div>
        </>
      )}
    </div>
  );
}
