import { useEffect, useState } from "react";

import { daoInNode, daoOutNode } from "components/Admin/Handbook/helpers";
import { useSaveSpecialisationHandbookMutation } from "components/Admin/Handbook/queries/saveSpecialisationHandbook.mutation.generated";
import { useSpecialisationQuery } from "components/Admin/Handbook/queries/specialisation.query.generated";
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
  const { data, loading } = useSpecialisationQuery({
    variables: { id: numId },
  });
  const [save] = useSaveSpecialisationHandbookMutation();

  if (loading) {
    return <div>Loading ...</div>;
  }

  if (!data?.specialisation) {
    return <div>Not found ...</div>;
  }

  const tree = daoOutNode(data.specialisation);
  initGuid(tree);

  return (
    <Layout
      model={tree}
      id={numId}
      part="majors"
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
