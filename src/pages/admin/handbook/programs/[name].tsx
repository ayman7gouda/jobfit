import { useEffect, useState } from "react";

import { daoInNode, daoOutNode } from "components/Admin/Handbook/helpers";
import { useProgramQuery } from "components/Admin/Handbook/queries/program.query.generated";
import { useSaveProgramHandbookMutation } from "components/Admin/Handbook/queries/saveProgramHandbook.mutation.generated";
import { Layout } from "components/Admin/Handbook/TreeView";
import { initGuid } from "components/Admin/Handbook/types";
import { useRouter } from "next/router";

const ClientOnly = ({ children }: any) => {
  const [isClient, setClient] = useState(false);

  useEffect(() => setClient(true), []);

  if (!isClient) {
    return null;
  }
  return children;
};

export function SpecialisationContainer() {
  const { id } = useRouter().query;
  const numId = parseInt(id as string);
  const { data, loading } = useProgramQuery({
    variables: { id: numId },
  });
  const [save] = useSaveProgramHandbookMutation();

  if (loading) {
    return <div>Loading ...</div>;
  }

  if (!data?.program) {
    return <div>Not found ...</div>;
  }

  const tree = daoOutNode(data.program);
  initGuid(tree);

  return (
    <Layout
      model={tree}
      id={numId}
      part="programs"
      save={(h) => {
        save({
          variables: {
            input: daoInNode({
              ...tree,
              handbook: h,
            }),
          },
        });
      }}
    />
  );
}

export default () => (
  <ClientOnly>
    <SpecialisationContainer />
    <style jsx global>{`
      body,
      html,
      #__next {
        height: 100%;
      }
    `}</style>
  </ClientOnly>
);
