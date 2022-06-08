import { useCallback, useEffect, useState } from 'react';
import SelectSearch, { SelectSearchOption } from 'react-select-search';

import { ApolloClient, DocumentNode, useApolloClient } from '@apollo/client';

import debounce from 'lodash/debounce';
import { HiExclamationCircle } from 'react-icons/hi';

import styles from './CustomNode.module.css';
import { daoOutNode } from './helpers';
import { ProgramDocument } from './queries/program.query.generated';
import {
  SpecialisationDocument, SpecialisationQuery
} from './queries/specialisation.query.generated';
import { Select, TextField } from './shared';
import { NodeChange, NodeModel, Option } from './types';

async function checkCollectionLink(
  client: ApolloClient<object>,
  node: NodeModel,
  document: DocumentNode,
  name: "program" | "specialisation"
) {
  const program = await client.query({
    query: document,
    variables: { id: node.data.reference },
  });
  if (
    program.data == null ||
    program.data[name] == null ||
    program.data[name].handbook == null
  ) {
    return "Not found or not processed yet!";
  }
  let data = program.data[name];
  if (
    node.data.collection &&
    data.handbook?.every((h: any) => h.nodeId.toString() != node.data.reference)
  ) {
    return "Collection not found";
  }
  if (node.data && node.data.selector && node.data.reference) {
    // get all nodes of the pool node
    let collectionNodes = data.handbook.filter(
      (n: any) => n.parentId && n.parentId.toString() === node.data.collection
    );
    if (collectionNodes.length == 0) {
      return "Selected collection has nothing to select from ;(";
    }

    // check if all pool nodes contain the selected selection
    for (let collectionNode of collectionNodes) {
      if (
        collectionNode.type === "link:major" ||
        collectionNode.type === "link:minor"
      ) {
        let subCollection = await await client.query<SpecialisationQuery>({
          query: SpecialisationDocument,
          variables: { id: parseInt(node.text) },
        });
        if (
          subCollection == null ||
          subCollection.data == null ||
          subCollection.data.specialisation == null
        ) {
          return "Linked collection does not exist";
        }
        if (subCollection.data.specialisation.handbook == null) {
          return (
            "Specialisation not yet processed: " +
            subCollection.data.specialisation.name
          );
        }

        let collectionNodes = subCollection.data.specialisation.handbook.filter(
          (h) => h.type === "collection"
        );
        if (collectionNodes.every((p) => p.text !== node.data!.selector)) {
          return `Specialisation "${subCollection.data.specialisation.name} [${
            subCollection.data.specialisation.code
          }] does not contain the collection named "${node.data!.selector}"`;
        }
      }
    }
    // if (program.data.program.handbook?.every(
    //   (h) => !h.parentId || program.data.program!.handbook!.find(v => v.id === h.parentId)?.text != node.data.selector
    // ))
  }
  return "";
}

export function LinkNode(props: {
  node: NodeModel;
  collection?: number;
  reference?: number;
}) {
  const [linkError, setLinkError] = useState<string | null>(null);
  const client = useApolloClient();

  const checkLink = useCallback(
    debounce(() => {
      if (
        props.node.data.type === "link:minor" ||
        props.node.data.type === "link:major"
      ) {
        checkCollectionLink(
          client,
          props.node,
          SpecialisationDocument,
          "specialisation"
        ).then((a) => setLinkError(a));
      } else if (props.node.data.type === "link:program") {
        checkCollectionLink(
          client,
          props.node,
          ProgramDocument,
          "program"
        ).then((a) => setLinkError(a));
      }
    }, 1000),
    [props.node]
  );

  useEffect(() => {
    checkLink();
  });

  return linkError ? (
    <HiExclamationCircle
      title={linkError}
      style={{ color: "red", width: 30, height: 30 }}
    />
  ) : null;
}

function valueFilter(options: SelectSearchOption[]) {
  return function (value: string) {
    return options.filter((o) =>
      value
        .split(" ")
        .every(
          (p) =>
            o.name.toLowerCase().indexOf(p) >= 0 ||
            o.value.toString().toLowerCase().indexOf(p) >= 0
        )
    );
  };
}

export function LinkEditor(props: {
  programs: Option[];
  node: NodeModel;
  onNodeChange: NodeChange;
  setLabelText(value: string): void;
  query: any;
  getData(result: any): any;
}) {
  const [programNodes, setProgramNodes] = useState([] as NodeModel[]);
  const [program, setProgram] = useState<Option | undefined>(undefined);
  const [collection, setCollection] = useState<NodeModel | undefined>(
    undefined
  );
  const [findProgram] = props.query({ fetchPolicy: "network-only" });

  useEffect(() => {
    if (props.node.data.reference) {
      const programId = props.node.data.reference;
      findProgram({
        variables: { id: programId },
      }).then((result: any) => {
        let data = props.getData(result);
        if (data) {
          const nodes = daoOutNode(data);
          setProgramNodes(nodes.handbook);

          // set the program
          if (props.node.data.number) {
            let program = props.programs.find(
              (p) => p.value == props.node.data.reference
            );
            setProgram(program);
          }

          //set the pool
          if (props.node.data.collection) {
            let spc = nodes.handbook.find(
              (p) => p.id == props.node.data.collection
            );
            setCollection(spc);
          }
        }
      });
    }
  }, []);

  return (
    <>
      <SelectSearch
        options={props.programs}
        value={(props.node.data.reference || "").toString()}
        onChange={(e) => {
          if (!e) {
            return;
          }

          let id = e as unknown as string;
          let numId = parseInt(id);

          let program = props.programs.find((p) => p.value == numId);

          setProgram(program);
          props.setLabelText(program?.name || "");
          props.onNodeChange(props.node.id, {
            reference: numId,
          });

          findProgram({ variables: { id: numId } }).then((result: any) => {
            let data = props.getData(result);
            if (data) {
              const nodes = daoOutNode(data);
              setProgramNodes(nodes.handbook);
            }
          });
        }}
        search
        filterOptions={valueFilter}
        placeholder="Select the program"
      />
      <Select
        value={(props.node.data.collection || "").toString()}
        style={{ minWidth: 120 }}
        onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
          let id = parseInt(e.currentTarget.value);
          props.onNodeChange(props.node.id, {
            reference: id,
          });

          let spc = programNodes.find((p) => p.id == id);
          setCollection(spc);
          props.setLabelText(
            (program?.name || "Not Found") + " > " + (spc?.text || "Not Found")
          );
        }}
      >
        <option value="">Please Select</option>
        {programNodes
          .filter((n) => n.data.type === "collection")
          .map((p) => (
            <option key={p.id} value={p.id}>
              {p.text}
            </option>
          ))}
      </Select>
      <TextField
        className={styles.textField}
        value={props.node.data.selector}
        onChange={(e) => {
          props.onNodeChange(props.node.id, {
            selector: e.currentTarget.value,
          });
          props.setLabelText(
            program?.name +
              (collection ? " > " + collection.text : "") +
              (e.currentTarget.value ? " > " + e.currentTarget.value : "")
          );
        }}
        style={{ width: 100, margin: "0px 8px" }}
        placeholder="Selector"
      />
    </>
  );
}
