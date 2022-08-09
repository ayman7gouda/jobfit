import type { NodeModel } from "./types";
import { clone } from 'lodash';
import { useEffect, useMemo, useState } from 'react';

import { Handbook } from 'generated/clientTypes';
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi';
import { ClientHandbook } from 'server/handbook/types';

import { daoInNode, nodeToTree } from './helpers';
import { useAllCombinationsLazyQuery } from './queries/allCombinations.query.generated';
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

export function AllCombinationsExplorer({
  tree,
  setTree,
  setExploring,
  programId,
}: {
  tree: NodeModel[];
  setTree(tree: NodeModel[]): void;
  setExploring(isExploring: boolean): void;
  programId: number;
}) {
  const [originalTree, setOriginalTree] = useState(tree);
  const [error, setError] = useState("");
  const [index, setIndex] = useState(0);
  const [options, setOptions] = useState<Handbook[][]>([]);

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

  const [find, { loading }] = useAllCombinationsLazyQuery({
    variables: {
      programId,
      handbook,
    },
    context: { clientName: "science" },
    onError(error) {
      setError(error.message);
    },
    onCompleted(data) {
      setError("");
      setOptions(data.allCombinations);
    },
  });

  function processOptions(currentIndex: number) {
    if (currentIndex == 0) {
      setTree(originalTree);
      setIndex(0);
    } else {
      let collectionCombination = options[currentIndex - 1];

      // set the tree
      setTree(collectionCombination.map((h, j) => nodeToTree(h, j)));
      setIndex(currentIndex);
    }
    setExploring(currentIndex > 0);
  }

  return (
    <>
      <h2 className="font-bold p-2 bg-green-500">
        All Combinations{" "}
        <button className="bg-green-800 p-1 text-white" onClick={() => find()}>
          Find
        </button>
      </h2>

      {loading && <span>Loading ...</span>}
      {error && <div className="bg-red-700 text-slate-50 m-2 p-4">{error}</div>}
      <div className="p-2 flex">
        <button
          type="button"
          disabled={index == 0}
          className="ml-2 p-1 text-blue-900 rounded-l-lg disabled:bg-slate-300 bg-blue-200 hover:bg-blue-300 flex items-center"
          onClick={() => {
            processOptions(index - 1);
          }}
        >
          <HiChevronLeft />
        </button>
        <div className="bg-slate-50 px-2">{index}</div>
        <button
          type="button"
          disabled={index === options.length}
          className="p-1 text-blue-900 rounded-r-lg disabled:bg-slate-300 bg-blue-200 hover:bg-blue-300 flex items-center"
          onClick={() => {
            processOptions(index + 1);
          }}
        >
          <HiChevronRight />
        </button>
        <div className="ml-2"> out of {options.length}</div>
      </div>
    </>
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
  const [loading, setLoading] = useState(false);

  const [state, setState] = useState({
    collection: {
      index: 0,
      initial: handbook,
      current: null as HandbookFragment[],
    },
    minMax: {
      index: 0,
      initial: handbook,
      current: null as HandbookFragment[],
    },
    or: {
      index: 0,
      initial: handbook,
      current: null as HandbookFragment[],
    },
    final: {
      index: 0,
      initial: handbook,
      current: null as HandbookFragment[],
    },
  });

  const [expandCollection] = useStepOneExpandCollectionsLazyQuery({
    context: { clientName: "science" },
    onCompleted() {
      setLoading(false);
    },
  });

  const [expandExtremes] = useStepTwoExpandExtremesLazyQuery({
    context: { clientName: "science" },
    onCompleted() {
      setLoading(false);
    },
  });

  const [expandConditions] = useStepThreeExpandConditionsLazyQuery({
    context: { clientName: "science" },
    onCompleted() {
      setLoading(false);
    },
  });

  const [expandReferences] = useStepFourResolveNodesLazyQuery({
    context: { clientName: "science" },
    onCompleted() {
      setLoading(false);
    },
  });

  // COLLECTIONS
  useEffect(() => {
    setLoading(true);
    expandCollection({
      variables: {
        programId: activeProgram || 0,
        handbook,
      },
    })
      .then((result) => {
        if (result.error) {
          setError(result.error.message);
        } else {
          setError("");
        }
        if (
          result.data &&
          result.data.stepOneExpandCollections &&
          result.data.stepOneExpandCollections.length > 1
        ) {
          setCollections(trimResults(result.data.stepOneExpandCollections));
          setCollection(0);
        } else {
          setCollections([]);
          setCollection(0);
        }
      })
      .catch((e) => {
        debugger;
        setError(JSON.stringify(e));
      });
  }, [handbook]);

  // MINMAX
  useEffect(() => {
    if (
      state.collection.current &&
      (state.collection.index > 0 || collections.length == 0)
    ) {
      setLoading(true);
      expandExtremes({
        variables: {
          handbook: state.collection.current || state.collection.initial,
        },
      }).then(({ data, error }) => {
        if (error) {
          setError(error.message);
        } else {
          setError("");
        }
        if (data && data.stepTwoExpandExtremes) {
          setMinMaxes(trimResults(data.stepTwoExpandExtremes));
          setMinMax(0);
        }
      });
    }
  }, [state.collection.current]);

  // or nodes
  useEffect(() => {
    try {
      if (
        state.minMax.current &&
        (state.minMax.index > 0 || minMaxes.length == 0)
      ) {
        setLoading(true);
        expandConditions({
          variables: {
            handbook: state.minMax.current || state.minMax.initial,
          },
        }).then(({ data, error }) => {
          if (error) {
            setError(error.message);
          } else {
            setError("");
          }

          if (
            data &&
            data.stepThreeExpandConditions &&
            data.stepThreeExpandConditions.length > 1
          ) {
            setOrNodes(trimResults(data.stepThreeExpandConditions));
            setOr(0);
          } else {
            setOrNodes([]);
            setOr(0);
          }
        });
      }
    } catch (ex: any) {
      setError(ex.message);
    }
  }, [state.minMax.current]);

  // final
  useEffect(() => {
    try {
      if (state.or.current && (state.or.index > 0 || orNodes.length == 0)) {
        setLoading(true);
        expandReferences({
          variables: {
            programId: activeProgram || 0,
            handbook: state.or.current || state.or.initial,
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
  }, [state.or.current]);

  function setFinal(currentIndex: number) {
    if (orNodes == null) {
      return;
    }
    // set return to previous state
    if (currentIndex == 0) {
      setTree(state.or.current.map((n, i) => nodeToTree(n, i)));

      setState({
        ...state,
        final: { ...state.final, current: null, index: 0 },
      });
    } else {
      //let currentSequence = orNodes[currentIndex - 1];
      //let nodes = expandSequence(currentSequence);
      let nodes = finalNodes[currentIndex - 1];

      let hb = nodes.map((n, i) => nodeToTree(n, i));
      setTree(hb);
      setState({
        ...state,
        final: { ...state.final, current: nodes, index: currentIndex },
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
      setTree(state.minMax.current.map((n, i) => nodeToTree(n, i)));

      setState({
        ...state,
        or: {
          ...state.or,
          current: state.or.initial,
          index: 0,
        },
        final: {
          ...state.final,
          initial: state.or.initial,
          current: null,
          index: 0,
        },
      });
    } else {
      //let currentSequence = orNodes[currentIndex - 1];
      //let nodes = expandSequence(currentSequence);
      let nodes = orNodes[currentIndex - 1];

      let hb = nodes.map((n, i) => nodeToTree(n, i));
      setTree(hb);
      setState({
        ...state,
        or: {
          ...state.or,
          index: currentIndex,
          current: nodes,
        },
        final: { ...state.final, current: null, initial: nodes, index: 0 },
      });
    }

    setExploring(currentIndex > 0);
  }

  function setMinMax(currentIndex: number) {
    // set return to previous state
    if (currentIndex == 0) {
      setTree(state.collection.current.map((n, i) => nodeToTree(n, i)));

      setState({
        ...state,
        minMax: {
          ...state.minMax,
          current: state.minMax.initial,
          index: currentIndex,
        },
        or: {
          current: null,
          initial: state.minMax.initial,
          index: 0,
        },
        final: {
          current: null,
          initial: state.minMax.initial,
          index: 0,
        },
      });
    } else {
      let nodes = minMaxes[currentIndex - 1];
      // let nodes = expandSequence(currentSequence);

      let hb = nodes.map((n, i) => nodeToTree(n, i));
      setTree(hb);
      setState({
        ...state,
        minMax: {
          ...state.minMax,
          index: currentIndex,
          current: nodes,
        },
        or: { initial: nodes, current: null, index: 0 },
        final: { initial: nodes, current: null, index: 0 },
      });
    }

    setExploring(currentIndex > 0);
  }

  function setCollection(currentIndex: number) {
    if (currentIndex == 0) {
      setTree(originalTree);
      setState({
        ...state,
        collection: {
          initial: handbook,
          current: handbook,
          index: currentIndex,
        },
        minMax: {
          initial: handbook,
          current: null,
          index: 0,
        },
        or: { initial: handbook, current: null, index: 0 },
        final: { initial: handbook, current: null, index: 0 },
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
        collection: {
          initial: hb,
          current: collectionCombination,
          index: currentIndex,
        },
        minMax: { initial: hb, current: null, index: 0 },
        or: { initial: hb, current: null, index: 0 },
        final: { initial: hb, current: null, index: 0 },
      });
    }
    setExploring(currentIndex > 0);
  }

  return (
    <div className="bg-slate-200">
      {error && <div className="bg-red-700 text-slate-50 m-2 p-4">{error}</div>}
      <h2 className="font-bold p-2  bg-green-500">
        {loading ? "Loading ..." : "Combinations Explorer"}
      </h2>
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

      <AllCombinationsExplorer
        tree={tree}
        setExploring={setExploring}
        setTree={setTree}
        programId={activeProgram || 0}
      />
    </div>
  );
}
